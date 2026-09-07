VibeWave — Album Artwork
=========================

Original, non-copyrighted placeholder artwork (generated SVG gradients) is
already included here for the app's 7 tracks, named to match each song:

  heaven-on-earth.svg
  in-the-clouds.svg
  memories.svg
  jaan-se-guzarte-hain.svg
  mere-rashke-qamar.svg
  birds-of-a-feather.svg
  die-with-a-smile.svg

"Heaven on the Earth" and "In the Clouds" share a warm cloud/sky palette
since they're both credited to L.D.B on the album "Time to Chill".

If any artwork ever fails to load (missing file, bad path), the app falls
back to heaven-on-earth.svg automatically instead of showing a broken image.

To use your own real photos/artwork instead:
1. Add your image as a .jpg (e.g. memories.jpg) in this folder.
2. Open script.js and change that song's "art" path from ".svg" to ".jpg"
   in the SONGS array near the top of the file.
3. Update the matching <img src="..."> paths in index.html
   (featuredArt / playerArt / mobilePlayerArt default sources).

Use only images you own or that are royalty-free / properly licensed.
