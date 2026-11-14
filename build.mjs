import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const base=path.dirname(fileURLToPath(import.meta.url));
const dist=path.join(base,'dist');
fs.mkdirSync(dist,{recursive:true});
fs.cpSync(path.join(base,'media'),path.join(dist,'media'),{recursive:true});
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
for(const name of ['index','about','projects','publications','teaching']){
  const data=JSON.parse(fs.readFileSync(path.join(base,'content',name+'.json'),'utf8'));
  const tpl=fs.readFileSync(path.join(base,'templates',name+'.html'),'utf8');
  const out=tpl.replace(/\{\{((?:texts|images|links|alt)_[a-z0-9_]+)\}\}/g,(_,field)=>{
    if(!(field in data)) throw Error(`Missing ${name} ${field}`);
    let value=data[field];
    if(field.startsWith('images_') && value.startsWith('/media/')) value=value.slice(1);
    return escape(value);
  });
  fs.writeFileSync(path.join(dist,name+'.html'),out);
}
