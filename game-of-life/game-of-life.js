let board = [];
let rows = 50;
let cols = 50;
let size = 10;

function init() {
  let b = [];
  for (let i = 0; i < rows + 2; i++) {
    b.push([]);
    for (let j = 0; j < cols + 2; j++) {
      if (i == 0 || i == rows + 1 || j == 0 || j == cols + 1) {
        b[i].push(0);
        continue;
      }
      
      let live = 1;
      if (random(100) < 50)
          live = 0;
      b[i].push(live);
    }
  }
  return b;
}

function setup() {
  createCanvas(rows*size + size*2, cols*size + size*2);
  board = init();
}

function countLiveNeighbours(b, x, y) {
  let count = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i == x && j == y) continue;
      count += b[i][j];
    }
  }
  return count;
}

function calculate(b) {
  let newBoard = init();

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      let count = countLiveNeighbours(b, i, j);
      let actualLive = b[i][j];
      let newLive = actualLive;
      
      //Any live cell with fewer than two live neighbours dies, as if by underpopulation.
      if (actualLive == 1 && count < 2) {
        newLive = 0;
      }
      
      //Any live cell with two or three live neighbours lives on to the next generation.
      if (actualLive == 1 && (count == 2 || count == 3)) {
        newLive = 1;
      }
      
      //Any live cell with more than three live neighbours dies, as if by overpopulation.
      if (actualLive == 1 && count > 3) {
        newLive = 0;
      }
            
      //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
      if (actualLive == 0 && count == 3) {
        newLive = 1;
      }
      
      newBoard[i][j] = newLive;
    }
  }
  return newBoard;
}

function draw() {  
  background(255);
  
  board = calculate(board);
  
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      if (board[i][j] == 1) 
        fill(0);
      else 
        fill(255);
      rect(i*size, j*size, size, size);
    }
  }
}