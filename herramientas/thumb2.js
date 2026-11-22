const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});const p=await b.newPage({viewport:{width:720,height:1280}});
await p.goto('http://localhost:8765/'+(process.env.PAGE||'videoSyt.html'));await p.waitForFunction('window.READY');
await p.evaluate(()=>{window.NOOV=true;});
for(const t of process.argv.slice(2).map(Number)){const d=await p.evaluate(t=>renderFrame(t),t);fs.writeFileSync('thumb_'+t+'.jpg',Buffer.from(d.split(',')[1],'base64'));}
process.exit(0);})();
