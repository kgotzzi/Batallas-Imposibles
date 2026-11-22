/* ===== 2D · noche gallega · assets ===== */
const WALKER = { shirt: '#5a4a30', armCol: '#5a4a30', pants: '#2a2a30', skin: '#e0b08a', hairCol: '#3a2414', mustache: false };
const LEADER = { shirt: '#3a3228', armCol: '#3a3228', pants: '#2a241e', skin: '#d8c8b8', hairCol: '#2a2420', beard: false, eyeOpen: 0.85, look: [0, 0] };
function fogBand(c, t, y, a = 0.25, sp = 18, seed = 1) { const R = rng(seed); for (let i = 0; i < 9; i++) { const x = ((R() * 1600 + t * sp * (0.6 + R())) % 1700) - 500; c.fillStyle = `rgba(200,212,225,${a * (0.5 + R() * 0.5)})`; c.beginPath(); c.ellipse(x, y + (R() - 0.5) * 60, 260 + R() * 160, 50 + R() * 30, 0, 0, 7); c.fill(); } }
function galRoad(c, t, opt = {}) {
  const scroll = opt.scroll || 0;
  const g = c.createLinearGradient(0, 0, 0, 900); g.addColorStop(0, '#03050c'); g.addColorStop(1, '#141c2e'); c.fillStyle = g; c.fillRect(-800, -800, 2400, 2400);
  for (const [x, y, r] of STARS.slice(0, 50)) { c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(x % 720, y * 0.6, r, r); }
  const mx = opt.moonX ?? 560; glowAt(c, mx, 230, 170, '220,230,255', 0.35); c.fillStyle = '#e8ecf2'; c.beginPath(); c.arc(mx, 230, 52, 0, 7); c.fill(); c.fillStyle = 'rgba(20,28,46,.85)'; c.beginPath(); c.ellipse(mx - 30 + Math.sin(t * 0.3) * 40, 250, 120, 26, 0, 0, 7); c.fill();
  // hills
  c.fillStyle = '#0a1018'; c.beginPath(); c.moveTo(-800, 760); for (let x = -800; x <= 1600; x += 40) c.lineTo(x, 640 + Math.sin((x + scroll * 0.3) * 0.006) * 60); c.lineTo(1600, 1600); c.lineTo(-800, 1600); c.fill();
  // trees
  for (let i = -3; i < 10; i++) { const x = ((i * 190 - scroll * 0.6) % 2280 + 2280) % 2280 - 600; treeG(c, x, 760, 0.9 + (i % 3) * 0.15); }
  if (opt.cruceiro) cruceiro(c, opt.cruceiro, 900);
  // stone walls + road
  c.fillStyle = '#121620'; c.fillRect(-800, 820, 2400, 800);
  c.fillStyle = '#1e2430'; c.beginPath(); c.moveTo(-800, 900); c.lineTo(1600, 900); c.lineTo(1600, 1010); c.lineTo(-800, 1010); c.fill();
  for (let i = -10; i < 30; i++) { const x = ((i * 70 - scroll) % 2100 + 2100) % 2100 - 700; c.fillStyle = '#2a3040'; rrect(c, x, 840, 62, 50, 10); c.fill(); c.strokeStyle = '#0a0c12'; c.lineWidth = 3; c.stroke(); }
  c.fillStyle = '#0c1018'; c.fillRect(-800, 1010, 2400, 600);
  fogBand(c, t, 880, opt.fog ?? 0.22, 22, 3); fogBand(c, t, 980, (opt.fog ?? 0.22) * 0.9, -16, 5);
}
function treeG(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#05080c'; c.fillRect(-10, -160, 20, 160); c.beginPath(); c.arc(0, -200, 80, 0, 7); c.arc(-50, -160, 56, 0, 7); c.arc(50, -160, 56, 0, 7); c.fill(); c.restore(); }
function cruceiro(c, x, y) { c.fillStyle = '#4a5260'; c.fillRect(x - 40, y - 30, 80, 30); c.fillRect(x - 12, y - 230, 24, 200); c.fillRect(x - 50, y - 200, 100, 22); c.strokeStyle = OUT; c.lineWidth = 3; c.strokeRect(x - 12, y - 230, 24, 200); c.strokeRect(x - 50, y - 200, 100, 22); }
function soul(c, x, y, s, t, opt = {}) { c.save(); c.translate(x, y + Math.sin(t * 2 + x * 0.01) * 3); c.scale(s * (opt.dir || 1), s); c.globalAlpha = opt.a ?? 0.85; const col = opt.col || '#cfd4dc';
  const sw = Math.sin(t * 3 + x * 0.02) * 6; c.fillStyle = col; c.beginPath(); c.moveTo(-46, 0); c.quadraticCurveTo(-40 + sw, -120, -34, -200); c.quadraticCurveTo(0, -270, 34, -200); c.quadraticCurveTo(40 - sw, -120, 46, 0); c.quadraticCurveTo(0, 12, -46, 0); c.fill(); c.strokeStyle = 'rgba(20,24,30,.6)'; c.lineWidth = 4; c.stroke();
  c.fillStyle = '#05070a'; c.beginPath(); c.ellipse(6, -205, 20, 28, 0, 0, 7); c.fill();
  c.fillStyle = col; c.beginPath(); c.ellipse(26, -110, 14, 22, 0.4, 0, 7); c.fill(); c.strokeStyle = 'rgba(20,24,30,.6)'; c.stroke();
  if (opt.candle !== false) { c.fillStyle = '#efe6cc'; c.fillRect(30, -150, 8, 36); glowAt(c, 34, -156, 40, '255,220,150', 0.35 + 0.1 * Math.sin(t * 9 + x)); }
  c.restore(); }
function procession(c, t, x0, y, n, s, opt = {}) { for (let i = 0; i < n; i++) { const x = x0 - i * 95 * s / 0.8 + (opt.move ? t * (opt.speed || 30) : 0); soul(c, x, y + (i % 2) * 6, s, t, { a: (opt.a ?? 0.85) * (1 - i / (n * 1.6)) }); } }
function bell(c, x, y, s, t) { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(Math.sin(t * 8) * 0.35); c.fillStyle = '#c9a24a'; c.beginPath(); c.moveTo(-40, 40); c.quadraticCurveTo(-36, -40, 0, -46); c.quadraticCurveTo(36, -40, 40, 40); c.closePath(); c.fill(); O(c); c.fillStyle = '#8a6a2a'; c.beginPath(); c.arc(0, 46, 10, 0, 7); c.fill(); c.restore(); }
function crossObj(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#6a4a2a'; rrect(c, -10, -120, 20, 200, 4); c.fill(); O(c); rrect(c, -55, -80, 110, 20, 4); c.fill(); O(c); c.restore(); }
function cauldron(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#2a2a2e'; c.beginPath(); c.moveTo(-50, -30); c.quadraticCurveTo(-56, 40, 0, 44); c.quadraticCurveTo(56, 40, 50, -30); c.closePath(); c.fill(); O(c); c.fillStyle = '#7ab8d8'; c.beginPath(); c.ellipse(0, -30, 50, 10, 0, 0, 7); c.fill(); O(c); c.strokeStyle = '#3a3a40'; c.lineWidth = 5; c.beginPath(); c.arc(0, -30, 56, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); c.restore(); }
function waxWisps(c, x, y, t, a = 0.5) { for (let i = 0; i < 4; i++) { c.strokeStyle = `rgba(255,236,190,${a * (0.5 + 0.5 * Math.sin(t * 2 + i))})`; c.lineWidth = 4; c.beginPath(); for (let k = 0; k < 14; k++) { const yy = y - k * 18, xx = x + i * 26 - 40 + Math.sin(t * 2.4 + k * 0.6 + i) * 16; k ? c.lineTo(xx, yy) : c.moveTo(xx, yy); } c.stroke(); } }
function village(c, t) { c.fillStyle = '#9cc0d8'; c.fillRect(-800, -800, 2400, 2400); c.fillStyle = '#6a8a4a'; c.fillRect(-800, 820, 2400, 800); for (const [x, w] of [[60, 220], [420, 260]]) { c.fillStyle = '#9a9a92'; c.fillRect(x, 560, w, 260); c.strokeStyle = OUT; c.lineWidth = 5; c.strokeRect(x, 560, w, 260); c.fillStyle = '#8a3a24'; c.beginPath(); c.moveTo(x - 20, 570); c.lineTo(x + w / 2, 460); c.lineTo(x + w + 20, 570); c.closePath(); c.fill(); O(c); c.fillStyle = '#3a2a1a'; c.fillRect(x + w / 2 - 30, 720, 60, 100); }
  c.fillStyle = '#7a6a5a'; c.fillRect(300, 700, 100, 60); c.fillRect(290, 680, 120, 20); c.fillRect(310, 760, 14, 60); c.fillRect(376, 760, 14, 60); }
function bedroom(c, t) { c.fillStyle = '#0c1220'; c.fillRect(-800, -800, 2400, 2400); c.fillStyle = '#1a2236'; rrect(c, 430, 320, 200, 240, 6); c.fill(); O(c); glowAt(c, 530, 440, 220, '180,200,255', 0.25); c.fillStyle = '#141826'; c.fillRect(-800, 1000, 2400, 600); c.fillStyle = '#3a2a20'; rrect(c, 40, 880, 420, 120, 10); c.fill(); O(c); c.fillStyle = '#c8ccd8'; rrect(c, 60, 850, 380, 50, 18); c.fill(); O(c); }
