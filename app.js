window.onload = start;

var lock = 0;
var redWins=0;
var blackWins=0;

// 2player listener
$('#2player').click(function(){
  $('#menu1').hide();
  $('#menu2').show();
  document.myform.redName.focus();
});

// Lets Play! listener
$('#btnSubmit').click(function(e){
  e.preventDefault();
  $redPlayer = $('#redPlayer').val();
  $blackPlayer = $('#blackPlayer').val();
  $('#menu2').hide();
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

$('tbody').on('mouseover', function(){
  
});

  function start(){
    $('#menu2').hide();
    $('#game').hide();
    $('#menu1').show();
  }

  function setupGame(){
    createBoard();
    whoStarts();
  }

  function createBoard(){
    $('#blackWins').html('<br/>'+$blackPlayer+' : <br/>'+blackWins);
    $('#redWins').html('<br/>'+$redPlayer+' : <br/>'+redWins);

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
    if (Math.random() > 0.5) {
      $("#playerTurn").html($blackPlayer+"'s Turn");
      turn = 2;
    }else {
      $("#playerTurn").html($redPlayer+"'s Turn");
      turn = 3;
    }
  }

  function resetGame(){
    lock=0;
    clearBoard();
    setupGame();
  }

  function nextTurn(){
    // if (gameType="2player"){
    player = turn % 2 === 1 ? $redPlayer : $blackPlayer;
    $("#playerTurn").html(player+"'s Turn");
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
        $('#redWins').html('<br/>'+$redPlayer+' : <br/>'+redWins);
        alert('Great job '+$redPlayer+' you win!');
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
