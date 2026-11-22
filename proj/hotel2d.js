/* ===== 2D · HOTEL DE LAS NORMAS · shared assets ===== */
const ME = { shirt: '#6a1f2a', armCol: '#6a1f2a', pants: '#22222c', skin: '#e2b48c', hairCol: '#2a1a12', mustache: false };
const BOSS = { shirt: '#3a3a44', armCol: '#3a3a44', pants: '#22222c', skin: '#d6a27c', hairCol: '#b9b9b9', beard: true, beardCol: '#c9c9c9', bags: true, brow: 0.5 };
const WET = { shirt: '#26343e', armCol: '#26343e', pants: '#1a2228', skin: '#a9b7b9', hairCol: '#11181c', mustache: false, eyeOpen: 0.45, look: [0, 1] };
const SEA = '#0d2a33';
// ---------- small fx
function rain(c, t, a = 0.5, n = 140, ang = 0.18) { const R = rng(11); c.save(); c.strokeStyle = `rgba(190,210,230,${a})`; c.lineWidth = 2; c.beginPath(); for (let i = 0; i < n; i++) { const sp = 1400 + R() * 600, x0 = R() * 1600 - 400, y0 = R() * 1500; const y = (y0 + t * sp) % 1500 - 100, x = x0 + y * ang; c.moveTo(x, y); c.lineTo(x + 14 * ang * 4, y + 34); } c.stroke(); c.restore(); }
function drips(c, x, y, t, w = 60, n = 5, seed = 3) { const R = rng(seed); c.fillStyle = 'rgba(170,205,225,.85)'; for (let i = 0; i < n; i++) { const ox = x + (R() - 0.5) * w, per = 0.6 + R() * 0.6, ph = R(); const u = ((t / per + ph) % 1); const yy = y + u * u * 90; c.globalAlpha = 1 - u; c.beginPath(); c.moveTo(ox, yy - 9); c.quadraticCurveTo(ox + 5, yy, ox, yy + 4); c.quadraticCurveTo(ox - 5, yy, ox, yy - 9); c.fill(); } c.globalAlpha = 1; }
function puddle(c, x, y, rx, a = 1, t = 0) { c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(40,70,85,.75)'; c.beginPath(); c.ellipse(x, y, rx, rx * 0.22, 0, 0, 7); c.fill(); c.strokeStyle = 'rgba(190,225,240,.35)'; c.lineWidth = 2; c.beginPath(); c.ellipse(x - rx * 0.2, y - 2, rx * 0.5, rx * 0.08, 0, Math.PI, 2 * Math.PI); c.stroke(); const u = (t * 0.8) % 1; c.strokeStyle = `rgba(200,230,245,${0.4 * (1 - u)})`; c.beginPath(); c.ellipse(x, y, rx * u, rx * 0.22 * u, 0, 0, 7); c.stroke(); c.restore(); }
function lightning(t, times) { for (const t0 of times) { if (t >= t0 && t < t0 + 0.35) { const u = (t - t0) / 0.35; const a = (u < 0.15 ? 1 : u < 0.3 ? 0.2 : u < 0.45 ? 0.8 : 1 - u) * 0.75; ctx.fillStyle = `rgba(220,230,255,${Math.max(0, a)})`; ctx.fillRect(0, 0, W, H); } } }
function quote(s, y, t, t0, t1, col = '#e8f4ff', size = 46) { if (window.NOOV || t < t0 || t >= t1) return; const a = clamp((t - t0) / 0.2) * clamp((t1 - t) / 0.2); ctx.save(); ctx.globalAlpha = a; ctx.font = `italic 700 ${size}px Inter`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; const lines = s.split('\n'); lines.forEach((l, i) => { const yy = y + i * size * 1.25; ctx.lineWidth = 10; ctx.strokeStyle = 'rgba(0,0,0,.85)'; ctx.strokeText(l, W / 2, yy); ctx.fillStyle = col; ctx.fillText(l, W / 2, yy); }); ctx.restore(); }
function stamp(s, x, y, t, t0, t1, col = '#d4161c', rot = -0.18, size = 86) { if (window.NOOV || t < t0 || t >= t1) return; const u = clamp((t - t0) / 0.18); const sc = 1.8 - 0.8 * ease(u); ctx.save(); ctx.globalAlpha = u * clamp((t1 - t) / 0.2); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.font = `${size}px Anton`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; const w = ctx.measureText(s).width + 40; ctx.strokeStyle = col; ctx.lineWidth = 8; rrect(ctx, -w / 2, -size * 0.65, w, size * 1.3, 12); ctx.stroke(); ctx.fillStyle = col; ctx.fillText(s, 0, 4); ctx.restore(); }
// ---------- exterior
function hotelExt(c, t, opt = {}) {
  const day = opt.day || 0;
  const g = c.createLinearGradient(0, 0, 0, 1000); if (day) { g.addColorStop(0, '#8f979c'); g.addColorStop(1, '#c4c6c2'); } else { g.addColorStop(0, '#04060c'); g.addColorStop(1, '#16202e'); } c.fillStyle = g; c.fillRect(-600, -600, 2000, 1900);
  // clouds
  for (let i = 0; i < 7; i++) { const x = ((i * 260 + t * 14) % 1400) - 300; c.fillStyle = day ? 'rgba(120,128,134,.7)' : 'rgba(30,36,50,.85)'; c.beginPath(); c.ellipse(x, 120 + (i % 3) * 70, 220, 60, 0, 0, 7); c.fill(); }
  // sea (left)
  c.fillStyle = day ? '#5d6f76' : SEA; c.fillRect(-600, 760, 2000, 700);
  for (let i = 0; i < 9; i++) { c.strokeStyle = day ? 'rgba(220,230,232,.4)' : 'rgba(150,190,200,.25)'; c.lineWidth = 3; c.beginPath(); for (let x = -600; x < 1400; x += 20) { const y = 790 + i * 40 + Math.sin(x * 0.02 + t * 2 + i) * 8; x === -600 ? c.moveTo(x, y) : c.lineTo(x, y); } c.stroke(); }
  // cliff
  c.fillStyle = day ? '#4a4a42' : '#0b0d10'; c.beginPath(); c.moveTo(80, 1400); c.lineTo(120, 900); c.lineTo(210, 820); c.lineTo(1300, 800); c.lineTo(1300, 1400); c.fill();
  c.fillStyle = day ? '#5e6a48' : '#121a14'; c.fillRect(200, 800, 1100, 30);
  // building
  const bx0 = 240, by0 = 380, bw = 440, bh = 430;
  c.fillStyle = day ? '#b9b2a0' : '#3a3630'; rrect(c, bx0, by0, bw, bh, 4); c.fill(); O(c);
  c.fillStyle = day ? '#6a3a2a' : '#2a1612'; c.beginPath(); c.moveTo(bx0 - 30, by0 + 10); c.lineTo(bx0 + bw / 2, by0 - 120); c.lineTo(bx0 + bw + 30, by0 + 10); c.closePath(); c.fill(); O(c);
  const R = rng(5);
  for (let f = 0; f < 3; f++) for (let k = 0; k < 4; k++) { const x = bx0 + 40 + k * 100, y = by0 + 40 + f * 115; const lit = !day && (R() > 0.55 || (f === 1 && k === 2)); const red = !day && opt.redWin && f === 1 && k === 2; c.fillStyle = red ? '#ff5a3a' : lit ? '#ffcf7a' : (day ? '#4a5258' : '#141a22'); rrect(c, x, y, 60, 80, 4); c.fill(); O(c); if (lit || red) glowAt(c, x + 30, y + 40, 90, red ? '255,80,50' : '255,200,120', 0.35); c.strokeStyle = OUT; c.lineWidth = 3; c.beginPath(); c.moveTo(x + 30, y); c.lineTo(x + 30, y + 80); c.moveTo(x, y + 40); c.lineTo(x + 60, y + 40); c.stroke(); }
  // door
  c.fillStyle = day ? '#4a2a1a' : '#ffcf7a'; rrect(c, bx0 + bw / 2 - 40, by0 + bh - 110, 80, 110, 4); c.fill(); O(c); if (!day) glowAt(c, bx0 + bw / 2, by0 + bh - 50, 140, '255,200,120', 0.4);
  // sign
  const fl = day ? 0 : (Math.sin(t * 23) * Math.sin(t * 3.7) > 0.5 ? 0.25 : 1);
  c.fillStyle = '#16100c'; rrect(c, bx0 + 60, by0 - 70, bw - 120, 56, 6); c.fill(); O(c);
  c.font = '40px Anton'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = day ? '#6a5a4a' : `rgba(255,${90 + 60 * fl},${60 * fl},${0.35 + 0.65 * fl})`; c.fillText('HOTEL MIRAMAR', bx0 + bw / 2, by0 - 40); if (!day) glowAt(c, bx0 + bw / 2, by0 - 42, 200, '255,90,60', 0.3 * fl);
  // lamp post
  c.fillStyle = '#111'; c.fillRect(640, 640, 10, 180); if (!day) { glowAt(c, 645, 640, 120, '255,220,150', 0.5); }
}
// ---------- lobby (world x -200..1100, floor y 1000)
function lobby(c, t, opt = {}) {
  const flick = opt.flick ?? 1, lit = opt.dark ? 0.35 : 1;
  c.fillStyle = '#1d2a22'; c.fillRect(-700, -600, 2600, 1700);
  for (let x = -700; x < 1900; x += 46) { c.fillStyle = 'rgba(200,180,120,.06)'; c.fillRect(x, -600, 16, 1600); }
  c.fillStyle = '#3a2418'; c.fillRect(-700, 700, 2600, 300); c.strokeStyle = 'rgba(0,0,0,.4)'; c.lineWidth = 3; for (let x = -700; x < 1900; x += 120) { c.strokeRect(x + 10, 720, 100, 260); }
  c.fillStyle = '#4a2c1c'; c.fillRect(-700, 690, 2600, 16);
  // floor checker
  c.fillStyle = '#2a2220'; c.fillRect(-700, 1000, 2600, 600); for (let i = -12; i < 34; i++) for (let j = 0; j < 6; j++) if ((i + j) % 2) { c.fillStyle = '#3e3430'; c.fillRect(i * 60, 1000 + j * 60, 60, 60); }
  // entrance door (left)
  c.fillStyle = '#2a1a10'; rrect(c, -190, 520, 180, 480, 6); c.fill(); O(c); c.fillStyle = opt.doorOpen ? '#0a1018' : '#0f1824'; rrect(c, -170, 545, 140, 430, 4); c.fill(); if (opt.doorOpen) { rain(c, t, 0.4, 30, 0.1); } c.strokeStyle = 'rgba(180,200,220,.3)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-160, 560); c.lineTo(-80, 560); c.stroke(); c.fillStyle = '#c9a24a'; c.beginPath(); c.arc(-40, 780, 9, 0, 7); c.fill();
  // sofa
  c.fillStyle = '#6a1418'; rrect(c, 20, 840, 230, 120, 24); c.fill(); O(c); rrect(c, 10, 900, 250, 70, 20); c.fill(); O(c); for (const x of [30, 230]) { c.fillStyle = '#2a1a10'; c.fillRect(x, 968, 12, 32); }
  // clock on wall
  c.fillStyle = '#d8ccb0'; c.beginPath(); c.arc(130, 460, 54, 0, 7); c.fill(); O(c); const hh = opt.clock ?? (t * 0.02); c.strokeStyle = OUT; c.lineWidth = 6; c.beginPath(); c.moveTo(130, 460); c.lineTo(130 + Math.sin(hh) * 28, 460 - Math.cos(hh) * 28); c.stroke(); c.lineWidth = 4; c.beginPath(); c.moveTo(130, 460); c.lineTo(130 + Math.sin(hh * 12) * 42, 460 - Math.cos(hh * 12) * 42); c.stroke();
  // key board
  keyBoard(c, 330, 380, 1, t, opt);
  // elevator
  elevatorFace(c, 780, 1000, 1, t, opt);
  // stairs (right)
  c.fillStyle = '#4a2c1c'; for (let i = 0; i < 9; i++) { c.fillRect(940 + i * 26, 1000 - i * 48, 300, 48); c.strokeStyle = OUT; c.lineWidth = 3; c.strokeRect(940 + i * 26, 1000 - i * 48, 300, 48); }
  c.strokeStyle = '#2a1a10'; c.lineWidth = 10; c.beginPath(); c.moveTo(930, 900); c.lineTo(1170, 470); c.stroke();
  // ceiling lamps
  for (const x of [130, 480, 820]) { c.fillStyle = '#c9a24a'; c.fillRect(x - 2, -100, 4, 260); c.beginPath(); c.moveTo(x - 40, 190); c.lineTo(x + 40, 190); c.lineTo(x + 20, 160); c.lineTo(x - 20, 160); c.fill(); O(c); glowAt(c, x, 200, 340, '255,210,140', 0.32 * flick * lit); }
  if (opt.puddles) opt.puddles.forEach(([x, y, r, a]) => puddle(c, x, y, r, a, t));
}
function desk(c, opt = {}) { c.save(); c.translate(0, 70); c.fillStyle = '#5a3420'; rrect(c, 270, 880, 380, 300, 6); c.fill(); O(c); c.fillStyle = '#7a4a2c'; c.fillRect(256, 868, 408, 28); c.strokeStyle = OUT; c.lineWidth = 5; c.strokeRect(256, 868, 408, 28); c.strokeStyle = 'rgba(0,0,0,.3)'; c.lineWidth = 3; for (const x of [300, 420, 540]) c.strokeRect(x, 920, 90, 200); c.fillStyle = '#1a3a22'; c.beginPath(); c.moveTo(560, 868); c.lineTo(610, 868); c.lineTo(600, 820); c.lineTo(570, 820); c.fill(); O(c); c.fillStyle = '#c9a24a'; c.fillRect(583, 820, 4, 48); glowAt(c, 585, 860, 160, '255,220,140', 0.35 * (opt.lamp ?? 1)); if (opt.phone) phoneSmall(c, 330, 868, opt.ring); c.fillStyle = '#c9a24a'; c.beginPath(); c.arc(470, 862, 12, Math.PI, 0); c.fill(); O(c);  c.restore(); }
function phoneSmall(c, x, y, ring) { const sh = ring ? Math.sin(Date.now()) : 0; c.save(); c.translate(x, y); c.fillStyle = '#d8ccb0'; rrect(c, -40, -36, 80, 36, 8); c.fill(); O(c); c.fillStyle = '#d8ccb0'; rrect(c, -46, -52, 92, 18, 9); c.fill(); O(c); c.fillStyle = ring ? '#ff3a2a' : '#3a1a14'; c.fillRect(-14, -28, 28, 10); if (ring) glowAt(c, 0, -23, 40, '255,60,40', 0.8); c.restore(); }
function keyBoard(c, x, y, s, t, opt = {}) {
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = '#4a2a18'; rrect(c, 0, 0, 280, 230, 8); c.fill(); O(c); c.fillStyle = '#5e3a22'; rrect(c, 12, 12, 256, 206, 6); c.fill();
  for (let i = 0; i < 20; i++) { const kx = 34 + (i % 5) * 52, ky = 40 + Math.floor(i / 5) * 50, n = i + 1; c.fillStyle = '#e8dcc0'; c.font = '13px Anton'; c.textAlign = 'center'; c.fillText(String(n), kx, ky - 6); c.fillStyle = '#c9a24a'; c.beginPath(); c.arc(kx, ky, 3, 0, 7); c.fill();
    const has = n === 13 ? (opt.key13 ?? true) : true; if (!has) continue; const sw = n === 13 && opt.swing ? Math.sin(t * 6) * 0.5 * Math.exp(-(t - opt.swing) * 0.6) : 0; c.save(); c.translate(kx, ky); c.rotate(sw); c.strokeStyle = '#c9a24a'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 10); c.stroke(); c.fillStyle = n === 13 ? '#b8862a' : '#8a6a3a'; rrect(c, -9, 10, 18, 22, 4); c.fill(); c.strokeStyle = OUT; c.lineWidth = 2; c.stroke(); if (n === 13 && opt.glow13) glowAt(c, 0, 20, 40, '255,200,90', 0.6); c.restore(); }
  c.restore();
}
function elevatorFace(c, x, y, s, t, opt = {}) {
  const op = opt.elevOpen || 0, fl = opt.floor ?? 0;
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = '#6a5030'; rrect(c, -120, -420, 240, 420, 6); c.fill(); O(c);
  c.fillStyle = '#0a0d12'; c.fillRect(-100, -380, 200, 380);
  if (op > 0) { glowAt(c, 0, -190, 260, '150,200,255', 0.55 * op); c.fillStyle = `rgba(150,190,220,${0.25 * op})`; c.fillRect(-100, -380, 200, 380); if (opt.fog) { for (let i = 0; i < 6; i++) { c.fillStyle = `rgba(200,220,235,${0.12 * op})`; c.beginPath(); c.ellipse(Math.sin(t + i) * 40, -40 - i * 18, 140, 30, 0, 0, 7); c.fill(); } } }
  const dw = 100 * (1 - op);
  c.fillStyle = '#a8a090'; c.fillRect(-100, -380, dw, 380); c.fillRect(100 - dw, -380, dw, 380); c.strokeStyle = OUT; c.lineWidth = 4; c.strokeRect(-100, -380, dw, 380); c.strokeRect(100 - dw, -380, dw, 380);
  // dial
  c.fillStyle = '#c9a24a'; c.beginPath(); c.arc(0, -420, 54, Math.PI, 0); c.fill(); O(c); c.fillStyle = '#1a1208'; c.font = '14px Anton'; c.textAlign = 'center'; ['B', '1', '2', '3'].forEach((n, i) => { const a = Math.PI + 0.35 + i * 0.8; c.fillText(n, Math.cos(a) * 38, -420 + Math.sin(a) * 38 + 5); });
  const a = Math.PI + 0.35 + (3 - (3 - fl)) * 0.8; c.strokeStyle = '#7a1010'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, -420); c.lineTo(Math.cos(Math.PI + 0.35 + fl * 0.8) * 32, -420 + Math.sin(Math.PI + 0.35 + fl * 0.8) * 32); c.stroke();
  // call button
  c.fillStyle = '#3a2a18'; rrect(c, 130, -220, 30, 54, 6); c.fill(); O(c); c.fillStyle = opt.callLit ? '#ffcf5a' : '#5a4a30'; c.beginPath(); c.arc(145, -193, 8, 0, 7); c.fill();
  c.restore();
}
// ---------- closeups
function paperClose(c, t, lines, opt = {}) {
  c.fillStyle = '#1a120c'; c.fillRect(0, 0, W, H); c.fillStyle = '#2e2014'; for (let i = 0; i < 8; i++) c.fillRect(0, i * 170, W, 6);
  glowAt(c, 360, 560, 520, '255,210,140', 0.3);
  c.save(); c.translate(360 + (opt.dx || 0), 560); c.rotate(opt.rot ?? -0.03); c.scale(opt.flipX ?? 1, 1);
  c.fillStyle = '#efe4c8'; c.beginPath(); c.moveTo(-290, -380); c.lineTo(290, -372); c.lineTo(296, 380); c.lineTo(-284, 386); c.closePath(); c.fill(); O(c);
  c.strokeStyle = 'rgba(120,90,50,.25)'; c.lineWidth = 2; c.beginPath(); c.moveTo(-290, -2); c.lineTo(296, 4); c.stroke();
  c.fillStyle = 'rgba(160,120,60,.15)'; c.beginPath(); c.arc(200, 280, 50, 0, 7); c.fill();
  c.fillStyle = '#2a1a10'; c.textAlign = 'left'; c.textBaseline = 'top';
  if (opt.title !== false) { c.font = '40px Anton'; c.fillText(opt.title || 'NORMAS · TURNO DE NOCHE', -250, -340); c.fillRect(-250, -290, 500, 4); }
  let y = -260; lines.forEach(([txt, a, hl]) => { if (a <= 0) return; c.font = '700 30px "DejaVu Sans Mono"'; const parts = txt.split('\n'); parts.forEach(p => { const n = Math.floor(p.length * clamp(a)); const s = p.slice(0, n); if (hl) { c.fillStyle = 'rgba(255,60,40,.28)'; c.fillRect(-256, y - 4, c.measureText(s).width + 12, 40); } c.fillStyle = hl ? '#8a0f0f' : '#2a1a10'; c.fillText(s, -250, y); y += 44; a = a; }); y += 24; });
  c.restore();
}
function phoneClose(c, t, ring, disp) {
  c.fillStyle = '#140e0a'; c.fillRect(0, 0, W, H); c.fillStyle = '#5a3420'; c.fillRect(0, 760, W, 600); c.fillStyle = '#7a4a2c'; c.fillRect(0, 740, W, 30); glowAt(c, 520, 560, 500, '255,210,140', 0.25);
  const sh = ring ? Math.sin(t * 60) * 5 : 0, hop = ring ? Math.abs(Math.sin(t * 30)) * 6 : 0;
  c.save(); c.translate(360 + sh, 640 - hop);
  c.fillStyle = '#d8ccb0'; c.beginPath(); c.moveTo(-220, 110); c.lineTo(-170, -60); c.lineTo(170, -60); c.lineTo(220, 110); c.closePath(); c.fill(); O(c);
  c.fillStyle = '#cfc2a4'; rrect(c, -250, -150, 500, 90, 45); c.fill(); O(c); for (const k of [-1, 1]) { c.beginPath(); c.ellipse(k * 200, -110, 60, 50, 0, 0, 7); c.fill(); O(c); }
  c.fillStyle = '#1a0806'; rrect(c, -120, -30, 240, 70, 8); c.fill(); O(c);
  if (disp) { const on = !ring || Math.floor(t * 4) % 2 === 0; c.font = '40px "DejaVu Sans Mono"'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = on ? '#ff3a2a' : '#5a1a10'; c.fillText(disp, 0, 6); if (on) glowAt(c, 0, 5, 160, '255,50,30', 0.5); }
  for (let i = 0; i < 12; i++) { c.fillStyle = '#efe6d2'; rrect(c, -100 + (i % 4) * 54, 56 + Math.floor(i / 4) * 0, 40, 26, 6); }
  c.restore();
  if (ring) { c.strokeStyle = 'rgba(255,220,160,.6)'; c.lineWidth = 5; for (let k = 0; k < 3; k++) { const r = 60 + ((t * 120 + k * 40) % 120); c.globalAlpha = 1 - (r - 60) / 120; for (const s of [-1, 1]) { c.beginPath(); c.arc(360 + s * 270, 520, r * 0.5, s < 0 ? Math.PI * 0.75 : -Math.PI * 0.25, s < 0 ? Math.PI * 1.25 : Math.PI * 0.25); c.stroke(); } } c.globalAlpha = 1; }
}
function corridor(c, t, opt = {}) {
  const vx = 360, vy = 560;
  c.fillStyle = '#1a1612'; c.fillRect(-600, -600, 2000, 2000);
  c.fillStyle = '#2a3a2c'; c.beginPath(); c.moveTo(-200, -200); c.lineTo(vx - 50, vy - 70); c.lineTo(vx - 50, vy + 50); c.lineTo(-200, 1500); c.fill(); c.beginPath(); c.moveTo(920, -200); c.lineTo(vx + 50, vy - 70); c.lineTo(vx + 50, vy + 50); c.lineTo(920, 1500); c.fill();
  c.fillStyle = '#5a1418'; c.beginPath(); c.moveTo(-200, 1500); c.lineTo(vx - 50, vy + 50); c.lineTo(vx + 50, vy + 50); c.lineTo(920, 1500); c.fill();
  c.fillStyle = '#c9a24a'; c.globalAlpha = 0.25; c.beginPath(); c.moveTo(60, 1500); c.lineTo(vx - 15, vy + 50); c.lineTo(vx + 15, vy + 50); c.lineTo(660, 1500); c.fill(); c.globalAlpha = 1;
  c.fillStyle = '#100c0a'; c.fillRect(vx - 50, vy - 70, 100, 120);
  const doors = opt.doors || [[11, 'L', 0.18], [12, 'R', 0.18], [13, 'L', 0.55], [14, 'R', 0.55]];
  for (const [n, side, d] of doors) { const k = side === 'L' ? -1 : 1; const f = (u) => [vx + k * (50 + (560) * u), vy - 70 - 270 * u, vy + 50 + 950 * u]; const [x1, top1, bot1] = f(1 - d), [x2, top2, bot2] = f(1 - d - 0.12); const isWall = opt.wall13 && n === 13;
    c.fillStyle = isWall ? '#2a3a2c' : '#6a4026'; c.beginPath(); c.moveTo(x1, top1 + (bot1 - top1) * 0.12); c.lineTo(x2, top2 + (bot2 - top2) * 0.12); c.lineTo(x2, bot2); c.lineTo(x1, bot1); c.closePath(); c.fill(); if (!isWall) O(c);
    if (isWall) { c.save(); c.clip(); c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 3; for (let yy = top1; yy < bot1; yy += 26) { c.beginPath(); c.moveTo(Math.min(x1, x2), yy); c.lineTo(Math.max(x1, x2), yy); c.stroke(); } c.restore(); continue; }
    const nx = (x1 * 0.6 + x2 * 0.4), ny = top1 + (bot1 - top1) * 0.25; c.font = `${Math.round(46 * (1 - d) + 10)}px Anton`; c.textAlign = 'center'; c.fillStyle = n === 13 ? '#ffd24a' : '#b89a5a'; c.fillText(String(n), nx, ny); if (n === 13 && opt.glint) glowAt(c, nx, ny - 8, 70 * (1 - d) + 20, '255,220,120', 0.6 + 0.3 * Math.sin(t * 5));
    if (n === 13 && opt.water) { c.fillStyle = 'rgba(80,140,170,.6)'; c.beginPath(); c.moveTo(x1, bot1); c.lineTo(x2, bot2); c.lineTo(vx + (x2 - vx) * 0.2, bot2 + 80 * opt.water); c.lineTo(vx, bot1 + 120 * opt.water); c.closePath(); c.fill(); }
  }
  for (const u of [0.25, 0.6]) for (const k of [-1, 1]) { const x = vx + k * (50 + 560 * (1 - u)), y = vy - 70 - 270 * (1 - u) + 200; glowAt(c, x, y, 120 * (1 - u) + 40, '255,200,120', 0.4 * (opt.flick ?? 1)); }
}
function door13(c, t, opt = {}) {
  const op = opt.open || 0;
  c.fillStyle = '#2a3a2c'; c.fillRect(-600, -600, 2000, 2000); for (let x = -600; x < 1400; x += 46) { c.fillStyle = 'rgba(200,180,120,.05)'; c.fillRect(x, -600, 16, 2000); }
  c.fillStyle = '#5a1418'; c.fillRect(-600, 1080, 2000, 600);
  c.fillStyle = '#3a2214'; c.fillRect(170, 250, 380, 840); O(c);
  c.fillStyle = '#05070a'; c.fillRect(190, 270, 340, 810);
  if (op > 0) { glowAt(c, 210, 680, 260, '120,180,220', 0.5 * op); }
  c.save(); c.translate(190, 270); c.scale(1 - op * 0.85, 1); c.fillStyle = '#5a3420'; c.fillRect(0, 0, 340, 810); c.strokeStyle = OUT; c.lineWidth = 5; c.strokeRect(0, 0, 340, 810); c.strokeStyle = 'rgba(0,0,0,.3)'; c.lineWidth = 4; c.strokeRect(40, 60, 260, 300); c.strokeRect(40, 430, 260, 330);
  c.fillStyle = '#c9a24a'; c.beginPath(); c.arc(300, 440, 14, 0, 7); c.fill(); O(c);
  c.font = '90px Anton'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#ffd24a'; c.fillText('13', 170, 200); c.restore();
  if (!op) glowAt(c, 360, 470, 160, '255,220,120', 0.25 + 0.15 * Math.sin(t * 4));
  // light & water under door
  const w = opt.water || 0; if (w > 0) { c.fillStyle = 'rgba(140,200,230,.8)'; c.fillRect(190, 1076, 340, 6); glowAt(c, 360, 1080, 200, '140,200,240', 0.4); c.fillStyle = 'rgba(60,110,135,.7)'; c.beginPath(); c.moveTo(190, 1082); c.lineTo(530, 1082); c.quadraticCurveTo(560 + 200 * w, 1082 + 140 * w, 360, 1082 + 200 * w); c.quadraticCurveTo(160 - 200 * w, 1082 + 140 * w, 190, 1082); c.fill(); for (let i = 0; i < 5; i++) { const u = ((t * 0.6 + i * 0.2) % 1); c.strokeStyle = `rgba(220,240,250,${0.5 * (1 - u)})`; c.lineWidth = 2; c.beginPath(); c.ellipse(360 + (i - 2) * 50, 1090 + u * 160 * w, 30 * u + 10, 6, 0, 0, 7); c.stroke(); } }
}
function bricks(c, t, opt = {}) { c.fillStyle = '#7a3a24'; c.fillRect(-600, -600, 2000, 2000); for (let r = -12; r < 40; r++) for (let k = -6; k < 16; k++) { const x = k * 120 + (r % 2 ? 60 : 0), y = r * 50; const R = rng(r * 31 + k * 7 + 400); c.fillStyle = `rgb(${120 + R() * 40},${50 + R() * 25},${30 + R() * 20})`; c.fillRect(x + 4, y + 4, 112, 42); } c.fillStyle = 'rgba(40,20,14,.35)'; c.fillRect(-600, -600, 2000, 2000); if (opt.stain) { c.fillStyle = 'rgba(30,60,70,.45)'; c.beginPath(); c.moveTo(180, 300); c.quadraticCurveTo(360, 240, 540, 300); c.lineTo(560, 1300); c.lineTo(160, 1300); c.fill(); drips(c, 360, 380, t, 300, 8, 9); } }
function ledger(c, t, opt = {}) {
  c.fillStyle = '#120c08'; c.fillRect(0, 0, W, H); glowAt(c, 360, 600, 560, '255,200,130', 0.3);
  const op = opt.open ?? 1;
  c.save(); c.translate(360, 640); c.rotate(-0.04);
  c.fillStyle = '#3a1a10'; rrect(c, -330, -420, 660, 840, 12); c.fill(); O(c);
  c.fillStyle = '#e6d6b0'; rrect(c, -310, -400, 300 * op + 10, 800, 6); c.fill(); O(c); rrect(c, 10 - (1 - op) * 300, -400, 300, 800, 6); c.fill(); O(c);
  if (op > 0.95) { c.fillStyle = '#3a2a1a'; c.textAlign = 'left'; c.textBaseline = 'top'; c.font = 'italic 700 34px Georgia, serif'; c.fillText(opt.head || 'Noviembre 1961', -290, -370); c.fillRect(-290, -320, 260, 3);
    const names = opt.names || []; c.font = 'italic 24px Georgia, serif'; names.forEach((n, i) => { if (i >= (opt.shown ?? names.length)) return; c.fillStyle = '#3a2a1a'; c.fillText(n, -290 + (i >= 7 ? 320 : 0), -290 + (i % 7) * 52); });
    if (opt.circle13) { const u = clamp(opt.circle13); c.strokeStyle = '#a01010'; c.lineWidth = 6; c.beginPath(); c.ellipse(160, 330, 120, 44, -0.05, 0, Math.PI * 2 * u); c.stroke(); c.fillStyle = '#a01010'; c.font = '700 44px Anton'; c.fillText('HAB. 13', 90, 306); } }
  c.restore();
}
function stormSea(c, t, opt = {}) {
  const g = c.createLinearGradient(0, 0, 0, 800); g.addColorStop(0, '#04060a'); g.addColorStop(1, '#14202a'); c.fillStyle = g; c.fillRect(-600, -600, 2000, 2000);
  const sink = opt.sink || 0, tilt = Math.sin(t * 1.6) * 0.25 + sink * 0.9;
  c.save(); c.translate(360, 700 + sink * 260); c.rotate(tilt);
  c.fillStyle = '#6a1a14'; c.beginPath(); c.moveTo(-170, -10); c.lineTo(170, -10); c.lineTo(130, 70); c.lineTo(-140, 70); c.closePath(); c.fill(); O(c); c.fillStyle = '#e8e2d2'; rrect(c, -60, -90, 110, 80, 4); c.fill(); O(c); c.fillStyle = '#ffcf7a'; c.fillRect(-40, -70, 30, 26); c.fillRect(6, -70, 30, 26); c.fillStyle = '#222'; c.fillRect(70, -190, 8, 180); c.restore();
  for (let i = 0; i < 6; i++) { c.fillStyle = i % 2 ? '#0b2028' : SEA; c.beginPath(); c.moveTo(-200, 1400); for (let x = -200; x <= 920; x += 20) c.lineTo(x, 740 + i * 70 + Math.sin(x * 0.012 + t * (1.4 + i * 0.2) + i) * (40 - i * 4)); c.lineTo(920, 1400); c.fill(); c.strokeStyle = 'rgba(200,230,240,.25)'; c.lineWidth = 3; c.stroke(); }
  rain(c, t, 0.45, 160, 0.3);
}
function sailor(c, x, y, s, a = 1, opt = {}) { c.save(); c.globalAlpha = a; c.translate(x, y); c.scale(s, s); c.fillStyle = opt.col || '#0a1014'; c.beginPath(); c.moveTo(-60, 0); c.lineTo(-50, -210); c.quadraticCurveTo(0, -240, 50, -210); c.lineTo(60, 0); c.closePath(); c.fill(); c.beginPath(); c.arc(0, -260, 46, 0, 7); c.fill(); c.beginPath(); c.ellipse(0, -290, 80, 18, 0, 0, 7); c.fill(); c.beginPath(); c.moveTo(-40, -300); c.quadraticCurveTo(0, -350, 40, -300); c.fill(); if (opt.eyes) { glowAt(c, -16, -262, 16, '210,235,255', opt.eyes); glowAt(c, 16, -262, 16, '210,235,255', opt.eyes); c.fillStyle = `rgba(230,245,255,${opt.eyes})`; c.beginPath(); c.arc(-16, -262, 4, 0, 7); c.arc(16, -262, 4, 0, 7); c.fill(); } c.restore(); }
function voidHall(c, t, opt = {}) {
  c.fillStyle = '#020305'; c.fillRect(-600, -600, 2000, 2000); const vx = 360, vy = 520;
  for (let i = 0; i < 14; i++) { const u = ((i / 14) + (opt.push || 0) * 0.06) % 1; const s = Math.pow(u, 2.2); const hw = 20 + s * 560, top = vy - 30 - s * 520, bot = vy + 20 + s * 900; c.strokeStyle = `rgba(90,130,150,${0.08 + 0.3 * s})`; c.lineWidth = 2 + s * 3; c.strokeRect(vx - hw, top, hw * 2, bot - top); }
  c.fillStyle = 'rgba(30,60,75,.55)'; c.beginPath(); c.moveTo(vx - 20, vy + 20); c.lineTo(vx + 20, vy + 20); c.lineTo(980, 1500); c.lineTo(-260, 1500); c.fill();
  for (let i = 0; i < 6; i++) { const u = ((t * 0.3 + i / 6) % 1); c.strokeStyle = `rgba(160,210,230,${0.25 * (1 - u)})`; c.lineWidth = 2; c.beginPath(); c.ellipse(vx, vy + 60 + u * 700, 30 + u * 400, 6 + u * 40, 0, 0, 7); c.stroke(); }
  const n = opt.figs || 0, d = opt.near || 0; for (let i = 0; i < n; i++) { const row = i < 7 ? 0 : 1, k = row ? i - 7 : i, cnt = row ? 6 : 7; const x = vx + (k - (cnt - 1) / 2) * (46 + d * 60), y = vy + 40 + row * 30 + d * 160, s = 0.32 + d * 0.5 + row * 0.04; sailor(c, x, y, s, 0.95, { eyes: opt.eyes || 0, col: '#05090c' }); }
  glowAt(c, vx, vy, 200, '120,170,200', 0.18);
}
