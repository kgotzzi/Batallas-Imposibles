/* ===== PUPPET DETALLADO · VIKINGO VS CABALLERO ===== */
let T = {}, TR = {}, QUIET = [];
const GY = 980, SC = 1.5;
POSES.thrust = { tor: 165, uf: 85, ff: 88, ub: 30, fb: 80, tf: 40, sf: 0, tb: -36, sb: -22, wa: 90 };
POSES.pommel = { tor: 170, uf: 135, ff: 150, ub: 30, fb: 60, tf: 36, sf: 0, tb: -30, sb: -20, wa: 320 };
POSES.hook = { tor: 194, uf: 40, ff: 20, ub: 20, fb: 80, tf: 20, sf: 0, tb: -34, sb: -24, wa: 120 };
function setupTimes() {
  HL = new Set(['vikingo', 'caballero', 'medieval', 'batalla', 'gana', 'hacha', 'barba', 'escudo', 'redondo', 'miedo', 'cuernos', 'casco', 'ópera', '1876', 'cota', 'malla', 'catorce', 'kilos', 'espada', 'niño', 'combate', 'carga', 'pum', 'tres', 'hachazos', 'aguanta', 'estocada', 'desvía', 'giro', 'engancha', 'arranca', 'manos', 'furia', 'espacio', 'dentro', 'pomo', 'cae', 'mejor', '911', 'francia', 'normandía', 'rolón', 'descendientes', 'normandos', 'familia', 'comentarios']);
  const K = (n, a) => wt(n, a - 0.6);
  T = { UN2: K('un', 2.6), QUIEN: K('quién', 5.7), VIKP: K('a', 7.0), HACHA: K('hacha', 9.1), ESC: K('escudo', 10.2), FAMA: K('fama', 11.8), CUER: K('y', 14.4), CUERN: K('cuernos', 15.8), CASCO1: K('casco', 16.5), ESO: K('eso', 17.5), OPERA: K('ópera', 18.7), KNIP: K('al', 21.4), COTA: K('cota', 22.9), KILOS: K('kilos', 24.3), ESPA: K('espada', 24.6), ENT: K('entrenando', 26.0), EMP: K('empieza', 28.5), CARGA: K('carga', 30.5), P1: K('pum', 32.0), TRES: K('tres', 33.3), AGU: K('aguanta', 35.9), CONT: K('contraataca', 37.6), ESTO: K('estocada', 38.6), DESV: K('desvía', 40.8), GIRO: K('y', 41.9), ENG: K('engancha', 44.0), BARBA: K('barba', 46.2), ARR: K('arranca', 48.0), SIN: K('sin', 49.7), LANZA: K('lanza', 51.7), FURIA: K('furia', 54.3), PERO: K('pero', 55.1), ESPAC: K('espacio', 56.4), METE: K('mete', 59.2), POMO: K('pomo', 61.8), CASCO: K('casco', 63.2), CAE: K('cae', 64.9), WIN: K('en', 65.5), GANA: K('gana', 66.2), LOM: K('pero', 68.0), ANO: K('año', 70.0), REY: K('rey', 71.7), NORM: K('normandía', 73.2), ROL: K('rolón', 75.4), DESC: K('descendientes', 76.8), CABN: K('caballeros', 78.3), OSEA: K('o', 79.9), FAM: K('familia', 82.6), END: K('y', 84.1), COM: K('comentarios', 87.3) };
  T.P2 = wt('pum', T.P1 + 0.1); T.P3 = wt('pum', T.P2 + 0.1);
  const S = T;
  QUIET = [[S.PERO, S.POMO], [S.LOM, S.ANO]];
  const V = (t, p, x, a = 0, o = {}) => [t, p, x, a, Object.assign({ dir: 1, weapon: 'axe' }, o)];
  const N = (t, p, x, a = 0, o = {}) => [t, p, x, a, Object.assign({ dir: -1, weapon: 'sword' }, o)];
  TR.vsV = track([V(0, 'guard', -250), V(0.3, 'guard', 190), V(S.UN2, 'guard', 200)]);
  TR.vsN = track([N(0, 'guard', 1000), N(0.3, 'guard', 530), N(S.UN2, 'guard', 520)]);
  TR.fieldV = track([V(S.UN2, 'stand', 150), V(S.QUIEN, 'guard', 165)]);
  TR.fieldN = track([N(S.UN2, 'stand', 570), N(S.QUIEN, 'guard', 555)]);
  TR.vik = track([V(S.VIKP, 'stand', 360), V(S.HACHA - 0.3, 'stand', 360), V(S.HACHA, 'windup', 360), V(S.HACHA + 0.45, 'slash', 380), V(S.ESC - 0.1, 'guard', 360), V(S.ESC + 0.3, 'block', 360), V(S.FAMA, 'guard', 360), V(S.FAMA + 0.4, 'fist', 360), V(S.CUER, 'stand', 360)]);
  TR.kni = track([N(S.KNIP, 'walk1', 520), N(S.KNIP + 0.4, 'walk2', 440), N(S.KNIP + 0.8, 'stand', 380), N(S.COTA, 'stand', 360), N(S.KILOS, 'guard', 360), N(S.ESPA, 'windup', 360), N(S.ESPA + 0.45, 'slash', 340), N(S.ENT, 'guard', 360), N(S.ENT + 0.6, 'thrust', 350), N(S.ENT + 1.1, 'guard', 360)]);
  // carga y tres hachazos
  const cv = [], cn = []; for (let k = 0; k <= 8; k++) { const tt = S.CARGA - 0.2 + k * 0.18; cv.push(V(tt, k % 2 ? 'run2' : 'run1', lerp(40, 270, k / 8))); }
  cv.unshift(V(S.EMP, 'guard', 120), V(S.CARGA - 0.3, 'guard', 60));
  [S.P1, S.P2, S.P3, S.TRES + 0.35].forEach((pt, i) => { cv.push(V(pt - 0.28, 'windup', 270), V(pt, 'slash', 290)); });
  cv.push(V(S.AGU, 'guard', 270), V(S.CONT, 'guard', 270));
  TR.fightV = track(cv.sort((a, b) => a[0] - b[0]));
  TR.fightN = track([N(S.EMP, 'guard', 580), N(S.CARGA, 'block', 520), N(S.CONT, 'guard', 520)]);
  // contraataque y desvío
  TR.contV = track([V(S.CONT, 'guard', 270), V(S.ESTO + 0.2, 'guard', 270), V(S.ESTO + 0.5, 'block', 255), V(S.DESV, 'guard', 270)]);
  TR.contN = track([N(S.CONT, 'guard', 520), N(S.ESTO - 0.2, 'windup', 530), N(S.ESTO + 0.3, 'thrust', 470), N(S.DESV, 'guard', 510)]);
  // el giro: engancha el escudo y lo arranca
  TR.giroV = track([V(S.GIRO, 'guard', 270), V(S.ENG, 'guard', 300), V(S.ENG + 0.5, 'slash', 315), V(S.BARBA, 'slash', 318), V(S.ARR - 0.1, 'slash', 318), V(S.ARR + 0.35, 'hook', 270), V(S.SIN, 'guard', 280)]);
  TR.giroN = track([N(S.GIRO, 'guard', 510), N(S.ENG + 0.5, 'block', 490), N(S.ARR - 0.1, 'block', 490), N(S.ARR + 0.3, 'look', 470, 0, { weapon: 'swordNS' }), N(S.SIN, 'guard', 500, 0, { weapon: 'swordNS' })]);
  // furia: golpe tras golpe, el caballero esquiva
  const fv = [], fn = []; let k = 0; for (let tt = S.SIN + 0.3; tt < S.PERO - 0.2; tt += 0.55, k++) { fv.push(V(tt, k % 2 ? 'slash' : 'windup', 270 + k * 12)); fn.push(N(tt, k % 3 === 1 ? 'crouch' : 'guard', 510 + k * 12 + (k % 2) * 20, 0, { weapon: 'swordNS' })); }
  fv.unshift(V(S.SIN, 'guard', 280)); fn.unshift(N(S.SIN, 'guard', 500, 0, { weapon: 'swordNS' }));
  fv.push(V(S.PERO, 'guard', 330)); fn.push(N(S.PERO, 'guard', 580, 0, { weapon: 'swordNS' }));
  TR.furV = track(fv); TR.furN = track(fn);
  // final: hacha arriba, el caballero entra y golpea con el pomo
  TR.finV = track([V(S.PERO, 'guard', 310), V(S.ESPAC - 0.2, 'windup', 310), V(S.METE + 0.3, 'windup', 310), V(S.CASCO, 'windup', 310), V(S.CASCO + 0.1, 'limp', 300, 40, { weapon: 'none' }), V(S.CAE, 'limp', 270, 60, { weapon: 'none', rot: -40 }), V(S.CAE + 0.45, 'lie', 250, -140, { weapon: 'none', rot: -90 }), V(S.LOM, 'lie', 250, -140, { weapon: 'none', rot: -90 })]);
  TR.finN = track([N(S.PERO, 'guard', 560, 0, { weapon: 'swordNS' }), N(S.METE - 0.2, 'guard', 560, 0, { weapon: 'swordNS' }), N(S.METE, 'run1', 500, 0, { weapon: 'swordNS' }), N(S.METE + 0.3, 'crouch', 440, 0, { weapon: 'swordNS' }), N(S.POMO - 0.1, 'crouch', 435, 0, { weapon: 'swordNS' }), N(S.CASCO - 0.15, 'pommel', 425, 10, { weapon: 'swordNS' }), N(S.CAE, 'guard', 440, 0, { weapon: 'swordNS' }), N(S.WIN, 'stand', 430, 0, { weapon: 'swordNS' }), N(S.GANA, 'fist', 430, 0, { weapon: 'swordNS' })]);
}
function exprOf(key, t) { const S = T; if (key === 'vik') { if (t > S.LOM) return 'happy'; if (t > S.CASCO) return 'sleep'; if (t > S.CUERN && t < S.CASCO1 + 0.2) return 'happy'; if (t > S.CASCO1 + 0.2 && t < S.KNIP) return 'scared'; if (t > S.ARR && t < S.FURIA) return 'grin'; return 'angry'; } if (t > S.WIN) return 'happy'; if (t > S.ARR && t < S.METE) return 'scared'; return 'angry'; }
function PF(C, key, st, t, gy, s) { return puppetFighter(C, key, Object.assign({}, st, { expr: st.expr || exprOf(key, t) }), t, gy, s); }
function horns(c, x, y, s, u) { if (u <= 0) return; c.save(); c.translate(x, y); c.scale(s * u, s * u); for (const k of [-1, 1]) { c.beginPath(); c.moveTo(k * 96, -70); c.quadraticCurveTo(k * 190, -90, k * 200, -230); c.quadraticCurveTo(k * 150, -140, k * 92, -112); c.closePath(); inkPath(c, '#f2e6c8', 7); c.strokeStyle = 'rgba(120,90,40,.5)'; c.lineWidth = 4; for (let i = 1; i < 4; i++) { c.beginPath(); c.moveTo(k * (100 + i * 22), -74 - i * 8); c.lineTo(k * (96 + i * 20), -108 - i * 12); c.stroke(); } } c.restore(); }
function bigX(c, x, y, r, u) { if (u <= 0) return; c.save(); c.translate(x, y); c.strokeStyle = '#ff2a2a'; c.lineCap = 'round'; c.lineWidth = 34; c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 12; const a = Math.min(1, u * 2), b = clamp(u * 2 - 1); c.beginPath(); c.moveTo(-r, -r); c.lineTo(-r + 2 * r * a, -r + 2 * r * a); c.stroke(); if (b > 0) { c.beginPath(); c.moveTo(r, -r); c.lineTo(r - 2 * r * b, -r + 2 * r * b); c.stroke(); } c.restore(); }
function parchment(c, t) { const g = c.createRadialGradient(360, 600, 100, 360, 640, 900); g.addColorStop(0, '#f3e2b8'); g.addColorStop(1, '#b88a4a'); c.fillStyle = g; c.fillRect(-400, -400, 1600, 2200); const R = rng(3); c.fillStyle = 'rgba(120,80,30,.10)'; for (let i = 0; i < 40; i++) { c.beginPath(); c.arc(R() * 720, R() * 1280, 20 + R() * 80, 0, 7); c.fill(); } c.strokeStyle = 'rgba(90,60,20,.35)'; c.lineWidth = 4; c.setLineDash([14, 12]); c.beginPath(); c.moveTo(40, 1010); c.lineTo(680, 1010); c.stroke(); c.setLineDash([]); }
function crown(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s); c.beginPath(); c.moveTo(-50, 30); c.lineTo(-56, -20); c.lineTo(-28, 4); c.lineTo(0, -34); c.lineTo(28, 4); c.lineTo(56, -20); c.lineTo(50, 30); c.closePath(); inkPath(c, '#e8b93a', 5); for (const xx of [-28, 0, 28]) { c.beginPath(); c.arc(xx, 16, 6, 0, 7); inkPath(c, '#c0282a', 2); } c.restore(); }
const SFX = [];
function renderFrame(t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H); const S = T, C = bx; C.setTransform(1, 0, 0, 1, 0, 0); C.clearRect(0, 0, W, H);
  let sh = 0, slow = false, flashA = 0, dark = 0;
  const draw = (key, st, s = SC, gy = GY) => PF(C, key, st, t, gy, s);
  if (t < S.UN2) { vsBg(C, t); draw('vik', TR.vsV(t), 1.74, 1060); draw('kni', TR.vsN(t), 1.74, 1060); sh = t > 0.3 && t < 0.6 ? 10 : 0;
  } else if (t < S.VIKP) { const z = t > S.QUIEN ? lerp(1.0, 1.15, prog(t, S.QUIEN, S.VIKP)) : 1; C.save(); camApply(C, z, 360, 860); battlefield(C, t); draw('vik', TR.fieldV(t), 1.2); draw('kni', TR.fieldN(t), 1.2); C.restore();
  } else if (t < S.CUER) { C.save(); camApply(C, 1.0, 360, 700); battlefield(C, t, { sx: 560, sy: 520 }); draw('vik', TR.vik(t), 2.0, 1040); if (t > S.HACHA + 0.25) slashArc(C, 430, 640, 230, -2.4, 0.9, prog(t, S.HACHA + 0.25, S.HACHA + 0.75), '255,170,120'); C.restore(); if (t > S.FAMA + 0.4 && t < S.CUER) sh = 5;
  } else if (t < S.KNIP) { // primer plano: los cuernos que nunca existieron
    C.save(); camApply(C, lerp(1.0, 1.08, prog(t, S.CUER, S.KNIP)), 360, 640); battlefield(C, t, { sx: 360, sy: 420 }); C.fillStyle = 'rgba(0,0,0,.25)'; C.fillRect(-400, -400, 1600, 2200);
    const hx = 360, hy = 700, hs = 1.55; const pop = t < S.ESO ? ease(prog(t, S.CUERN, S.CUERN + 0.35)) : 0; const fly = prog(t, S.ESO, S.ESO + 0.8);
    if (fly > 0 && fly < 1) { for (const k of [-1, 1]) { C.save(); C.translate(hx + k * fly * 420, hy - 120 - fly * 300 + fly * fly * 600); C.rotate(k * fly * 8); C.translate(-k * 140, 120); horns(C, 0, 0, hs, 1); C.restore(); } }
    horns(C, hx, hy - 28 * hs, hs, pop);
    C.save(); C.translate(hx, hy); C.scale(hs, hs); vikHeadArt(C, exprOf('vik', t), 1); C.restore();
    if (t < S.ESO) bigX(C, hx, hy - 260, 170, prog(t, S.CASCO1, S.CASCO1 + 0.35)); C.restore(); sh = t > S.ESO && t < S.ESO + 0.2 ? 10 : 0;
  } else if (t < S.EMP) { C.save(); camApply(C, 1.0, 360, 700); battlefield(C, t, { sx: 200, sy: 520 }); draw('kni', TR.kni(t), 2.0, 1040); if (t > S.ESPA + 0.25) slashArc(C, 300, 640, 220, -0.7, 2.2, prog(t, S.ESPA + 0.25, S.ESPA + 0.75), '170,210,255'); if (t > S.KILOS - 0.1 && t < S.ESPA + 0.3) { C.fillStyle = 'rgba(0,0,0,.75)'; rrect(C, 70, 430, 220, 90, 16); C.fill(); C.strokeStyle = '#3ad0ff'; C.lineWidth = 4; C.stroke(); C.font = '64px Anton'; C.textAlign = 'center'; C.fillStyle = '#fff'; C.fillText('14 KG', 180, 500); } C.restore();
  } else if (t < S.CONT) { C.save(); camApply(C, 1.05, 380, 820); battlefield(C, t); const a = TR.fightV(t), b = TR.fightN(t); draw('kni', b); draw('vik', a); const hits = [S.P1, S.P2, S.P3]; hits.forEach((ht, i) => { sparks(C, 455, 790 + i * 18, prog(t, ht, ht + 0.45), 16, i + 1, '255,200,120'); dust(C, 455, 800, prog(t, ht, ht + 0.6), i + 2); }); if (t > S.CARGA - 0.2 && t < S.P1) speedLines(C, t, 1); C.restore(); hits.forEach((tt, i) => bigTitle('¡PUM!', 380 + i * 90, t, tt, tt + 0.5, '#ffd24a', 76)); sh = hits.some(h => t > h && t < h + 0.15) ? 10 : 0;
  } else if (t < S.GIRO) { C.save(); camApply(C, lerp(1.05, 1.25, prog(t, S.CONT, S.GIRO)), 380, 820); battlefield(C, t); draw('vik', TR.contV(t)); draw('kni', TR.contN(t)); sparks(C, 320, 770, prog(t, S.ESTO + 0.45, S.ESTO + 1.0), 24, 5); C.restore(); sh = t > S.ESTO + 0.45 && t < S.ESTO + 0.65 ? 12 : 0; flashA = t > S.ESTO + 0.45 && t < S.ESTO + 0.55 ? 0.4 : 0;
  } else if (t < S.SIN) { const z = t < S.ENG ? 1.1 : lerp(1.3, 1.5, prog(t, S.ENG, S.ARR)); C.save(); camApply(C, z, 390, 780); battlefield(C, t); draw('kni', TR.giroN(t)); draw('vik', TR.giroV(t)); const fu = prog(t, S.ARR + 0.05, S.ARR + 1.2); if (fu > 0 && fu < 1) { kniShield(C, lerp(450, -200, fu), 760 - Math.sin(fu * Math.PI) * 360, 1.5, fu * 14); } sparks(C, 440, 770, prog(t, S.ARR, S.ARR + 0.5), 20, 6, '255,220,150'); if (t > S.ARR && t < S.ARR + 0.5) speedLines(C, t, 0.8); C.restore(); slow = t > S.BARBA && t < S.ARR; sh = t > S.ARR && t < S.ARR + 0.25 ? 14 : 0; flashA = t > S.ARR && t < S.ARR + 0.1 ? 0.45 : 0;
  } else if (t < S.PERO) { C.save(); camApply(C, 1.1, 420, 820); battlefield(C, t); afterImage(C, tt => PF(C, 'vik', TR.furV(tt), tt, GY, SC), 2, t, 0.06); draw('kni', TR.furN(t)); draw('vik', TR.furV(t)); const k = Math.floor((t - S.SIN - 0.3) / 0.55); const ph = ((t - S.SIN - 0.3) % 0.55) / 0.55; if (t > S.SIN + 0.3) slashArc(C, 400 + k * 12, 760, 170, -2.3, 0.9, ph, '255,140,90'); C.restore(); speedLines(ctx, t, 0.5); if (t > S.FURIA) { ctx.fillStyle = `rgba(255,40,0,${0.12 + 0.08 * Math.sin(t * 20)})`; ctx.fillRect(0, 0, W, H); }
  } else if (t < S.WIN) { const z = t < S.METE ? lerp(1.1, 1.3, prog(t, S.PERO, S.METE)) : t < S.CAE ? 1.35 : 1.2; C.save(); camApply(C, z, 370, t < S.CAE ? 740 : 820); battlefield(C, t, { cracks: prog(t, S.CAE + 0.45, S.CAE + 0.7), cx2: 250 }); const fv = TR.finV(t); draw('vik', fv); draw('kni', TR.finN(t)); if (t > S.CASCO && t < S.WIN) { const u = clamp((t - S.CASCO) / 0.7); vAxe(C, [lerp(300, 150, u), lerp(560, 950, u * u)], 160 + u * 260, 1.4, 1); } impactRing(C, 335, 640, prog(t, S.CASCO, S.CASCO + 0.6)); sparks(C, 335, 640, prog(t, S.CASCO, S.CASCO + 0.6), 26, 7); dust(C, 250, GY, prog(t, S.CAE + 0.45, S.CAE + 1.3)); if (t > S.CASCO + 0.3) { for (let i = 0; i < 3; i++) { const a = t * 4 + i * 2.1; C.save(); C.translate(fv.x + Math.cos(a) * 40 - (t > S.CAE + 0.4 ? 110 : 0), (t > S.CAE + 0.4 ? 900 : 600) + Math.sin(a) * 12); C.fillStyle = '#ffd24a'; C.beginPath(); for (let j = 0; j < 10; j++) { const r = j % 2 ? 5 : 12, b = j / 10 * Math.PI * 2; C.lineTo(Math.cos(b) * r, Math.sin(b) * r); } C.closePath(); C.fill(); C.strokeStyle = INK; C.lineWidth = 2; C.stroke(); C.restore(); } } if (t > S.METE && t < S.METE + 0.4) speedLines(C, t, 0.7); C.restore(); slow = t > S.PERO && t < S.METE; dark = slow ? 0.25 : 0; sh = t > S.CASCO && t < S.CASCO + 0.35 ? 22 : t > S.CAE + 0.45 && t < S.CAE + 0.7 ? 12 : 0; flashA = t > S.CASCO && t < S.CASCO + 0.15 ? 0.7 : 0;
  } else if (t < S.LOM) { C.save(); camApply(C, lerp(1.1, 1.3, prog(t, S.WIN, S.LOM)), 360, 820); battlefield(C, t, { cracks: 1, cx2: 250 }); draw('vik', TR.finV(t)); if (t > S.GANA) glowAt(C, 430, 700, 300, '80,160,255', 0.35); draw('kni', TR.finN(t)); C.restore();
  } else if (t < S.END) { C.save(); camApply(C, lerp(1.0, 1.08, prog(t, S.LOM, S.END)), 360, 700); parchment(C, t);
    const vu = ease(prog(t, S.NORM - 0.2, S.NORM + 0.4)), nu = ease(prog(t, S.DESC, S.DESC + 0.5)); const fam = t > S.FAM;
    if (t > S.ANO && t < S.NORM) { C.font = '230px Anton'; C.textAlign = 'center'; C.fillStyle = 'rgba(90,50,20,.85)'; C.fillText('911', 360, 760); }
    if (t > S.REY && t < S.NORM) crown(C, 360, 460, 1.6);
    if (vu > 0) { C.save(); C.globalAlpha = vu; PF(C, 'vik', { pose: fam ? POSES.fist : POSES.stand, x: 190, air: 0, dir: 1, weapon: 'axe' }, t, 1005, 1.45); C.restore(); }
    if (nu > 0) { C.save(); C.globalAlpha = nu; PF(C, 'kni', { pose: fam ? POSES.fist : POSES.stand, x: 540, air: 0, dir: -1, weapon: 'sword' }, t, 1005, 1.45); C.restore();
      C.strokeStyle = '#5a3a1a'; C.lineWidth = 10; C.lineCap = 'round'; const ax = lerp(280, 440, nu); C.beginPath(); C.moveTo(280, 560); C.lineTo(ax, 560); C.stroke(); C.beginPath(); C.moveTo(ax, 560); C.lineTo(ax - 26, 538); C.moveTo(ax, 560); C.lineTo(ax - 26, 582); C.stroke(); }
    if (fam) { const u = ease(prog(t, S.FAM, S.FAM + 0.4)); C.save(); C.translate(365, 470); C.scale(u, u); C.fillStyle = '#e02a3a'; C.beginPath(); C.moveTo(0, 30); C.bezierCurveTo(-70, -20, -40, -80, 0, -40); C.bezierCurveTo(40, -80, 70, -20, 0, 30); C.fill(); C.strokeStyle = INK; C.lineWidth = 6; C.stroke(); C.restore(); }
    C.restore(); dark = 0;
  } else { vsBg(C, t); PF(C, 'vik', { pose: POSES.guard, x: 190, air: 0, dir: 1, weapon: 'axe' }, t, 1060, 1.74); PF(C, 'kni', { pose: POSES.guard, x: 520, air: 0, dir: -1, weapon: 'sword' }, t, 1060, 1.74); }
  const [sx, sy] = sh ? shakeXY(t, sh) : [0, 0];
  ctx.drawImage(buf, sx, sy);
  if (slow) { ctx.fillStyle = 'rgba(20,30,60,.18)'; ctx.fillRect(0, 0, W, H); }
  if (dark) { ctx.fillStyle = `rgba(0,0,10,${dark})`; ctx.fillRect(0, 0, W, H); }
  if (flashA) { ctx.fillStyle = `rgba(255,255,255,${flashA})`; ctx.fillRect(0, 0, W, H); }
  vignette(t > S.LOM && t < S.END ? 0.3 : 0.45);
  // títulos
  bigTitle('VIKINGO', 170, t, 0.25, S.UN2, '#ff5a3a', 96); bigTitle('VS', 640, t, 0.3, S.UN2, '#ffffff', 170); bigTitle('CABALLERO', 290, t, 0.45, S.UN2, '#3ad0ff', 96);
  bigTitle('¿QUIÉN GANA?', 240, t, S.QUIEN, S.VIKP, '#ffd24a', 110);
  if (t > S.VIKP && t < S.CUER) statCard(ctx, 360, 120, 'VIKINGO', '#ff5a3a', [['HACHA', 9, S.HACHA], ['ESCUDO', 7, S.ESC], ['FURIA', 10, S.FAMA], ['ARMADURA', 3, S.FAMA + 0.7]], t, S.VIKP);
  bigTitle('¿CUERNOS?', 230, t, S.CUERN, S.CASCO1 + 0.2, '#ffd24a', 110); bigTitle('¡NUNCA LOS LLEVÓ!', 230, t, S.CASCO1 + 0.2, S.OPERA, '#ff5a3a', 84); bigTitle('INVENTO DE UNA ÓPERA', 200, t, S.OPERA, S.KNIP, '#fff', 66); bigTitle('1876', 300, t, S.OPERA + 0.4, S.KNIP, '#ffd24a', 110);
  if (t > S.KNIP && t < S.EMP) statCard(ctx, 360, 120, 'CABALLERO', '#3ad0ff', [['ARMADURA', 8, S.COTA], ['ESPADA', 8, S.ESPA], ['ENTRENAMIENTO', 10, S.ENT], ['VELOCIDAD', 5, S.ENT + 0.7]], t, S.KNIP);
  bigTitle('¡PELEA!', 330, t, S.EMP, S.CARGA - 0.3, '#ff3a2a', 150);
  bigTitle('EL ESCUDO AGUANTA', 260, t, S.AGU - 0.3, S.CONT, '#fff', 74);
  bigTitle('¡DESVIADA!', 260, t, S.DESV - 0.2, S.GIRO, '#ff5a3a', 100);
  bigTitle('EL GIRO', 230, t, S.GIRO + 0.1, S.ENG, '#ffd24a', 120); bigTitle('LO ENGANCHA', 230, t, S.ENG, S.ARR, '#ff5a3a', 96); bigTitle('¡SE LO ARRANCA!', 230, t, S.ARR, S.SIN + 0.3, '#ffd24a', 96);
  bigTitle('SIN ESCUDO', 240, t, S.SIN + 0.3, S.LANZA, '#3ad0ff', 100); bigTitle('FURIA VIKINGA', 240, t, S.FURIA - 0.4, S.PERO, '#ff5a3a', 96);
  bigTitle('NECESITA ESPACIO', 240, t, S.ESPAC, S.METE, '#fff', 84); bigTitle('SE METE DENTRO', 240, t, S.METE, S.POMO, '#3ad0ff', 90); bigTitle('¡GOLPE DE POMO!', 240, t, S.CASCO, S.CAE + 0.3, '#ffd24a', 90);
  bigTitle('GANA EL CABALLERO', 250, t, S.GANA, S.LOM, '#3ad0ff', 84);
  bigTitle('LO MEJOR…', 230, t, S.LOM + 0.2, S.ANO, '#7a3a1a', 110); bigTitle('NORMANDÍA', 230, t, S.NORM, S.DESC, '#7a3a1a', 110); bigTitle('SUS NIETOS:', 200, t, S.DESC, S.FAM, '#7a3a1a', 90); bigTitle('CABALLEROS NORMANDOS', 300, t, S.CABN, S.FAM, '#2f6fe0', 66); bigTitle('¡PELEA DE FAMILIA!', 250, t, S.FAM, S.END, '#c0282a', 86);
  if (t > S.END) { bigTitle('¿VIKINGO', 200, t, S.END, 999, '#ff5a3a', 110); bigTitle('O CABALLERO?', 320, t, S.END + 0.4, 999, '#3ad0ff', 100); bigTitle('TE LEO EN COMENTARIOS', 1180, t, S.COM - 0.2, 999, '#fff', 56); }
  if (t < S.END) capsD(t, 1150);
  return cv.toDataURL('image/jpeg', 0.92);
}
function lateSfx() { const S = T; [[0, 'taiko'], [0.3, 'impact'], [0.45, 'slash'], [S.UN2, 'wind'], [S.QUIEN, 'taiko'], [S.VIKP, 'whoosh'], [S.HACHA + 0.3, 'slash'], [S.ESC + 0.2, 'thud'], [S.FAMA + 0.4, 'taiko'], [S.CUERN, 'pop'], [S.CASCO1, 'buzz'], [S.ESO, 'whoosh'], [S.OPERA + 0.4, 'sting'], [S.KNIP, 'steps'], [S.COTA, 'chest'], [S.KILOS - 0.1, 'thud'], [S.ESPA + 0.3, 'slash'], [S.ENT + 0.6, 'whoosh'], [S.EMP, 'taiko'], [S.EMP + 0.1, 'impact'], [S.CARGA - 0.2, 'steps'], [S.P1, 'impact'], [S.P2, 'impact'], [S.P3, 'impact'], [S.P1, 'knock'], [S.P2, 'knock'], [S.P3, 'knock'], [S.TRES + 0.35, 'thud'], [S.ESTO + 0.2, 'whoosh'], [S.ESTO + 0.45, 'clang'], [S.GIRO, 'taiko'], [S.ENG + 0.5, 'clang'], [S.ARR, 'whoosh'], [S.ARR + 0.05, 'impact'], [S.SIN, 'sting'], [S.FURIA, 'taiko'], [S.PERO, 'heart'], [S.METE, 'whoosh'], [S.CASCO, 'clang'], [S.CASCO, 'bang'], [S.CASCO + 0.3, 'bell'], [S.CAE + 0.45, 'thud'], [S.CAE + 0.45, 'impact'], [S.GANA, 'taiko'], [S.ANO, 'bigsting'], [S.REY, 'ding'], [S.DESC, 'whoosh'], [S.FAM, 'pop'], [S.END, 'taiko'], [S.END + 0.4, 'impact']].forEach(([t, type]) => SFX.push({ t, type })); for (let i = 0; i < 7; i++) SFX.push({ t: S.SIN + 0.3 + i * 0.55 + 0.27, type: 'slash' }); }
