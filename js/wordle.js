var word = "";
var wordlist = [];
var activeRow = 0;
var activeItem = 0;
var answer= "";
var correct = false;
var scores = [0,0];

$(document).ready(function(){
  setTimeout(function(){
    var tempWord = $("#allwords").text();
    wordlist = tempWord.split("\r\n");
    startProcess();
  },2000);
  
  // Close popup
  $("#close").click(function(){
    $("#popup").css({"display":"none"});
  });

  // For Delete and Backspace
  $(document).keydown(function(e) {
    if(correct == false){
      if(e.keyCode == 8 || e.keyCode == 46){
        if(activeItem !=0 ){
          activeItem = activeItem - 1
          answer = answer.substring(0,(answer.length-1));
        }
        $("#grid").find(".row").eq(activeRow).find(".items").eq(activeItem).text("");
      }
    }
  });

    // hard keyboard press
    $(document).keypress(function(e) {
      if(activeItem<=5 && correct == false){
        var kcode = e.keyCode;
        if(kcode >= 97 && kcode <= 122){
          var vl = String.fromCharCode(kcode);
          $("#grid").find(".row").eq(activeRow).find(".items").eq(activeItem).text(vl);
          if(activeItem<5){
            activeItem = activeItem + 1;
            answer = answer + vl;
          }
        }else if(kcode == 8 || kcode==46){
          if(activeItem !=0 ){
            activeItem = activeItem - 1
            answer = answer.substring(0,(answer.length-1));
          }
          $("#grid").find(".row").eq(activeRow).find(".items").eq(activeItem).text("");
        }else if(kcode == 13 && activeItem == 5){
          // For Enter
            activeRow = activeRow + 1;
            activeItem = 0;
            checkAnswer();
          
        }else{
          //do nothing
        }
      }
  });

    // Button press
    $("#keyboard button").click(function(){
      var btntxt = $(this).text();
      if(activeItem<=5 && correct == false){
        if(btntxt != "Enter" && btntxt != "Back"){
          $("#grid").find(".row").eq(activeRow).find(".items").eq(activeItem).text(btntxt);
          if(activeItem<5){
            activeItem = activeItem + 1;
            answer = answer + btntxt;
          }
        }else if(btntxt == "Back"){
          // Back Btn
          if(activeItem !=0 ){
            activeItem = activeItem - 1
            answer = answer.substring(0,(answer.length-1));
          }
          $("#grid").find(".row").eq(activeRow).find(".items").eq(activeItem).text("");
        }
        else if(btntxt == "Enter" && activeItem == 5){
          //Enter Btn
          activeRow = activeRow + 1;
          activeItem = 0;
          checkAnswer();
        }else{
          //do nothing
        }
      }
    });

    // Next btn
    $("#nextbtn").click(function(){
      activeRow = 0;
      activeItem = 0;
      answer= "";
      correct = false;
      selectWord();
      $("#scores").css({"display":"none"});
      for(var i =0 ; i<6;i++){
        for(var j=0;j<5;j++){
          $("#grid").find(".row").eq(i).find(".items").eq(j).removeClass("graycard");
          $("#grid").find(".row").eq(i).find(".items").eq(j).removeClass("yellowcard");
          $("#grid").find(".row").eq(i).find(".items").eq(j).removeClass("greencard");
          $("#grid").find(".row").eq(i).find(".items").eq(j).text("");
        }
      }
    });
});

function startProcess(){
  // Select Word
  selectWord();
}
function checkAnswer(){
  var tempRow = activeRow -1;
  var count = 0;
  for(var i = 0; i<answer.length;i++){
    var c = answer.charAt(i).toUpperCase();
    if(word.indexOf(c) != -1){
      if(word.charAt(i) == c){
        //Convert to green
        $("#grid").find(".row").eq(tempRow).find(".items").eq(i).addClass("greencard");
        count = count + 1;
      }else{
        //convert to yellow
        $("#grid").find(".row").eq(tempRow).find(".items").eq(i).addClass("yellowcard");
      }
    }else{
      // Convert to gray
      $("#grid").find(".row").eq(tempRow).find(".items").eq(i).addClass("graycard");
    }
    $("#grid").find(".row").eq(tempRow).find(".items").eq(i).css({"animation": "cards 1s"});
  }
  answer = "";
  if(count == 5){
    correct = true;
    // Show Score Pop up
    showScore();
  }
  if(activeRow == 6){
    showScore();
  }

}

function selectWord(){
  var randomIndex = Math.floor(Math.random()*wordlist.length);
  word = wordlist[randomIndex];
  //console.log(word);
  if(word == ""){
    location.reload();
  }
}

function showScore(){
  if(correct){
    scores[0] += 1;
    scores[1] += 1;
    $("#oops").text("Awesome!");

  }else{
    scores[1] += 1;
    $("#oops").text("Oops! It was");
  }
  for(var i = 0; i<word.length;i++){
    $("#scores").find(".row").eq(0).find(".items").eq(i).text(word.charAt(i));
  } 
  $("#scoretxt").html("Score : <b>"+scores[0]+"/"+scores[1]+"</b>");
  $("#scores").css({"display":"flex"});
}