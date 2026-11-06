#!/usr/bin/env python3
"""
Re-encode the homepage hero art for the web.

The originals in src/assets/art/Homepage/ are 3968x3014 animated PNGs weighing
341 MB and 155 MB -- fine as masters, unusable in a browser. This turns them
into 2400px VP9/WebM (with an H.264/MP4 fallback), plus a poster still and
the seamless paper-grain tile the whole site's background is built from.

    pip install pillow numpy imageio-ffmpeg
    python scripts/encode-hero-art.py

Re-run this whenever the source artwork changes. PondHero.jsx switches from
the intro to the loop on the intro video's own `ended` event, so there is no
duration to keep in sync.
"""
import glob
import os
import re
import subprocess

import numpy as np
from PIL import Image, ImageFilter, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src", "assets", "art", "Homepage")
OUT = os.path.join(ROOT, "src", "assets", "home")

SRC_W, SRC_H = 3968, 3014  # native size of the masters

# 2400px keeps the hero sharp on a 2x display, where it renders around
# 1200 CSS px wide. VP9 carries it for ~2 MB; animated WebP needed 7 MB for
# the same pixels, which is why the hero is video rather than an <img>.
TARGET_W = 2400
VP9_CRF = 28
H264_CRF = 20

# The paper tile is still built from a still, at its own scale.
TILE_QUALITY = 80


def _ffmpeg():
    """Prefer a system ffmpeg; fall back to the one imageio-ffmpeg bundles."""
    from shutil import which
    exe = which("ffmpeg")
    if exe:
        return exe
    import imageio_ffmpeg
    return imageio_ffmpeg.get_ffmpeg_exe()


def probe(path):
    """Frame rate, frame count and duration, read off ffmpeg's stream banner.

    imageio-ffmpeg ships ffmpeg but not ffprobe, so we parse rather than
    shelling out to a second tool that may not be installed.
    """
    ff = _ffmpeg()
    banner = subprocess.run([ff, "-hide_banner", "-i", path],
                            capture_output=True, text=True).stderr
    fps = float(m.group(1)) if (m := re.search(r"(\d+(?:\.\d+)?)\s+fps", banner)) else 4.0
    dur = 0.0
    if (m := re.search(r"Duration:\s*(\d+):(\d+):(\d+\.\d+)", banner)):
        h, mn, sec = m.groups()
        dur = int(h) * 3600 + int(mn) * 60 + float(sec)
    return fps, dur, int(round(dur * fps))


def first_frame(path, width):
    ff = _ffmpeg()
    height = even(round(SRC_H * width / SRC_W))
    raw = subprocess.run(
        [ff, "-v", "error", "-i", path, "-frames:v", "1",
         "-vf", f"scale={width}:{height}:flags=lanczos",
         "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
        capture_output=True,
    ).stdout
    return Image.frombytes("RGB", (width, height), raw[:width * height * 3])


def even(n):
    return n - (n % 2)


def transcode(src, stem, width):
    """
    Emit a VP9/WebM and an H.264/MP4 of the same clip.

    Browsers pick one via <source>, so only a single file is ever fetched.
    VP9 is listed first because it is roughly a third the size at matching
    quality; the MP4 is there for anything that cannot decode VP9.
    """
    ff = _ffmpeg()
    height = even(round(SRC_H * width / SRC_W))
    scale = f"scale={width}:{height}:flags=lanczos"
    outputs = []

    webm = os.path.join(OUT, f"{stem}.webm")
    subprocess.run([ff, "-y", "-v", "error", "-i", src, "-vf", scale,
                    "-c:v", "libvpx-vp9", "-crf", str(VP9_CRF), "-b:v", "0",
                    "-row-mt", "1", "-pix_fmt", "yuv420p", "-an", webm], check=True)
    outputs.append(webm)

    mp4 = os.path.join(OUT, f"{stem}.mp4")
    subprocess.run([ff, "-y", "-v", "error", "-i", src, "-vf", scale,
                    "-c:v", "libx264", "-crf", str(H264_CRF), "-preset", "slow",
                    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
                    "-an", mp4], check=True)
    outputs.append(mp4)

    sizes = "  ".join(f"{os.path.basename(o)} {os.path.getsize(o) / 1e6:.2f} MB"
                      for o in outputs)
    print(f"{stem}: {width}x{height}  {sizes}")


def pick_sources():
    """
    Choose the intro and loop clips by length, not by filename.

    The masters have been exported more than once and the numbering does not
    agree between formats -- in the MP4 export "By_The_Pond.mp4" is the short
    bloomed loop while "By_The_Pond 2.mp4" is the long intro, the opposite of
    the APNG naming. Length is the reliable signal: the intro is the clip that
    builds from the calm pond, so it is always the longer of the two.
    """
    clips = sorted(glob.glob(os.path.join(SRC, "*.mp4")))
    if len(clips) < 2:
        raise SystemExit(f"expected two .mp4 source clips in {SRC}, found {len(clips)}")

    measured = sorted(((probe(c)[1], c) for c in clips), key=lambda m: m[0])
    (loop_dur, loop_src), (intro_dur, intro_src) = measured[0], measured[-1]
    print(f"intro <- {os.path.basename(intro_src)} ({intro_dur:.2f}s)")
    print(f"loop  <- {os.path.basename(loop_src)} ({loop_dur:.2f}s)")
    return (intro_src, intro_dur), (loop_src, loop_dur)


def paper_tile(n=700, amplitude=12, centre=130):
    """
    Build a seamless grain tile from a patch of the artwork's own paper ground.

    Mirroring a patch tiles cleanly but leaves an axis of symmetry that reads
    as a repeating blotch once it covers a page. Instead this cross-fades a
    2N-wide source down to N: fading S(x) in while S(x+N) fades out leaves the
    tile's first column equal to S(N) and its last equal to S(N-1) -- adjacent
    samples in the source -- so the wrap is continuous with no symmetry.

    The result is flattened to a narrow band around mid-grey and blended over
    the theme colour with `soft-light`, so one file textures both themes
    without tinting either.
    """
    master = Image.open(os.path.join(SRC, "By_The_Pond.png"))
    master.seek(0)
    patch = master.convert("RGB").crop((30, 30, 30 + 2 * n, 30 + 2 * n))
    s = np.asarray(
        ImageOps.grayscale(patch).filter(ImageFilter.GaussianBlur(0.8)),
        dtype=np.float64,
    )

    w = np.arange(n) / n
    p = s[:, :n] * w[None, :] + s[:, n:] * (1 - w)[None, :]
    t = p[:n, :] * w[:, None] + p[n:, :] * (1 - w)[:, None]

    t -= t.mean()
    t /= np.abs(t).max() or 1
    t = centre + t * amplitude

    arr = np.clip(t, 0, 255).astype("uint8")
    dst = os.path.join(OUT, "paper-grain.webp")
    # Lossless: at this amplitude, lossy artefacts at the tile edges are large
    # enough relative to the signal to reintroduce a visible seam.
    Image.fromarray(arr).convert("RGB").save(dst, format="WEBP", lossless=True, method=6)

    a = np.asarray(Image.open(dst).convert("L"), dtype=float)
    ratio_x = np.abs(a[:, 0] - a[:, -1]).mean() / np.abs(np.diff(a, axis=1)).mean()
    ratio_y = np.abs(a[0, :] - a[-1, :]).mean() / np.abs(np.diff(a, axis=0)).mean()
    print(f"paper-grain.webp: {n}x{n} {os.path.getsize(dst) / 1000:.0f} KB "
          f"seam/interior x={ratio_x:.2f} y={ratio_y:.2f} (1.0 = seamless)")


def main():
    os.makedirs(OUT, exist_ok=True)
    for stale in glob.glob(os.path.join(OUT, "pond-*.webp")):
        if not stale.endswith("pond-poster.webp"):
            os.remove(stale)

    (intro_src, _), (loop_src, _) = pick_sources()
    transcode(intro_src, "pond-intro", TARGET_W)
    transcode(loop_src, "pond-loop", TARGET_W)

    poster = os.path.join(OUT, "pond-poster.webp")
    first_frame(intro_src, 1280).save(poster, format="WEBP",
                                      quality=TILE_QUALITY, method=6)
    print(f"pond-poster.webp: {os.path.getsize(poster) / 1000:.0f} KB")

    paper_tile()


if __name__ == "__main__":
    main()
