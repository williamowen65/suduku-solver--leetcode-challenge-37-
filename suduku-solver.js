
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
      needed: [],
      intersection: {
        rows: [],
        cols: []
      }
    }
  }

 (function getQuadrants(){
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
          //set row and col intersections
          if(!quadrants[prop].intersection.rows.includes(currentRow)){
            quadrants[prop].intersection.rows.push(currentRow)
          }
          if(!quadrants[prop].intersection.cols.includes(currentCol)){
            quadrants[prop].intersection.cols.push(currentCol)
          }


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

  // console.log('get existing numbers in rows and col');

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

  const noValues = [];

  (function getRowsAndColsAndNoValues(){
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
      {
        const noValue = board[otherRowOrCol][current] === '.' ? [otherRowOrCol, current] : null
        if(noValue){
          noValues.push(noValue);
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
      // console.log(prop);
      // console.log('row: ', rowsAndCols[prop].row);
      // console.log('col: ', rowsAndCols[prop].col);
    }
  })();


  // const completeBoard = {}
  // for(const prop in quadrants){
  //   completeBoard[prop] = {}
  // }
  


  function numToText_ViseVersa(input){
    if(typeof input === 'number'){
      switch (input) {
        case 0:
          return 'one'
        case 1:
          return 'two'
        case 2:
          return 'three'
        case 3:
          return 'four'
        case 4:
          return 'five'
        case 5:
          return 'six'
        case 6:
          return 'seven'
        case 7:
          return 'eight'
        case 8:
          return 'nine'
        default:
          break;
      }
    }
    if(typeof input === 'string'){
      switch (input) {
        case 'one':
          return 0      
        case 'two':
          return 1      
        case 'three':
          return 2     
        case 'four':
          return 3      
        case 'five':
          return 4      
        case 'six':
          return 5      
        case 'seven':
          return 6      
        case 'eight':
          return 7      
        case 'nine':
          return 8      
        default:
          break;
      }
    }
  }

  function setBoardCoord(coord, val, noValI, quad){

    //Set board
    if(board[coord[0]][coord[1]] === '.'){
      board[coord[0]][coord[1]] = val
    }

    //update NoValues
      noValues.splice(noValI, 1)

    //update quadrant
      //add to exist
    quadrants[quad].exist.push(val)
      //remove from needed
    quadrants[quad].needed.splice(quadrants[quad].needed.indexOf(val), 1)
    
    // console.log(quadrants[quad]);

    //update row/col
  }


  ///As it is solved, the info in the objects need to update.
  (function solveIt() {
    let i = 1;
    let current = noValues[i]; //[row,col]

    console.log('solving it');
    for(const prop in quadrants){
      ///if current is within quadrant run checks of needed values
      if(quadrants[prop].intersection.rows.includes(current[0])){
        // console.log(prop, quadrants[prop].needed);
        // console.log(numToText_ViseVersa(current[0]), rowsAndCols[numToText_ViseVersa(current[0])].row.needed);
        console.log(prop, quadrants[prop]);
      }
      // if(quadrants[prop].intersection.cols.includes(current[1])){
        //   console.log(prop, quadrants[prop]);
        // }
      }
      // for(const prop in rowsAndCols){
        //   console.log(prop, rowsAndCols[prop]);
        // }
        // console.log(noValues);
        setBoardCoord(current, '1', i, 'bottomRight')
  })();



  // console.log(quadrants);
  // console.log(rowsAndCols);
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