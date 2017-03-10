
import 'two.js';
import { Observable } from 'rxjs';

export interface TwoOptions {
  type: any;
  fullscreen?: any;
  autostart: boolean;
  width?: number;
  height?: number;
}

declare class Two {
  public constructor(options: TwoOptions);

  static Types: {[key: string]: string};

  public appendTo(htmlElement: HTMLElement);
}

declare var url: {
  type: string;
};

var type = /(canvas|webgl)/.test(url.type) ? url.type : 'svg';
var two = new Two({
            type: Two.Types[type],
            fullscreen: false,
            autostart: true,
            width: 800,
            height: 800
          }).appendTo(document.body);


export class Maze {
  constructor() {
    console.log('I am a maze!');
  }
}

/**
 * A helper function that produces an array from the start to the end.
 * Taken from [this answer](http://stackoverflow.com/posts/36963945/revisions).
 * @param {*} start
 * @param {*} end
 */
const range = (start, end) =>
    Array.from({length: (end - start)}, (v, k) => k + start);

const DOM = {

};

interface Point {
  x: number; y: number;
}

class Model {

  man: Point;
  size: number;
  maze: any;

  constructor(size) {
    this.man = {x: 0, y: 0};
    this.size = 10;
    this.maze =
        (() => range(0, size).map(() => {return range(0, this.size).map(() => {
                                    return Math.random() > 0.5 ? 1 : 0;
                                  })}))()
  }
}

class Binding {}

const model = new Model(10);
console.log(model);

const view = {
  modelItems: {},
  manItem: {}
};

const observables = {
  inputChange:
      Observable.fromEvent(document.getElementById('input-size'), 'keyup')
};

observables.inputChange.subscribe(
    (e) => console.log(document.getElementById('input-size').value));

const man = {
  x: 0,
  y: 0
};

const size = 10;

const itemSize = 30;


const maze = range(0, size).map(() => {return range(0, size).map(() => {
                                  return Math.random() > 0.5 ? 1 : 0;
                                })});

console.log(maze);

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
      const rect = two.makeRectangle(
          itemSize * j + 100, itemSize * i + 100, itemSize * 0.9,
          itemSize * 0.9);
      rect.fill = maze[i][j] === 1 ? 'rgba(0, 200, 255, 0.75)' :
                                     'rgba(200, 0, 255, 0.25)';
      rect.stroke = '#1C75BC';
      mazeItems[i][j] = rect;
    }
  }
  manItem = two.makeRectangle(
      itemSize * man.x + 100, itemSize * man.y + 100, itemSize * 0.8,
      itemSize * 0.8);
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
  manItem.translation.set(100 + man.y * itemSize, 100 + man.x * itemSize);
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
  stack = [{x: 0, y: 0}];
  searchWith(stack, man);
}

function searchWith(stack, man) {
  setTimeout(() => {
    walked[man.x][man.y] = true;
    mazeItems[man.x][man.y].fill = 'rgba(0, 0, 255, 1)';
    console.log(stack, man);

    const {x, y} = man;
    const originalLength = stack.length;

    if (isValid(x + 1, y)) stack.push({x: x + 1, y: y});
    if (isValid(x, y + 1)) stack.push({x: x, y: y + 1});
    if (isValid(x - 1, y)) stack.push({x: x - 1, y: y});
    if (isValid(x, y - 1)) stack.push({x: x, y: y - 1});

    if (stack.length === 0) return;
    const top = stack[stack.length - 1];
    man.x = top.x;
    man.y = top.y;
    // stack.pop();
    refreshMan();
    if (stack.length === originalLength) stack.pop();

    searchWith(stack, man);
  }, 1000);
}

const goThroughButton = document.getElementById('button-go-through');
goThroughButton.onclick = () => {
  search();
};