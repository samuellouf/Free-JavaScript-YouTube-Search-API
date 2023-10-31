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
