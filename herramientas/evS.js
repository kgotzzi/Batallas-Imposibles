const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});const p=await b.newPage({viewport:{width:720,height:1280}});
await p.goto('http://localhost:8765/'+process.env.PAGE);await p.waitForFunction('window.READY');
fs.writeFileSync(process.env.OUT,JSON.stringify(await p.evaluate(()=>EVENTS())));await b.close();})();
