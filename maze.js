var type = /(canvas|webgl)/.test(url.type) ? url.type : 'svg';
var two = new Two({type: Two.Types[type], fullscreen: false, autostart: true})
              .appendTo(document.body);

const man = {
  x: 0,
  y: 0
};

const maze = [
  [1, 1, 0, 0, 1, 1, 0],
  [1, 1, 0, 0, 1, 1, 0],
  [1, 1, 0, 0, 1, 1, 0],
  [1, 1, 0, 0, 1, 1, 0],
  [1, 1, 0, 0, 1, 1, 0],
  [1, 1, 0, 0, 1, 1, 0],
  [1, 1, 0, 0, 1, 1, 0],
];

let walked = null;

// Generate the maze

let mazeItems = [];
let manItem = null;
/**
 * Initialize the `mazeItem` object.
 */
function init() {
  mazeItems = maze.map((row) => { return row.map(() => null); })
}

init();

/**
 * Creates the rectangles.
 */
function create() {
  for (const [i, row] of maze.entries()) {
    for (const [j, item] of row.entries()) {
      const rect = two.makeRectangle(50 * j + 100, 50 * i + 100, 45, 45);
      rect.fill = maze[i][j] === 1 ? 'rgba(0, 200, 255, 0.75)' :
                                     'rgba(200, 0, 255, 0.25)';
      rect.stroke = '#1C75BC';
      mazeItems[i][j] = rect;
    }
  }
  manItem = two.makeRectangle(50 * man.x + 100, 50 * man.y + 100, 40, 40);
}

/**
 * Refresh the properties of the rectangles.
 */
function refresh() {
  for (const [i, row] of maze.entries()) {
    for (const [j, item] of row.entries()) {
      const rect = mazeItems[i][j];
      rect.fill = maze[i][j] === 1 ? 'rgba(0, 200, 255, 0.75)' :
                                     'rgba(200, 0, 255, 0.25)';
      rect.stroke = '#1C75BC';
      // mazeItems[i][j]=rect;
    }
  }
}

create();


function regenerate() {
  for (const [i, row] of maze.entries()) {
    for (const [j, item] of row.entries()) {
      maze[i][j] = Math.random() > 0.5 ? 1 : 0;
    }
  }
}

function goOne() {}

// Do the bindings


// Do the actions

const refreshButton = document.getElementById('button-refresh');
refreshButton.onclick =
    () => {
      console.log('clicked!');
      regenerate();
      console.log(maze);
      refresh();
      // two.update();
    }

const goOneButton = document.getElementById('button-go-one');
goOneButton.onclick = () => {
  man.x += 1;
  refreshMan();
};

function refreshMan() {
  manItem.translation.set(100 + man.y * 50, 100 + man.x * 50);
  console.log(manItem.translation);
  two.update();
}

function getNeighbors() {}

let stack = [];

function isValid(x, y) {
  if (x < 0) return false;
  if (y < 0) return false;
  if (x > 6) return false;
  if (y > 6) return false;
  if (maze[x][y] === 0) return false;
  if (walked[x][y]) return false;
  return true;
}

function search() {
  walked = maze.map((row) => { return row.map(() => false); })
  stack = [];
  searchWith(stack, man);
}

function searchWith(stack, man) {
  setTimeout(() => {
    walked[man.x][man.y] = true;
    mazeItems[man.x][man.y].fill = 'rgba(0, 0, 255, 1)';
    console.log(stack, man);
    const {x, y} = man;
    if (isValid(x + 1, y)) stack.push({x: x + 1, y: y});
    if (isValid(x, y + 1)) stack.push({x: x, y: y + 1});
    if (isValid(x - 1, y)) stack.push({x: x - 1, y: y});
    if (isValid(x, y - 1)) stack.push({x: x, y: y - 1});

    if (stack.length === 0) return;

    const top = stack[stack.length - 1];
    man.x = top.x;
    man.y = top.y;
    stack.pop();
    refreshMan();
    searchWith(stack, man);
  }, 1000);
}

const goThroughButton = document.getElementById('button-go-through');
goThroughButton.onclick = () => {
  search();
};