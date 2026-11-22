from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps, ImageEnhance
FONT='proj/Anton-Regular.ttf'; W,H=1080,1920
def ctext(dr,y,s,size,fill,stroke=10):
    f=ImageFont.truetype(FONT,size); w=dr.textlength(s,font=f)
    while w>W-80: size-=6; f=ImageFont.truetype(FONT,size); w=dr.textlength(s,font=f)
    dr.text(((W-w)/2,y),s,font=f,fill=fill,stroke_width=stroke,stroke_fill=(0,0,0))
def badge(dr,y,s,bg,size=84):
    f=ImageFont.truetype(FONT,size); w=dr.textlength(s,font=f); x0=(W-w)/2-45
    dr.rounded_rectangle([x0,y,x0+w+90,y+size*1.55],radius=26,fill=bg); dr.text(((W-w)/2,y+size*0.12),s,font=f,fill=(255,255,255))
def grad(im,y0,y1,top=False):
    g=Image.new('RGBA',(W,H),(0,0,0,0)); d=ImageDraw.Draw(g)
    for y in range(y0,y1):
        k=(y-y0)/(y1-y0); a=int(235*((1-k) if top else k)); d.line([(0,y),(W,y)],fill=(0,0,0,a))
    return Image.alpha_composite(im,g)
def make(src,out,top1,top2,col2,title1,title2,tcol,tag,tagbg,cctv=False):
    im=Image.open(src).convert('RGB').resize((W,H),Image.LANCZOS)
    if cctv:
        im=ImageEnhance.Contrast(ImageOps.grayscale(im)).enhance(1.4).convert('RGB')
        sc=Image.new('RGBA',(W,H),(0,0,0,0)); d=ImageDraw.Draw(sc)
        for y in range(0,H,6): d.line([(0,y),(W,y)],fill=(0,0,0,60))
        im=Image.alpha_composite(im.convert('RGBA'),sc).convert('RGB')
    im=im.convert('RGBA'); im=grad(im,0,700,True); im=grad(im,950,H)
    dr=ImageDraw.Draw(im)
    if cctv:
        dr.ellipse([60,620,100,660],fill=(255,40,40)); f=ImageFont.truetype(FONT,52); dr.text((120,608),'REC  03:10 AM',font=f,fill=(255,255,255))
    # todo el texto dentro del recorte 3:4 del perfil (y 240-1680)
    ctext(dr,300,top1,96,(255,255,255)); ctext(dr,420,top2,104,col2)
    ctext(dr,1060,title1,104,(255,255,255)); ctext(dr,1190,title2,150,tcol,12)
    badge(dr,1415,tag,tagbg)
    im.convert('RGB').save(out,quality=93)
