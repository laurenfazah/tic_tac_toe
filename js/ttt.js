$(document).ready(function(event) {
	
	// setting up new game
	var count = 0;

	var board = [
		[0, 0, 0], 
		[0, 0, 0], 
		[0, 0, 0]
	];

	hasWinner = 0;

	// updates message below board for players
	function messageBoard(x){
	  return $("#messageBoard").text(x);
	};

	messageBoard("Please enter your names to start the game!");

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
        $('td').addClass('reset')
	}

	// gathering player info and setting up clean board
	$("#playButton").click(function (){

    if(hasWinner==1){
        init();
    }

    // setting variables equal to user name input
    player1Name = $("#player-1-inp").val();
    player2Name = $("#player-2-inp").val();

    // making sure there are no blank names
    if(player1Name=="" || player2Name==""){
        alert("Please set player all the names.");
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
      alert("Please set player all the names.");
      return;
    }

 		// doesn't allow spot to be clicked on twice
 		if(board[row][col]!==0){
      alert("This position is taken. Please try again.");
      return;
    };
		// if count is even, player 1 is yellow
		// if count is odd, player 2 is blue
		if (count % 2 === 0) {
			board[row][col] = 1;
			$(this).addClass('yellow');
			count++;
			winnerCheck(1, player1Name);
			draw();
			messageBoard(player2Name + "'s turn. Click a circle to mark it blue.");
		} else {
			board[row][col] = 2;
			$(this).addClass('blue');
			count++;
			winnerCheck(2, player2Name);
			draw();
			messageBoard(player1Name + "'s turn. Click a circle to mark it yellow.");
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
    		alert(playerName + " wins!");
        hasWinner = 1;
        return true;
      };
      return false;
		};

	var draw = function(){
		if(count == 9) {
			messageBoard("It's a draw!");
		};
	};


});