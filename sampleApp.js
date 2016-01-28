(function() {

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
    var player = DM.player(document.getElementById('player'),{});
  };

  function listVideos() {
    var listType = $(this).data('list-type');

    $('.video-item').remove();
    $('h2').text(config[listType].text);
    DM.api('/videos',
      config[listType].params,
      function(response){
        $.each(response.list, function( i, video ) {
          displayVideo(video);
        });

        $('.video-item').click(function() {
          player.load($(this).attr("data-video"));
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

  $('#list-choice').on('click', 'button', listVideos );

})();
