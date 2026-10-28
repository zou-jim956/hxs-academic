import assert from 'node:assert/strict';
import fs from 'node:fs';
const source=fs.readFileSync('src/js/components.js','utf8');
const c=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const d=JSON.parse(fs.readFileSync('content/site-data.json','utf8'));
assert.equal(c.safeUrl('javascript:alert(1)'), '');
assert.equal(c.safeUrl('//bad.example/a'), '');
assert.equal(c.safeUrl('assets/../secret'), '');
assert.equal(c.buttonHtml({label:'hidden',url:''}), '');
assert.equal(c.mediaHtml({image:''}), '');
const example={image:'assets/images/architecture/hero-reference-placeholder.jpg',imageAlt:'测试 <图>',caption:'图片说明\n第二行',button:{label:'详细介绍',url:'https://example.com/?a=1&b=2',newTab:true}};
for(const group of ['research','projects','teaching','talks','publications']){
 const item={...d[group][0],...example};
 const html=c[group]([item]);
 for(const text of ['<img','测试 &lt;图&gt;','图片说明','详细介绍','a=1&amp;b=2','noopener noreferrer']) assert.ok(html.includes(text),group+' missing '+text);
 assert.ok(!c[group]([{...item,image:'',button:{url:''}}]).includes('<img'));
}
assert.ok(c.hero(d.profile,{...d.hero,showCaption:true}).includes('cms-hero-caption'));
assert.ok(!c.hero(d.profile,d.hero).includes('cms-hero-caption'));
assert.ok(c.publications(d.publications).includes('全部 17'));
assert.ok(c.about(d.profile).includes(d.profile.officialLabel));
assert.ok(c.contact(d.profile).includes(d.profile.contactLabel));
for(const base of ['https://user.github.io/','https://user.github.io/hxs-academic/']){
 assert.equal(new URL(example.image,base).pathname,new URL(base).pathname+example.image);
}
console.log('PASS: all 5 content groups render images/captions/buttons; empty fields hide; escaped output, unsafe links, hero caption toggle, publication counts, root/subpath URLs.');
