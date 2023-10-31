# Free JavaScript YouTube Search API
 Use YouTube's search API in JavaScript.

## Code 

### Get the video info
```javascript
async function get_youtube_video_info_function(youtubevideoid){
    localStorage.YouTubeVideoInformation_lifdjhefnkhbezjhbfiezbnfpijefoezjejekfnenfekfezfkbh = 'Function did not respond [YOU_CANT_RETURN_A_VALUE] | Wait please...';
  try {
    await fetch("https://images" + ~~(Math.random() * 33) + "-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=" + encodeURIComponent("https://www.youtube.com/watch?v=" + youtubevideoid)).then(response => {
    if (response.ok){
      response.text().then(data => {

        var regex = /(?:ytplayer\.config\s*=\s*|ytInitialPlayerResponse\s?=\s?)(.+?)(?:;var|;\(function|\)?;\s*if|;\s*if|;\s*ytplayer\.|;\s*<\/script)/gmsu;

        data = data.split('window.getPageData')[0];
        data = data.replace('ytInitialPlayerResponse = null', '');
        data = data.replace('ytInitialPlayerResponse=window.ytInitialPlayerResponse', '');
        data = data.replace('ytplayer.config={args:{raw_player_response:ytInitialPlayerResponse}};', '');

        var matches = regex.exec(data);
        
        var data = matches && matches.length > 1 ? JSON.parse(matches[1]) : false;
        
        localStorage.YouTubeVideoInformation_lifdjhefnkhbezjhbfiezbnfpijefoezjejekfnenfekfezfkbh = JSON.stringify(data.videoDetails);
      })
    }
  });

  const delay = s => new Promise(res => setTimeout(res, s*1000));
  
  var response_time = 0.1;
  await delay(0.1);
  
  while (localStorage.YouTubeVideoInformation_lifdjhefnkhbezjhbfiezbnfpijefoezjejekfnenfekfezfkbh == 'Function did not respond [YOU_CANT_RETURN_A_VALUE] | Wait please...') {
      response_time = response_time + 0.1;
      await delay(0.1);
  }

  return {
    informations: JSON.parse(localStorage.YouTubeVideoInformation_lifdjhefnkhbezjhbfiezbnfpijefoezjejekfnenfekfezfkbh),
    response_time: response_time
  };
  } catch (error) {
    return error;
  }
}
```

Exemple : `get_youtube_video_info_function('jNQXAC9IVRw')`
Returns :
```json
{
  "informations":{
    "videoId":"jNQXAC9IVRw",
    "title":"Me at the zoo",
    "lengthSeconds":"19",
    "keywords":[
      "me at the zoo",
      "jawed karim",
      "first youtube video"
    ],
    "channelId":"UC4QobU6STFB0P71PMvOGN5A",
    "isOwnerViewing":false,
    "shortDescription":"Chapters:\\n\\n00:00 Intro\\n00:05 The cool thing\\n00:17 End",
    "isCrawlable":true,
    "thumbnail":{
      "thumbnails":[
        {
          "url":"https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg?sqp=-oaymwE8CKgBEF5IWvKriqkDLwgBFQAAAAAYASUAAMhCPQCAokN4AfABAfgBvgKAAvABigIMCAAQARhlIGUoZTAP&rs=AOn4CLCA4WEUxNix4kzq4dH_JddBeiHVZw",
          "width":168,
          "height":94
        },
        {
          "url":"https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg?sqp=-oaymwE8CMQBEG5IWvKriqkDLwgBFQAAAAAYASUAAMhCPQCAokN4AfABAfgBvgKAAvABigIMCAAQARhlIGUoZTAP&rs=AOn4CLDYROITp8Odi8Xot8RCiPn0hb0xtg",
          "width":196,
          "height":110
        },
        {
          "url":"https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg?sqp=-oaymwE9CPYBEIoBSFryq4qpAy8IARUAAAAAGAElAADIQj0AgKJDeAHwAQH4Ab4CgALwAYoCDAgAEAEYZSBlKGUwDw==&rs=AOn4CLChAZFCb207iNi-sTl4WIrqzx62WQ",
          "width":246,
          "height":138
        },
        {
          "url":"https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg?sqp=-oaymwE9CNACELwBSFryq4qpAy8IARUAAAAAGAElAADIQj0AgKJDeAHwAQH4Ab4CgALwAYoCDAgAEAEYZSBlKGUwDw==&rs=AOn4CLDxXqCcuTwBZ-OZ_zpP8a1dK4YzNA",
          "width":336,
          "height":188
        }
      ]
    },
    "allowRatings":true,
    "viewCount":"292056040",
    "author":"jawed",
    "isPrivate":false,
    "isUnpluggedCorpus":false,
    "isLiveContent":false
  },
  "response_time":0.2
}
```

### Extact ID from video URL
```javascript
function get_id_of_video(video){
  const itemOfFromString = (item, from, splitby) => {
    return String(from).split(String(splitby))[(Number(item) - 1)] || '';
  }
  
  if (video.includes('youtube.com/embed')){ // YouTube Embed
    return itemOfFromString(2, itemOfFromString(1, video, '?'), 'youtube.com/embed/');
  } else if (video.includes('youtu.be')){ // youtu.be
    return itemOfFromString(2, itemOfFromString(1, video, '?'), 'youtu.be/');
  } else if (video.includes('?')){ // youtube.com/watch?v={ID} - Basic YouTube Video
    const queryString = '?' + itemOfFromString(2, video, '?');
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('v');
  } else if (video.includes('youtube.com/shorts')){ // YouTube Shorts
    return video.replace('youtube.com/shorts/', '');
  } else {
    throw Error('This is not a valid YouTube video URL.')
  }
}
```

Exemple : `get_id_of_video('https://www.youtube.com/watch?v=jNQXAC9IVRw&ab_channel=jawed')`

Returns : `jNQXAC9IVRw`
