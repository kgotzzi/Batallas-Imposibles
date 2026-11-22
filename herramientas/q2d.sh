#!/bin/bash
cd /home/claude/kit
ensure() { curl -s -o /dev/null http://localhost:8765/ || { (cd proj && python3 -m http.server 8765 >/dev/null 2>&1 &) ; sleep 2; echo "server started $(date)"; }; }
for n in "$@"; do
  name=$(echo $n | cut -d: -f2); n=$(echo $n | cut -d: -f1)
  rm -rf chunksS$n
  for pass in 1 2 3; do ensure; ( ./runallS.sh $n >> renderS$n.log 2>&1 ) & P=$!; while kill -0 $P 2>/dev/null; do ensure; sleep 10; done; [ -f videoS${n}_only.mp4 ] && [ $(ls chunksS$n/c*.mp4 | wc -l) -eq 8 ] && break; done
  ensure; ./finalize.sh $n $name 2>&1 | tail -1
done
echo Q2D_DONE
