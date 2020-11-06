export class FindWordOnBoard {
  word = "ABCCED";
  word1 = "CSEEC"; //check: "The same letter cell may not be used more than once"
  board = [["A","B","C","E"],["B","F","C","S"],["A","D","E","E"]];
  answer: boolean;

  constructor() { 
    this.answer = this.isWordOnBoard( this.word, this.board );
  }

  isWordOnBoard( word, board ): boolean {
    let possiblePaths = this.findFirstLetter(word[0], board);

    for ( let l = 1; l < word.length; l++ ) {
      let paths: {i: number, j: number}[] = this.checkNextLetter( possiblePaths, word[l], board );
      if ( paths.length == 0 ) {
        return false
      } else {
        for( let s = 0; s < possiblePaths.length; s++ ){
          board[possiblePaths[s].i][possiblePaths[s].j] = ''; // clean up used cell.
        }
        possiblePaths = paths;
      };
    }
    
    return true;
  }

  findFirstLetter( letter, board ): {i: number, j: number}[] {
    let possiblePaths : {i: number, j: number}[] = [];
    let xlength = board.length;
    let ylength = board[0].length;

    for( let i=0; i < xlength; i++ ){
      for( let j=0; j < ylength; j++) {
        if ( board[i][j] == letter ) { 
          possiblePaths.push( {i, j} );
        }
      }
    }

    return possiblePaths;
  }

  checkNextLetter( firstLettersArray, nextLetter, board ){
    let firstLettersCount = firstLettersArray.length;
    let possiblePaths: {i: number, j: number}[] = [];

    for ( let k=0; k < firstLettersCount; k++ ) {
      let result: {i: number, j: number}[] = this.checkNeighbors( firstLettersArray[k], nextLetter, board );
      result.map( item => possiblePaths.push(item) );
    }
    return possiblePaths;
  }  

  checkNeighbors( firstLetter, nextLetter, board ): {i: number, j: number}[]{
    //empty array for possible paths
    let possiblePaths: {i: number, j: number}[] = [];

    //shortening
    let x: number = firstLetter.j;
    let y: number = firstLetter.i;
    
    if( x < board[0].length-1 && board[y][x + 1] == nextLetter ) { //check right
      possiblePaths.push( {i: y, j: x+1} ) //add to possible paths
    };
    if( x > 0 && board[y][x - 1] == nextLetter ) { //check left
      possiblePaths.push( {i: y, j: x-1} )
    };
    if( y < board.length-1 && board[y + 1][x] == nextLetter ) { //check bottom
      possiblePaths.push( {i: y+1, j: x} )
    }; 
    if( y > 0 && board[y - 1][x] == nextLetter ) { //check top
      possiblePaths.push( {i: y-1, j: x} )
    };

    return possiblePaths;
  }
}
