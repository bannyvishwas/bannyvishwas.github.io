let hoverbook = true;
let currentActive = "no-book";
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