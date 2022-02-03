$(document).ready(function(){
    var screen_height = $(window).height();
    var screen_width = $(window).width();
    $("body").css({"min-height":screen_height,"min-width":screen_width});
    
    $("#room #desktopscr").click(function(e){
        $("#room").css({"transform":"scale(5)","transform-origin":"53% 41% 0px"});
        e.stopPropagation();
    });
    $("#room #bookrack").click(function(e){
        $("#room").css({"transform":"scale(3)","transform-origin":"90% 10% 0px"});
        e.stopPropagation();
    });
    $("#room").click(function(){
        $("#room").css({"transform":"scale(1)"});
    }); 
  });