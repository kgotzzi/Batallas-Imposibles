import sys,glob
from PIL import Image,ImageDraw,ImageFont
d=sys.argv[1]; out=sys.argv[2]; ts=sys.argv[3:]
ims=[(t,Image.open(f'{d}/thumb_{t}.jpg').resize((240,427))) for t in ts]
cols=6; rows=(len(ims)+cols-1)//cols
S=Image.new('RGB',(cols*244,rows*447),(20,20,20)); dr=ImageDraw.Draw(S)
for i,(t,im) in enumerate(ims):
    x=(i%cols)*244; y=(i//cols)*447; S.paste(im,(x,y)); dr.text((x+4,y+429),t,fill=(255,255,0))
S.save(out,quality=85)
