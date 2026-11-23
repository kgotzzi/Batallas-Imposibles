/* ===== PUPPET VECTORIAL DETALLADO (estilo ficha: cabeza blanca, tinta negra, ropa detallada) ===== */
const INK = '#141414';
function inkPath(c, fill, lw = 6) { if (fill) { c.fillStyle = fill; c.fill(); } c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = lw; c.stroke(); }
function shadeClip(c, pathFn, col = 'rgba(0,0,0,.18)', dx = 14) { c.save(); pathFn(); c.clip(); c.translate(dx, 0); pathFn(); c.restore(); }
function rowsIn(c, pathFn, y0, y1, step, col = 'rgba(0,0,0,.55)', lw = 3, x0 = -400, x1 = 400) { c.save(); pathFn(); c.clip(); c.strokeStyle = col; c.lineWidth = lw; for (let y = y0; y <= y1; y += step) { c.beginPath(); c.moveTo(x0, y); c.lineTo(x1, y); c.stroke(); } c.restore(); }
function lacing(c, pathFn, y0, y1, step, xs, col = '#e8b93a') { c.save(); pathFn(); c.clip(); c.fillStyle = col; for (let y = y0; y <= y1; y += step) for (const x of xs) { c.fillRect(x - 2, y + 3, 4, step - 8); } c.restore(); }
function mitten(c, x, y, s = 1, ang = 0) { c.save(); c.translate(x, y); c.rotate(ang); c.scale(s, s); c.beginPath(); c.ellipse(0, 0, 17, 21, 0, 0, 7); inkPath(c, '#111', 4); c.beginPath(); c.ellipse(-14, -6, 7, 11, -0.6, 0, 7); inkPath(c, '#111', 4); c.restore(); }
function stickLimb(c, pts, w = 9) { c.lineCap = c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = w; c.beginPath(); c.moveTo(...pts[0]); pts.slice(1).forEach(p => c.lineTo(...p)); c.stroke(); }
// ---------- SAMURÁI (vista 3/4 frontal), origen = suelo entre los pies, escala 1 ≈ 900 px de alto
function samuraiPuppet(c, x, y, s, o = {}) { c.save(); c.translate(x, y); c.scale(s, s);
  const e = o.expr || 'angry';
  // sombra suelo
  c.fillStyle = 'rgba(0,0,0,.18)'; c.beginPath(); c.ellipse(0, 0, 150, 22, 0, 0, 7); c.fill();
  // ----- sandalias y tabi
  for (const k of [-1, 1]) { const fx = k * 62; c.beginPath(); c.ellipse(fx + 6 * k, -8, 46, 14, 0, 0, 7); inkPath(c, '#d9b77a', 5); c.beginPath(); c.moveTo(fx - 30, -14); c.quadraticCurveTo(fx - 32, -46, fx - 8, -52); c.lineTo(fx + 18, -50); c.quadraticCurveTo(fx + 42, -40, fx + 40, -14); c.closePath(); inkPath(c, '#f6f3ec', 5); c.beginPath(); c.moveTo(fx + 4, -50); c.lineTo(fx + 8, -16); c.strokeStyle = INK; c.lineWidth = 3; c.stroke(); }
  // ----- hakama (pantalón ancho)
  const hak = () => { c.beginPath(); c.moveTo(-95, -330); c.lineTo(95, -330); c.quadraticCurveTo(120, -200, 112, -60); c.quadraticCurveTo(70, -48, 22, -60); c.lineTo(10, -250); c.lineTo(-10, -250); c.lineTo(-22, -60); c.quadraticCurveTo(-70, -48, -112, -60); c.quadraticCurveTo(-120, -200, -95, -330); c.closePath(); };
  hak(); inkPath(c, '#4a4a4e', 6); shadeClip(c, hak, 0, 0); c.save(); hak(); c.clip(); c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(30, -340, 120, 300); c.restore();
  c.strokeStyle = 'rgba(20,20,20,.7)'; c.lineWidth = 3; for (const [x0, x1] of [[-70, -86], [-40, -48], [45, 52], [78, 92]]) { c.beginPath(); c.moveTo(x0, -300); c.quadraticCurveTo((x0 + x1) / 2 + 6, -180, x1, -70); c.stroke(); }
  // ----- brazo trasero (izquierdo de pantalla)
  stickLimb(c, [[-118, -560], [-150, -430], [-138, -330]]); mitten(c, -138, -318, 1, 0.2);
  // ----- katana en la cintura (vaina)
  c.save(); c.translate(-20, -360); c.rotate(-0.55); c.beginPath(); c.roundRect(-10, -10, 330, 22, 10); inkPath(c, '#1c1c1c', 4); c.fillStyle = '#e8b93a'; for (const xx of [60, 200]) c.fillRect(xx, -10, 8, 22); c.beginPath(); c.roundRect(-140, -9, 130, 20, 8); inkPath(c, '#222', 4); c.strokeStyle = '#ece6d8'; c.lineWidth = 2.5; for (let xx = -134; xx < -16; xx += 14) { c.beginPath(); c.moveTo(xx, -8); c.lineTo(xx + 7, 10); c.moveTo(xx + 7, -8); c.lineTo(xx, 10); c.stroke(); } c.beginPath(); c.ellipse(-6, 1, 7, 18, 0, 0, 7); inkPath(c, '#e8b93a', 3); c.restore();
  // ----- kusazuri (faldón de placas)
  const kus = [[-112, -40], [-40, 30], [32, 104]]; kus.forEach(([a, b]) => { const p = () => { c.beginPath(); c.moveTo(a + 4, -400); c.lineTo(b - 4, -400); c.lineTo(b + 6, -300); c.lineTo(a - 6, -300); c.closePath(); }; p(); inkPath(c, '#c0282a', 5); rowsIn(c, p, -390, -305, 19, 'rgba(25,8,8,.8)', 3); lacing(c, p, -400, -310, 19, [a + (b - a) * 0.3, a + (b - a) * 0.7]); });
  // ----- do (coraza)
  const dou = () => { c.beginPath(); c.moveTo(-108, -610); c.quadraticCurveTo(0, -636, 108, -610); c.lineTo(100, -410); c.quadraticCurveTo(0, -396, -100, -410); c.closePath(); };
  dou(); inkPath(c, '#c0282a', 6); c.save(); dou(); c.clip(); c.fillStyle = '#9a1a1c'; c.fillRect(-120, -640, 240, 70); c.fillStyle = 'rgba(0,0,0,.16)'; c.fillRect(40, -640, 100, 260); c.restore(); rowsIn(c, dou, -560, -420, 22, 'rgba(25,8,8,.85)', 3); lacing(c, dou, -570, -425, 22, [-70, -30, 10, 50, 85]);
  c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.moveTo(-104, -572); c.quadraticCurveTo(0, -590, 104, -572); c.stroke();
  // cordones del pecho
  c.strokeStyle = '#e8b93a'; c.lineWidth = 6; c.beginPath(); c.moveTo(-60, -600); c.lineTo(-40, -560); c.moveTo(60, -600); c.lineTo(40, -560); c.stroke();
  // ----- obi (fajín amarillo) con nudo
  const obi = () => { c.beginPath(); c.moveTo(-104, -430); c.quadraticCurveTo(0, -444, 104, -430); c.lineTo(102, -398); c.quadraticCurveTo(0, -410, -102, -398); c.closePath(); }; obi(); inkPath(c, '#e8b93a', 5); c.save(); obi(); c.clip(); c.fillStyle = 'rgba(150,100,10,.35)'; c.fillRect(30, -450, 90, 60); c.restore();
  c.beginPath(); c.ellipse(-6, -414, 18, 14, 0, 0, 7); inkPath(c, '#e8b93a', 4); for (const k of [-1, 1]) { c.beginPath(); c.moveTo(-6 + k * 6, -402); c.quadraticCurveTo(-6 + k * 20, -370, -6 + k * 14, -340); c.lineTo(-6 + k * 2, -344); c.quadraticCurveTo(-6 + k * 6, -372, -6, -402); inkPath(c, '#e8b93a', 4); }
  // ----- sode (hombreras)
  for (const k of [-1, 1]) { const p = () => { c.beginPath(); c.moveTo(k * 96, -612); c.lineTo(k * 160, -596); c.lineTo(k * 170, -470); c.lineTo(k * 110, -478); c.closePath(); }; p(); inkPath(c, '#c0282a', 5); rowsIn(c, p, -600, -480, 20, 'rgba(25,8,8,.85)', 3); lacing(c, p, -606, -486, 20, [k * 122, k * 146]); }
  // ----- brazo delantero
  stickLimb(c, [[122, -560], [168, -440], [150, -340]]); mitten(c, 150, -326, 1, -0.2);
  // ----- cuello
  stickLimb(c, [[0, -630], [0, -660]], 10);
  // ----- CABEZA
  c.save(); c.translate(0, -760);
  // shikoro (protector de nuca) detrás
  const shk = () => { c.beginPath(); c.moveTo(-120, -40); c.quadraticCurveTo(-150, 40, -130, 90); c.lineTo(130, 90); c.quadraticCurveTo(150, 40, 120, -40); c.closePath(); }; shk(); inkPath(c, '#1b1b1d', 6); rowsIn(c, shk, -20, 80, 22, 'rgba(240,200,80,.55)', 3);
  // cara
  c.beginPath(); c.arc(0, 0, 96, 0, 7); inkPath(c, '#ffffff', 7);
  // ojos y cejas
  for (const k of [-1, 1]) { c.beginPath(); c.ellipse(k * 32, 6, 10, 17, 0, 0, 7); c.fillStyle = INK; c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(k * 32 + 3, 0, 3, 0, 7); c.fill(); }
  c.strokeStyle = INK; c.lineWidth = 7; c.lineCap = 'round'; const br = e === 'angry' ? 1 : e === 'scared' ? -1 : 0.2; for (const k of [-1, 1]) { c.beginPath(); c.moveTo(k * 50, -22 - br * 8); c.lineTo(k * 16, -22 + br * 8); c.stroke(); }
  c.lineWidth = 5; c.beginPath(); if (e === 'angry') { c.moveTo(-18, 54); c.quadraticCurveTo(0, 46, 18, 54); } else if (e === 'happy') { c.moveTo(-26, 44); c.quadraticCurveTo(0, 74, 26, 44); } else { c.moveTo(-14, 52); c.lineTo(14, 52); } c.stroke();
  // kabuto (casco)
  const kab = () => { c.beginPath(); c.moveTo(-104, -14); c.quadraticCurveTo(-110, -118, 0, -124); c.quadraticCurveTo(110, -118, 104, -14); c.quadraticCurveTo(0, -40, -104, -14); c.closePath(); }; kab(); inkPath(c, '#1e1e20', 7); c.save(); kab(); c.clip(); c.strokeStyle = 'rgba(255,255,255,.12)'; c.lineWidth = 3; for (let a = -80; a <= 80; a += 20) { c.beginPath(); c.moveTo(a, -124); c.lineTo(a * 1.2, -10); c.stroke(); } c.fillStyle = 'rgba(255,255,255,.12)'; c.beginPath(); c.ellipse(-40, -80, 26, 12, -0.5, 0, 7); c.fill(); c.restore();
  // visera
  c.beginPath(); c.moveTo(-112, -16); c.quadraticCurveTo(0, -46, 112, -16); c.lineTo(108, -2); c.quadraticCurveTo(0, -30, -108, -2); c.closePath(); inkPath(c, '#2a2a2c', 5);
  // fukigaeshi (alas laterales)
  for (const k of [-1, 1]) { c.beginPath(); c.moveTo(k * 100, -40); c.quadraticCurveTo(k * 150, -60, k * 150, -14); c.quadraticCurveTo(k * 140, 20, k * 108, 16); c.closePath(); inkPath(c, '#1e1e20', 6); c.beginPath(); c.moveTo(k * 112, -30); c.quadraticCurveTo(k * 136, -40, k * 136, -12); c.quadraticCurveTo(k * 128, 6, k * 112, 4); c.closePath(); inkPath(c, '#c0282a', 3); }
  // moño
  c.beginPath(); c.moveTo(-14, -120); c.quadraticCurveTo(-30, -170, 4, -176); c.quadraticCurveTo(30, -168, 14, -120); c.closePath(); inkPath(c, '#111', 5); c.strokeStyle = '#111'; c.lineWidth = 5; for (const a of [-0.6, 0, 0.6]) { c.beginPath(); c.moveTo(0, -172); c.lineTo(Math.sin(a) * 26, -172 - Math.cos(a) * 24); c.stroke(); }
  // maedate (cuernos dorados en media luna)
  c.beginPath(); c.moveTo(0, -112); c.quadraticCurveTo(-70, -120, -96, -210); c.quadraticCurveTo(-60, -150, 0, -136); c.quadraticCurveTo(60, -150, 96, -210); c.quadraticCurveTo(70, -120, 0, -112); c.closePath(); inkPath(c, '#e8b93a', 6); c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-20, -124); c.quadraticCurveTo(-60, -136, -82, -190); c.stroke(); c.beginPath(); c.arc(0, -120, 12, 0, 7); inkPath(c, '#e8b93a', 4);
  c.restore();
  c.restore(); }
/* ===== PUPPET ARTICULADO (usa el esqueleto solve() de stick2d.js) ===== */
function limbQuad(c, a, b, w0, w1, fill, lw = 3.5, foldCol) { const an = Math.atan2(b[1] - a[1], b[0] - a[0]), nx = -Math.sin(an), ny = Math.cos(an); c.beginPath(); c.moveTo(a[0] + nx * w0, a[1] + ny * w0); c.lineTo(b[0] + nx * w1, b[1] + ny * w1); c.quadraticCurveTo(b[0] + Math.cos(an) * w1 * 0.6, b[1] + Math.sin(an) * w1 * 0.6, b[0] - nx * w1, b[1] - ny * w1); c.lineTo(a[0] - nx * w0, a[1] - ny * w0); c.quadraticCurveTo(a[0] - Math.cos(an) * w0 * 0.6, a[1] - Math.sin(an) * w0 * 0.6, a[0] + nx * w0, a[1] + ny * w0); c.closePath(); inkPath(c, fill, lw); if (foldCol) { c.strokeStyle = foldCol; c.lineWidth = 1.6; c.beginPath(); c.moveTo(a[0] + nx * w0 * 0.3, a[1] + ny * w0 * 0.3); c.lineTo(b[0] + nx * w1 * 0.2, b[1] + ny * w1 * 0.2); c.stroke(); } }
function samHeadArt(c, e, dir) { // coordenadas de la ficha (radio 96)
  const shk = () => { c.beginPath(); c.moveTo(-120, -40); c.quadraticCurveTo(-150, 40, -130, 90); c.lineTo(130, 90); c.quadraticCurveTo(150, 40, 120, -40); c.closePath(); }; shk(); inkPath(c, '#1b1b1d', 7); rowsIn(c, shk, -20, 80, 22, 'rgba(240,200,80,.55)', 4);
  c.beginPath(); c.arc(0, 0, 96, 0, 7); inkPath(c, '#ffffff', 8);
  faceArt(c, e, dir, true);
  const kab = () => { c.beginPath(); c.moveTo(-104, -14); c.quadraticCurveTo(-110, -118, 0, -124); c.quadraticCurveTo(110, -118, 104, -14); c.quadraticCurveTo(0, -40, -104, -14); c.closePath(); }; kab(); inkPath(c, '#1e1e20', 8); c.save(); kab(); c.clip(); c.strokeStyle = 'rgba(255,255,255,.13)'; c.lineWidth = 4; for (let a = -80; a <= 80; a += 20) { c.beginPath(); c.moveTo(a + 10 * dir, -124); c.lineTo(a * 1.2, -10); c.stroke(); } c.fillStyle = 'rgba(255,255,255,.14)'; c.beginPath(); c.ellipse(-40 * dir, -80, 26, 12, -0.5 * dir, 0, 7); c.fill(); c.restore();
  c.beginPath(); c.moveTo(-112, -16); c.quadraticCurveTo(0, -46, 112, -16); c.lineTo(108, -2); c.quadraticCurveTo(0, -30, -108, -2); c.closePath(); inkPath(c, '#2a2a2c', 6);
  for (const k of [-1, 1]) { c.beginPath(); c.moveTo(k * 100, -40); c.quadraticCurveTo(k * 150, -60, k * 150, -14); c.quadraticCurveTo(k * 140, 20, k * 108, 16); c.closePath(); inkPath(c, '#1e1e20', 7); c.beginPath(); c.moveTo(k * 112, -30); c.quadraticCurveTo(k * 136, -40, k * 136, -12); c.quadraticCurveTo(k * 128, 6, k * 112, 4); c.closePath(); inkPath(c, '#c0282a', 4); }
  c.beginPath(); c.moveTo(-14, -120); c.quadraticCurveTo(-30, -170, 4, -176); c.quadraticCurveTo(30, -168, 14, -120); c.closePath(); inkPath(c, '#111', 6); c.strokeStyle = '#111'; c.lineWidth = 6; for (const a of [-0.6, 0, 0.6]) { c.beginPath(); c.moveTo(0, -172); c.lineTo(Math.sin(a) * 26, -172 - Math.cos(a) * 24); c.stroke(); }
  c.beginPath(); c.moveTo(0, -112); c.quadraticCurveTo(-70, -120, -96, -210); c.quadraticCurveTo(-60, -150, 0, -136); c.quadraticCurveTo(60, -150, 96, -210); c.quadraticCurveTo(70, -120, 0, -112); c.closePath(); inkPath(c, '#e8b93a', 7); c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 4; c.beginPath(); c.moveTo(-20, -124); c.quadraticCurveTo(-60, -136, -82, -190); c.stroke(); c.beginPath(); c.arc(0, -120, 12, 0, 7); inkPath(c, '#e8b93a', 5); }
function faceArt(c, e, dir, mouth = true) { const fx = 14 * dir; const closed = e === 'sleep', squint = e === 'smirk';
  for (const k of [-1, 1]) { const x = fx + k * 32; if (closed) { c.strokeStyle = INK; c.lineWidth = 7; c.beginPath(); c.arc(x, 4, 13, 0.2, Math.PI - 0.2); c.stroke(); continue; } const big = e === 'scared' ? 1.35 : 1; c.fillStyle = INK; c.beginPath(); c.ellipse(x, 6, 10 * big, (squint ? 9 : 17) * big, 0, 0, 7); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(x + 3, squint ? 3 : 0, 3.5, 0, 7); c.fill(); }
  if (!closed) { c.strokeStyle = INK; c.lineWidth = 8; c.lineCap = 'round'; const br = { angry: 1, scared: -1, tired: -0.7, happy: -0.2, smirk: 0.6 }[e] ?? 0.3; for (const k of [-1, 1]) { const x = fx + k * 32; const b2 = e === 'smirk' && k === -dir ? -0.3 : br; c.beginPath(); c.moveTo(x + k * 18, -24 - b2 * 9); c.lineTo(x - k * 16, -24 + b2 * 9); c.stroke(); } }
  if (!mouth) return; c.strokeStyle = INK; c.lineWidth = 6; c.beginPath();
  if (e === 'angry') { c.moveTo(fx - 18, 56); c.quadraticCurveTo(fx, 46, fx + 18, 56); c.stroke(); }
  else if (e === 'happy') { c.moveTo(fx - 30, 42); c.quadraticCurveTo(fx, 84, fx + 30, 42); c.closePath(); inkPath(c, '#b03030', 6); }
  else if (e === 'scared') { c.ellipse(fx, 56, 12, 16, 0, 0, 7); inkPath(c, '#3a1010', 5); }
  else if (e === 'tired') { c.moveTo(fx - 16, 58); c.quadraticCurveTo(fx, 48, fx + 16, 58); c.stroke(); c.fillStyle = '#7ac8ff'; c.beginPath(); c.ellipse(fx + 70 * dir, -30, 9, 14, 0, 0, 7); c.fill(); c.strokeStyle = INK; c.lineWidth = 3; c.stroke(); }
  else if (e === 'sleep') { c.arc(fx, 52, 8, 0, 7); c.stroke(); }
  else { c.moveTo(fx - 14, 54); c.lineTo(fx + 14, 54); c.stroke(); } }
function ninHeadArt(c, e, dir, t) { // capucha azul marino con franja de cara
  for (const k of [-1]) { c.strokeStyle = '#1f2840'; c.lineWidth = 12; c.lineCap = 'round'; for (let i = 0; i < 2; i++) { c.beginPath(); c.moveTo(-dir * 80, -30 + i * 14); c.quadraticCurveTo(-dir * 130, -40 + i * 20 + Math.sin(t * 8 + i) * 8, -dir * 160, -10 + i * 24 + Math.sin(t * 8 + i) * 12); c.stroke(); } }
  c.beginPath(); c.arc(0, 0, 100, 0, 7); inkPath(c, '#25304d', 8);
  c.save(); c.beginPath(); c.arc(0, 0, 100, 0, 7); c.clip(); c.fillStyle = 'rgba(255,255,255,.08)'; c.beginPath(); c.ellipse(-40 * dir, -50, 40, 22, -0.4, 0, 7); c.fill();
  c.beginPath(); c.roundRect(-110 + 10 * dir, -40, 220, 64, 30); inkPath(c, '#ffffff', 6); c.restore();
  c.save(); c.beginPath(); c.roundRect(-110 + 10 * dir, -40, 220, 64, 30); c.clip(); c.translate(0, -2); faceArt(c, e, dir, false); c.restore();
  c.beginPath(); c.arc(0, 0, 100, 0, 7); c.strokeStyle = INK; c.lineWidth = 8; c.stroke();
  c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-60, 50); c.quadraticCurveTo(0, 62, 60, 50); c.stroke(); }
const PUP = {
  sam: { kind: 'sam', foot: 'sandal', leg: '#4a4a4e', legW: [16, 13, 12], torso: '#c0282a', blade: '#d8f0ff' },
  nin: { kind: 'nin', foot: 'boot', leg: '#25304d', legW: [11, 9, 7], torso: '#25304d', blade: '#9ae8ff', scarf: '#d42a2a' },
};
function puppetFighter(c, key, st, t, groundY, s) { const F = PUP[key]; const P = st.pose, dir = st.dir; const J = solve(P, dir); const lowest = Math.max(J.ff[1], J.fb[1]) + 6; const e = st.expr || 'angry';
  c.save(); c.translate(st.x, groundY - lowest * s - st.air); c.scale(s, s); if (st.rot) { c.translate(0, -40); c.rotate(st.rot * D2R * dir); c.translate(0, 40); }
  const ang = -(P.tor - 180) * D2R * dir;
  const foot = (k, f) => { const an = Math.atan2(f[1] - k[1], f[0] - k[0]); c.save(); c.translate(...f); if (F.foot === 'sandal') { c.beginPath(); c.ellipse(5 * dir, 3, 17, 5, 0, 0, 7); inkPath(c, '#d9b77a', 2.5); c.beginPath(); c.moveTo(-9 * dir, 1); c.quadraticCurveTo(-10 * dir, -11, 0, -13); c.quadraticCurveTo(14 * dir, -11, 17 * dir, 1); c.closePath(); inkPath(c, '#f6f3ec', 2.5); } else { c.beginPath(); c.moveTo(-9 * dir, 3); c.quadraticCurveTo(-9 * dir, -12, 2 * dir, -13); c.quadraticCurveTo(18 * dir, -8, 19 * dir, 3); c.closePath(); inkPath(c, '#151515', 2.5); } c.restore(); };
  const leg = (h, k, f) => { if (F.kind === 'sam') { limbQuad(c, h, k, F.legW[0], F.legW[1], F.leg, 3, 'rgba(0,0,0,.45)'); limbQuad(c, k, f, F.legW[1], F.legW[2], F.leg, 3, 'rgba(0,0,0,.45)'); } else { limbQuad(c, h, k, F.legW[0], F.legW[1], F.leg, 3); limbQuad(c, k, f, F.legW[1], F.legW[2], '#8a8a8a', 3); c.save(); c.strokeStyle = 'rgba(0,0,0,.5)'; c.lineWidth = 1.5; for (let i = 1; i < 6; i++) { const p = mix(k, f, i / 6.5); c.beginPath(); c.moveTo(p[0] - 7, p[1] - 3); c.lineTo(p[0] + 7, p[1] + 3); c.stroke(); } c.restore(); } foot(k, f); };
  const arm = (e1, h, front) => { if (F.kind === 'sam') { stickLimb(c, [J.neck, e1, h], 4.5); const p = () => { let an = Math.atan2(e1[1] - J.neck[1], e1[0] - J.neck[0]); an = an + (Math.PI / 2 - an) * 0.65; c.save(); c.translate(J.neck[0] + (front ? 8 : -8) * dir, J.neck[1] + 4); c.rotate(an); c.beginPath(); c.moveTo(0, -12); c.lineTo(30, -13); c.lineTo(32, 13); c.lineTo(0, 12); c.closePath(); c.restore(); }; p(); inkPath(c, '#c0282a', 3); rowsIn(c, p, -200, 200, 7, 'rgba(25,8,8,.6)', 1.4, -200, 200); } else { limbQuad(c, J.neck, e1, 8, 7, '#25304d', 3); limbQuad(c, e1, h, 7, 6, '#8a8a8a', 3); } mitten(c, h[0], h[1], 0.5, Math.atan2(h[1] - e1[1], h[0] - e1[0]) - Math.PI / 2); };
  // capa trasera
  if (F.scarf && st.weapon !== 'none') {} if (F.scarf) { c.strokeStyle = INK; c.lineWidth = 11; c.lineCap = 'round'; c.beginPath(); c.moveTo(J.neck[0], J.neck[1] + 4); for (let i = 1; i <= 7; i++) c.lineTo(J.neck[0] - i * 15 * dir, J.neck[1] + 4 + Math.sin(t * 9 - i * 0.8) * (4 + i * 2.2) + i * 2); c.stroke(); c.strokeStyle = F.scarf; c.lineWidth = 7; c.stroke(); }
  arm(J.eb, J.hb, false); leg(J.hip, J.kb, J.fb);
  if (st.weapon === 'back') katana(c, [J.neck[0] - 14 * dir, J.neck[1] + 34], 210, { blade: F.blade }, 0.75, dir);
  if (F.kind === 'sam') { c.save(); c.translate(J.hip[0] + 6 * dir, J.hip[1] - 12); c.rotate(ang + 0.5 * dir); c.beginPath(); c.roundRect(-6, -4, 90 * dir, 8, 4); inkPath(c, '#1c1c1c', 2); c.restore(); }
  // torso
  c.save(); c.translate((J.hip[0] + J.neck[0]) / 2, (J.hip[1] + J.neck[1]) / 2); c.rotate(ang);
  if (F.kind === 'sam') { const kus = [[-27, -9], [-9, 9], [9, 27]]; kus.forEach(([a, b]) => { const p = () => { c.beginPath(); c.moveTo(a + 1, 30); c.lineTo(b - 1, 30); c.lineTo(b + 2, 60); c.lineTo(a - 2, 60); c.closePath(); }; p(); inkPath(c, '#c0282a', 2.5); rowsIn(c, p, 36, 58, 6, 'rgba(25,8,8,.7)', 1.3); lacing(c, p, 30, 58, 6, [a + (b - a) * 0.5]); });
    const dou = () => { c.beginPath(); c.moveTo(-28, -40); c.quadraticCurveTo(0, -46, 28, -40); c.lineTo(26, 30); c.quadraticCurveTo(0, 34, -26, 30); c.closePath(); }; dou(); inkPath(c, '#c0282a', 3.5); c.save(); dou(); c.clip(); c.fillStyle = '#9a1a1c'; c.fillRect(-30, -48, 60, 18); c.fillStyle = 'rgba(0,0,0,.16)'; c.fillRect(8 * dir, -48, 30 * dir, 90); c.restore(); rowsIn(c, dou, -26, 20, 6.5, 'rgba(25,8,8,.8)', 1.5); lacing(c, dou, -28, 18, 6.5, [-16, -6, 4, 14]);
    const obi = () => { c.beginPath(); c.moveTo(-27, 20); c.quadraticCurveTo(0, 16, 27, 20); c.lineTo(26, 30); c.quadraticCurveTo(0, 27, -26, 30); c.closePath(); }; obi(); inkPath(c, '#e8b93a', 2.5); c.beginPath(); c.ellipse(-2 * dir, 25, 5, 4, 0, 0, 7); inkPath(c, '#e8b93a', 2); for (const k of [-1, 1]) { c.beginPath(); c.moveTo(-2 * dir + k * 2, 28); c.lineTo(-2 * dir + k * 4, 44); c.lineTo(-2 * dir + k * 1, 44); c.closePath(); inkPath(c, '#e8b93a', 1.8); } }
  else { const jk = () => { c.beginPath(); c.moveTo(-25, -40); c.quadraticCurveTo(0, -45, 25, -40); c.lineTo(23, 34); c.quadraticCurveTo(0, 38, -23, 34); c.closePath(); }; jk(); inkPath(c, '#25304d', 3.5); c.save(); jk(); c.clip(); c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(6 * dir, -50, 30 * dir, 100); c.restore(); c.strokeStyle = 'rgba(0,0,0,.6)'; c.lineWidth = 2; c.beginPath(); c.moveTo(-14, -40); c.lineTo(8, 16); c.moveTo(14, -40); c.lineTo(-2, -4); c.stroke(); c.strokeStyle = '#3a2a1a'; c.lineWidth = 3; c.beginPath(); c.moveTo(-22, -34); c.lineTo(20, 30); c.stroke();
    c.beginPath(); c.moveTo(-24, 18); c.quadraticCurveTo(0, 14, 24, 18); c.lineTo(23, 28); c.quadraticCurveTo(0, 25, -23, 28); c.closePath(); inkPath(c, '#d42a2a', 2.5); c.beginPath(); c.roundRect(10 * dir - 5, 20, 10, 12, 2); inkPath(c, '#5a4030', 1.8);
    c.beginPath(); c.moveTo(-18, -42); c.quadraticCurveTo(0, -30, 18, -42); c.lineTo(16, -34); c.quadraticCurveTo(0, -24, -16, -34); c.closePath(); inkPath(c, '#d42a2a', 2.5); }
  c.restore();
  leg(J.hip, J.kf, J.ff);
  // cabeza
  const hc = [J.neck[0] + Math.sin(P.tor * D2R) * 40 * dir, J.neck[1] + Math.cos(P.tor * D2R) * 40]; c.save(); c.translate(...hc); c.rotate(ang * 0.6); c.scale(0.36, 0.36); if (F.kind === 'sam') samHeadArt(c, e, dir); else ninHeadArt(c, e, dir, t); c.restore();
  arm(J.ef, J.hf, true);
  if (st.weapon === 'katana') { katana(c, J.hf, P.wa, { blade: F.blade }, 0.95, dir); mitten(c, J.hf[0], J.hf[1], 0.5, 0); }
  c.restore(); }
/* ===== VIKINGO Y CABALLERO ===== */
function mailTex(c, pathFn, col = 'rgba(20,20,30,.45)') { c.save(); pathFn(); c.clip(); c.strokeStyle = col; c.lineWidth = 1.3; for (let y = -300; y < 300; y += 5) for (let x = -300 + (y / 5 % 2) * 3; x < 300; x += 6) { c.beginPath(); c.arc(x, y, 2.2, 0.2, Math.PI - 0.2); c.stroke(); } c.restore(); }
function vikHeadArt(c, e, dir) { // pelo + barba pelirroja, casco redondo con nasal (SIN cuernos)
  c.beginPath(); c.moveTo(-dir * 70, -40); c.quadraticCurveTo(-dir * 140, 10, -dir * 110, 110); c.quadraticCurveTo(-dir * 80, 60, -dir * 60, 30); c.closePath(); inkPath(c, '#d9631e', 6);
  c.beginPath(); c.arc(0, 0, 96, 0, 7); inkPath(c, '#ffffff', 8);
  faceArt(c, e, dir, false);
  const fx = 14 * dir; // barba
  const bd = () => { c.beginPath(); c.moveTo(fx - 80, 18); c.quadraticCurveTo(fx - 92, 120, fx - 30, 170); c.lineTo(fx - 12, 215); c.lineTo(fx + 12, 215); c.lineTo(fx + 30, 170); c.quadraticCurveTo(fx + 92, 120, fx + 80, 18); c.quadraticCurveTo(fx + 50, 52, fx + 30, 40); c.quadraticCurveTo(fx, 30, fx - 30, 40); c.quadraticCurveTo(fx - 50, 52, fx - 80, 18); c.closePath(); };
  bd(); inkPath(c, '#e0702a', 7); c.save(); bd(); c.clip(); c.strokeStyle = 'rgba(120,40,0,.55)'; c.lineWidth = 4; for (let x = -80; x <= 80; x += 18) { c.beginPath(); c.moveTo(fx + x, 40); c.quadraticCurveTo(fx + x * 0.7, 110, fx + x * 0.35, 170); c.stroke(); } c.restore();
  for (const y of [178, 196]) { c.beginPath(); c.roundRect(fx - 16, y, 32, 9, 4); inkPath(c, '#c8c8d0', 3); }
  c.beginPath(); c.moveTo(fx - 58, 36); c.quadraticCurveTo(fx - 20, 22, fx, 34); c.quadraticCurveTo(fx + 20, 22, fx + 58, 36); c.quadraticCurveTo(fx + 30, 52, fx, 42); c.quadraticCurveTo(fx - 30, 52, fx - 58, 36); c.closePath(); inkPath(c, '#c95a1c', 5);
  // boca encima de la barba
  c.strokeStyle = INK; c.lineWidth = 6; c.beginPath();
  if (e === 'happy' || e === 'grin') { c.moveTo(fx - 26, 58); c.quadraticCurveTo(fx, 92, fx + 26, 58); c.closePath(); inkPath(c, '#7a1a1a', 5); }
  else if (e === 'scared' || e === 'angry') { c.ellipse(fx, 66, 15, e === 'angry' ? 12 : 17, 0, 0, 7); inkPath(c, '#3a1010', 5); if (e === 'angry') { c.fillStyle = '#fff'; c.fillRect(fx - 11, 57, 22, 5); } }
  else if (e === 'sleep' || e === 'ko') { c.moveTo(fx - 16, 64); c.lineTo(fx + 16, 64); c.stroke(); }
  else { c.moveTo(fx - 16, 64); c.quadraticCurveTo(fx, 56, fx + 16, 64); c.stroke(); }
  // casco
  c.save(); c.translate(0, -28);
  const hm = () => { c.beginPath(); c.moveTo(-104, -6); c.quadraticCurveTo(-108, -128, 0, -132); c.quadraticCurveTo(108, -128, 104, -6); c.quadraticCurveTo(0, -30, -104, -6); c.closePath(); };
  hm(); inkPath(c, '#8a929e', 8); c.save(); hm(); c.clip(); c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(20 * dir, -140, 120 * dir, 140); c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.ellipse(-40 * dir, -86, 28, 12, -0.5 * dir, 0, 7); c.fill(); c.restore();
  c.beginPath(); c.moveTo(-16, -130); c.lineTo(16, -130); c.lineTo(16, -14); c.lineTo(-16, -14); c.closePath(); inkPath(c, '#6a717c', 5);
  c.beginPath(); c.moveTo(-106, -10); c.quadraticCurveTo(0, -36, 106, -10); c.lineTo(104, 6); c.quadraticCurveTo(0, -18, -104, 6); c.closePath(); inkPath(c, '#6a717c', 5);
  for (const x of [-80, -40, 40, 80]) { c.fillStyle = '#2a2a2a'; c.beginPath(); c.arc(x, -6 - (80 - Math.abs(x)) * 0.12, 4, 0, 7); c.fill(); }
  c.beginPath(); c.moveTo(fx - 10, -6); c.lineTo(fx + 10, -6); c.lineTo(fx + 8, 40); c.lineTo(fx - 8, 40); c.closePath(); inkPath(c, '#7a828e', 5); c.restore(); }
function kniHeadArt(c, e, dir) { // yelmo cerrado con visera
  const fx = 14 * dir;
  c.beginPath(); c.moveTo(-dir * 60, -120); c.quadraticCurveTo(-dir * 140, -150, -dir * 170, -90); c.quadraticCurveTo(-dir * 120, -110, -dir * 70, -96); c.closePath(); inkPath(c, '#2f6fe0', 6);
  const hm = () => { c.beginPath(); c.moveTo(-104, -118); c.quadraticCurveTo(0, -138, 104, -118); c.lineTo(110, 96); c.quadraticCurveTo(0, 116, -110, 96); c.closePath(); };
  hm(); inkPath(c, '#aab3c0', 8); c.save(); hm(); c.clip(); c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(30 * dir, -150, 140 * dir, 280); c.fillStyle = 'rgba(255,255,255,.45)'; c.beginPath(); c.ellipse(-50 * dir, -70, 18, 50, 0, 0, 7); c.fill();
  // visera: franja blanca con los ojos
  c.beginPath(); c.roundRect(fx - 96, -38, 192, 62, 14); inkPath(c, '#ffffff', 6); c.save(); c.beginPath(); c.roundRect(fx - 96, -38, 192, 62, 14); c.clip(); faceArt(c, e, dir, false); c.restore(); c.restore();
  hm(); c.strokeStyle = INK; c.lineWidth = 8; c.stroke();
  c.beginPath(); c.moveTo(fx - 12, 24); c.lineTo(fx + 12, 24); c.lineTo(fx + 12, 104); c.lineTo(fx - 12, 104); c.closePath(); inkPath(c, '#e8b93a', 4);
  c.beginPath(); c.moveTo(-104, -118); c.quadraticCurveTo(0, -138, 104, -118); c.lineTo(104, -96); c.quadraticCurveTo(0, -116, -104, -96); c.closePath(); inkPath(c, '#e8b93a', 4);
  c.fillStyle = INK; for (let i = 0; i < 4; i++) for (const k of [-1, 1]) { c.beginPath(); c.arc(fx + k * (36 + i * 14), 48 + (i % 2) * 14, 4, 0, 7); c.fill(); }
  if (e === 'scared' || e === 'ko') { c.fillStyle = '#7ac8ff'; c.beginPath(); c.ellipse(fx + 80 * dir, -60, 9, 14, 0, 0, 7); c.fill(); c.strokeStyle = INK; c.lineWidth = 3; c.stroke(); } }
function roundShield(c, x, y, r, ang = 0) { c.save(); c.translate(x, y); c.rotate(ang); c.beginPath(); c.arc(0, 0, r, 0, 7); inkPath(c, '#f2ead8', 3.5); for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, r, i * Math.PI / 2, i * Math.PI / 2 + Math.PI / 4); c.closePath(); c.fillStyle = '#c0282a'; c.fill(); } c.strokeStyle = 'rgba(90,50,20,.35)'; c.lineWidth = 1.5; for (let k = -r; k < r; k += 9) { c.beginPath(); c.moveTo(k, -r); c.lineTo(k, r); c.stroke(); } c.beginPath(); c.arc(0, 0, r, 0, 7); c.strokeStyle = '#555c66'; c.lineWidth = 5; c.stroke(); c.beginPath(); c.arc(0, 0, r + 2.5, 0, 7); c.strokeStyle = INK; c.lineWidth = 2.5; c.stroke(); c.beginPath(); c.arc(0, 0, r * 0.26, 0, 7); inkPath(c, '#9aa2ae', 3); c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.arc(-r * 0.08, -r * 0.08, r * 0.08, 0, 7); c.fill(); c.restore(); }
function kniShield(c, x, y, s, ang = 0) { c.save(); c.translate(x, y); c.rotate(ang); c.scale(s, s); const p = () => { c.beginPath(); c.moveTo(-34, -40); c.quadraticCurveTo(0, -48, 34, -40); c.lineTo(32, 6); c.quadraticCurveTo(24, 44, 0, 62); c.quadraticCurveTo(-24, 44, -32, 6); c.closePath(); }; p(); inkPath(c, '#2f6fe0', 4); c.save(); p(); c.clip(); c.fillStyle = '#e8b93a'; c.beginPath(); c.moveTo(-40, 10); c.lineTo(0, -16); c.lineTo(40, 10); c.lineTo(40, 26); c.lineTo(0, 0); c.lineTo(-40, 26); c.closePath(); c.fill(); c.strokeStyle = INK; c.lineWidth = 2.5; c.stroke(); c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(-34, -48, 16, 120); c.restore(); p(); c.strokeStyle = '#c9ced6'; c.lineWidth = 3; c.stroke(); c.restore(); }
function vAxe(c, p, wa, sc = 1, dir = 1) { c.save(); c.translate(p[0], p[1]); c.rotate(-wa * D2R * dir); c.scale(sc * dir, sc); c.beginPath(); c.roundRect(-4.5, -22, 9, 124, 4); inkPath(c, '#8a5a2e', 2.5); c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 1.5; for (let y = -10; y < 60; y += 12) { c.beginPath(); c.moveTo(-4, y); c.lineTo(4, y + 5); c.stroke(); }
  c.beginPath(); c.moveTo(-4, 78); c.lineTo(-22, 74); c.quadraticCurveTo(-36, 80, -46, 74); c.quadraticCurveTo(-56, 96, -44, 128); c.quadraticCurveTo(-34, 112, -20, 100); c.lineTo(-4, 98); c.closePath(); inkPath(c, '#b9c1cc', 3); c.strokeStyle = '#ffffff'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(-48, 78); c.quadraticCurveTo(-56, 98, -45, 122); c.stroke(); c.beginPath(); c.roundRect(-6, 72, 14, 30, 3); inkPath(c, '#6a717c', 2.5); c.restore(); }
function kSword(c, p, wa, sc = 1, dir = 1) { c.save(); c.translate(p[0], p[1]); c.rotate(-wa * D2R * dir); c.scale(sc, sc); c.beginPath(); c.roundRect(-4, -20, 8, 26, 3); inkPath(c, '#5a3a20', 2); c.beginPath(); c.arc(0, -24, 7, 0, 7); inkPath(c, '#e8b93a', 2.5); c.beginPath(); c.roundRect(-22, 6, 44, 8, 3); inkPath(c, '#e8b93a', 2.5); const g = c.createLinearGradient(-6, 0, 6, 0); g.addColorStop(0, '#9aa4b0'); g.addColorStop(0.5, '#ffffff'); g.addColorStop(1, '#8a94a0'); c.beginPath(); c.moveTo(-6, 14); c.lineTo(6, 14); c.lineTo(5, 118); c.lineTo(0, 134); c.lineTo(-5, 118); c.closePath(); c.fillStyle = g; c.fill(); c.strokeStyle = INK; c.lineWidth = 2.5; c.stroke(); c.strokeStyle = 'rgba(80,90,110,.6)'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(0, 18); c.lineTo(0, 112); c.stroke(); c.restore(); }
PUP.vik = { kind: 'vik' }; PUP.kni = { kind: 'kni' };
function puppetFighterB(c, key, st, t, groundY, s) { const P = st.pose, dir = st.dir; const J = solve(P, dir); const lowest = Math.max(J.ff[1], J.fb[1]) + 6; const e = st.expr || 'angry'; const V = key === 'vik'; const wp = st.weapon || 'none'; const hasShield = wp === 'axe' || wp === 'sword';
  c.save(); c.translate(st.x, groundY - lowest * s - st.air); c.scale(s, s); if (st.rot) { c.translate(0, -40); c.rotate(st.rot * D2R * dir); c.translate(0, 40); }
  const ang = -(P.tor - 180) * D2R * dir;
  const foot = f => { c.save(); c.translate(...f); c.beginPath(); c.moveTo(-10 * dir, 3); c.quadraticCurveTo(-10 * dir, -13, 2 * dir, -14); c.quadraticCurveTo(19 * dir, -8, 20 * dir, 3); c.closePath(); inkPath(c, V ? '#6a3e1e' : '#2a2a2e', 2.5); c.restore(); };
  const leg = (h, k, f) => { if (V) { limbQuad(c, h, k, 13, 11, '#6b5a3a', 3); limbQuad(c, k, f, 11, 9, '#d8c8a0', 3); c.save(); c.strokeStyle = 'rgba(90,60,30,.7)'; c.lineWidth = 1.6; for (let i = 1; i < 7; i++) { const p = mix(k, f, i / 7.5); c.beginPath(); c.moveTo(p[0] - 8, p[1] - 4); c.lineTo(p[0] + 8, p[1] + 3); c.stroke(); } c.restore(); } else { const p1 = () => limbQuad(c, h, k, 13, 11, '#8e97a4', 3); p1(); limbQuad(c, k, f, 11, 9, '#8e97a4', 3); c.save(); c.globalAlpha = .9; mailTex(c, () => { const an = Math.atan2(f[1] - h[1], f[0] - h[0]); c.beginPath(); c.moveTo(h[0] - 14, h[1]); c.lineTo(k[0] - 12, k[1]); c.lineTo(f[0] - 10, f[1]); c.lineTo(f[0] + 10, f[1]); c.lineTo(k[0] + 12, k[1]); c.lineTo(h[0] + 14, h[1]); c.closePath(); }); c.restore(); c.beginPath(); c.arc(k[0], k[1], 9, 0, 7); inkPath(c, '#c9ced6', 2.5); } foot(f); };
  const arm = (e1, h, front) => { if (V) { limbQuad(c, J.neck, e1, 9, 8, '#9a2a1e', 3); limbQuad(c, e1, h, 7.5, 6.5, '#f0e2c4', 3); c.beginPath(); c.arc(...mix(e1, h, 0.7), 6.5, 0, 7); inkPath(c, '#b9c1cc', 2); } else { limbQuad(c, J.neck, e1, 9, 8, '#8e97a4', 3); limbQuad(c, e1, h, 8, 7, '#8e97a4', 3); } mitten(c, h[0], h[1], 0.5, Math.atan2(h[1] - e1[1], h[0] - e1[0]) - Math.PI / 2); };
  const shield = () => { if (!hasShield) return; const hb = J.hb; if (V) roundShield(c, hb[0] + 6 * dir, hb[1] - 4, 46, 0); else kniShield(c, hb[0] + 4 * dir, hb[1] + 6, 1.05, -0.12 * dir); };
  // capa trasera (vikingo: piel; caballero: capa azul)
  c.save(); c.translate(...J.neck); c.rotate(ang * 0.5); c.beginPath(); c.moveTo(-26, -4); c.quadraticCurveTo(-dir * 40 - 10, 60, -dir * 30, 96 + Math.sin(t * 5) * 4); c.lineTo(dir * 6, 96); c.lineTo(26, -4); c.closePath(); inkPath(c, V ? '#5a3a22' : '#1f4fae', 3); c.restore();
  arm(J.eb, J.hb, false); leg(J.hip, J.kb, J.fb);
  if (V) { c.save(); c.translate(J.hip[0] - 6 * dir, J.hip[1] - 8); c.rotate(ang + 0.4 * dir); c.beginPath(); c.roundRect(-4, -4, -46 * dir, 8, 3); inkPath(c, '#3a2a1a', 2); c.restore(); }
  c.save(); c.translate((J.hip[0] + J.neck[0]) / 2, (J.hip[1] + J.neck[1]) / 2); c.rotate(ang);
  if (V) { const tu = () => { c.beginPath(); c.moveTo(-26, -40); c.quadraticCurveTo(0, -46, 26, -40); c.lineTo(30, 54); c.quadraticCurveTo(0, 60, -30, 54); c.closePath(); }; tu(); inkPath(c, '#9a2a1e', 3.5); c.save(); tu(); c.clip(); c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(8 * dir, -50, 32 * dir, 120); c.fillStyle = '#e8b93a'; c.fillRect(-34, 44, 68, 6); c.restore(); c.beginPath(); c.moveTo(-27, 16); c.lineTo(27, 16); c.lineTo(28, 26); c.lineTo(-28, 26); c.closePath(); inkPath(c, '#4a2e18', 2.5); c.beginPath(); c.roundRect(-8 + 6 * dir, 14, 14, 14, 3); inkPath(c, '#c9ced6', 2);
    c.beginPath(); c.moveTo(-34, -46); c.quadraticCurveTo(0, -30, 34, -46); c.quadraticCurveTo(40, -24, 28, -14); c.quadraticCurveTo(0, -4, -28, -14); c.quadraticCurveTo(-40, -24, -34, -46); c.closePath(); inkPath(c, '#7a5232', 3); c.strokeStyle = 'rgba(40,20,10,.5)'; c.lineWidth = 2; for (let x = -26; x <= 26; x += 7) { c.beginPath(); c.moveTo(x, -40); c.lineTo(x + 2, -18); c.stroke(); } c.beginPath(); c.arc(0, -24, 6, 0, 7); inkPath(c, '#e8b93a', 2); }
  else { const ml = () => { c.beginPath(); c.moveTo(-26, -42); c.quadraticCurveTo(0, -48, 26, -42); c.lineTo(28, 50); c.quadraticCurveTo(0, 56, -28, 50); c.closePath(); }; ml(); inkPath(c, '#8e97a4', 3.5); mailTex(c, ml);
    const sc = () => { c.beginPath(); c.moveTo(-22, -40); c.quadraticCurveTo(0, -34, 22, -40); c.lineTo(26, 56); c.lineTo(4, 62); c.lineTo(0, 30); c.lineTo(-4, 62); c.lineTo(-26, 56); c.closePath(); }; sc(); inkPath(c, '#2f6fe0', 3); c.save(); sc(); c.clip(); c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(6 * dir, -50, 30 * dir, 120); c.fillStyle = '#e8b93a'; c.beginPath(); c.moveTo(-26, -6); c.lineTo(0, -22); c.lineTo(26, -6); c.lineTo(26, 4); c.lineTo(0, -12); c.lineTo(-26, 4); c.closePath(); c.fill(); c.restore();
    c.beginPath(); c.moveTo(-25, 14); c.lineTo(25, 14); c.lineTo(26, 23); c.lineTo(-26, 23); c.closePath(); inkPath(c, '#5a3a20', 2.5); c.beginPath(); c.roundRect(-6, 12, 12, 13, 2); inkPath(c, '#e8b93a', 2); }
  c.restore();
  leg(J.hip, J.kf, J.ff);
  const hc = [J.neck[0] + Math.sin(P.tor * D2R) * 40 * dir, J.neck[1] + Math.cos(P.tor * D2R) * 40]; c.save(); c.translate(...hc); c.rotate(ang * 0.6); c.scale(0.36, 0.36); if (V) vikHeadArt(c, e, dir); else kniHeadArt(c, e, dir); c.restore();
  shield();
  arm(J.ef, J.hf, true);
  if (wp === 'axe') { vAxe(c, J.hf, P.wa, 0.95, dir); mitten(c, J.hf[0], J.hf[1], 0.5, 0); }
  if (wp === 'sword' || wp === 'swordNS') { kSword(c, J.hf, P.wa, 0.95, dir); mitten(c, J.hf[0], J.hf[1], 0.5, 0); }
  c.restore(); }
// escenario: campo de batalla al amanecer
function battlefield(c, t, o = {}) { sky(c, '#2a1a3a', '#f0905a', 900); const sx = o.sx ?? 470, sy = o.sy ?? 560; glowAt(c, sx, sy, 520, '255,190,120', 0.55); c.fillStyle = '#ffd9a0'; c.beginPath(); c.arc(sx, sy, 110, 0, 7); c.fill();
  c.fillStyle = '#5a3a5a'; c.beginPath(); c.moveTo(-300, 820); for (let x = -300; x <= 1020; x += 40) c.lineTo(x, 700 - Math.abs(Math.sin(x * 0.006 + 1)) * 130 - Math.sin(x * 0.02) * 12); c.lineTo(1020, 900); c.lineTo(-300, 900); c.fill();
  c.fillStyle = '#3a2a40'; c.beginPath(); c.moveTo(-300, 880); for (let x = -300; x <= 1020; x += 40) c.lineTo(x, 800 - Math.abs(Math.sin(x * 0.009 + 3)) * 70); c.lineTo(1020, 940); c.lineTo(-300, 940); c.fill();
  // estandartes lejanos
  for (const [x, col, k] of [[60, '#c0282a', 0], [130, '#c0282a', 1], [600, '#2f6fe0', 2], [660, '#2f6fe0', 3]]) { const y = 790 - (k % 2) * 14; c.strokeStyle = '#1a1220'; c.lineWidth = 4; c.beginPath(); c.moveTo(x, y + 60); c.lineTo(x, y - 60); c.stroke(); c.fillStyle = col; c.beginPath(); c.moveTo(x, y - 58); c.quadraticCurveTo(x + 22, y - 54 + Math.sin(t * 4 + k) * 4, x + 44, y - 50); c.lineTo(x + 40, y - 26); c.quadraticCurveTo(x + 20, y - 30 + Math.sin(t * 4 + k) * 4, x, y - 30); c.closePath(); c.fill(); }
  const gy = o.gy ?? 980; const g = c.createLinearGradient(0, gy - 60, 0, 1400); g.addColorStop(0, '#4a6a32'); g.addColorStop(1, '#1e2e16'); c.fillStyle = g; c.beginPath(); c.moveTo(-300, gy - 40); c.quadraticCurveTo(360, gy - 70, 1020, gy - 40); c.lineTo(1020, 1700); c.lineTo(-300, 1700); c.fill();
  const R = rng(9); c.strokeStyle = 'rgba(20,40,10,.6)'; c.lineWidth = 3; for (let i = 0; i < 90; i++) { const x = R() * 1300 - 300, y = gy - 30 + R() * 400, h = 10 + R() * 18; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 3 + Math.sin(t * 2 + i) * 2, y - h); c.stroke(); }
  c.fillStyle = 'rgba(255,230,210,.10)'; for (let i = 0; i < 5; i++) { const x = ((t * 18 + i * 300) % 1400) - 340; c.beginPath(); c.ellipse(x, gy - 20 + (i % 2) * 30, 260, 34, 0, 0, 7); c.fill(); }
  if (o.cracks) { c.strokeStyle = `rgba(20,30,10,${o.cracks})`; c.lineWidth = 4; const cx = o.cx2 ?? 470; for (let i = 0; i < 7; i++) { const a = -0.3 - i * 0.45; c.beginPath(); c.moveTo(cx, gy); c.lineTo(cx + Math.cos(a) * 90, gy + 8 + Math.abs(Math.sin(a)) * 18); c.stroke(); } } }
const _pfOld = puppetFighter;
puppetFighter = function (c, key, st, t, gy, s) { if (key === 'vik' || key === 'kni') return puppetFighterB(c, key, st, t, gy, s); return _pfOld(c, key, st, t, gy, s); };
