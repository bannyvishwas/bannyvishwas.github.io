let hoverbook = true;
let currentActive = "no-book";
 // Change Scale to 1 before refreshing
 $(window).bind('beforeunload',function(){
    $("#room").css({"transform":"scale(1)","transform-origin":"0% 0% 0px"});
});
$(document).ready(function(){
   // Change Height and width of Body
    /*var screen_height = $(window).height();
    var screen_width = $(window).width();
    $("body").css({"min-height":screen_height,"min-width":screen_width});
    */

    // Zoom Desktop
    $("#room #desktopscr").click(function(e){
        $("#room").css({"transform":"scale(5)","transform-origin":"53% 41% 0px"});
        e.stopPropagation();
    });

    //Zoom Bookrack
    $("#room #bookrack").click(function(e){
        $("#room").css({"transform":"scale(3)","transform-origin":"90% 10% 0px"});
        e.stopPropagation();
    });

    // Zoom Out Room
    $("#room").click(function(){
        $("#room").css({"transform":"scale(1)"});
    });
    
    // Books Animation
    $(".books").click(function(){
        var getName = $(this).attr("alt");
        if(currentActive === getName || currentActive === "no-book"){
            if (hoverbook === true){
                $(this).removeClass("hoverbook");
                $(this).addClass("selectbook");
                $(this).parent().addClass("setZIndex");
                hoverbook = false;
                currentActive = getName;
                
            }else{
                // Add Hover and remove Select
                $(this).removeClass("selectbook");
                $(this).addClass("hoverbook");
                hoverbook = true;
                currentActive = "no-book";
                $(this).parent().removeClass("setZIndex");
            }
        }else{
            // Close Current Book, and Open new Book
            var getBook = $('*[alt="'+currentActive+'"]');
            getBook.removeClass("selectbook");
            getBook.addClass("hoverbook");
            getBook.parent().removeClass("setZIndex");

            $(this).removeClass("hoverbook");
            $(this).addClass("selectbook");
            $(this).parent().addClass("setZIndex");

            hoverbook = false;
            currentActive = getName;
        }
    });
  });
