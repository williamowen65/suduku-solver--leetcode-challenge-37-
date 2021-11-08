
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
    // console.log('get existing numbers in quad');
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

  // console.log(quadrants);
  // console.log(quadrantsDefinitions);

  console.log('get existing numbers in rows and col');

  const rowsAndColsDefinitions = {
   one: [0, [0,8]],
   two: [1, [0,8]],
   three: [2, [0,8]],
   four: [3, [0,8]],
   five: [4, [0,8]],
   six: [5, [0,8]],
   seven: [6, [0,8]],
   eight: [7, [0,8]],
   nine: [8, [0,8]]
  }

  const rowsAndCols = {};
  for(const prop in rowsAndColsDefinitions){
    rowsAndCols[prop] = {
      definition: rowsAndColsDefinitions[prop],
      row: {
        exist: [],
        needed: []
      },
      col: {
        exist: [],
        needed: []
      },
    }
  }


  (function getRowsAndCols(){
    for(const prop in rowsAndCols){
      
      //get col
      let current = rowsAndCols[prop].definition[0]
      let otherRowOrCol = 0
      while(otherRowOrCol <= 8){
        // console.log(current);
       { 
        const value = board[current][otherRowOrCol] === '.' ? null : board[current][otherRowOrCol]
          if(value){
            rowsAndCols[prop].row.exist.push(board[current][otherRowOrCol])
          }
       }
       { 
        const value = board[otherRowOrCol][current] === '.' ? null : board[otherRowOrCol][current]
          if(value){
            rowsAndCols[prop].col.exist.push(board[otherRowOrCol][current])
          }
       }
       
          otherRowOrCol++
      }


      const neededValues = ['1','2','3','4','5','6','7','8','9']
      for(const prop in rowsAndCols){
        rowsAndCols[prop].row.needed = neededValues.filter(value => {
          return !rowsAndCols[prop].row.exist.find((el)=> el === value)
        })
        rowsAndCols[prop].col.needed = neededValues.filter(value => {
          return !rowsAndCols[prop].col.exist.find((el)=> el === value)
        })
      }



      //get row
      console.log(prop);
      console.log('row: ', rowsAndCols[prop].row);
      console.log('col: ', rowsAndCols[prop].col);
    }
  })()


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