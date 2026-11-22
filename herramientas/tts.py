import sys,json,urllib.request,os
n=sys.argv[1]; model=sys.argv[2] if len(sys.argv)>2 else 'eleven_multilingual_v2'
key=open('/home/claude/.el_key').read().strip(); VID='RxPoOxDaJiOdJGnMMaql'
text=open(f'/home/claude/kit/txt/{n}.txt').read().strip()
body=json.dumps({'text':text,'model_id':model,'voice_settings':{'stability':0.5,'similarity_boost':0.75,'style':0.0,'use_speaker_boost':True,'speed':float(os.environ.get('SPD','1.05'))}}).encode()
req=urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{VID}?output_format=mp3_44100_128',data=body,headers={'xi-api-key':key,'Content-Type':'application/json','Accept':'audio/mpeg'})
out=f'/home/claude/kit/proj/s{n}.mp3'
with urllib.request.urlopen(req,timeout=180) as r: open(out,'wb').write(r.read())
import subprocess,shutil; os.makedirs('/home/claude/kit/api_raw',exist_ok=True); raw=f'/home/claude/kit/api_raw/s{n}.mp3'; shutil.move(out,raw); subprocess.run(['ffmpeg','-v','error','-y','-i',raw,'-af','volume=-3.6dB','-b:a','128k',out],check=True)
print('OK',out,os.path.getsize(out))
