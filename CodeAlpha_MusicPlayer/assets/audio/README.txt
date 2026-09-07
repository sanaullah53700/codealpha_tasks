VibeWave — Audio Files
=======================

Current state of this folder (every song has a real audio file — no
synthesized placeholders remain in use):

  heaven-on-earth.mp3        <- real file, from D:\music
  in-the-clouds.mp3          <- real file, from D:\music
  memories.mp3                <- real file, from D:\music (The Midnight)
  jaan-se-guzarte-hain.mp3    <- real file, from D:\music (Dhurandhar OST)
  mere-rashke-qamar.mp3       <- real file, from D:\music (Baadshaho OST)
  birds-of-a-feather.mp3      <- real file, from Downloads (Billie Eilish)
  die-with-a-smile.mp3        <- real file, from Downloads (Lady Gaga, Bruno Mars)

Filenames match each song's actual title/slug (renamed from the original
generic placeholder names for clarity — e.g. midnight-drive.mp3 is now
memories.mp3, since it holds The Midnight's "Memories").

The "Dil Lagaya Tha (Remix)" track was removed from the app entirely at the
user's request; its song entry, audio file, and artwork have all been deleted.

*** COPYRIGHT NOTICE ***
memories.mp3, jaan-se-guzarte-hain.mp3, mere-rashke-qamar.mp3,
birds-of-a-feather.mp3, and die-with-a-smile.mp3 are commercially released,
copyrighted recordings — NOT original or royalty-free audio. They were
added at the user's explicit request for local development/testing only.
Do NOT push them to a public GitHub repo, a public portfolio, or submit
them as part of a CodeAlpha (or any) public submission — that would be
copyright infringement. Before publishing this project publicly:
  1. Remove these 5 files, and
  2. Regenerate original synthesized placeholders (sine-wave additive
     synthesis, no samples — see the conversation history for the approach
     originally used), or replace them with your own legally obtained /
     royalty-free tracks,
  3. Update the matching "audio" paths in script.js to match.

heaven-on-earth.mp3 and in-the-clouds.mp3 were also supplied by the user from
their own local files; verify you have the right to distribute them before
making the project public.

TO REPLACE ANY TRACK:
1. Add your file to this folder.
2. Open script.js and update that song's "audio" path in the SONGS array to
   match the filename/extension (mp3, wav, ogg, m4a all work).

If a file is ever missing, VibeWave will NOT crash. The player shows:
  "Audio file unavailable. Add the MP3 to assets/audio/"
and the song's duration in the track list will show "--:--" until the
file is added.
