$(document).ready(function(event) {
	
	// determines player's turn
	var count = 0;

	// setting up the div grid to access indexes
	var board = [
		[0, 0, 0], 
		[0, 0, 0], 
		[0, 0, 0]
	];

	// gathering player info and setting up clean board
	$("#playButton").click(function (){

    // if(hasWinner==1){
    //     init();
    // }

    // setting variables equal to user name input
    player1Name = $("#player-1-inp").val();
    player2Name = $("#player-2-inp").val();

    // making sure there are no blank names
    if(player1Name=="" || player2Name==""){
        alert("Please set player all the names.");
        return;
    }

    // setTurn();
	});

	// updates message below board for players
	function messageBoard(x){
	  return $("#messageBoard").text(x);
	};

	messageBoard("Player 1, choose your first position to begin the game.");


	// upon click change turns, countt++, change box value, check if winner
	$('td').click(function() {
		var row = $(this).parent().index();
 		var col = $(this).index();

 		// doesn't allow spot to be clicked on twice
 		if(board[row][col]!==0){
      alert("This position is taken. Please try again.");
      return;
    };
		// if count is even, player 1 is yellow
		// if count is odd, player 2 is blue
		if (count % 2 === 0) {
			messageBoard(player2Name + "'s turn. Click a circle to mark it blue.");
			$(this).addClass('yellow');
			count++;
			board[row][col] = 1;
			var ifWon = winnerCheck(1, player1Name);
		} else {
			messageBoard(player1Name + "'s turn. Click a circle to mark it yellow.");
			$(this).addClass('blue');
			count++;
			board[row][col] = 2;
			var ifWon = winnerCheck(2, player2Name);
		};
	});

// playerValue refers to the value each player gave their tiles, respectively
function winnerCheck(playerValue, playerName){
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
});