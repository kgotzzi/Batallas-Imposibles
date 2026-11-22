
let WT = [], HL = new Set(), DUR = 10;
const W = 720, H = 1280, cv = document.getElementById('c'), ctx = cv.getContext('2d');
const buf = document.createElement('canvas'); buf.width = W; buf.height = H; const bx = buf.getContext('2d');
const OUT = '#1b1311';
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), lerp = (a, b, u) => a + (b - a) * u;
const ease = u => u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
const prog = (t, a, b) => ease(clamp((t - a) / (b - a)));
function rng(s) { return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
// ---------- drawing helpers
function O(c = ctx) { c.strokeStyle = OUT; c.lineWidth = 5; c.lineJoin = 'round'; c.stroke(); }
function rrect(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
function limb(c, x1, y1, x2, y2, x3, y3, w, col) { c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.lineTo(x3, y3); c.strokeStyle = OUT; c.lineWidth = w + 8; c.stroke(); c.strokeStyle = col; c.lineWidth = w; c.stroke(); }
function glowAt(c, x, y, r, col, a = 1) { const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(0.35, `rgba(${col},${a * 0.45})`); g.addColorStop(1, `rgba(${col},0)`); c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2); }
// ---------- character
function guy(c, o) {
  const s = o.s || 1; c.save(); c.translate(o.x, o.y); c.scale(s * (o.dir || 1), s);
  const sk = o.skin || '#c98b5e', sh = o.shirt || '#e9e2d0', pa = o.pants || '#3a2f28', hat = o.hat;
  const wk = o.walk != null ? o.walk : null, A = wk != null ? (o.amp ?? 1) : 0, sw = wk != null ? Math.sin(wk) : 0, bob = wk != null ? Math.abs(Math.cos(wk)) * 6 * A : 0;
  const sit = o.sit ? 1 : 0, hipY = -82 + (sit ? 38 : 0) - bob, trem = o.shake ? Math.sin(o.t * 70) * 2.2 : 0;
  // legs
  if (sit) { limb(c, -14, hipY, 30, hipY + 4, 28, 0, 22, pa); limb(c, 14, hipY, 52, hipY + 4, 50, 0, 22, pa); for (const fx of [28, 50]) { c.fillStyle = '#2a1d16'; rrect(c, fx - 12, -12, 34, 14, 7); c.fill(); O(c); } }
  else for (const k of [-1, 1]) { const ph = sw * k * 28 * A; const kx = k * 12 + ph * 0.5, ky = hipY + 42; limb(c, k * 12, hipY, kx + 4, ky, k * 12 + ph, -8, 22, pa); c.fillStyle = '#2a1d16'; rrect(c, k * 12 + ph - 13, -14, 34, 15, 7); c.fill(); O(c); }
  if (o.dress) { c.fillStyle = o.dress; c.beginPath(); c.moveTo(-36, hipY - 30); c.lineTo(36, hipY - 30); c.lineTo(58, hipY + 46); c.quadraticCurveTo(0, hipY + 58, -58, hipY + 46); c.closePath(); c.fill(); O(c); }
  // torso
  const ty = hipY - 100 + (o.slump ? 10 : 0);
  c.save(); c.translate(trem, 0); c.rotate(o.lean || 0);
  c.fillStyle = sh; rrect(c, -40, ty, 80, 108, 26); c.fill(); O(c);
  c.save(); rrect(c, -40, ty, 80, 108, 26); c.clip(); c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(8, ty, 40, 110); c.restore();
  if (o.charro) { c.fillStyle = '#e9e9f2'; for (let i = 0; i < 4; i++) for (const k of [-1, 1]) { c.beginPath(); c.arc(k * 18, ty + 24 + i * 20, 5, 0, 7); c.fill(); } c.strokeStyle = '#e9e9f2'; c.lineWidth = 3; c.beginPath(); c.moveTo(-36, ty + 92); c.quadraticCurveTo(0, ty + 104, 36, ty + 92); c.stroke(); }
  if (o.tie) { c.fillStyle = '#f2f0ea'; c.beginPath(); c.moveTo(-18, ty + 4); c.lineTo(18, ty + 4); c.lineTo(0, ty + 40); c.closePath(); c.fill(); c.fillStyle = o.tie; c.beginPath(); c.moveTo(-6, ty + 8); c.lineTo(6, ty + 8); c.lineTo(10, ty + 62); c.lineTo(0, ty + 74); c.lineTo(-10, ty + 62); c.closePath(); c.fill(); O(c); }
  if (o.cross) { c.fillStyle = '#d8262a'; c.fillRect(-26, ty + 30, 16, 6); c.fillRect(-21, ty + 25, 6, 16); }
  if (o.patch) { c.fillStyle = '#c9b48a'; rrect(c, -26, ty + 52, 22, 20, 4); c.fill(); O(c); }
  if (o.scarf) { c.fillStyle = o.scarf; c.beginPath(); c.moveTo(-16, ty + 6); c.lineTo(16, ty + 6); c.lineTo(4, ty + 46); c.lineTo(-6, ty + 46); c.closePath(); c.fill(); O(c); }
  // arms
  const as = sw * 22 * A, aL = o.arms || 'down';
  for (const k of [-1, 1]) { let hx = k * 46 - as * k, hy = ty + 96; if (aL === 'knees') { hx = k * 34 + 30; hy = hipY + 2; } if (aL === 'face' && k === 1) { hx = 18; hy = ty - 40; } if (aL === 'guard') { hx = k * 22 + 26; hy = ty - 10; } if (aL === 'up') { hx = k * 70; hy = ty - 110; } limb(c, k * 32, ty + 18, k * 50 + (aL === 'knees' ? 10 : 0), ty + 58, hx, hy, 18, o.armCol || sh); c.fillStyle = o.gloves || sk; c.beginPath(); c.arc(hx, hy, o.gloves ? 24 : 11, 0, 7); c.fill(); O(c); if (o.gloves) { c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.arc(hx - 7, hy - 8, 7, 0, 7); c.fill(); } }
  // head
  const hx = (o.headX || 0), hy = ty - 64 + (o.slump ? 18 : 0); const R = 66;
  c.save(); c.translate(hx, hy); c.rotate((o.tilt || 0) + trem * 0.004);
  if (o.girl && !o.bun) { c.fillStyle = o.hairCol || '#0b0909'; c.beginPath(); c.moveTo(-74, -10); c.quadraticCurveTo(-90, 120, -60, 170); c.lineTo(60, 170); c.quadraticCurveTo(90, 120, 74, -10); c.arc(0, -6, 74, 0, Math.PI, true); c.fill(); O(c); }
  else for (const k of [-1, 1]) { c.fillStyle = sk; c.beginPath(); c.arc(k * 64, 8, 14, 0, 7); c.fill(); O(c); }
  c.fillStyle = sk; c.beginPath(); c.arc(0, 0, R, 0, 7); c.fill(); O(c);
  c.save(); c.beginPath(); c.arc(0, 0, R, 0, 7); c.clip(); c.fillStyle = 'rgba(0,0,0,.16)'; c.beginPath(); c.arc(26, 10, R, 0, 7); c.fill(); c.restore();
  if (o.shadowFace) { c.save(); c.beginPath(); c.arc(0, 0, R, 0, 7); c.clip(); c.fillStyle = 'rgba(5,5,8,.82)'; c.fillRect(-R, -R, 2 * R, 2 * R); c.restore(); }
  // hair
  c.fillStyle = o.hairCol || '#17110e'; c.beginPath(); c.arc(0, -4, R + 2, Math.PI * 1.02, Math.PI * 1.98); c.quadraticCurveTo(40, -30, 10, -34); c.quadraticCurveTo(-30, -20, -66, -6); c.closePath(); c.fill(); O(c);
  if (o.girl) { c.fillStyle = o.hairCol || '#0b0909'; c.beginPath(); c.moveTo(-66, -10); c.quadraticCurveTo(-20, -60, 40, -52); c.quadraticCurveTo(10, -30, -10, 6); c.quadraticCurveTo(-30, -10, -66, 10); c.fill(); if (o.hairFace) { c.beginPath(); c.moveTo(-50, -40); c.quadraticCurveTo(-10, 10, -30, 90); c.lineTo(10, 90); c.quadraticCurveTo(20, 20, -6, -40); c.fill(); } }
  if (o.cap) { c.fillStyle = o.cap; c.beginPath(); c.arc(0, -10, R + 2, Math.PI * 1.05, Math.PI * 1.95); c.closePath(); c.fill(); O(c); rrect(c, -10, -22, 100, 18, 9); c.fill(); O(c); }
  if (o.beard) { c.fillStyle = o.beardCol || '#5a3a20'; c.beginPath(); c.moveTo(-58, 18); c.quadraticCurveTo(-50, 74, 0, 80); c.quadraticCurveTo(50, 74, 58, 18); c.quadraticCurveTo(30, 44, 0, 46); c.quadraticCurveTo(-30, 44, -58, 18); c.fill(); O(c); }
  if (o.mustache !== false && !o.girl) { c.fillStyle = o.hairCol || '#17110e'; c.beginPath(); c.ellipse(-12, 30, 16, 7, 0.2, 0, 7); c.ellipse(12, 30, 16, 7, -0.2, 0, 7); c.fill(); }
  // eyes
  const op = o.eyeOpen ?? 1, ps = o.pupil ?? 1, lx = (o.look || [0, 0])[0], ly = (o.look || [0, 0])[1];
  for (const k of [-1, 1]) {
    const ex = k * 24 + 4, ey = 0; const er = (o.bigEyes ? 23 : 18);
    if (o.blackEyes) { c.fillStyle = '#050505'; c.beginPath(); c.ellipse(ex, ey, er * 1.05, er * 1.1, 0, 0, 7); c.fill(); c.fillStyle = 'rgba(255,255,255,.85)'; c.beginPath(); c.arc(ex + 4, ey - 5, 2.5, 0, 7); c.fill(); continue; }
    if (o.glowEyes) { glowAt(c, ex, ey + 4, 34, '255,40,20', 1); glowAt(c, ex, ey + 4, 9, '255,230,190', 1); continue; }
    if (op < 0.15) { c.beginPath(); c.moveTo(ex - er, ey); c.quadraticCurveTo(ex, ey + 8, ex + er, ey); c.strokeStyle = OUT; c.lineWidth = 5; c.stroke(); continue; }
    c.fillStyle = '#fbf7ee'; c.beginPath(); c.ellipse(ex, ey, er, er * op, 0, 0, 7); c.fill(); O(c);
    c.save(); c.beginPath(); c.ellipse(ex, ey, er, er * op, 0, 0, 7); c.clip(); c.fillStyle = OUT; c.beginPath(); c.arc(ex + lx * 8, ey + ly * 6, 8 * ps, 0, 7); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(ex + lx * 8 + 3 * ps, ey + ly * 6 - 3 * ps, 2.5 * ps, 0, 7); c.fill(); c.restore();
    if (o.bags) { c.strokeStyle = 'rgba(60,30,30,.5)'; c.lineWidth = 3; c.beginPath(); c.arc(ex, ey + er * 0.7, er * 0.7, 0.3, Math.PI - 0.3); c.stroke(); }
    // brow
    const br = o.brow || 0; c.strokeStyle = OUT; c.lineWidth = 6; c.lineCap = 'round'; c.beginPath(); c.moveTo(ex - 16, ey - er - 10 - (k < 0 ? br * 6 : -br * 2)); c.lineTo(ex + 14, ey - er - 10 - (k < 0 ? -br * 2 : br * 6)); c.stroke();
  }
  // mouth
  const m = o.mouth || 'flat'; c.strokeStyle = OUT; c.lineWidth = 5; c.fillStyle = '#4a1414';
  if (m === 'flat') { c.beginPath(); c.moveTo(-10, 44); c.lineTo(14, 44); c.stroke(); }
  else if (m === 'sad') { c.beginPath(); c.arc(2, 54, 14, Math.PI * 1.15, Math.PI * 1.85); c.stroke(); }
  else if (m === 'O') { c.beginPath(); c.ellipse(2, 46, 10, 15, 0, 0, 7); c.fill(); c.stroke(); }
  else if (m === 'smile') { c.beginPath(); c.arc(2, 34, 18, Math.PI * 0.15, Math.PI * 0.85); c.stroke(); }
  else if (m === 'grin') { c.beginPath(); c.moveTo(-22, 38); c.quadraticCurveTo(2, 64, 26, 38); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#f4f0e4'; c.fillRect(-14, 40, 32, 7); }
  else if (m === 'wave') { c.beginPath(); for (let i = 0; i <= 6; i++) { const x = -16 + i * 6; const y = 44 + (i % 2 ? -4 : 4); i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); }
  if (o.slit) { c.save(); c.globalAlpha = o.slit; c.strokeStyle = '#7a0a0e'; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); c.moveTo(-58, 14); c.quadraticCurveTo(-30, 66, 2, 58); c.quadraticCurveTo(34, 66, 62, 14); c.stroke(); c.strokeStyle = '#2a0204'; c.lineWidth = 2.5; for (let i = -5; i <= 5; i++) { const x = i * 11, y = 58 + Math.abs(i) * -1.2 + (Math.abs(i) > 3 ? -12 : 0); c.beginPath(); c.moveTo(x - 4, y - 7); c.lineTo(x + 4, y + 7); c.stroke(); } c.restore(); }
  if (o.mask) { c.fillStyle = o.mask; c.beginPath(); c.moveTo(-56, 14); c.quadraticCurveTo(2, 4, 60, 14); c.quadraticCurveTo(58, 66, 2, 74); c.quadraticCurveTo(-54, 66, -56, 14); c.closePath(); c.fill(); O(c); c.strokeStyle = 'rgba(0,0,0,.18)'; c.lineWidth = 3; for (const yy of [32, 48]) { c.beginPath(); c.moveTo(-40, yy); c.quadraticCurveTo(2, yy - 6, 44, yy); c.stroke(); } }
  // sweat
  if (o.sweat) { for (const [x, y, sc] of [[56, -30, 1], [62, 6, 0.7]]) { const yy = y + ((o.t * 40 * sc) % 30); c.fillStyle = '#bfe4ff'; c.beginPath(); c.moveTo(x, yy - 12 * sc); c.quadraticCurveTo(x + 8 * sc, yy, x, yy + 6 * sc); c.quadraticCurveTo(x - 8 * sc, yy, x, yy - 12 * sc); c.fill(); O(c); } }
  // sombrero
  if (o.bun) { c.fillStyle = o.hairCol || '#0b0909'; c.beginPath(); c.arc(0, -4, R + 4, Math.PI * 0.95, Math.PI * 2.05); c.quadraticCurveTo(40, -36, 0, -40); c.quadraticCurveTo(-40, -36, -66, 10); c.fill(); O(c); c.beginPath(); c.arc(-52, -40, 26, 0, 7); c.fill(); O(c); }
  if (o.veil) { c.save(); c.globalAlpha = 0.55; c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(-60, -60); c.quadraticCurveTo(0, -96, 60, -60); c.quadraticCurveTo(110, 80, 96, 230); c.lineTo(-96, 230); c.quadraticCurveTo(-110, 80, -60, -60); c.fill(); c.restore(); c.fillStyle = '#f4f0e8'; c.beginPath(); c.ellipse(0, -66, 56, 14, 0, 0, 7); c.fill(); O(c); for (let i = -2; i <= 2; i++) { c.fillStyle = '#fff'; c.beginPath(); c.arc(i * 20, -72, 7, 0, 7); c.fill(); } }
  if (o.headset) { c.strokeStyle = '#1a1a1a'; c.lineWidth = 8; c.beginPath(); c.arc(0, -6, 74, Math.PI * 1.05, Math.PI * 1.95); c.stroke(); for (const k of [-1, 1]) { c.fillStyle = '#2a2a2a'; rrect(c, k * 72 - 14, -12, 28, 40, 10); c.fill(); O(c); } }
  if (o.pilotCap) { c.fillStyle = '#6a4a2a'; c.beginPath(); c.arc(0, -24, R + 2, Math.PI * 0.98, Math.PI * 2.02); c.closePath(); c.fill(); O(c); c.fillStyle = '#9ab8c8'; for (const k of [-1, 1]) { c.beginPath(); c.ellipse(k * 26 + 4, -58, 18, 12, 0, 0, 7); c.fill(); O(c); } }
  if (o.topknot) { c.fillStyle = o.hairCol || '#17110e'; c.beginPath(); c.arc(0, -4, R + 2, Math.PI * 1.02, Math.PI * 1.98); c.closePath(); c.fill(); O(c); c.fillStyle = o.skin || '#c98b5e'; c.beginPath(); c.ellipse(4, -46, 34, 16, 0, Math.PI, 2 * Math.PI); c.fill(); c.fillStyle = o.hairCol || '#17110e'; rrect(c, -8, -88, 28, 22, 8); c.fill(); O(c); }
  if (o.tricorn) { c.fillStyle = '#0c0c0e'; c.beginPath(); c.moveTo(-74, -40); c.quadraticCurveTo(-60, -112, 0, -116); c.quadraticCurveTo(60, -112, 74, -40); c.quadraticCurveTo(84, -20, 60, -30); c.lineTo(-60, -30); c.quadraticCurveTo(-84, -20, -74, -40); c.fill(); O(c); c.fillStyle = 'rgba(255,255,255,.12)'; c.beginPath(); c.ellipse(-20, -86, 22, 10, -0.4, 0, 7); c.fill(); }
  if (o.nurseCap) { c.fillStyle = '#f6f6f2'; c.beginPath(); c.moveTo(-44, -54); c.lineTo(44, -54); c.lineTo(34, -92); c.lineTo(-34, -92); c.closePath(); c.fill(); O(c); c.fillStyle = '#d8262a'; c.fillRect(-6, -84, 12, 26); c.fillRect(-13, -77, 26, 12); }
  if (o.kidCap) { c.fillStyle = o.kidCap; c.beginPath(); c.arc(0, -14, R + 4, Math.PI * 1.02, Math.PI * 1.98); c.closePath(); c.fill(); O(c); c.beginPath(); c.ellipse(0, -16, R + 16, 12, 0, 0, 7); c.fill(); O(c); }
  if (o.grayHair) { c.fillStyle = o.grayHair; c.beginPath(); c.arc(0, -4, R + 4, Math.PI * 0.95, Math.PI * 2.05); c.quadraticCurveTo(70, -40, 0, -46); c.quadraticCurveTo(-70, -40, -66, 10); c.fill(); O(c); c.beginPath(); c.arc(0, -72, 26, 0, 7); c.fill(); O(c); }
  if (hat) { c.fillStyle = hat; c.beginPath(); c.ellipse(0, -46, 118, 22, 0, 0, 7); c.fill(); O(c); rrect(c, -46, -108, 92, 66, 30); c.fill(); O(c); c.fillStyle = '#7a3b1e'; c.fillRect(-46, -62, 92, 12); c.strokeStyle = OUT; c.lineWidth = 4; c.strokeRect(-46, -62, 92, 12); }
  c.restore(); c.restore(); c.restore();
}
// ---------- backgrounds
const STARS = (() => { const R = rng(7), a = []; for (let i = 0; i < 160; i++) a.push([R() * 2200, R() * 700, R() * 1.8 + 0.4, R()]); return a; })();
const CACTI = (() => { const R = rng(11), a = []; for (let i = 0; i < 40; i++) a.push([i * 150 + R() * 90, 0.6 + R() * 0.7, R() < 0.5]); return a; })();
function cactus(c, x, y, s, col) { c.fillStyle = col; rrect(c, x - 14 * s, y - 150 * s, 28 * s, 150 * s, 14 * s); c.fill(); rrect(c, x - 52 * s, y - 100 * s, 22 * s, 56 * s, 11 * s); c.fill(); c.fillRect(x - 46 * s, y - 56 * s, 40 * s, 14 * s); rrect(c, x + 28 * s, y - 120 * s, 22 * s, 50 * s, 11 * s); c.fill(); c.fillRect(x + 6 * s, y - 82 * s, 40 * s, 14 * s); }
function agave(c, x, y, s, col) { c.fillStyle = col; for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.33; c.beginPath(); c.moveTo(x - 8 * s, y); c.lineTo(x + Math.cos(a) * 70 * s, y + Math.sin(a) * 70 * s); c.lineTo(x + 8 * s, y); c.fill(); } }
function nightRoad(c, cam, t) {
  const g = c.createLinearGradient(0, 0, 0, 900); g.addColorStop(0, '#05081a'); g.addColorStop(0.6, '#141c3c'); g.addColorStop(1, '#2a2547'); c.fillStyle = g; c.fillRect(-2000, -500, 6000, 1500);
  for (const [x, y, r, p] of STARS) { const xx = ((x - cam * 0.02) % 2200 + 2200) % 2200 - 400; c.fillStyle = `rgba(255,255,255,${0.35 + 0.5 * Math.abs(Math.sin(t * 1.5 + p * 9))})`; c.fillRect(xx, y, r, r); }
  const mx = 560 - cam * 0.03; glowAt(c, mx, 240, 220, '255,226,190', 0.35); c.fillStyle = '#fff1d6'; c.beginPath(); c.arc(mx, 240, 58, 0, 7); c.fill(); c.fillStyle = 'rgba(200,180,150,.35)'; c.beginPath(); c.arc(mx - 16, 228, 12, 0, 7); c.arc(mx + 18, 254, 8, 0, 7); c.fill();
  c.fillStyle = '#121631'; c.beginPath(); c.moveTo(-1000, 820); for (let x = -1000; x <= 3000; x += 120) c.lineTo(x - cam * 0.12, 700 - 90 * Math.abs(Math.sin(x * 0.004)) - 40 * Math.sin(x * 0.013)); c.lineTo(3000, 1000); c.lineTo(-1000, 1000); c.fill();
  c.fillStyle = '#0c0f20'; c.beginPath(); c.moveTo(-1000, 880); for (let x = -1000; x <= 3000; x += 90) c.lineTo(x - cam * 0.3, 800 - 50 * Math.abs(Math.sin(x * 0.007 + 1))); c.lineTo(3000, 1000); c.lineTo(-1000, 1000); c.fill();
  for (const [x, s, ag] of CACTI) { const xx = ((x - cam * 0.6) % 6000 + 6000) % 6000 - 300; if (xx > -200 && xx < 1000) { if (window.NOCACTI) treeG(c, xx, 900, s * 0.7); else (ag ? agave : cactus)(c, xx, 900, s * 0.8, '#090c10'); } }
  const gg = c.createLinearGradient(0, 880, 0, 1300); gg.addColorStop(0, '#1c1a1e'); gg.addColorStop(1, '#0d0b0c'); c.fillStyle = gg; c.fillRect(-2000, 880, 6000, 600);
  c.fillStyle = '#2b2622'; c.fillRect(-2000, 960, 6000, 130); c.fillStyle = 'rgba(255,240,210,.06)'; c.fillRect(-2000, 960, 6000, 6);
  const R = rng(3); for (let i = 0; i < 60; i++) { const x = ((R() * 4000 - cam * 1.0) % 4000 + 4000) % 4000 - 400, y = 970 + R() * 110; c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(x, y, 6 + R() * 10, 3, 0, 0, 7); c.fill(); }
  for (let i = 0; i < 3; i++) { const fy = 860 + i * 60, off = (t * (14 + i * 6)) % 800; const fg = c.createLinearGradient(0, fy - 40, 0, fy + 40); fg.addColorStop(0, 'rgba(120,130,170,0)'); fg.addColorStop(0.5, `rgba(120,130,170,${0.10 + i * 0.03})`); fg.addColorStop(1, 'rgba(120,130,170,0)'); c.fillStyle = fg; c.fillRect(-off - 800, fy - 40, 4000, 80); }
}
function fireEyes(c, x, y, s, a) { if (a <= 0) return; c.globalAlpha = a * 0.55; c.fillStyle = '#05060a'; c.beginPath(); c.ellipse(x - 10 * s, y + 60 * s, 90 * s, 70 * s, 0, 0, 7); c.fill(); c.beginPath(); c.ellipse(x + 10 * s, y + 10 * s, 50 * s, 34 * s, -0.4, 0, 7); c.fill(); c.globalAlpha = 1; for (const k of [-1, 1]) { glowAt(c, x + k * 18 * s, y, 46 * s, '255,90,20', a); glowAt(c, x + k * 18 * s, y, 12 * s, '255,220,120', a); } }
function hutDay(c, cam, t) {
  const g = c.createLinearGradient(0, 0, 0, 900); g.addColorStop(0, '#f2c27a'); g.addColorStop(1, '#f7e0b0'); c.fillStyle = g; c.fillRect(-2000, -500, 6000, 1500);
  glowAt(c, 160 - cam * 0.05, 300, 260, '255,240,200', 0.7); c.fillStyle = '#fff3d0'; c.beginPath(); c.arc(160 - cam * 0.05, 300, 60, 0, 7); c.fill();
  c.fillStyle = '#d9a46a'; c.beginPath(); c.moveTo(-1000, 820); for (let x = -1000; x <= 3000; x += 120) c.lineTo(x - cam * 0.15, 720 - 70 * Math.abs(Math.sin(x * 0.005))); c.lineTo(3000, 1000); c.lineTo(-1000, 1000); c.fill();
  c.fillStyle = '#c88e5a'; c.fillRect(-2000, 880, 6000, 600);
  const hx = 380 - cam * 0.9; c.fillStyle = '#b97f52'; rrect(c, hx - 230, 600, 460, 300, 10); c.fill(); O(c); c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(hx + 60, 602, 168, 296);
  c.fillStyle = '#6a4326'; c.beginPath(); c.moveTo(hx - 270, 610); c.lineTo(hx + 270, 610); c.lineTo(hx + 240, 570); c.lineTo(hx - 240, 570); c.closePath(); c.fill(); O(c);
  for (let i = 0; i < 6; i++) { c.fillStyle = '#5a3820'; c.beginPath(); c.arc(hx - 200 + i * 80, 622, 10, 0, 7); c.fill(); O(c); }
  c.fillStyle = '#2a1a10'; rrect(c, hx - 170, 700, 110, 200, 6); c.fill(); O(c); c.fillStyle = '#3a2416'; rrect(c, hx + 60, 690, 90, 80, 4); c.fill(); O(c); c.strokeStyle = '#6a4326'; c.lineWidth = 6; c.beginPath(); c.moveTo(hx + 105, 690); c.lineTo(hx + 105, 770); c.moveTo(hx + 60, 730); c.lineTo(hx + 150, 730); c.stroke();
  for (const [dx, s] of [[-520, 1.1], [420, 0.9], [700, 1.3]]) cactus(c, hx + dx, 900, s, '#5d7a3e');
  c.fillStyle = '#9a5a30'; c.beginPath(); c.ellipse(hx - 260, 880, 34, 30, 0, 0, 7); c.fill(); O(c);
  const bx0 = hx + 40; c.fillStyle = '#7a5030'; rrect(c, bx0, 840, 200, 18, 4); c.fill(); O(c); for (const lx of [bx0 + 14, bx0 + 170]) { c.fillRect(lx, 856, 14, 44); }
}
// ---------- post fx
function grain(t, a = 0.07) { const R = rng(1 + Math.floor(t * 30)); for (let i = 0; i < 1400; i++) { const v = R() < 0.5 ? 0 : 255; ctx.fillStyle = `rgba(${v},${v},${v},${a * R()})`; ctx.fillRect(R() * W, R() * H, 2, 2); } }
function vignette(a = 0.6, col = '0,0,0') { const g = ctx.createRadialGradient(W / 2, H * 0.45, H * 0.25, W / 2, H * 0.45, H * 0.75); g.addColorStop(0, `rgba(${col},0)`); g.addColorStop(1, `rgba(${col},${a})`); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
function hud(txt, t) { if (window.NOOV) return; ctx.save(); ctx.font = '600 22px "DejaVu Sans Mono"'; const w = ctx.measureText(txt).width + 46; ctx.fillStyle = 'rgba(10,8,8,.72)'; rrect(ctx, 22, 26, w, 40, 8); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 2; ctx.stroke(); if (Math.floor(t * 2) % 2 === 0) { ctx.fillStyle = '#ff3a2a'; ctx.beginPath(); ctx.arc(42, 46, 6, 0, 7); ctx.fill(); } ctx.fillStyle = '#e8e2d6'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillText(txt, 56, 47); ctx.restore(); }
function bigLine(s, y, t, t0, t1, col = '#fff', size = 64) { if (window.NOOV) return; if (t < t0 || t >= t1) return; const a = clamp((t - t0) / 0.15) * clamp((t1 - t) / 0.2); const sc = 1 + 0.15 * (1 - clamp((t - t0) / 0.18)); ctx.save(); ctx.globalAlpha = a; ctx.translate(W / 2, y); ctx.scale(sc, sc); ctx.font = `${size}px Anton`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 12; ctx.strokeStyle = 'rgba(0,0,0,.85)'; ctx.strokeText(s, 0, 0); ctx.fillStyle = col; ctx.fillText(s, 0, 0); ctx.restore(); }
function captions(t) { if (window.NOOV) return;
  let i = WT.findIndex(w => t >= w[1] - 0.05 && t < (WT[WT.indexOf(w) + 1] ? WT[WT.indexOf(w) + 1][1] - 0.05 : w[2] + 0.6)); if (i < 0) return;
  const st = Math.floor(i / 3) * 3, chunk = WT.slice(st, st + 3); ctx.save(); ctx.font = '800 44px Inter'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  const parts = chunk.map(w => w[0]); const tw = parts.reduce((s, p) => s + ctx.measureText(p + ' ').width, 0); let x = W / 2 - tw / 2;
  chunk.forEach((w, k) => { const on = st + k === i, s = w[0] + ' '; const hl = HL.has(w[0].toLowerCase()); ctx.lineWidth = 9; ctx.strokeStyle = 'rgba(0,0,0,.9)'; ctx.strokeText(s, x, 1040); ctx.fillStyle = on ? (hl ? '#ff4a3a' : '#ffd84a') : '#ffffff'; ctx.fillText(s, x, 1040); x += ctx.measureText(s).width; });
  ctx.restore();
}

// ---------- extra engine bits
const wt = (k, after = 0) => { k = k.toLowerCase(); const w = WT.find(x => x[1] >= after - 0.01 && x[0].toLowerCase().replace(/[¿?¡!,.:;…"“”]/g, '').startsWith(k)); return w ? w[1] : after; };
function pill(c, s, x, y, bg, size = 34) { if (window.NOOV) return; c.save(); c.font = `800 ${size}px Inter`; const w = c.measureText(s).width + 40; c.fillStyle = bg; rrect(c, x - w / 2, y - size * 0.8, w, size * 1.6, size * 0.8); c.fill(); c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 3; c.stroke(); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(s, x, y + 2); c.restore(); }
function smallTop(s, t, t0, t1, col = '#fff', y = 175, size = 54) { bigLine(s, y, t, t0, t1, col, size); }
function endCard(t, t0, l1, l2) { if (t < t0) return; const a = clamp((t - t0) / 0.3); ctx.fillStyle = `rgba(0,0,0,${0.55 * a})`; ctx.fillRect(0, 0, W, H); bigLine(l1, 560, t, t0, 999, '#fff', 66); bigLine(l2, 650, t, t0 + 0.15, 999, '#ff3a2a', 96); }
function choiceQ(t, t0, t1, q, opts) { if (t < t0 || t >= t1) return; bigLine(q, 175, t, t0, t1, '#fff', 60); const n = opts.length; opts.forEach((o, i) => { const tt = t0 + 0.3 + i * 0.12; if (t < tt) return; const sc = 1 + 0.2 * (1 - clamp((t - tt) / 0.2)); ctx.save(); if (n > 2) ctx.translate(W / 2 + ((i % 2) - 0.5) * 320, 290 + Math.floor(i / 2) * 80); else ctx.translate(W / 2 + (i - (n - 1) / 2) * 320, 290); ctx.scale(sc, sc); pill(ctx, o[0], 0, 0, o[1], 34); ctx.restore();  }); }
function flash(t, t0, d = 0.25, col = '255,255,255', a = 0.9) { if (t < t0 || t > t0 + d) return; ctx.fillStyle = `rgba(${col},${a * (1 - (t - t0) / d)})`; ctx.fillRect(0, 0, W, H); }
function camApply(c, z, cx, cy, sx = 0, sy = 0) { c.translate(W / 2 + sx, H / 2 + sy); c.scale(z, z); c.translate(-cx, -cy); }
function coin(c, x, y, r, rot) { c.save(); c.translate(x, y); c.scale(Math.abs(Math.cos(rot)) * 0.9 + 0.1, 1); c.fillStyle = '#f4c542'; c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill(); c.strokeStyle = '#8a5a10'; c.lineWidth = 3; c.stroke(); c.fillStyle = '#ffe58a'; c.beginPath(); c.arc(-r * 0.25, -r * 0.25, r * 0.35, 0, 7); c.fill(); c.restore(); }
function coinRain(c, t, t0, t1, n = 28) { if (t < t0 || t > t1) return; const a = clamp((t1 - t) / 0.4); c.save(); c.globalAlpha = a; for (let i = 0; i < n; i++) { const R = rng(i * 13 + 5); const sp = 500 + R() * 400, x = R() * W, y = ((t - t0) * sp + R() * H) % (H + 100) - 50; coin(c, x, y, 16 + R() * 14, t * 6 + i); } c.restore(); }
function flames(c, x, y, w, h, t, a = 1) { c.save(); c.globalAlpha = a; for (let i = 0; i < 26; i++) { const R = rng(i * 7 + 1); const fx = x + (R() - 0.5) * w, ph = (t * (1.2 + R()) + R()) % 1, fy = y - ph * h, fr = (1 - ph) * (26 + R() * 30); const g = c.createRadialGradient(fx, fy, 0, fx, fy, fr * 1.6); g.addColorStop(0, 'rgba(255,240,160,.95)'); g.addColorStop(0.4, 'rgba(255,120,20,.8)'); g.addColorStop(1, 'rgba(160,20,0,0)'); c.fillStyle = g; c.beginPath(); c.arc(fx, fy, fr * 1.6, 0, 7); c.fill(); } c.restore(); }
function hand(c, x, y, s, rot, col, claw) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.fillStyle = col; c.beginPath(); c.moveTo(-120, -30); c.lineTo(0, -38); c.lineTo(0, 38); c.lineTo(-120, 30); c.closePath(); c.fill(); O(c); c.beginPath(); c.ellipse(20, 0, 48, 40, 0, 0, 7); c.fill(); O(c); for (let i = 0; i < 4; i++) { const fy = -27 + i * 18; c.beginPath(); rrect(c, 40, fy - 8, claw ? 70 : 52, 16, 8); c.fill(); O(c); if (claw) { c.fillStyle = '#1a0606'; c.beginPath(); c.moveTo(108, fy - 7); c.lineTo(128, fy); c.lineTo(108, fy + 7); c.fill(); c.fillStyle = col; } } c.beginPath(); rrect(c, 10, -56, 42, 18, 9); c.fill(); O(c); c.restore(); }
