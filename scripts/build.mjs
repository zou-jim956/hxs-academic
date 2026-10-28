import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd(), src=path.join(root,'src'), dist=path.join(root,'dist');
fs.rmSync(dist,{recursive:true,force:true});
function copyDir(from,to){fs.mkdirSync(to,{recursive:true}); for(const e of fs.readdirSync(from,{withFileTypes:true})){const a=path.join(from,e.name),b=path.join(to,e.name); if(e.isDirectory()) copyDir(a,b); else fs.copyFileSync(a,b)}}
fs.mkdirSync(dist,{recursive:true});
fs.copyFileSync(path.join(src,'index.html'),path.join(dist,'index.html'));
copyDir(path.join(src,'css'),path.join(dist,'css'));
copyDir(path.join(src,'js'),path.join(dist,'js'));
copyDir(path.join(src,'assets'),path.join(dist,'assets'));
copyDir(path.join(root,'content'),path.join(dist,'content'));
console.log('Built dist from src.');
