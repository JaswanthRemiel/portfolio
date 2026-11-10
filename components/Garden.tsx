// The artwork at the bottom of the page: a bed of flowers growing out of a strip
// of soil, cut from one painted image (public/garden/flowers.webp). Each flower is
// its own element showing its slice of that image, so it can sway on its own
// from the base of its stem; the soil is a separate, still slice along the bottom.
//
// Built from plain HTML boxes (not SVG) on purpose: CSS transform animations on
// HTML elements run on the GPU compositor, so Safari doesn't repaint the whole
// garden every frame while it is also keeping the sticky garden pinned during
// scroll. Mirrored copies either side are only drawn on very wide screens
// (see .strip.side in globals.css). Motion is CSS only and deliberately slight.

import type { CSSProperties } from "react";

/** Size of the source image, in its own pixels. Everything below is laid out in
 *  these units and the whole bed is scaled down in CSS (--garden-scale). */
const IW = 5059;
const IH = 300;

/** Flowers are cut off at this row; everything below belongs to the soil slice. */
const CUT = 226;

// One entry per flower, left to right: [x, width, top, stem base x], in image pixels.
// Measured from the image's alpha channel: columns are split at the clear gaps
// between flowers, and the stem base is where the stem meets the cut line.
const SPRITES: [number, number, number, number][] = [
  [0, 81, 2, 26],
  [86, 87, 1, 124],
  [185, 80, 1, 218],
  [265, 81, 6, 304],
  [346, 101, 1, 394],
  [453, 49, 19, 463],
  [507, 83, 1, 542],
  [602, 82, 1, 639],
  [690, 75, 4, 720],
  [770, 70, 1, 805],
  [852, 81, 1, 890],
  [939, 61, 0, 962],
  [1006, 89, 6, 1046],
  [1108, 77, 33, 1142],
  [1194, 88, 3, 1230],
  [1286, 68, 32, 1316],
  [1366, 78, 4, 1402],
  [1450, 57, 69, 1468],
  [1513, 67, 0, 1544],
  [1592, 81, 73, 1628],
  [1686, 74, 0, 1721],
  [1760, 78, 12, 1801],
  [1849, 84, 9, 1890],
  [1945, 72, 0, 1980],
  [2023, 77, 6, 2062],
  [2100, 76, 10, 2139],
  [2176, 79, 12, 2217],
  [2261, 81, 2, 2297],
  [2349, 70, 9, 2368],
  [2425, 73, 8, 2454],
  [2498, 106, 0, 2553],
  [2610, 76, 4, 2646],
  [2702, 57, 7, 2727],
  [2759, 104, 6, 2823],
  [2882, 83, 63, 2920],
  [2977, 78, 32, 3014],
  [3061, 66, 72, 3090],
  [3133, 99, 50, 3165],
  [3238, 89, 69, 3280],
  [3340, 77, 73, 3374],
  [3423, 54, 12, 3442],
  [3483, 85, 6, 3520],
  [3568, 94, 2, 3617],
  [3662, 84, 13, 3708],
  [3746, 90, 0, 3788],
  [3848, 82, 1, 3884],
  [3930, 95, 59, 3978],
  [4035, 81, 1, 4073],
  [4123, 60, 16, 4146],
  [4188, 56, 27, 4210],
  [4244, 82, 30, 4291],
  [4338, 80, 80, 4376],
  [4429, 59, 13, 4456],
  [4494, 87, 0, 4538],
  [4586, 80, 10, 4622],
  [4671, 82, 69, 4703],
  [4759, 57, 43, 4784],
  [4828, 77, 70, 4864],
  [4917, 67, 84, 4942],
  [4984, 69, 85, 5012]

];

// Integer-only pseudo-random, so the server and the browser draw the same garden.
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** One full copy of the strip, IW wide. `seed` varies the sway timing. */
function Strip({ seed, at, mirrored, side }: { seed: number; at: number; mirrored?: boolean; side?: boolean }) {
  const r = rng(seed);
  return (
    <div
      className={side ? "strip side" : "strip"}
      style={{ left: at, width: IW, height: IH, transform: mirrored ? "scaleX(-1)" : undefined }}
    >
      {SPRITES.map(([x, w, top, base]) => {
        const style: CSSProperties = {
          left: x,
          top,
          width: w,
          height: CUT - top,
          backgroundPosition: `${-x}px ${-top}px`,
          transformOrigin: `${base - x}px 100%`,
          animationDuration: `${(7 + r() * 5).toFixed(2)}s`,
          animationDelay: `${(-r() * 12).toFixed(2)}s`,
        };
        return <div key={x} className="flower sway" style={style} />;
      })}
      <div className="soil" style={{ top: CUT, width: IW, height: IH - CUT, backgroundPosition: `0 ${-CUT}px` }} />
    </div>
  );
}

export default function Garden() {
  return (
    <div className="scene" role="img" aria-label="A row of flowers swaying gently in a bed of soil.">
      <div className="bed" aria-hidden="true">
        <div className="strips" style={{ width: IW * 3, height: IH }}>
          <Strip seed={11} at={0} mirrored side />
          <Strip seed={7} at={IW} />
          <Strip seed={13} at={IW * 2} mirrored side />
        </div>
      </div>
    </div>
  );
}
