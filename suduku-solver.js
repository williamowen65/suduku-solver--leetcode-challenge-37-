
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
      },
      blocks: {
        row: [0,0,0],
        col: [0,0,0]
      }
    }
  }

  function blocksCheck(coords) {
    console.log(coords, getQuad(coords));
    
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

    // blocksCheck()
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
    // console.log(coord[0], numToText_ViseVersa(coord[0]));
    rowsAndCols[numToText_ViseVersa(coord[0])].row.exist.push(val)
    rowsAndCols[numToText_ViseVersa(coord[0])].row.needed.splice(rowsAndCols[numToText_ViseVersa(coord[0])].row.needed.indexOf(val), 1)
    
    rowsAndCols[numToText_ViseVersa(coord[1])].col.exist.push(val)
    rowsAndCols[numToText_ViseVersa(coord[1])].col.needed.splice(rowsAndCols[numToText_ViseVersa(coord[1])].col.needed.indexOf(val), 1)

  }

  function getQuad(coord){
    // console.log(quadrantsDefinitions);
    for(const [key, value] of Object.entries(quadrantsDefinitions)){
      const start = value[0]
      const end = value[1]
      if(coord[0] >= start[0] && coord[0] <= end[0] && coord[1] >= start[1]){
        return key
      }
    }
  }

  function getRelevantInfo(coord){

    // adds data per request to this data


    // console.log(coord);
    // getQuad(coord)
    // let quadOriginNeeds 
    let rowIntersectQuadKeys = []
    for(const prop in quadrants){
      if(quadrants[prop].intersection.rows.includes(coord[0])){
        rowIntersectQuadKeys.push(prop);
      }
    }
    rowIntersectQuadKeys = rowIntersectQuadKeys.filter(key => key !== getQuad(coord))
    let colIntersectQuadKeys = []
    for(const prop in quadrants){
      if(quadrants[prop].intersection.cols.includes(coord[1])){
        colIntersectQuadKeys.push(prop);
      }
    }
    colIntersectQuadKeys = colIntersectQuadKeys.filter(key => key !== getQuad(coord))
    // console.log(rowIntersectQuadKeys, colIntersectQuadKeys);
    return {
      quad: getQuad(coord),
      quadOriginNeeds: quadrants[getQuad(coord)].needed,
      row: {
        needs: rowsAndCols[numToText_ViseVersa(coord[0])].row.needed,
        intersection1Has: quadrants[rowIntersectQuadKeys[0]].exist,
        intersection2Has: quadrants[rowIntersectQuadKeys[1]].exist,
      },
      col: {
        needs: rowsAndCols[numToText_ViseVersa(coord[1])].col.needed,
        intersection1Has: quadrants[colIntersectQuadKeys[0]].exist,
        intersection2Has: quadrants[colIntersectQuadKeys[1]].exist,
      }     
    }
  }

  function getIntersectNeeds(info) {
    const needs = [info.quadOriginNeeds, info.row.needs, info.col.needs]
    return needs.reduce((prev, curr) => {
      return prev.filter(n => {
        if(curr.includes(n)){
          return n
        }
      })
    })
  }

  function getReducedNeedsRow(needs, info) {
    const compare = [needs, info.row.intersection1Has, info.row.intersection2Has]
    // console.log(compare);
    return compare.reduce((prev, curr) => {
      return prev.filter(n => {
        if(curr.includes(n)){
          return n
        }
      })
    })
  }
  function getReducedNeedsCol(needs, info) {
    const compare = [needs, info.col.intersection1Has, info.col.intersection2Has]
    // console.log(compare);
    return compare.reduce((prev, curr) => {
      return prev.filter(n => {
        if(curr.includes(n)){
          return n
        }
      })
    })
  }

  function quadRowColCheck() {
    noValues.forEach((val, i) => {

      let current = noValues[i]; //[row,col]

      const info = getRelevantInfo(current)
      let currentNeeds = getIntersectNeeds(info);
      let reducedRowNeeds = getReducedNeedsRow(currentNeeds, info)
      // console.log('reducedRowNeeds: ', reducedRowNeeds);
      let reducedColNeeds = getReducedNeedsCol(currentNeeds, info)
      // console.log('reducedColNeeds: ', reducedColNeeds);
      
      if(reducedRowNeeds.length === 1){
        setBoardCoord(current, reducedRowNeeds[0], i, info.quad)
        // console.log(noValues.length);
      } else if (reducedColNeeds.length === 1){
        setBoardCoord(current, reducedColNeeds[0], i, info.quad)
      }
  
    }) 
  }

  function initialBlocksCheck() {
    let start = [0,0]
    let end = [8,8]
    while(start[0] <= end[0] && start[1] <= end[1]){
      blocksCheck(start)

      start[0]++

      if(start[0] ===9 && start[1] < 8){
        start[1]++
        start[0] = 0
      }
    }
  }
  ///As it is solved, the info in the objects need to update.
  (function solveIt() {
      initialBlocksCheck()
      quadRowColCheck()
      quadRowColCheck()
    

        let i = 0;
        let current = noValues[i];
        console.log(current);
      console.log(getRelevantInfo(current));
  
      console.log(noValues.length);
    })();


  // for(const prop in quadrants){

  //   console.log(prop,quadrants[prop]);
  // }
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