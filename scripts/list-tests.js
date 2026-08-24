const fs = require('fs');
const path = require('path');

function walk(dir){
  for(const f of fs.readdirSync(dir)){
    const p = path.join(dir,f);
    const stat = fs.statSync(p);
    if(stat.isDirectory()) walk(p);
    else if(p.endsWith('.js')){
      const s = fs.readFileSync(p,'utf8');
      const re = /test\(\s*['\"]([^'\"]+)['\"]/g;
      let m;
      while((m = re.exec(s)) !== null) console.log(m[1]);
    }
  }
}

walk(process.argv[2] || 'tests');
