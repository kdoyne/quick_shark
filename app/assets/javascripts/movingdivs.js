
  KeyboardJS.on('down', function() {
    reset();
    $("div#define")[0].style.top = "5%";
    $("div#pictures")[0].style.top = "105%";
    // ajax get for description
    $.ajax({
      url: "/description",
      data: {name: $("h1").text()},
      dataType: "text",
      success: function(result){$("div#define p#description").text(result)}
    });
    // ajax get for definitions
    $.ajax({
      url: "/definitions",
      data: {name: $("h1").text()},
      dataType: "JSON",
      success: function(result){
        $("div#definitions p").remove();
        $("div#reverse_definitions p").remove();
        $.each(result[0]["definitions"], function(index, value){
        $("div#definitions").append($("<p>").text(value["text"]))
          })
        $.each(result[0]["reverse_definitions"]["results"], function(index, value){
        $("div#reverse_definitions").append($("<p>").text(value["text"]))
          });
      }
    });
  });

  KeyboardJS.on('up', function() {
    reset();
    $("div#pictures")[0].style.top = "5%";
    $("div#define")[0].style.top = "-105%";
    // ajax get for pictures
    $.ajax({
      url: "/pictures",
      data: {name: $("h1").text()},
      dataType: "text",
      success: function(result){
        $("div#pictures img").remove();
        $("div#pictures").append("<img src="+result+" >");
      }
    });
  });

  KeyboardJS.on('left', function() {
    reset();
    $("div#stats")[0].style.left = "5%";
    $("div#videos")[0].style.left = "-105%";
    // ajax get for stats from wolfram
    $.ajax({
      url: "/stats",
      data: {name: $("h1").text()},
      dataType: "JSON",
      success: function(result){
        $("div#stats div").remove();
        for(i=0; i < result.length; i++) {
          $("div#stats").append("<div class='stats'><img src='"+result[i]["image"]["src"]+"' ></div>");
        }
      }
    })
  });

  KeyboardJS.on('right', function() {
    reset();
    $("div#videos")[0].style.left = "5%";
    $("div#stats")[0].style.left = "105%";
    $.ajax({
      url: "/ytdata",
      data: {name: $("h1").text()},
      dataType: "JSON",
      success: function(result){
        $('iframe').remove();
        $('button').remove();
        // $("div#videos").append($("<button>").text("Refresh"))
        for ( var i = 0; i < 4; i++ ){
        $('<iframe height="425" width="320">').attr( "src", 'http://www.youtube.com/embed/' + result.items[i].id.videoId + '').append('div#videos');
        }
      }
    })
  });

  // var videoIndex = 4;

  // var refreshButton = function(){
  //   $('button.refresh').click(function() {
  //   $('iframe').remove();
  //   for ( var i = 0; i < 4; i++ ){
  //       $('<iframe width="420" height="345">').attr( "src", 'http://www.youtube.com/embed/' + videos.items[(i+videoIndex) % 50].id.videoId + '').appendTo('div.Youtube-videos');
  //     }
  //   videoIndex += 4;
  //   });
  // }

  var reset = function() {
    $("div#define")[0].style.top = "-105%";
    $("div#pictures")[0].style.top = "105%";
    $("div#videos")[0].style.left = "-105%";
    $("div#stats")[0].style.left = "105%";
  }

  KeyboardJS.on('c', reset);
