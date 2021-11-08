
var solveSudoku = function(board) {
  const quadrantsDefinitions = {
    topLeft: [[0,0],[2,2]],
    middleLeft: [[3,0],[5,2]],
    bottomLeft: [[6,0],[8,2]],
    topCenter: [[0,3],[2,5]],
    center:[[3,3],[5,5]],
    bottomCenter: [[6,3],[8,5]],
    topRight: [[0,6],[2,8]],
    middleRight:[[3,6],[5,8]],
    bottomRight:[[6,6],[8,8]]
  }

  const quadrants = {}
  for(const prop in quadrantsDefinitions){
    quadrants[prop] = {
      definition: quadrantsDefinitions[prop],
      exist: [],
      needed: []
    }
  }

 (function getExistAndNeeded(){
    console.log('get existing numbers in quad');
    for(const prop in quadrants){
      const start = quadrants[prop].definition[0]
      const end = quadrants[prop].definition[1]
      let currentRow = start[0]
      let currentCol = start[1]
      

      //Gets rows first... then switch column. repeat. (by quad)
      while(currentRow <= end[0] && currentCol <= end[1]){
        // console.log(currentRow, currentCol, end);
        // console.log(board[currentRow][currentCol]);

        //log the current value 
        const value = board[currentRow][currentCol] === '.' ? null : board[currentRow][currentCol]
        if(value){

          quadrants[prop].exist.push(board[currentRow][currentCol])
        }


        //Go to next block within quadrant
        if(currentRow === end[0] && currentCol < end[1]){
          currentRow = start[0]
          currentCol++
        } else {
          currentRow++
        }
      }

      //get Needed values for quads
      const neededValues = ['1','2','3','4','5','6','7','8','9']
      for(const prop in quadrants){
        quadrants[prop].needed = neededValues.filter(value => {
          return !quadrants[prop].exist.find((el)=> el === value)
        })
      }

    }
  })()

  console.log(quadrants);
  // console.log(quadrantsDefinitions);

  console.table(board)
  
};




solveSudoku([
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
])