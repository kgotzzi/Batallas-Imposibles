import json, numpy as np, subprocess, wave
SR = 44100
import sys
SN = sys.argv[1]
ev = json.load(open(f'eventsS{SN}.json'))
DUR = ev['dur']
N = int(DUR * SR) + SR
rng = np.random.default_rng(3)
sfx = np.zeros(N); mus = np.zeros(N)

def env(n, a=0.002, d=0.2):
    t = np.arange(n) / SR
    return np.minimum(1, t / a) * np.exp(-t / d)
def lp(x, k):  # simple one-pole lowpass
    y = np.zeros_like(x); acc = 0.0
    a = k
    for i in range(len(x)):
        acc += a * (x[i] - acc); y[i] = acc
    return y
def noise(n): return rng.standard_normal(n)
def add(buf, t, x, g=1.0):
    i = int(t * SR)
    if i < 0: x = x[-i:]; i = 0
    j = min(len(buf), i + len(x)); buf[i:j] += x[:j - i] * g

def bell():
    n = int(2.2 * SR); t = np.arange(n) / SR
    x = sum(a * np.sin(2 * np.pi * f * t) * np.exp(-t / d) for f, a, d in [(1180, 1, .9), (2950, .5, .5), (4200, .3, .3), (650, .4, 1.2)])
    # double strike
    y = x.copy(); k = int(0.18 * SR); y[k:] += x[:-k] * 0.8
    return y * 0.35
def punch(big=False):
    n = int(0.35 * SR); t = np.arange(n) / SR
    f = 120 * np.exp(-t * 9) + 45
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / (0.12 if big else 0.08))
    sn = lp(noise(n), 0.25) * np.exp(-t / 0.03)
    return (body * 1.0 + sn * 0.9) * (0.9 if big else 0.65)
def whoosh():
    n = int(0.25 * SR); t = np.arange(n) / SR
    x = noise(n); y = np.zeros(n); acc = 0
    for i in range(n):
        k = 0.02 + 0.25 * np.sin(np.pi * i / n); acc += k * (x[i] - acc); y[i] = acc
    return y * np.sin(np.pi * t / t[-1]) * 0.35
def pop():
    n = int(0.12 * SR); t = np.arange(n) / SR
    f = 500 + 900 * t / t[-1]
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.002, 0.04) * 0.22
def thud():
    n = int(0.4 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * (70 * np.exp(-t * 5) + 40) * t) * np.exp(-t / 0.12) + lp(noise(n), 0.1) * np.exp(-t / 0.05) * 0.6) * 0.6
def ding():
    n = int(1.2 * SR); t = np.arange(n) / SR
    return sum(np.sin(2 * np.pi * f * t) * np.exp(-t / .5) * a for f, a in [(1568, .5), (2093, .4), (3136, .2)]) * 0.3
def buzz():
    n = int(0.45 * SR); t = np.arange(n) / SR
    return np.sign(np.sin(2 * np.pi * 140 * t)) * 0.18 * np.minimum(1, (t[-1] - t) / 0.05)

def whistle():
    n = int(0.7 * SR); t = np.arange(n) / SR
    f = 2900 + 120 * np.sign(np.sin(2 * np.pi * 28 * t))
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.minimum(1, t / 0.02) * np.minimum(1, (t[-1] - t) / 0.05)
    return x * 0.16
def kick():
    n = int(0.25 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * (180 * np.exp(-t * 30) + 60) * t) * np.exp(-t / 0.05) + lp(noise(n), 0.4) * np.exp(-t / 0.015) * 0.7) * 0.8
def cheer():
    n = int(2.6 * SR); t = np.arange(n) / SR
    x = noise(n); y = lp(x, 0.18) - lp(x, 0.03)
    e = np.minimum(1, t / 0.35) * np.exp(-np.maximum(0, t - 0.6) / 0.9)
    return y * e * 0.9
def crowdyell():
    n = int(1.6 * SR); t = np.arange(n) / SR
    x = noise(n); y = lp(x, 0.12) - lp(x, 0.02)
    am = 1 + 0.3 * np.sin(2 * np.pi * 6 * t)
    return y * am * np.minimum(1, t / 0.15) * np.exp(-np.maximum(0, t - 0.5) / 0.5) * 0.9
def laugh():
    n = int(1.4 * SR); t = np.arange(n) / SR; out = np.zeros(n)
    for k in range(6):
        t0 = k * 0.2; i = int(t0 * SR); m = int(0.13 * SR); tt = np.arange(m) / SR
        f = 230 - k * 8
        syl = (np.sin(2 * np.pi * f * tt) + 0.5 * np.sin(2 * np.pi * 2 * f * tt) + 0.3 * lp(noise(m), 0.3)) * np.sin(np.pi * tt / tt[-1])
        out[i:i + m] += syl[:max(0, min(m, n - i))]
    return out * 0.22
def chest():
    n = int(0.22 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * (90 * np.exp(-t * 12) + 55) * t) * np.exp(-t / 0.07) + lp(noise(n), 0.15) * np.exp(-t / 0.03) * 0.5) * 0.85
def roar():
    n = int(1.6 * SR); t = np.arange(n) / SR
    f = 95 + 25 * np.sin(2 * np.pi * 3 * t)
    tone = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * 0.4 + np.sin(2 * np.pi * np.cumsum(f * 2) / SR) * 0.3
    x = lp(tone + lp(noise(n), 0.2) * 0.8, 0.15) * np.minimum(1, t / 0.12) * np.exp(-np.maximum(0, t - 0.7) / 0.4)
    return x * 0.9
GEN = {'bell': bell, 'punch': punch, 'bigpunch': lambda: punch(True), 'whoosh': whoosh, 'pop': pop, 'thud': thud, 'ding': ding, 'buzz': buzz,
       'whistle': whistle, 'kick': kick, 'cheer': cheer, 'crowdyell': crowdyell, 'laugh': laugh, 'chest': chest, 'roar': roar}

def wind():
    n = int(min(DUR, 70) * SR); t = np.arange(n) / SR
    x = lp(noise(n), 0.02); am = 0.5 + 0.5 * np.sin(2 * np.pi * 0.13 * t) * np.sin(2 * np.pi * 0.07 * t + 1)
    return x / (np.abs(x).max() + 1e-9) * am * 0.12
def creak():
    n = int(1.3 * SR); t = np.arange(n) / SR
    f = 180 + 120 * np.sin(2 * np.pi * 0.7 * t) + 40 * np.sin(2 * np.pi * 9 * t)
    x = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * (0.5 + 0.5 * np.sin(2 * np.pi * 23 * t) > 0.3)
    return lp(x, 0.2) * np.sin(np.pi * t / t[-1]) * 0.18
def knockw():
    n = int(0.35 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * 140 * t) * np.exp(-t / 0.04) + np.sin(2 * np.pi * 320 * t) * np.exp(-t / 0.02) * 0.6 + lp(noise(n), 0.5) * np.exp(-t / 0.008) * 0.8) * 0.95
def sting(big=False):
    n = int((3.0 if big else 2.0) * SR); t = np.arange(n) / SR
    fs = [220, 233, 311, 466] if big else [330, 349, 494]
    x = sum(np.sin(2 * np.pi * f * t + np.sin(2 * np.pi * 6 * t) * 0.3) for f in fs) / len(fs)
    x += lp(noise(n), 0.3) * 0.3 * np.exp(-t / 0.2)
    return x * np.minimum(1, t / 0.01) * np.exp(-t / (1.2 if big else 0.7)) * (0.55 if big else 0.32)
def heart():
    n = int(2.6 * SR); out = np.zeros(n)
    for k in range(3):
        for d, a in [(0, 1), (0.22, 0.7)]:
            i = int((k * 0.85 + d) * SR); m = int(0.18 * SR); tt = np.arange(m) / SR
            out[i:i + m] += np.sin(2 * np.pi * (55 + 30 * np.exp(-tt * 30)) * tt) * np.exp(-tt / 0.06) * a
    return out * 0.7
def step():
    n = int(0.2 * SR); t = np.arange(n) / SR
    return (lp(noise(n), 0.15) * np.exp(-t / 0.03) + np.sin(2 * np.pi * 90 * t) * np.exp(-t / 0.05) * 0.5) * 0.35
def steps():
    n = int(4.5 * SR); out = np.zeros(n)
    for k in range(7):
        s = step(); i = int(k * 0.62 * SR); out[i:i + len(s)] += s
    return out
def click():
    n = int(0.08 * SR); t = np.arange(n) / SR
    return lp(noise(n), 0.6) * np.exp(-t / 0.006) * 0.5
def music_box():
    n = int(5 * SR); out = np.zeros(n); notes = [659, 587, 523, 494, 523, 440, 494, 392]
    for k, f in enumerate(notes):
        i = int(k * 0.55 * SR); m = int(1.2 * SR); tt = np.arange(m) / SR
        tone = (np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(2 * np.pi * 2 * f * tt)) * np.exp(-tt / 0.5)
        j = min(n, i + m); out[i:j] += tone[:j - i]
    return out * 0.12
def door():
    n = int(0.8 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * 60 * t) * np.exp(-t / 0.15) + lp(noise(n), 0.2) * np.exp(-t / 0.05)) * 0.6
def bang():
    n = int(0.5 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * (110 * np.exp(-t * 8) + 50) * t) * np.exp(-t / 0.1) + lp(noise(n), 0.4) * np.exp(-t / 0.04)) * 0.8
def bricks():
    n = int(2.0 * SR); out = np.zeros(n); R = np.random.default_rng(5)
    for k in range(18):
        i = int(R.uniform(0, 1.6) * SR); m = int(0.12 * SR); tt = np.arange(m) / SR
        out[i:i + m] += (lp(noise(m), 0.35) * np.exp(-tt / 0.02) + np.sin(2 * np.pi * R.uniform(200, 500) * tt) * np.exp(-tt / 0.03) * 0.4)[:max(0, min(m, n - i))]
    return out * 0.45
def drone_hit():
    n = int(3 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * 41 * t) + 0.5 * np.sin(2 * np.pi * 61.7 * t)) * np.exp(-t / 1.2) * np.minimum(1, t / 0.02) * 0.6
def static_():
    n = int(0.45 * SR); t = np.arange(n) / SR
    return noise(n) * 0.35 * (0.6 + 0.4 * np.sign(np.sin(2 * np.pi * 23 * t))) * np.exp(-t / 0.3)
GEN['static'] = static_
GEN.update({'wind': wind, 'creak': creak, 'knock': knockw, 'sting': sting, 'bigsting': lambda: sting(True), 'heart': heart, 'step': step, 'steps': steps, 'click': click, 'music_box': music_box, 'door': door, 'bang': bang, 'bricks': bricks, 'drone_hit': drone_hit})
cache = {}

def clang():
    n = int(1.2 * SR); t = np.arange(n) / SR
    x = sum(a * np.sin(2 * np.pi * f * t) * np.exp(-t / d) for f, a, d in [(1870, 1, .35), (2630, .7, .25), (3910, .5, .18), (5200, .3, .1)])
    x += noise(n) * np.exp(-t / 0.01) * 0.8
    return x * 0.45
def slash():
    n = int(0.35 * SR); t = np.arange(n) / SR; x = noise(n); x = x - lp(x, 0.3)
    return x * np.sin(np.pi * np.clip(t / 0.3, 0, 1)) ** 2 * 0.5
def poof():
    n = int(0.9 * SR); t = np.arange(n) / SR; x = lp(noise(n), 0.08)
    return x * np.minimum(1, t / 0.02) * np.exp(-t / 0.3) * 2.2
def impact():
    n = int(1.4 * SR); t = np.arange(n) / SR
    x = np.sin(2 * np.pi * np.cumsum(40 + 120 * np.exp(-t * 18)) / SR) * np.exp(-t / 0.45)
    x += lp(noise(n), 0.15) * np.exp(-t / 0.2) * 1.5
    return x * 0.9
def taiko():
    n = int(0.7 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * np.cumsum(70 + 60 * np.exp(-t * 30)) / SR) * np.exp(-t / 0.22) + lp(noise(n), 0.2) * np.exp(-t / 0.03) * 0.6)
GEN.update({'clang': clang, 'slash': slash, 'poof': poof, 'impact': impact, 'taiko': taiko})
for e in ev['sfx']:
    k = e['type']
    if k not in cache or k in ('whoosh',): cache[k] = GEN[k]()
    add(sfx, e['t'], cache[k])

if ev.get('music') == 'epic':
    tt0 = np.arange(N) / SR; bpm = 116; beat = 60 / bpm; TK = taiko()
    pat = [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1]
    t = 0.0; i = 0
    while t < DUR:
        if pat[i % 16]: add(mus, t, TK, 0.9 if i % 4 == 0 else 0.6)
        t += beat / 2; i += 1
    scale = [146.8, 174.6, 196.0, 220.0, 261.6, 293.7]
    t = 0.0; i = 0; R = np.random.default_rng(7)
    while t < DUR:
        f = scale[int(R.integers(0, 6))]; n = int(1.2 * SR); tk = np.arange(n) / SR
        add(mus, t, (np.sin(2 * np.pi * f * tk) + 0.4 * np.sin(4 * np.pi * f * tk)) * np.exp(-tk / 0.4) * 0.22)
        t += beat * (1 if i % 3 else 2); i += 1
    mus += (np.sin(2 * np.pi * 73.4 * tt0) * 0.18 + np.sin(2 * np.pi * 110 * tt0) * 0.1) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.07 * tt0))
    for a0, a1 in ev.get('quiet', []):
        m = (tt0 >= a0) & (tt0 < a1); mus[m] *= 0.25
    mus *= np.clip(tt0 / 0.3, 0, 1) * np.clip((DUR - tt0) / 1.0, 0, 1)
    def wr(name, x):
        x = np.clip(x, -1, 1); d = (x * 32767).astype(np.int16)
        with wave.open(name, 'w') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(d.tobytes())
    wr(f'sfxS{SN}.wav', sfx * 0.8); wr(f'musicS{SN}.wav', mus / max(1e-9, np.abs(mus).max()) * 0.5); print('ok epic'); raise SystemExit
if ev.get('music') == 'horror':
    tt0 = np.arange(N) / SR
    mus = (np.sin(2 * np.pi * 55 * tt0) * 0.5 + np.sin(2 * np.pi * 58.3 * tt0) * 0.35 + np.sin(2 * np.pi * 82.4 * tt0 + np.sin(2 * np.pi * 0.1 * tt0)) * 0.25) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.05 * tt0))
    mus += lp(noise(N), 0.01) * 3
    mus *= np.clip(tt0 / 1.5, 0, 1)
    def wr(name, x):
        x = np.clip(x, -1, 1); d = (x * 32767).astype(np.int16)
        with wave.open(name, 'w') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(d.tobytes())
    wr(f'sfxS{SN}.wav', sfx * 0.8); wr(f'musicS{SN}.wav', mus / max(1e-9, np.abs(mus).max()) * 0.5); print('ok horror'); raise SystemExit
# music bed: 100 bpm, kick + hat + clap, low bass
bpm = 100; beat = 60 / bpm
def kick():
    n = int(0.3 * SR); t = np.arange(n) / SR
    return np.sin(2 * np.pi * np.cumsum(55 + 90 * np.exp(-t * 25)) / SR) * np.exp(-t / 0.14)
def hat():
    n = int(0.05 * SR); x = noise(n); x = x - lp(x, 0.5); return x * env(n, 0.001, 0.015) * 0.25
def clap():
    n = int(0.2 * SR); x = noise(n); x = x - lp(x, 0.15); return x * env(n, 0.002, 0.06) * 0.35
K, Hh, Cl = kick(), hat(), clap()
bassline = [41.2, 41.2, 49.0, 36.7]
t = 0.0; i = 0
while t < DUR:
    add(mus, t, K, 0.9)
    add(mus, t + beat / 2, Hh); add(mus, t + beat * 0.75, Hh, 0.6)
    if i % 2 == 1: add(mus, t, Cl)
    f = bassline[(i // 4) % 4]; n = int(beat * SR); tt = np.arange(n) / SR
    add(mus, t, np.sin(2 * np.pi * f * tt) * np.exp(-tt / 0.35) * 0.45)
    t += beat; i += 1
# mute music for the final question/CTA tail fade
tt = np.arange(N) / SR
mus *= np.clip((DUR - tt) / 1.0, 0, 1)
mus *= np.clip(tt / 0.6, 0, 1)
# crowd ambience
crowd = lp(noise(N), 0.04); crowd = crowd / np.abs(crowd).max() * 0.05
crowd *= ((tt < ev.get('crowdEnd', DUR))).astype(float)

def wr(name, x):
    x = np.clip(x, -1, 1); d = (x * 32767).astype(np.int16)
    with wave.open(name, 'w') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(d.tobytes())
wr(f'sfxS{SN}.wav', sfx * 0.8)
wr(f'musicS{SN}.wav', mus / max(1e-9, np.abs(mus).max()) * 0.5 + crowd)
print('ok')
