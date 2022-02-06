let hoverbook = true;
let currentActive = "no-book";
let book_opened = false;
let pagesOnLeft = [];


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
                $(this).find(".frontcover").addClass("turnleft");
                hoverbook = false;
                currentActive = getName;
            }else{
                // Add Hover and remove Select
                $(this).removeClass("selectbook");
                $(this).addClass("hoverbook");
                hoverbook = true;
                currentActive = "no-book";
                $(this).parent().removeClass("setZIndex");
                $(this).find(".frontcover").removeClass("turnleft");
                
                //Check if Pages are opened
            }
        }else{
            // Close Current Book, and Open new Book
            var getBook = $('*[alt="'+currentActive+'"]');
            getBook.removeClass("selectbook");
            getBook.addClass("hoverbook");
            getBook.parent().removeClass("setZIndex");
            getBook.find(".frontcover").removeClass("turnleft");
            
            //Check if Pages are opened

            $(this).removeClass("hoverbook");
            $(this).addClass("selectbook");
            $(this).parent().addClass("setZIndex");
            $(this).find(".frontcover").addClass("turnleft");
    
            hoverbook = false;
            currentActive = getName;
        }
    });

    // Turn Pages
    $(".page").click(function(e){
        var pageName = $(this).attr("alt");
        if(pageName != "lastpg"){
            var indexOfPage = jQuery.inArray(pageName, pagesOnLeft);
            var pgZind = parseInt($(this).css("z-index"));
            if (indexOfPage != -1){
                $(this).removeClass("turnpageleft");
                $(this).css({"z-index":(pgZind - parseInt(pageName[2])).toString()});
                pagesOnLeft.splice(indexOfPage,1);
                $(this).find(".pgcontent").css({"opacity":"1"});
            }else{
                $(this).addClass("turnpageleft");
                $(this).css({"z-index":(pgZind + parseInt(pageName[2])).toString()});
                $(this).find(".pgcontent").css({"opacity":"0"});
                pagesOnLeft.push(pageName);
            }
        }else{
            // Close book when last page is clicked
            var pgParent = $(this).parent();
            for(let i=(pagesOnLeft.length-1);i>=0;i--){
                var elm = pgParent.find('*[alt="'+pagesOnLeft[i]+'"]')
                elm.removeClass("turnpageleft");
                elm.css({"z-index":"90"});
                elm.find(".pgcontent").css({"opacity":"1"});
            }
            pagesOnLeft = [];
            pgParent.click()
        }
        e.stopPropagation();
    });

  });
