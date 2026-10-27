PLACE YOUR HERO VIDEO HERE
==========================
File name (exactly):  hero.mp4
Full path:            BiteBox/public/videos/hero.mp4

The homepage hero already points at /videos/hero.mp4. Drop the file in this folder and refresh.
Until the file exists, the hero shows a photo fallback (and still looks good).

Where to get a free burger/grill clip (check each clip's license page):
  https://mixkit.co/free-stock-video/burger/      (Mixkit License, no watermark)
  https://mixkit.co/free-stock-video/hamburger/
  https://www.pexels.com/search/videos/burger%20grill/   (Pexels License)

Compress it (recommended: 6-12 seconds, ~1280px wide, no audio, under ~3 MB):
  ffmpeg -i input.mp4 -t 10 -vf "scale=1280:-2" -an -c:v libx264 -crf 28 -preset slow -movflags +faststart public/videos/hero.mp4
