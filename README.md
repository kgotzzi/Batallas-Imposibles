# Batallas Imposibles

Duelos históricos "¿Quién ganaría?" animados con personajes estilo stickman de cabeza blanca, dibujados 100 % con código (Canvas 2D). Sin coste por vídeo: no se usa IA de imagen ni de vídeo.

Formato: vertical 720×1280 (se exporta a 1080×1920), 70–100 s, voz en español, música épica y efectos.

## Vídeos

| # | Duelo | Carpeta |
|---|-------|---------|
| 01 | Samurái vs Ninja | `videos/01_samurai_vs_ninja/` |
| 02 | Vikingo vs Caballero | `videos/02_vikingo_vs_caballero/` |
| 03 | Espartano vs Gladiador | `videos/03_espartano_vs_gladiador/` |
| 04 | Legionario vs Bárbaro | `videos/04_legionario_vs_barbaro/` |
| 05 | Mongol vs Templario | `videos/05_mongol_vs_templario/` |
| 06 | Pirata vs Mosquetero | `videos/06_pirata_vs_mosquetero/` |
| 07 | Jaguar azteca vs Conquistador | `videos/07_jaguar_vs_conquistador/` |
| 08 | Monje Shaolín vs Samurái | `videos/08_monje_vs_samurai/` |

## Plantilla de duelos (desde el 03)

Cada duelo nuevo es solo un archivo de configuración (`proj/d03.js` … `proj/d08.js`) sobre la plantilla común `proj/duel.js`:
personajes (`gen2d.js`: spa, gla, leg, bar, mgl, tem, pir, mus, jag, con, mnk + sam/nin/vik/kni), escenario, palabras clave del guion,
tipo de giro (`weapon`, `pistol`, `break`, `retreat`), presión y remate (`bash`, `sweep`, `arrow`, `disarm`), títulos, dato curioso y escena final.
Portadas: `herramientas/thumb3.js` (fotograma limpio) + `herramientas/mk.py` (composición, un estilo distinto por vídeo).

## Estructura

```
proj/          Motor de animación (se sirve en localhost:8765)
  e2d.js         utilidades base (texto, easing, fondos)
  stick2d.js     esqueleto articulado (POSES, track, solve), efectos de pelea y escenarios
  puppet2d.js    personajes detallados: puppetFighter(ctx, 'sam'|'nin'|'vik'|'kni', estado, t, suelo, escala)
                 escenarios: castleRoof (tejado japonés), battlefield (campo de batalla)
  dark2d.js      capsD (subtítulos grandes), shake, glitch...
  spup.js / svik.js  línea de tiempo de cada vídeo (01, 02...)
  videoSpup.html página que se renderiza
  spup.mp3 / wpup.json  voz y tiempos de cada palabra
herramientas/  Render y audio
  tts.py         voz (ElevenLabs). La clave se lee de ~/.el_key y NUNCA se sube al repo
  align.py       tiempos por palabra
  q2d.sh         render en 8 trozos con Playwright
  finalize.sh    mezcla voz + SFX + música y exporta el MP4
  snap2.js / thumb2.js / sheet.py  fotogramas de control y portada
guiones/       Guiones de cada vídeo
videos/        MP4 final + portada de cada vídeo
```

## Cómo hacer un vídeo nuevo

1. Escribe el guion en `guiones/NN_a_vs_b.txt` (unas 220 palabras ≈ 90 s).
2. Genera la voz: `SPD=1.05 python3 tts.py id` y luego `python3 align.py id`.
3. Copia `proj/spup.js` como plantilla: cambia los personajes (añade una entrada nueva en `PUP` de `puppet2d.js`), el escenario y los tiempos en `setupTimes`.
4. Comprueba fotogramas con `snap2.js` y renderiza con `./q2d.sh id:x`.
5. Exporta con `./finalize.sh id salida.mp4` y genera la portada con `thumb2.js`.

> Los scripts usan rutas absolutas del entorno de trabajo (`/home/claude/kit`). Si los usas en otra máquina, ajusta esas rutas.
