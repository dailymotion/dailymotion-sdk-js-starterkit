var config = {
  featured: {text:"Featured videos", params:{flags:"featured",fields:"id,title,thumbnail_120_url,url",limit: 20}},
  last: {text:"Last videos", params:{fields:"id,title,thumbnail_120_url,url",limit: 20}},
  trending: {text:"Trending videos", params:{sort:"trending",fields:"id,title,thumbnail_120_url,url",limit: 20}},
  live: {text:"Live streams", params:{flags:"live_onair",fields:"id,title,thumbnail_120_url,url",limit: 20}},
}


window.dmAsyncInit = function()
{
    DM.init();
    $('.choose-list').attr('disabled', false);
};


function listVideos(listType) {
  var video_items= $('.video-item') ;

  video_items.remove();
  $('h2').text(config[listType].text);
  DM.api('/videos', 
    config[listType].params, 
    function(response){
      $.each(response.list, function( i, video ) {
        displayVideo(video);
      });  

      video_items.click(function() {
        var player = DM.player(this, {
          video: $(this).attr("data-video"),
          params: {autoplay:true}}
        );
      });     
  }); 
}


function displayVideo(videoItem) {

  var videoDiv = $( "<div/>", {
    "class": "video-item",
    "data-video": videoItem.id
  });

  // thumbnail and link to video
  var $thumbnail = $( "<img/>", {
    src: videoItem.thumbnail_120_url,
    alt: videoItem.title,
  }).appendTo($(videoDiv));
  
  // video title
  var videoTitle = $( "<div/>", {
    text: videoItem.title,
    class: "title"
  }).appendTo($(videoDiv));

 
  $('#videos-list').append(videoDiv);
}

