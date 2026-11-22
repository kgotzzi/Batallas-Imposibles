const {chromium}=require('playwright');const {spawn}=require('child_process');const fs=require('fs');
(async()=>{const [a,b,out]=[+process.argv[2],+process.argv[3],process.argv[4]];
const br=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});const p=await br.newPage({viewport:{width:720,height:1280}});
p.on('pageerror',e=>console.log('PAGEERR',e.message));
await p.goto('http://localhost:8765/'+(process.env.PAGE||'video.html')+'');await p.waitForFunction('window.READY||window.ERR');
const tmp=out.replace(/\.mp4$/,'.part.mp4');
const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p','-r','30',tmp],{stdio:['pipe','inherit','inherit']});
const t0=Date.now();
for(let f=a;f<b;f++){const d=await p.evaluate(t=>renderFrame(t),f/30);const buf=Buffer.from(d.split(',')[1],'base64');if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));if(f%100===0)console.log(out,f,((Date.now()-t0)/(f-a+1)).toFixed(0)+'ms/f');}
ff.stdin.end();ff.on('close',c=>{if(c===0){fs.renameSync(tmp,out);console.log('DONE',out);}else console.log('FFFAIL',c);br.close();});
})();
