from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
FONT='/home/claude/kit/proj/Anton-Regular.ttf'
def F(s): return ImageFont.truetype(FONT,s)
def base(p):
    im=Image.open(p).convert('RGB').resize((1080,1920),Image.LANCZOS)
    v=Image.new('L',(1080,1920),0); d=ImageDraw.Draw(v)
    for i in range(60): d.rectangle((i*4,i*4,1080-i*4,1920-i*4),outline=int(150*(1-i/60)))
    v=v.filter(ImageFilter.GaussianBlur(60)); dark=Image.new('RGB',(1080,1920),(0,0,0))
    return Image.composite(dark,im,v)
def fit(d,txt,size,maxw):
    while d.textlength(txt,font=F(size))>maxw: size-=4
    return size
def T(d,xy,txt,size,fill,stroke=10,sc='black',anchor='mm',maxw=1000):
    s=fit(d,txt,size,maxw); d.text(xy,txt,font=F(s),fill=fill,stroke_width=stroke,stroke_fill=sc,anchor=anchor); return s
def rot_text(im,txt,size,fill,center,angle,stroke=12,sc='black',maxw=980):
    lay=Image.new('RGBA',(1400,500),(0,0,0,0)); d=ImageDraw.Draw(lay); T(d,(700,250),txt,size,fill,stroke,sc,maxw=maxw)
    lay=lay.rotate(angle,resample=Image.BICUBIC); im.paste(lay,(center[0]-700,center[1]-250),lay)
def band(im,y,h,col,angle=-4):
    lay=Image.new('RGBA',(1600,h),col); lay=lay.rotate(angle,expand=True,resample=Image.BICUBIC); im.paste(lay,(540-lay.width//2,y-lay.height//2),lay)
O='/mnt/user-data/outputs/'
# 01 samurai: cajas de nombres + VS
im=base('videoSpup/thumb_31.jpg'); d=ImageDraw.Draw(im)
d.rounded_rectangle((50,120,520,300),30,fill=(200,30,30),outline='black',width=10); d.rounded_rectangle((560,120,1030,300),30,fill=(30,110,230),outline='black',width=10)
T(d,(285,210),'SAMURÁI',130,'white',8,maxw=420); T(d,(795,210),'NINJA',140,'white',8,maxw=420)
rot_text(im,'VS',200,(255,210,40),(540,390),-8,14)
T(d,(540,1700),'¿QUIÉN GANA?',150,(255,210,40),14); im.save(O+'Portada_01_Samurai_vs_Ninja.jpg',quality=93)
# 02 vikingo: pregunta inclinada
im=base('videoSvik/thumb_16.6.jpg'); rot_text(im,'¿LOS VIKINGOS',150,(255,210,40),(540,220),4); rot_text(im,'LLEVABAN CUERNOS?',140,'white',(540,400),4)
d=ImageDraw.Draw(im); d.rounded_rectangle((180,1600,900,1780),30,fill='black'); T(d,(540,1690),'VIKINGO VS CABALLERO',100,'white',0,maxw=680); im.save(O+'Portada_02_Vikingo_vs_Caballero.jpg',quality=93)
# 03 espartano: banda amarilla
im=base('videoSd03/thumb_35.jpg'); band(im,300,260,(255,205,40,255)); d=ImageDraw.Draw(im)
rot_text(im,'ESPARTANO VS GLADIADOR',120,'black',(540,300),4,0)
d=ImageDraw.Draw(im); T(d,(540,1700),'¿QUIÉN GANA EN LA ARENA?',100,'white',12); im.save(O+'Portada_03_Espartano_vs_Gladiador.jpg',quality=93)
# 04 legionario: banner rojo abajo
im=base('videoSd04/thumb_48.75.jpg'); d=ImageDraw.Draw(im); T(d,(540,250),'¡LA ESPADA',170,'white',14); T(d,(540,430),'SALE VOLANDO!',160,(255,210,40),14)
d.rectangle((0,1560,1080,1820),fill=(190,30,30)); d.line((0,1560,1080,1560),fill='black',width=10); d.line((0,1820,1080,1820),fill='black',width=10); T(d,(540,1690),'ROMA VS BÁRBAROS',140,'white',8); im.save(O+'Portada_04_Legionario_vs_Barbaro.jpg',quality=93)
# 05 mongol: franjas de cine
im=base('videoSd05/thumb_44.9.jpg'); d=ImageDraw.Draw(im); d.rectangle((0,0,1080,470),fill='black'); d.rectangle((0,1520,1080,1920),fill='black')
T(d,(540,190),'LA TRAMPA',170,'white',0); T(d,(540,360),'MONGOLA',190,(230,40,40),0); T(d,(540,1720),'MONGOL VS TEMPLARIO',110,(255,210,40),0); im.save(O+'Portada_05_Mongol_vs_Templario.jpg',quality=93)
# 06 pirata: explosión de cómic
im=base('videoSd06/thumb_47.7.jpg').convert('RGBA'); lay=Image.new('RGBA',im.size,(0,0,0,0)); d=ImageDraw.Draw(lay); cx,cy=540,330; pts=[]
for i in range(32): r=300 if i%2==0 else 190; a=i/32*2*math.pi; pts.append((cx+math.cos(a)*r*1.3,cy+math.sin(a)*r*0.8))
d.polygon(pts,fill=(255,210,40),outline='black',width=10); im.alpha_composite(lay); im=im.convert('RGB'); rot_text(im,'¡CLIC!',240,(230,40,40),(540,330),-6,14)
d=ImageDraw.Draw(im); T(d,(540,1620),'PIRATA',150,'white',14); T(d,(540,1780),'VS MOSQUETERO',120,(80,190,255),12); im.save(O+'Portada_06_Pirata_vs_Mosquetero.jpg',quality=93)
# 07 jaguar: texto apilado
im=base('videoSd07/thumb_53.jpg'); d=ImageDraw.Draw(im); T(d,(540,200),'OBSIDIANA',200,'white',16); T(d,(540,350),'VS',120,(255,210,40),12); T(d,(540,500),'ACERO',220,(230,40,40),16)
T(d,(540,1720),'JAGUAR AZTECA VS CONQUISTADOR',90,'white',10); im.save(O+'Portada_07_Jaguar_vs_Conquistador.jpg',quality=93)
# 08 monje: insignia circular
im=base('videoSd08/thumb_51.3.jpg'); d=ImageDraw.Draw(im); d.ellipse((290,90,790,590),fill=(240,140,30),outline='black',width=12)
T(d,(540,250),'BASTÓN',120,'white',10,maxw=420); T(d,(540,350),'VS',80,'black',0); T(d,(540,450),'KATANA',120,'white',10,maxw=420)
T(d,(540,1700),'MONJE SHAOLÍN VS SAMURÁI',100,(255,210,40),12); im.save(O+'Portada_08_Monje_vs_Samurai.jpg',quality=93)
