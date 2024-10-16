class Minimax {
    #board;
    #player;
    
    // human
    huPlayer = "X";
    // ai
    aiPlayer = "O";
    
    constructor(player) {
        this.#player = player;
        this.#board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    }

    findNextHit(lastHumanHit) {
      this.#board[lastHumanHit] = this.huPlayer;

      let bestShot = this.minimax(this.#board, this.aiPlayer).index;
      this.#board[bestShot] = this.aiPlayer;

      return bestShot;
    }

    minimax(newBoard, player){
        //available spots
        var availSpots = this.#emptyIndexes(newBoard);
      
        // checks for the terminal states such as win, lose, and tie and returning a value accordingly
        if (this.#winning(newBoard, this.huPlayer)){
           return {score:-10};
        }
          else if (this.#winning(newBoard, this.aiPlayer)){
          return {score:10};
          }
        else if (availSpots.length === 0){
            return {score:0};
        }
      
      // an array to collect all the objects
        var moves = [];
      
        // loop through available spots
        for (var i = 0; i < availSpots.length; i++){
          //create an object for each and store the index of that spot that was stored as a number in the object's index key
          var move = {};
            move.index = newBoard[availSpots[i]];
      
          // set the empty spot to the current player
          newBoard[availSpots[i]] = player;
      
          //if collect the score resulted from calling minimax on the opponent of the current player
          if (player == this.aiPlayer){
            var result = this.minimax(newBoard, this.huPlayer);
            move.score = result.score;
          }
          else{
            var result = this.minimax(newBoard, this.aiPlayer);
            move.score = result.score;
          }
      
          //reset the spot to empty
          newBoard[availSpots[i]] = move.index;
      
          // push the object to the array
          moves.push(move);
        }
      
      // if it is the computer's turn loop over the moves and choose the move with the highest score
        var bestMove;
        if(player === this.aiPlayer){
          var bestScore = -10000;
          for(var i = 0; i < moves.length; i++){
            if(moves[i].score > bestScore){
              bestScore = moves[i].score;
              bestMove = i;
            }
          }
        }else{
      
      // else loop over the moves and choose the move with the lowest score
          var bestScore = 10000;
          for(var i = 0; i < moves.length; i++){
            if(moves[i].score < bestScore){
              bestScore = moves[i].score;
              bestMove = i;
            }
          }
        }
      
      // return the chosen move (object) from the array to the higher depth
        return moves[bestMove];
      }


    // returns the available spots on the board
  #emptyIndexes(board){
    return  board.filter(s => s != this.aiPlayer && s != this.huPlayer);
  }

  #winning(board, player){
    if (
           (board[0] == player && board[1] == player && board[2] == player) ||
           (board[3] == player && board[4] == player && board[5] == player) ||
           (board[6] == player && board[7] == player && board[8] == player) ||
           (board[0] == player && board[3] == player && board[6] == player) ||
           (board[1] == player && board[4] == player && board[7] == player) ||
           (board[2] == player && board[5] == player && board[8] == player) ||
           (board[0] == player && board[4] == player && board[8] == player) ||
           (board[2] == player && board[4] == player && board[6] == player)
           ) {
           return true;
       } else {
           return false;
       }
   }
}

export default Minimax;