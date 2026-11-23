import sys,re,json,subprocess
n=sys.argv[1]
words=open(f'txt/{n}.txt').read().split()
mp3=f'proj/s{n}.mp3'
out=subprocess.run(['ffmpeg','-hide_banner','-i',mp3,'-af','silencedetect=noise=-38dB:d=0.16','-f','null','-'],capture_output=True,text=True).stderr
dur=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',mp3],capture_output=True,text=True).stdout)
ss=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',out)]; se=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',out)]
sil=list(zip(ss,se+[dur]*(len(ss)-len(se))))
# speech segments
segs=[];cur=0
for a,b in sil:
    if a-cur>0.05: segs.append([cur,a])
    cur=b
if dur-cur>0.05: segs.append([cur,dur])
# speech-time mapping
S=sum(b-a for a,b in segs)
def s2r(x):
    acc=0
    for a,b in segs:
        if x<=acc+(b-a)+1e-9: return a+(x-acc)
        acc+=b-a
    return segs[-1][1]
NUMW={'300:':11,'9,':5,'1241,':27,'1673,':29,'1553,':30,'1876.':30,'911,':16,'24':12,'1980,':30,'2016':14,'11':6,'1979.':30,'109':20,'1959.':30,'1961.':28,'2021,':16,'1952».':30,'1953':28,'1900.':16,'15':7,'26.':11,'23':11,'1971.':30,'2004.':12,'2014.':30,'239':30,'777':22,'2015,':30,'1587,':30,'1590.':30,'1910.':30,'1948.':30,'2022,':16,'1':4,'1945.':30,'5':5,'25':12}
wgt=[NUMW[w] if w in NUMW else len(re.sub(r'[^\wáéíóúñü]','',w,flags=re.I))+1.2 for w in words]
punct=[bool(re.search(r'[.,…:;?!»]$',w)) for w in words]
# gaps in speech-time coordinates
gaps=[];acc=0
for i,(a,b) in enumerate(segs[:-1]):
    acc+=b-a; gaps.append((acc,segs[i+1][0]-b))
# DP: assign each gap to a punctuation boundary index (monotonic) minimizing proportional mismatch
tot=sum(wgt); cum=[0]
for w in wgt: cum.append(cum[-1]+w)
cands=[i+1 for i in range(len(words)-1) if punct[i]]
import math
G=len(gaps);C=len(cands)
INF=1e18
# allow skipping gaps (cost for skipping depends on gap length) and skipping cands (small cost if comma)
dp=[[INF]*(C+1) for _ in range(G+1)];bk=[[None]*(C+1) for _ in range(G+1)]
dp[0][0]=0
for g in range(G+1):
    for c in range(C+1):
        v=dp[g][c]
        if v>=INF: continue
        if g<G and v+ (3.0 if gaps[g][1]>0.35 else 0.6) < dp[g+1][c]: dp[g+1][c]=v+(3.0 if gaps[g][1]>0.35 else 0.6); bk[g+1][c]=(g,c,'sg')
        if c<C:
            w=words[cands[c]-1]; cost=0.15 if w.endswith(',') else 1.2
            if v+cost<dp[g][c+1]: dp[g][c+1]=v+cost; bk[g][c+1]=(g,c,'sc')
        if g<G and c<C:
            pos=cum[cands[c]]/tot*S; d=abs(pos-gaps[g][0])
            cost=d*d*2
            if v+cost<dp[g+1][c+1]: dp[g+1][c+1]=v+cost; bk[g+1][c+1]=(g,c,'m')
g,c=G,C;anch=[]
while (g,c)!=(0,0):
    pg,pc,k=bk[g][c]
    if k=='m': anch.append((cands[c-1],gaps[g-1][0]))
    g,c=pg,pc
anch=sorted(anch)
pts=[(0,0.0)]+anch+[(len(words),S)]
st=[0]*len(words);en=[0]*len(words)
for (i0,s0),(i1,s1) in zip(pts,pts[1:]):
    W=sum(wgt[i0:i1]) or 1;x=s0
    for i in range(i0,i1):
        d=wgt[i]/W*(s1-s0); st[i]=x; en[i]=x+d; x+=d
res=[]
for i,w in enumerate(words):
    a=s2r(st[i]+0.001); b=s2r(en[i]-0.001)
    res.append([w,round(a,3),round(b,3)])
json.dump(res,open(f'tr/w{n}.json','w'),ensure_ascii=False); json.dump(res,open(f'proj/w{n}.json','w'),ensure_ascii=False)
print(n,'segs',len(segs),'gaps',G,'anchors',len(anch),'cands',C,'dur',round(dur,1),'last',res[-1])
