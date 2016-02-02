window.onload = start;
var player;

  function start(){
    createBoard();
    whoStarts();
  }

  function createBoard(){
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
      $("#playerTurn").html("Black's Turn");
      turn = 2;
    }else {
      $("#playerTurn").html("Red's Turn");
      turn = 3;
    }
  }

  function nextTurn(){
    player = turn % 2 === 1 ? 'Red' : 'Black';
    $("#playerTurn").html(player+"'s Turn");
  }

  function checkWinner(){
    if ($('.c1.r6').hasClass('black') && $('.c1.r5').hasClass('black') && $('.c1.r4').hasClass('black') && $('.c1.r3').hasClass('black')){
      alert('black wins!');
      clearBoard();
      start();
    }
  }

  function c1listener(){
    var c1counter = $('.black.c1').length + $('.red.c1').length;
    var player = turn % 2 === 1 ? 'red' : 'black';
      switch (c1counter) {
        case 0:
          $('.r6.c1').addClass(player);
          break;
        case 1:
          $('.r5.c1').addClass(player);
          break;
        case 2:
          $('.r4.c1').addClass(player);
          break;
        case 3:
          $('.r3.c1').addClass(player);
          break;
        case 4:
          $('.r2.c1').addClass(player);
          break;
        case 5:
          $('.r1.c1').addClass(player);
          break;
        default :
          alert('That column is full. Try again.');
      }
      checkWinner();
      turn ++;
      nextTurn();
  }
          $('.b1').click(function(){
            c1listener();
          });

    function c2listener(){
    var c2counter = $('.black.c2').length + $('.red.c2').length;
      var player = turn % 2 === 1 ? 'red' : 'black';
      switch (c2counter) {
        case 0:
          $('.r6.c2').addClass(player);
          break;
        case 1:
          $('.r5.c2').addClass(player);
          break;
        case 2:
          $('.r4.c2').addClass(player);
          break;
        case 3:
          $('.r3.c2').addClass(player);
          break;
        case 4:
          $('.r2.c2').addClass(player);
          break;
        case 5:
          $('.r1.c2').addClass(player);
          break;
        default :
          alert('That column is full. Try again.');
      }
      checkWinner();
      turn ++;
      nextTurn();

  }
          $('.b2').click(function(){
            c2listener();
          });

    function c3listener(){
    var c3counter = $('.black.c3').length + $('.red.c3').length;
      var player = turn % 2 === 1 ? 'red' : 'black';
      switch (c3counter) {
        case 0:
          $('.r6.c3').addClass(player);
          break;
        case 1:
          $('.r5.c3').addClass(player);
          break;
        case 2:
          $('.r4.c3').addClass(player);
          break;
        case 3:
          $('.r3.c3').addClass(player);
          break;
        case 4:
          $('.r2.c3').addClass(player);
          break;
        case 5:
          $('.r1.c3').addClass(player);
          break;
        default :
          alert('That column is full. Try again.');
      }
      checkWinner();
      turn ++;
      nextTurn();
  }
          $('.b3').click(function(){
            c3listener();
          });

    function c4listener(){
    var c4counter = $('.black.c4').length + $('.red.c4').length;
      var player = turn % 2 === 1 ? 'red' : 'black';
      switch (c4counter) {
        case 0:
          $('.r6.c4').addClass(player);
          break;
        case 1:
          $('.r5.c4').addClass(player);
          break;
        case 2:
          $('.r4.c4').addClass(player);
          break;
        case 3:
          $('.r3.c4').addClass(player);
          break;
        case 4:
          $('.r2.c4').addClass(player);
          break;
        case 5:
          $('.r1.c4').addClass(player);
          break;
        default :
          alert('That column is full. Try again.');
      }
      checkWinner();
      turn ++;
      nextTurn();
  }
          $('.b4').click(function(){
            c4listener();
          });

    function c5listener(){
    var c5counter = $('.black.c5').length + $('.red.c5').length;
      var player = turn % 2 === 1 ? 'red' : 'black';
      switch (c5counter) {
        case 0:
          $('.r6.c5').addClass(player);
          break;
        case 1:
          $('.r5.c5').addClass(player);
          break;
        case 2:
          $('.r4.c5').addClass(player);
          break;
        case 3:
          $('.r3.c5').addClass(player);
          break;
        case 4:
          $('.r2.c5').addClass(player);
          break;
        case 5:
          $('.r1.c5').addClass(player);
          break;
        default :
          alert('That column is full. Try again.');
      }
      checkWinner();
      turn ++;
      nextTurn();
  }
          $('.b5').click(function(){
            c5listener();
          });

    function c6listener(){
    var c6counter = $('.black.c6').length + $('.red.c6').length;
      var player = turn % 2 === 1 ? 'red' : 'black';
      switch (c6counter) {
        case 0:
          $('.r6.c6').addClass(player);
          break;
        case 1:
          $('.r5.c6').addClass(player);
          break;
        case 2:
          $('.r4.c6').addClass(player);
          break;
        case 3:
          $('.r3.c6').addClass(player);
          break;
        case 4:
          $('.r2.c6').addClass(player);
          break;
        case 5:
          $('.r1.c6').addClass(player);
          break;
        default :
          alert('That column is full. Try again.');
      }
      checkWinner();
      turn ++;
      nextTurn();
  }
          $('.b6').click(function(){
            c6listener();
          });

    function c7listener(){
    var c7counter = $('.black.c7').length + $('.red.c7').length;
    var player = turn % 2 === 1 ? 'red' : 'black';
      switch (c7counter) {
        case 0:
          $('.r6.c7').addClass(player);
          break;
        case 1:
          $('.r5.c7').addClass(player);
          break;
        case 2:
          $('.r4.c7').addClass(player);
          break;
        case 3:
          $('.r3.c7').addClass(player);
          break;
        case 4:
          $('.r2.c7').addClass(player);
          break;
        case 5:
          $('.r1.c7').addClass(player);
          break;
        default :
          alert('That column is full. Try again.');
      }
      checkWinner();
      turn ++;
      nextTurn();
  }
      $('.b7').click(function(){
        c7listener();
      });

      function resetButton(){
        clearBoard();
        start();
      }
      $('#reset').click(function(){
        resetButton();
      });







