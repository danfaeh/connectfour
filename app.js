window.onload = menu;

var aiLock=0;
var lock = 0;
var redWins=0;
var blackWins=0;
var nearWin=0;
var aiSkill=0;

// human listener
$('#human').click(function(){
  $('#menu1').hide();
  $('#menu2').show();
  document.myform.redName.focus();
});

// ai listener
$('#ai').click(function(){
  $('#menu1').hide();
  $('#menu3').show();
  document.aiform.humanName.focus();
});

// Lets Play human! listener
$('#humanSubmit').click(function(e){
    e.preventDefault();
      aiLock=0;
      $redPlayer = $('#redPlayer').val();
      $blackPlayer = $('#blackPlayer').val();
      $('#menu2').hide();
      $('#game').show();
      setupGame();
});

// Lets Play ai! listener
  $('#aiSubmit').click(function(e){
    e.preventDefault();
      aiLock=1;
      $humanPlayer = $('#humanPlayer').val();
      aiSkill = $('input[name="radio"]:checked').val();
      $('#menu3').hide();
      $('#game').show();
      setupGame();
});

// Set Piece-Drop Listener
$('#dropBar').click(function(e){
 lock === 0 ? addPiece(e.target.id) : null;
});

// Set NewGame Listener
$('#reset').click(function(){
  resetGame();
});

// Set Main Menu Listener
$('#backToMenu').click(function(){
  clearBoard();
  redWins=0;
  blackWins=0;
  menu();
});

  function menu(){
    $('#game').hide();
    $('#menu1').show();
    $('#menu2').hide();
    $('#menu3').hide();
  }

  function setupGame(){
    lock=0;
    nearWin= 0;
    createBoard();
    whoStarts();
  }

  function createBoard(){
    if (aiLock==1){
      $('#redWins').html('<br/>'+'AI : <br/>'+redWins);
      $('#blackWins').html('<br/>'+$humanPlayer+' : <br/>'+blackWins);
    }else {
      $('#blackWins').html('<br/>'+$blackPlayer+' : <br/>'+blackWins);
      $('#redWins').html('<br/>'+$redPlayer+' : <br/>'+redWins);
    }

    for (var k=1; k<8; k++) {
      $('#hoverRow').append('<td class="r0 '+k+'"></td>');
    }

    for (i=1; i<7;i++){
      for(j=1;j<8;j++){
        $('#row'+i).append('<td class="r'+i+' c'+j+'"></td>');
      }
    }

      $('.c1').click(function(){
        lock === 0 ? addPiece('c1') : null;
      });

      $('.c2').click(function(){
        lock === 0 ? addPiece('c2') : null;
      });

      $('.c3').click(function(){
        lock === 0 ? addPiece('c3') : null;
      });

      $('.c4').click(function(){
        lock === 0 ? addPiece('c4') : null;
      });

      $('.c5').click(function(){
        lock === 0 ? addPiece('c5') : null;
      });

      $('.c6').click(function(){
        lock === 0 ? addPiece('c6') : null;
      });

      $('.c7').click(function(){
        lock === 0 ? addPiece('c7') : null;
      }); 

      hoverListeners("black"); 
  }

  function clearBoard(){
    for(var k=1;k<8;k++){
      $('.r0.'+k).remove();
    }

    for (var i=1; i<7;i++){
      for(j=1;j<8;j++){
        $('.r'+i+'.c'+j).remove();
      }
    }
  }

  function whoStarts() {
    if (aiLock === 1) {
      $("#playerTurn").html($humanPlayer+"'s Turn");
      turn = 2;
      hoverListeners(); 
    } 
    else {
      if (Math.random() > 0.5) {
        $("#playerTurn").html($blackPlayer+"'s Turn");
        turn = 2;
      }else {
        $("#playerTurn").html($redPlayer+"'s Turn");
        turn = 3;
      }
      player = turn % 2 === 1 ? $redPlayer : $blackPlayer;
      hoverListeners(player); 
    } 

    

    // clickListeners();
  }

  function resetGame(){
    lock=0;
    nearWin = 0;
    clearBoard();
    setupGame();
  }

  function nextTurn(){
    // if (gameType="2player"){
    if (aiLock === 1) {
      player = turn % 2 === 1 ? 'AI Thinking...' : $humanPlayer +"'s Turn";
      $("#playerTurn").html(player);
      $redPlayer = 'Computer';
      $blackPlayer = $humanPlayer;
    }else{
      player = turn % 2 === 1 ? $redPlayer : $blackPlayer;
      $("#playerTurn").html(player+"'s Turn");
    }

    hoverListeners(player);
    // clickListeners(); 
  }

  function addPiece(col){
      var colCounter = $('.black.'+col).length + $('.red.'+col).length;
      var row = 6 - colCounter;
      var player = turn % 2 === 1 ? 'red' : 'black';

        if (colCounter>5){
          alert('That column is full. Try again.');
        } else{
        $('.r'+row+'.'+col).addClass(player);}

      checkWinner(row,Number(col[1]),player);
      turn ++;
      nextTurn();

    if (aiLock===1 && lock ===0){
      setTimeout(function () {
        aiMove(row,Number(col[1]),player);
      } ,2000);
    }
  }

  function checkWinner(row,col,player){
    checkLeft(row,col,player);
    checkRight(row,col,player);
    checkDown(row,col,player);

    checkUR(row,col,player);
    checkUL(row,col,player);
    checkDR(row,col,player);
    checkDL(row,col,player);

    //checking middles
    checkLR1(row,col,player);
    checkLR2(row,col,player);
    checkURDL1(row,col,player);
    checkURDL2(row,col,player);
    checkULDR1(row,col,player);
    checkULDR2(row,col,player);
  }

    function winner(player){ 
        if (player=== 'black'){
          blackWins ++;
            $('#blackWins').html('<br/>'+$blackPlayer+' : <br/>'+blackWins);
            alert('Great job '+$blackPlayer+' you win!');
        } else {
          redWins ++;

          if (aiLock===1) {
            $('#redWins').html('<br/>AI : <br/>'+redWins);
            alert('<Computer> "You didnt see that coming!?!? Silly human..."');
          }else{
          $('#redWins').html('<br/>'+$redPlayer+' : <br/>'+redWins);
          alert('Great job '+$redPlayer+' you win!');
          }
        }
        lock = 1;
    }

    function checkLeft(row,col,player){
      if ($('.r'+row+'.c'+(col-1)+'.'+player).length>0){
        if ($('.r'+row+'.c'+(col-2)+'.'+player).length>0){
          nearWin = 1;
          if ($('.r'+row+'.c'+(col-3)+'.'+player).length>0){
            winner(player);
          }
        }
      }
    }

    function checkRight(row,col,player){
      if ($('.r'+row+'.c'+(col+1)+'.'+player).length>0){
        if ($('.r'+row+'.c'+(col+2)+'.'+player).length>0){
          nearWin = 3;
          if ($('.r'+row+'.c'+(col+3)+'.'+player).length>0){
            winner(player);
          }
        }
      }
    }

    function checkDown(row,col,player){
      if ($('.r'+(row+1)+'.c'+col+'.'+player).length>0){
        if ($('.r'+(row+2)+'.c'+col+'.'+player).length>0){
          nearWin = 2;
          if ($('.r'+(row+3)+'.c'+col+'.'+player).length>0){
            winner(player);
          }
        }
      }
    }

    function checkUR(row,col,player){
      if ($('.r'+(row-1)+'.c'+(col+1)+'.'+player).length>0){
        if ($('.r'+(row-2)+'.c'+(col+2)+'.'+player).length>0){
          nearWin = 3;
          if ($('.r'+(row-3)+'.c'+(col+3)+'.'+player).length>0){
            winner(player);
          }
        }
      }
    }

    function checkUL(row,col,player){
      if ($('.r'+(row-1)+'.c'+(col-1)+'.'+player).length>0){
        if ($('.r'+(row-2)+'.c'+(col-2)+'.'+player).length>0){
          nearWin = 1;
          if ($('.r'+(row-3)+'.c'+(col-3)+'.'+player).length>0){
            winner(player);
          }
        }
      }
    }

    function checkDR(row,col,player){
      if ($('.r'+(row+1)+'.c'+(col+1)+'.'+player).length>0){
        if ($('.r'+(row+2)+'.c'+(col+2)+'.'+player).length>0){
          nearWin = 3;
          if ($('.r'+(row+3)+'.c'+(col+3)+'.'+player).length>0){
            winner(player);
          }
        }
      }
    }

    function checkDL(row,col,player){
      if ($('.r'+(row+1)+'.c'+(col-1)+'.'+player).length>0){
        if ($('.r'+(row+2)+'.c'+(col-2)+'.'+player).length>0){
          nearWin = 1;
          if ($('.r'+(row+3)+'.c'+(col-3)+'.'+player).length>0){
            winner(player);
          }
        }
      }
    }

    function checkLR1(row,col,player){
      if ($('.r'+row+'.c'+(col-1)+'.'+player).length>0){
        if ($('.r'+row+'.c'+(col+1)+'.'+player).length>0){
          nearWin = 1;
          if ($('.r'+row+'.c'+(col+2)+'.'+player).length>0){
            winner(player);
          }
        }
      }
    }

    function checkLR2(row,col,player){
      if ($('.r'+row+'.c'+(col+1)+'.'+player).length>0){
        if ($('.r'+row+'.c'+(col-1)+'.'+player).length>0){
          nearWin = 1;
          if ($('.r'+row+'.c'+(col-2)+'.'+player).length>0){
            winner(player);
          }
        }
      }
    }

    function checkURDL1(row,col,player){
      if ($('.r'+(row+1)+'.c'+(col-1)+'.'+player).length>0){
        if ($('.r'+(row+2)+'.c'+(col-2)+'.'+player).length>0){
          nearWin = 1;
          if ($('.r'+(row-1)+'.c'+(col+1)+'.'+player).length>0){
            winner(player);
          }
        }
      }
    }

    function checkURDL2(row,col,player){
      if ($('.r'+(row+1)+'.c'+(col-1)+'.'+player).length>0){
        if ($('.r'+(row-1)+'.c'+(col+1)+'.'+player).length>0){
          nearWin = 1;
          if ($('.r'+(row-2)+'.c'+(col+2)+'.'+player).length>0){
            winner(player);
          }
        }
      }
    }

    function checkULDR1(row,col,player){
      if ($('.r'+(row-1)+'.c'+(col-1)+'.'+player).length>0){
        if ($('.r'+(row-2)+'.c'+(col-2)+'.'+player).length>0){
          nearWin = 1;
          if ($('.r'+(row+1)+'.c'+(col+1)+'.'+player).length>0){
            winner(player);
          }
        }
      }
    }

    function checkULDR2(row,col,player){
      if ($('.r'+(row-1)+'.c'+(col-1)+'.'+player).length>0){
        if ($('.r'+(row+1)+'.c'+(col+1)+'.'+player).length>0){
          nearWin = 1;
          if ($('.r'+(row+2)+'.c'+(col+2)+'.'+player).length>0){
            winner(player);
          }
        }
      }
    }

    function aiMove(lastRow,lastCol,lastPlayer){
      var aiCol = Math.ceil(Math.random()*7.07);
      var colCounter = $('.black.c'+aiCol).length + $('.red.c'+aiCol).length;
      var aiRow = 6 - colCounter;
      var player = turn % 2 === 1 ? 'red' : 'black';

      if (aiSkill > 1) {
        nearWin=false;
        checkWinner(lastRow,lastCol,lastPlayer);
        if (nearWin>0){
          aiCol = calculate(lastCol);
          colCounter = $('.black.c'+aiCol).length + $('.red.c'+aiCol).length;
          aiRow = 6 - colCounter;
          
          $('.r'+aiRow+'.c'+aiCol).addClass(player);
        }else{
        $('.r'+aiRow+'.c'+aiCol).addClass(player);
        }
      }

      $('.r'+aiRow+'.c'+aiCol).addClass(player);
      checkWinner(aiRow,Number(aiCol),player);
      turn ++;
      nextTurn();
    }

    function calculate(col){
      if (nearWin===1) {
        col ++;
      }else if(nearWin===2) {
        col = col;
      }else{
        col --;
      }
      return col;
    }

    function hoverListeners(player) {
      var color;
      if (aiLock===0){
        color = player === $blackPlayer  ? "black" : "red";
      }else{
        color="black";
      }

      $('.c1').hover(function(){
        $('.r0.1').css("background-color",color);
      },function(){
        $('.r0.1').css("background-color","transparent");
      });

      $('.c2').hover(function(){
        $('.r0.2').css("background-color",color);
      },function(){
        $('.r0.2').css("background-color","transparent");
      });

      $('.c3').hover(function(){
        $('.r0.3').css("background-color",color);
      },function(){
        $('.r0.3').css("background-color","transparent");
      });

      $('.c4').hover(function(){
        $('.r0.4').css("background-color",color);
      },function(){
        $('.r0.4').css("background-color","transparent");
      });

      $('.c5').hover(function(){
        $('.r0.5').css("background-color",color);
      },function(){
        $('.r0.5').css("background-color","transparent");
      });

      $('.c6').hover(function(){
        $('.r0.6').css("background-color",color);
      },function(){
        $('.r0.6').css("background-color","transparent");
      });

      $('.c7').hover(function(){
        $('.r0.7').css("background-color",color);
      },function(){
        $('.r0.7').css("background-color","transparent");
      });      
    }

    // function clickListeners() {

  

    // }

