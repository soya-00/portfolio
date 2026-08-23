# Weight, and what was measured before it changed

Everything here was measured against the built page in Chromium, throttled to
1.6 Mbps down with 40 ms of latency, three runs per page with the median
reported. Byte counts are the bytes that actually crossed the wire, read from
the network log when each response finished rather than from its
content-length header, because on a slow link the header arrives long before
the body and counting there reports a page as loaded while megabytes are still
in flight.

It is written down so that a later change has a number to beat, and so that an
experiment which already failed is not run a second time.

## Before and after

| Page | Images | Total | LCP | CLS reading | CLS skimming |
|---|---|---|---|---|---|
| `/` | 4133 → **139 KB** | 4233 → 241 KB | 1.03 → 1.04 s | 0.000 → 0.000 | 0.2756 → **0.0001** |
| `/bloc/` | 1992 → **114 KB** | 2092 → 216 KB | 0.68 → 0.69 s | 0.000 → 0.000 | 0.2667 → **0.0000** |
| `/cvr/` | 1644 → **24 KB** | 1885 → 266 KB | 0.41 → 0.41 s | 0.000 → 0.000 | — |

At 1.6 Mbps the index page's images alone were 20.2 seconds of download. They
are now 0.7.

Run-to-run spread on LCP was under 0.05 s in both directions, so the flat LCP
column is a real result and not noise swallowing a change.

## Two of the reported findings did not survive measurement

**The landing photograph was never the LCP element.** It covers the viewport
and weighed 1.6 MB, which made it the obvious suspect. Chrome does not count
an image that fills the screen and behaves as a background, so the largest
paint was a paragraph on the index and the heading on the writeups, at 0.41 to
1.03 seconds, already inside the range Chrome calls good. Cutting the
photograph from 1.6 MB to 23 KB was worth doing for the weight and for when it
finally paints. It was not an LCP fix, and it did not get `fetchpriority`,
which would only have taken bandwidth away from the text that genuinely is the
largest paint.

**Layout shift did not reproduce at reading pace.** Scrolling steadily, CLS
measured 0.000 on every page, which looked like a page with nothing wrong with
it. On a 1.6 Mbps link Chrome widens the distance at which it starts a lazy
image, so every figure finished arriving before its slot came into view. Skim
to the bottom instead, which is an ordinary way to read a long page, and CLS
was 0.2756 on the index and 0.2667 on BLOC, both inside the band Chrome calls
poor, attributed to `figure`, `figcaption` and `article`. That is the missing
`width` and `height` on every screenshot, and it is now 0.0000.

The instrument was checked against a synthetic shift, which it read at 0.4392,
before the 0.000 was believed.

## What changed

The masters moved to `assets-src/`, which does not ship. `public/` now holds
the derivatives `npm run images` writes, AVIF and WebP with a JPEG floor
beneath them, at 768 and 1536 for figures. The text column is `max-w-3xl`, so
1536 covers it at twice the pixel density, and every master had been two to
four times larger than it could ever render.

`01homepage.png`, at 676 KB, was referenced nowhere in `src/`, in any
`index.html`, or in `data/`, `content/` and `docs/`. It had been shipping in
every build for nothing, and it was deleted rather than converted.

`npm run images` is deliberately outside `npm run build`. Its output is
committed, so a build has nothing to recompute and CI has no reason to spend a
minute of every run re-encoding files that did not change. A screenshot added
without regenerating the manifest fails the type check, since `Figure` only
accepts a filename the manifest holds.

## Attempts, kept and rejected

| Attempt | Result | Verdict |
|---|---|---|
| AVIF, WebP and JPEG at the widths the layout asks for | 4133 → 139 KB on the index | kept |
| `width` and `height` from the generated manifest | 0.2667 → 0.0000 skimming | kept |
| `h-auto` beside `w-full` on the figure image | required, since the height attribute otherwise wins and locks the image at its intrinsic pixel height | kept |
| `fetchpriority="high"` on the backdrop | it is not the LCP element | not applied |
| `<link rel="preload">` for the backdrop | same reason, and it would compete with the font preloads and with the text that is the real largest paint | not applied |
| AVIF below q62 on the screenshots | small text in the interface captures begins to smear, checked at 1:1 against the master | rejected |

## The quality floor

The screenshots are interface captures full of small text, which is the first
thing a lossy encoder damages, so they sit at AVIF q62 and WebP q82. The
landing photograph is a photograph, and below the hero it spends its life
behind a panel at 88% opacity, so it is pushed to q46. Both were compared
against their masters at 1:1 before the settings were accepted.

One master carries an alpha channel, and JPEG has none. The JPEG variants are
flattened onto `hsl(48 9% 8%)`, the `--background` token, so the fallback
meets the page instead of burning a white edge into it.
