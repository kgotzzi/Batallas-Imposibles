/* ===== 2D sea / ship art (Mary Celeste) ===== */
function seaSky(c, t, mood = 'gray') {
  const g = c.createLinearGradient(0, -400, 0, 760); const P = { gray: ['#4a5660', '#9aa6ac'], sun: ['#e8b070', '#f6dcaa'], storm: ['#1e262e', '#4a5560'], fog: ['#7c8a90', '#b0bcc0'] }[mood];
  g.addColorStop(0, P[0]); g.addColorStop(1, P[1]); c.fillStyle = g; c.fillRect(-1500, -800, 4000, 1560);
  const R = rng(4); for (let i = 0; i < 14; i++) { const x = ((R() * 2600 + t * (8 + R() * 10)) % 2600) - 800, y = -200 + R() * 760; c.fillStyle = mood === 'sun' ? 'rgba(255,240,220,.35)' : 'rgba(40,50,60,.22)'; c.beginPath(); c.ellipse(x, y, 140 + R() * 160, 30 + R() * 30, 0, 0, 7); c.fill(); }
}
function seaWater(c, t, y0 = 760, mood = 'gray', layers = [0, 1, 2]) {
  const cols = { gray: ['#2a4a58', '#1f3a48', '#14303c'], sun: ['#4a7a8a', '#3a6a7a', '#2a5a6a'], storm: ['#1a2a34', '#13222c', '#0c1820'], fog: ['#5a6e76', '#4a5e66', '#3e5058'] }[mood];
  layers.forEach(i => { const yy = y0 + i * 120; c.fillStyle = cols[i]; c.beginPath(); c.moveTo(-1500, 2400); for (let x = -1500; x <= 2500; x += 30) c.lineTo(x, yy + Math.sin(x * 0.012 + t * (1.4 + i * 0.4) + i) * (14 + i * 6) + Math.sin(x * 0.031 - t * 2 + i) * 6); c.lineTo(2500, 2400); c.closePath(); c.fill(); c.strokeStyle = 'rgba(220,235,240,.25)'; c.lineWidth = 3; c.beginPath(); for (let x = -1500; x <= 2500; x += 30) { const y = yy + Math.sin(x * 0.012 + t * (1.4 + i * 0.4) + i) * (14 + i * 6) + Math.sin(x * 0.031 - t * 2 + i) * 6; x === -1500 ? c.moveTo(x, y) : c.lineTo(x, y); } c.stroke(); });
}
function ship(c, x, y, s, t, o = {}) {
  c.save(); c.translate(x, y + Math.sin(t * 1.3 + (o.ph || 0)) * 8 * s); c.rotate(Math.sin(t * 0.9 + (o.ph || 0)) * 0.03 + (o.tilt || 0)); c.scale(s * (o.dir || 1), s);
  const hull = o.hull || '#3a2418', sail = o.sail || '#e8e0cc', torn = o.torn;
  // masts & rigging
  c.strokeStyle = '#2a1a10'; c.lineWidth = 3; for (const [a, b] of [[[-120, -560], [-330, -80]], [[-120, -560], [90, -80]], [[140, -600], [-60, -80]], [[140, -600], [330, -80]], [[140, -600], [420, -150]]]) { c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke(); }
  c.fillStyle = '#4a3020'; c.fillRect(-128, -580, 16, 500); c.fillRect(132, -620, 16, 540);
  // sails
  const sl = (x0, y0, w, h, k) => { c.fillStyle = sail; c.beginPath(); c.moveTo(x0 - w / 2, y0); c.lineTo(x0 + w / 2, y0); if (torn && k % 2) { c.lineTo(x0 + w / 2 - 10, y0 + h * 0.6); c.lineTo(x0 + w * 0.1, y0 + h * 0.75); c.lineTo(x0 - w * 0.2, y0 + h * 0.45); c.lineTo(x0 - w / 2 + 8, y0 + h * 0.8); } else { c.quadraticCurveTo(x0 + w / 2 + 18, y0 + h / 2, x0 + w / 2 - 6, y0 + h); c.lineTo(x0 - w / 2 + 6, y0 + h); c.quadraticCurveTo(x0 - w / 2 + 18 + Math.sin(t * 2 + k) * 6, y0 + h / 2, x0 - w / 2, y0); } c.closePath(); c.fill(); O(c); c.fillStyle = '#4a3020'; c.fillRect(x0 - w / 2 - 10, y0 - 6, w + 20, 10); };
  [[140, -590, 200, 110], [140, -470, 240, 120], [140, -340, 270, 130]].forEach((a, k) => sl(...a, k));
  c.fillStyle = sail; c.beginPath(); c.moveTo(-120, -540); c.lineTo(-120, -110); c.lineTo(-330, -110); c.quadraticCurveTo(-260, -320, -120, -540); c.fill(); O(c);
  c.beginPath(); c.moveTo(148, -580); c.lineTo(420, -150); c.lineTo(190, -150); c.closePath(); c.fill(); O(c);
  if (o.flag) { c.fillStyle = '#050505'; c.fillRect(148, -650, 70, 46); c.fillStyle = '#fff'; c.beginPath(); c.arc(183, -630, 9, 0, 7); c.fill(); }
  // hull
  c.fillStyle = hull; c.beginPath(); c.moveTo(-380, -110); c.lineTo(400, -110); c.quadraticCurveTo(470, -150, 520, -170); c.lineTo(480, -60); c.quadraticCurveTo(380, 40, 200, 50); c.lineTo(-300, 50); c.quadraticCurveTo(-370, 20, -390, -40); c.closePath(); c.fill(); O(c);
  c.fillStyle = o.stripe || '#d8ccb0'; c.fillRect(-380, -100, 840, 16);
  c.fillStyle = '#3a2618'; rrect(c, -330, -170, 150, 64, 4); c.fill(); O(c);
  c.strokeStyle = '#2a1a10'; c.lineWidth = 4; c.beginPath(); c.moveTo(-380, -140); c.lineTo(440, -140); c.stroke(); for (let i = -360; i < 440; i += 50) { c.beginPath(); c.moveTo(i, -140); c.lineTo(i, -110); c.stroke(); }
  if (o.lifeboat) { c.fillStyle = '#d8ccb0'; c.beginPath(); c.moveTo(-60, -150); c.lineTo(60, -150); c.quadraticCurveTo(50, -116, 0, -114); c.quadraticCurveTo(-50, -116, -60, -150); c.fill(); O(c); }
  if (o.name) { c.save(); c.scale(o.dir || 1, 1); c.restore(); }
  c.restore();
}
function spyMask(c) { c.save(); c.fillStyle = '#000'; c.beginPath(); c.rect(0, 0, W, H); c.arc(W / 2, H * 0.44, 300, 0, Math.PI * 2, true); c.fill('evenodd'); c.strokeStyle = 'rgba(170,140,60,.9)'; c.lineWidth = 16; c.beginPath(); c.arc(W / 2, H * 0.44, 300, 0, 7); c.stroke(); c.restore(); }
function deck(c, t, mood = 'gray') {
  seaSky(c, t, mood); seaWater(c, t, 700, mood, [0]);
  c.fillStyle = '#8a6a48'; c.fillRect(-500, 820, 1800, 800); for (let i = 0; i < 14; i++) { c.strokeStyle = 'rgba(40,25,15,.35)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-500, 860 + i * 40); c.lineTo(1300, 860 + i * 40); c.stroke(); }
  c.fillStyle = '#5a3a24'; c.fillRect(-500, 760, 1800, 60); O(c); for (let i = -480; i < 1300; i += 90) { c.fillStyle = '#4a3020'; c.fillRect(i, 720, 18, 100); }
  c.fillStyle = '#4a3020'; c.fillRect(560, -200, 30, 1100); c.fillStyle = '#d8ccb0'; c.beginPath(); c.moveTo(590, -100); c.lineTo(900, -60); c.lineTo(900, 600); c.lineTo(590, 640); c.fill(); O(c);
}
function cabin(c, t) { c.fillStyle = '#4a3020'; c.fillRect(-500, -500, 1800, 2400); for (let i = 0; i < 20; i++) { c.strokeStyle = 'rgba(0,0,0,.2)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-500, i * 70); c.lineTo(1300, i * 70); c.stroke(); } c.fillStyle = '#9fb0b8'; c.beginPath(); c.arc(520, 360, 70, 0, 7); c.fill(); O(c); c.fillStyle = '#6a4a30'; c.fillRect(-500, 980, 1800, 600); glowAt(c, 300, 300, 500, '255,180,90', 0.35 + 0.05 * Math.sin(t * 7)); c.fillStyle = '#ffd890'; c.beginPath(); c.arc(300, 300, 16, 0, 7); c.fill(); c.strokeStyle = '#2a1a10'; c.lineWidth = 4; c.beginPath(); c.moveTo(300, 120); c.lineTo(300, 284); c.stroke(); }
function table(c) { c.fillStyle = '#7a5030'; rrect(c, 40, 900, 640, 50, 6); c.fill(); O(c); for (const x of [80, 620]) { c.fillRect(x, 950, 30, 260); } }
function slate(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#6a4a2a'; rrect(c, -170, -120, 340, 240, 10); c.fill(); O(c); c.fillStyle = '#2c3432'; c.fillRect(-150, -100, 300, 200); c.fillStyle = 'rgba(235,235,225,.92)'; c.font = '34px "Comic Sans MS", "DejaVu Sans"'; c.fillText('25 NOV 1872', -120, -40); c.font = '22px "Comic Sans MS", "DejaVu Sans"'; c.fillText('8 AM — Isla Santa María', -120, 10); c.fillText('(Azores) · 6 millas', -120, 44); c.restore(); }
function barrels(c, t, vapor = 0) { c.fillStyle = '#2a1a10'; c.fillRect(-500, -500, 1800, 2400); glowAt(c, 360, 300, 700, '255,170,80', 0.3); for (let r = 0; r < 4; r++) for (let i = 0; i < 6; i++) { const x = 60 + i * 120 + (r % 2) * 60, y = 520 + r * 150; c.fillStyle = '#8a5a34'; c.beginPath(); c.ellipse(x, y, 56, 70, 0, 0, 7); c.fill(); O(c); c.strokeStyle = '#3a2618'; c.lineWidth = 6; c.beginPath(); c.ellipse(x, y, 56, 70, 0, -1.2, 1.2); c.stroke(); c.beginPath(); c.ellipse(x, y, 56, 70, 0, Math.PI - 1.2, Math.PI + 1.2); c.stroke(); } if (vapor) for (let i = 0; i < 14; i++) { const ph = (t * 0.3 + i / 14) % 1; glowAt(c, 60 + (i % 7) * 100, 1100 - ph * 800, 70 + ph * 60, '120,255,140', 0.35 * Math.sin(Math.PI * ph) * vapor); } }
function lifeboat(c, x, y, s, t, people = 0) { c.save(); c.translate(x, y + Math.sin(t * 1.6) * 8); c.rotate(Math.sin(t * 1.2) * 0.05); c.scale(s, s); for (let i = 0; i < people; i++) { const R = rng(i + 3); R(); guy(c, { x: -150 + (i % 5) * 75, y: -10 - Math.floor(i / 5) * 30, s: 0.35, dir: 1, t, sit: true, shirt: ['#f0f0f0', '#2a4a7a', '#a83a2a', '#e8e0c8', '#3a5a3a'][i % 5], pants: '#2a2a3a', mouth: 'flat', eyeOpen: 0.9, look: [0.3, 0] }); } c.fillStyle = '#d8ccb0'; c.beginPath(); c.moveTo(-220, -30); c.lineTo(220, -30); c.quadraticCurveTo(200, 50, 0, 56); c.quadraticCurveTo(-200, 50, -220, -30); c.fill(); O(c); c.restore(); }
const BRIGGS = { shirt: '#1a2040', pants: '#1a1a24', cap: '#14183a', beard: true, skin: '#e2b088', hairCol: '#5a3a20' };
const SARAH = { girl: true, hairCol: '#6a3a1a', dress: '#6a2a3a', shirt: '#6a2a3a', pants: '#3a2a2a', skin: '#efc8a6', mustache: false };
const SOPH = { girl: true, hairCol: '#b07a3a', dress: '#a8c8e8', shirt: '#a8c8e8', pants: '#8aa8c8', skin: '#f4d0b0', mustache: false };
const SAILORS = [0, 1, 2, 3, 4, 5, 6].map(i => ({ shirt: ['#f0f0f0', '#2a4a7a', '#a83a2a', '#e8e0c8', '#3a5a3a', '#2a2a3a', '#c89a4a'][i], pants: '#2a2a3a', skin: ['#e8b890', '#c68656', '#f0c8a0', '#d8a47c', '#e0b090', '#b87a50', '#f0c090'][i], beard: i % 3 === 1, mustache: i % 3 === 2, cap: i === 3 ? '#2a2a2a' : null }));
function lineup(c, t, alpha = 1, who = null, ghost = false) { const P = [[BRIGGS, 200, 1060, 1.0], [SARAH, 360, 1070, 0.95], [SOPH, 500, 1080, 0.6]]; SAILORS.forEach((s, i) => P.push([s, 80 + i * 95, 930, 0.62])); P.forEach(([o, x, y, s], i) => { if (who && !who.includes(i)) return; c.save(); c.globalAlpha = alpha; guy(c, { x, y, s, dir: 1, t, ...o, mouth: ghost ? 'flat' : 'flat', eyeOpen: 0.9, look: [0, 0.1] }); c.restore(); }); }
