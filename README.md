<div align="center">

# vid2ass
Convert videos to colored .ass subtitles

![image](https://user-images.githubusercontent.com/39013925/140237697-5f56b692-4bd1-46de-a58d-76df7d338f66.png)

https://www.youtube.com/watch?v=kMX65vN0Lxg
</div>

# Requirements
- [jp2a](https://github.com/cslarsen/jp2a)
- [node.js](https://nodejs.org/en/)

# Usage
First, open up `config.json` and modify any values if required.
```json
{
 "font": {
   "size": 10,
   "name": "Arial"
 },


 "video": {
  "video_name": "video.mp4",
  "fps": 4,
  "width": "50",
  "height": "15"
 },


 "start_at": 0
}
```

Place your video in the provided location, then run `node write_sub`;

Profit :+1:


# License
This project is distributed under the MIT License. See `LICENSE` for more information.
