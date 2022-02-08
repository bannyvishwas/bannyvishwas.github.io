let hoverbook = true;
let currentActive = "no-book";
let book_opened = false;
let pagesOnLeft = [];
let pwd="";
var birdlist = ["flying-bird-blue.gif","flying-bird.gif","yellow-bird.gif"]


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

    //Zoom Photos
    $("#achievement").click(function(e){
        $("#room").css({"transform":"scale(2.5)","transform-origin":"0% 10% 0px"});
        e.stopPropagation();
    });

    //Zoom window
    $("#window").click(function(e){
        $("#room").css({"transform":"scale(2.3)","transform-origin":"40% 10% 0px"});
        e.stopPropagation();
    });

    // Zoom Desktop
    $("#room #desktopscr").click(function(e){
        $("#room").css({"transform":"scale(5)","transform-origin":"53% 41% 0px"});
        $("#room #desktopscr #loginscr").css({"display":"block"});
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

    $("#pwdfield").click(function(e){
        $("#invalidmsg").css({"display":"none"});
        e.stopPropagation();
    });

    $("#pwdfield").keyup(function(ev){
        pwd = this.value;
        var keycode = (ev.keyCode ? ev.keyCode : ev.which);
        if(keycode == 13) {
            $(".fa-arrow-right").click();
        }
    });

    // Desktop Animations
    $(".fa-arrow-right").click(function(e){
        if(pwd == "banny"){
            $("#loginscr").css({"display":"none"});
            $("#osdesktop").css({"display":"flex"});
        }else{
            $("#invalidmsg").css({"display":"block"});
        }
        e.stopPropagation();
    });

    //Open Application
    $("#taskbar i").click(function(e){
        var appname = $(this).attr("data");
        var class_name = $(this).attr("class");
        var innerM = "";
        if(appname == "github"){
            innerM ='<i class="'+class_name+'" aria-hidden="true"><br><b><a href="https://github.com/bannyvishwas" target="_blank"> Open Profile </a></b><br>https://github.com/bannyvishwas</i>';
        }else if(appname == "twitter"){
            innerM ='<i class="'+class_name+'" aria-hidden="true"><br><b><a href="https://twitter.com/vishwasbanny" target="_blank"> Open Profile </a></b><br>https://twitter.com/vishwasbanny</i>';
        }else if(appname == "linkedin"){
            innerM ='<i class="'+class_name+'" aria-hidden="true"><br><b><a href="https://www.linkedin.com/in/bannyvishwas/" target="_blank"> Open Profile </a></b><br>https://www.linkedin.com/in/bannyvishwas/</i>';
        }
        else if(appname == "map"){
            innerM ='<i class="'+class_name+'" aria-hidden="true"><br><b><a href="https://www.google.com/maps/place/Bijnor,+Uttar+Pradesh+246701/@29.3786329,78.10442,13z" target="_blank"> Open Google Map</a></b><br>Bijnor-246701, Uttar Pradesh (India)</i>';
        }
        else if(appname == "email"){
            innerM ='<i class="'+class_name+'" aria-hidden="true"><br><b><a href="mailto:banny.swan@gmail.com" target="_blank">Write Email</a></b><br>banny.swan@gmail.com</i>';
        }
        else if(appname == "mobile"){
            innerM ='<i class="'+class_name+'" aria-hidden="true"><br><b><a href="tel:+917535924371" target="_blank">Call</a></b><br>+91-7535924371</i>';
        }else{

        }
        $("#changetext").html(innerM);
        $("#messagetext").css({"display":"flex"});
        e.stopPropagation();
    });

    //Close application
    $(".windowclose").click(function(e){
        $("#messagetext").css({"display":"none"});
        e.stopPropagation();
    });

    setInterval(function(){
        //Bird animation
        //var getbird = "../assests/"+birdlist[parseInt(Math.random()*(birdlist.length))]
        var birdtype = parseInt(Math.random()*10);
        var birdsize =  parseInt(Math.random()*15);
        var flydir =  parseInt(Math.random()*10);
        var toph =  parseInt(Math.random()*15);
        if(birdtype < 3){
            $("#bluebird").removeClass("dirright");
            $("#yellowbird").removeClass("dirright");
            $("#redbird").css({"height":birdsize+"vh","width":birdsize+"vw","top":toph+"vh"});
            $("#redbird").addClass("dirright");
        }else if(birdtype < 6){
            $("#redbird").removeClass("dirright");
            $("#yellowbird").removeClass("dirright");
            $("#bluebird").css({"height":birdsize+"vh","width":birdsize+"vw","top":toph+"vh"});
            $("#bluebird").addClass("dirright");
        }else{
            $("#redbird").removeClass("dirright");
            $("#bluebird").removeClass("dirright");
            $("#yellowbird").css({"height":birdsize+"vh","width":birdsize+"vw","top":toph+"vh"});
            $("#yellowbird").addClass("dirright");
        }
    }, 11000);

    // Shape Clouds Randomly
    var c1 = parseInt(Math.random()*15);
    var c1t = parseInt(Math.random()*15);

    var c2 = parseInt(Math.random()*15);
    var c2t = parseInt(Math.random()*15);

    var c3 = parseInt(Math.random()*15);
    var c3t = parseInt(Math.random()*15);

    var clouddir = parseInt(Math.random()*10);

    $(".c1").css({"height":c1+"vh","width":c1+"vw","top":c1t+"vh"});
    $(".c2").css({"height":c2+"vh","width":c2+"vw","top":c2t+"vh"});
    $(".c3").css({"height":c3+"vh","width":c3+"vw","top":c3t+"vh"});

    if(clouddir > 5){
        $(".cloud").css({"animation-direction":"reverse"});
    }else{
        $(".cloud").css({"animation-direction":"normal"});
    }

  });
