window.onload = menu;

var aiLock=0;
var lock = 0;
var redWins=0;
var blackWins=0;

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

// $('tbody').on('mouseover', function(){
//   ///
// });

  function menu(){
    $('#game').hide();
    $('#menu1').show();
    $('#menu2').hide();
    $('#menu3').hide();
  }

  function setupGame(){
    lock=0;
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

    for (i=1; i<7;i++){
      for(j=1;j<8;j++){
        $('#row'+i).append('<td class="r'+i+' c'+j+'"></td>');
      }
    }
  }

  function clearBoard(){
    for (i=1; i<7;i++){
      for(j=1;j<8;j++){
        $('.r'+i+'.c'+j).remove();
      }
    }
  }

  function whoStarts() {
    if (aiLock === 1) {
                if (Math.random() > 0.5) {
                  $("#playerTurn").html($humanPlayer+"'s Turn");
                  turn = 2;
                }else {
                  $("#playerTurn").html("AI Thinking...");
                  turn = 3;
                }  
    } else {
      if (Math.random() > 0.5) {
        $("#playerTurn").html($blackPlayer+"'s Turn");
        turn = 2;
      }else {
        $("#playerTurn").html($redPlayer+"'s Turn");
        turn = 3;
      }
    } 
  }

  function resetGame(){
    lock=0;
    clearBoard();
    setupGame();
  }

  function nextTurn(){
    // if (gameType="2player"){
    if (aiLock === 1) {
      player = turn % 2 === 1 ? 'AI Thinking' : $humanPlayer +"'s Turn";
      $("#playerTurn").html(player);
      $redPlayer = 'Computer';
      $blackPlayer = $humanPlayer;
      console.log(turn);
    }else{
      player = turn % 2 === 1 ? $redPlayer : $blackPlayer;
      $("#playerTurn").html(player+"'s Turn");
    }
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
  }

  function checkWinner(row,col,player){
    checkLeft(row,col,player);
    checkRight(row,col,player);
    checkDown(row,col,player);

    checkUR(row,col,player);
    checkUL(row,col,player);
    checkDR(row,col,player);
    checkDL(row,col,player);
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
          if ($('.r'+row+'.c'+(col-3)+'.'+player).length>0){
            winner(player);
          }
        }
      }
    }

    function checkRight(row,col,player){
      if ($('.r'+row+'.c'+(col+1)+'.'+player).length>0){
        if ($('.r'+row+'.c'+(col+2)+'.'+player).length>0){
          if ($('.r'+row+'.c'+(col+3)+'.'+player).length>0){
            winner(player);
          }
        }
      }
    }

    function checkDown(row,col,player){
      if ($('.r'+(row+1)+'.c'+col+'.'+player).length>0){
        if ($('.r'+(row+2)+'.c'+col+'.'+player).length>0){
          if ($('.r'+(row+3)+'.c'+col+'.'+player).length>0){
            winner(player);
          }
        }
      }
    }

    function checkUR(row,col,player){
      if ($('.r'+(row-1)+'.c'+(col+1)+'.'+player).length>0){
        if ($('.r'+(row-2)+'.c'+(col+2)+'.'+player).length>0){
          if ($('.r'+(row-3)+'.c'+(col+3)+'.'+player).length>0){
            winner(player);
          }
        }
      }
    }

    function checkUL(row,col,player){
      if ($('.r'+(row-1)+'.c'+(col-1)+'.'+player).length>0){
        if ($('.r'+(row-2)+'.c'+(col-2)+'.'+player).length>0){
          if ($('.r'+(row-3)+'.c'+(col-3)+'.'+player).length>0){
            winner(player);
          }
        }
      }
    }

    function checkDR(row,col,player){
      if ($('.r'+(row+1)+'.c'+(col+1)+'.'+player).length>0){
        if ($('.r'+(row+2)+'.c'+(col+2)+'.'+player).length>0){
          if ($('.r'+(row+3)+'.c'+(col+3)+'.'+player).length>0){
            winner(player);
          }
        }
      }
    }

    function checkDL(row,col,player){
      if ($('.r'+(row+1)+'.c'+(col-1)+'.'+player).length>0){
        if ($('.r'+(row+2)+'.c'+(col-2)+'.'+player).length>0){
          if ($('.r'+(row+3)+'.c'+(col-3)+'.'+player).length>0){
            winner(player);
          }
        }
      }
    }

    function aiMove(){
      var column = Math.round(Math.random()*7.07);

    }
