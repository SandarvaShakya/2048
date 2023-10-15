const ROWS = 4;
const COLUMNS = 4;

// Scores
let SCORE = 0;
let HIGH_SCORE = 0;
let didNotMoveLeft = false;
let didNotMoveRight = false;
let didNotMoveUp = false;
let didNotMoveDown = false;

const SCORE_ELEMENT = document.getElementById("score");
const HIGH_SCORE_ELEMENT = document.getElementById("high-score");
const GAMEOVER_ELEMENT = document.getElementById("gameover");
const RESTART_BUTTON = document.getElementById("restart");

// The board where tiles generate
const BOARD = document.getElementById("board");
let BOARD_ARRAY = [[]];
