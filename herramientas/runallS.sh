#!/bin/bash
# usage: runallS.sh N
cd /home/claude/kit
N=$1; D=chunksS$N; mkdir -p $D
F=$(python3 -c "import json;w=json.load(open('tr/w$N.json'));print(int((round(w[-1][2]+1.3,2))*30))")
K=8; S=$(( (F+K-1)/K ))
run(){ i=$1; a=$((i*S)); b=$(( (i+1)*S )); [ $b -gt $F ] && b=$F; [ -f $D/c$i.mp4 ] || PAGE=videoS$N.html node render.js $a $b $D/c$i.mp4; }
for i in 0 2 4 6; do run $i & run $((i+1)); wait; done
ls $D/c*.mp4 | sort -V | sed 's/^/file /' > listS$N.txt
ffmpeg -v error -y -f concat -safe 0 -i listS$N.txt -c copy videoS${N}_only.mp4 && echo ALLDONE $N
