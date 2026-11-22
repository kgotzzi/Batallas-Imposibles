#!/bin/bash
# usage: finalize.sh N OUTNAME
cd /home/claude/kit
N=$1
PAGE=videoS$N.html OUT=eventsS$N.json node evS.js && python3 sfxS.py $N && \
ffmpeg -v error -y -i proj/s$N.mp3 -i sfxS$N.wav -i musicS$N.wav -filter_complex "[0:a]asplit=2[v1][v2];[2:a]volume=0.55[m];[m][v2]sidechaincompress=threshold=0.04:ratio=8:attack=15:release=350[md];[v1]volume=1.25[v];[v][1:a][md]amix=inputs=3:normalize=0:duration=longest,alimiter=limit=0.95[a]" -map "[a]" -c:a aac -b:a 192k mixS$N.m4a && \
ffmpeg -v error -y -i videoS${N}_only.mp4 -i mixS$N.m4a -map 0:v -map 1:a -c:v copy -c:a copy -shortest -movflags +faststart "$2" && echo FINAL_OK $2
