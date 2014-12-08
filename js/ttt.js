$(document).ready(function(event) {
	
	// setting up new game
	var count = 0;

	var board = [
		[0, 0, 0], 
		[0, 0, 0], 
		[0, 0, 0]
	];

	hasWinner = 0;

	$("#playButton").text('play!')

	// updates message below board for players
	var messageBoard = function(x){
	  return $("#messageBoard").text(x);
	};

	var init = function(){
        turn = "";
        board =[
        	[0,0,0],
        	[0,0,0],
        	[0,0,0]
        ];
        $("td").map(function() {
            $(this).text("");
        }).get();
        hasWinner = 0;
        count=0;
        $('td').removeClass('yellowHover blueHover yellow blue')
        player1Name = $("#player-1-inp").val();
    		player2Name = $("#player-2-inp").val();
	}

	var draw = function(){
		if(winnerCheck() == false && count > 8) {
			messageBoard("It's a draw! Want to play again?");
			return true;
		};
	};

	// gathering player info and setting up clean board
	$("#playButton").click(function (){

    if(hasWinner==1 || draw() == true){
        init();
    }

    // setting variables equal to user name input
    player1Name = $("#player-1-inp").val();
    player2Name = $("#player-2-inp").val();

    // making sure there are no blank names
    if(player1Name=="" || player2Name==""){
        messageBoard("Please set all the player names.");
        return;
    }

		messageBoard(player1Name + ", choose your first position to begin the game.");

    // randomly set turn function
	});

	// hover classes for clear selection
	$( "td" ).hover(function() {
		if (count % 2 === 0) {
  		$(this).toggleClass('yellowHover');
  		return;
		} else {
  		$(this).toggleClass('blueHover');
  		return;
		};
	});

	// upon click change turns, countt++, change box value, check if winner
	$('td').click(function() {
		var row = $(this).parent().index();
 		var col = $(this).index();

 		if(player1Name=="" || player2Name==""){
      messageBoard("Please set all the player names.");
      return;
    }

 		// doesn't allow spot to be clicked on twice
 		if(board[row][col]!==0){
       messageBoard("This position is taken. Please try again.");
      return;
    };
		// if count is even, player 1 is yellow
		// if count is odd, player 2 is blue
		if (count % 2 === 0) {
			board[row][col] = 1;
			$(this).addClass('yellow');
			count++;
			messageBoard(player2Name + "'s turn. Click a circle to mark it blue.");
			draw();
			winnerCheck(1, player1Name);
		} else {
			board[row][col] = 2;
			$(this).addClass('blue');
			count++;
			messageBoard(player1Name + "'s turn. Click a circle to mark it yellow.");
			draw();
			winnerCheck(2, player2Name);
		};
	});

// playerValue refers to the value each player gave their tiles, respectively
var winnerCheck = function(playerValue, playerName){
  if(
      (board[0][0]==playerValue && board[0][1]==playerValue && board[0][2]==playerValue) ||
      (board[1][0]==playerValue && board[1][1]==playerValue && board[1][2]==playerValue) ||
      (board[2][0]==playerValue && board[2][1]==playerValue && board[2][2]==playerValue) ||

      (board[0][0]==playerValue && board[1][0]==playerValue && board[2][0]==playerValue) ||
      (board[0][1]==playerValue && board[1][1]==playerValue && board[2][1]==playerValue) ||
      (board[0][2]==playerValue && board[1][2]==playerValue && board[2][2]==playerValue) ||

      (board[0][0]==playerValue && board[1][1]==playerValue && board[2][2]==playerValue) ||
      (board[0][2]==playerValue && board[1][1]==playerValue && board[2][0]==playerValue)
    ){
  		hasWinner = 1;
  		messageBoard(playerName + " wins! Want to play again?");
  		$("#playButton").text('Play again!')
      return true;
    };
    return false;
	};
});