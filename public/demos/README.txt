Put your project demo videos in this folder with these exact names:

  callnexa.mp4         -> CallNexa
  speech-emotion.mp4   -> Speech Emotion Recognition
  desk-mate.mp4        -> Desk Mate

Tips: MP4 (H.264), 1280x720, 30-90 seconds, under ~15 MB each, no sound needed.
Prefer YouTube? Upload as "Unlisted" and in src/data.js change
  demo: { video: 'demos/callnexa.mp4' }   to   demo: { youtube: 'VIDEO_ID' }
(VIDEO_ID is the part after "v=" in the YouTube link.)
