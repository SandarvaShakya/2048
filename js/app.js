const ROWS = 4;
const COLUMNS = 4;

// Scores
let SCORE = 0;
let didNotMoveLeft = false;
let didNotMoveRight = false;
let didNotMoveUp = false;
let didNotMoveDown = false;
let HIGH_SCORE = localStorage.getItem("HIGH_SCORE");
if (!HIGH_SCORE) localStorage.setItem("HIGH_SCORE", 0);

const SCORE_ELEMENT = document.getElementById("score");
const HIGH_SCORE_ELEMENT = document.getElementById("high-score");
const GAMEOVER_ELEMENT = document.getElementById("gameover");
const RESTART_BUTTON = document.getElementById("restart");

HIGH_SCORE_ELEMENT.innerText = HIGH_SCORE;

// The board where tiles generate
const BOARD = document.getElementById("board");

// All event listeners
document.addEventListener("keydown", (event) => {
	switch (event.key) {
		case "ArrowRight":
			moveRight();
			gameOver();
			break;
		case "d":
			moveRight();
			gameOver();
			break;
		case "ArrowLeft":
			moveLeft();
			gameOver();
			break;
		case "a":
			moveLeft();
			gameOver();
			break;
		case "ArrowUp":
			moveUp();
			gameOver();
			break;
		case "w":
			moveUp();
			gameOver();
			break;
		case "ArrowDown":
			moveDown();
			gameOver();
			break;
		case "s":
			moveDown();
			gameOver();
			break;
	}
});

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const handleSlide = () => {
	if (touchendX < touchstartX) {
		moveLeft();
		gameOver();
	}
	if (touchendX > touchstartX) {
		moveRight();
		gameOver();
	}
	if (touchendY < touchstartY) {
		moveUp();
		gameOver();
	}
	if (touchendY > touchstartY) {
		moveDown();
		gameOver();
	}
};

document.addEventListener("touchstart", (event) => {
	touchstartX = event.changedTouches[0].screenX;
	touchstartY = event.changedTouches[0].screenY;
});

document.addEventListener("touchend", (event) => {
	touchendX = event.changedTouches[0].screenX;
	touchendY = event.changedTouches[0].screenY;
	handleSlide();
});

let BOARD_ARRAY;

const hasAvailableSpace = () => {
	for (let row = 0; row < ROWS; row++) {
		for (let column = 0; column < COLUMNS; column++) {
			if (BOARD_ARRAY[row][column] === 0) {
				return true;
			}
		}
	}
	return false;
};

const generateTile = () => {
	if (!hasAvailableSpace()) return;

	let foundEmptyTile = false;
	while (!foundEmptyTile) {
		let row = Math.floor(Math.random() * ROWS);
		let column = Math.floor(Math.random() * COLUMNS);

		if (isZero(row, column)) {
			foundEmptyTile = true;
			const TILE_VALUE = chooseRandom([2, 4]);
			BOARD_ARRAY[row][column] = TILE_VALUE;
			const TILE = document.getElementById(`${row}-${column}`);
			updateTile(TILE, TILE_VALUE);
		}
	}
};

const isMergeAble = (board) => {
	if (hasAvailableSpace()) {
		return true;
	}

	for (let row = 0; row < ROWS; row++) {
		board_row = board[row];
		for (let i = 0; i < ROWS - 1; i++) {
			if (board_row[i] === board_row[i + 1]) return true;
		}
	}

	const tempBoard = transpose(board);
	for (let row = 0; row < COLUMNS; row++) {
		board_row = tempBoard[row];
		for (let i = 0; i < COLUMNS - 1; i++) {
			if (board_row[i] === board_row[i + 1]) return true;
		}
	}

	return false;
};

const gameOver = () => {
	if (!isMergeAble(BOARD_ARRAY)) {
		GAMEOVER_ELEMENT.classList.add("d-flex");
	} else return;
};

const isZero = (row, column) => {
	if (BOARD_ARRAY[row][column] === 0) return true;
	return false;
};

const createTile = (row, column) => {
	const TILE = document.createElement("div");
	TILE.id = `${row}-${column}`;
	return TILE;
};

const updateTile = (tile, tileValue) => {
	tile.innerText = "";
	tile.classList = "";
	tile.classList.add("tile");
	if (tileValue > 0) {
		tile.innerText = tileValue.toString();
		if (tileValue <= 4096) tile.classList.add(`color-${tileValue}`);
		else tile.classList.add(`color-4096`);
	}
};

// SCORES

const updateScore = () => {
	SCORE_ELEMENT.innerText = SCORE;
	checkHighScore();
};

const checkHighScore = () => {
	if (SCORE > HIGH_SCORE) setHighScore(SCORE);
};

const setHighScore = (score) => {
	localStorage.setItem("HIGH_SCORE", score);
	HIGH_SCORE_ELEMENT.innerText = localStorage.getItem("HIGH_SCORE");
};

const updateHighScore = () => {
	HIGH_SCORE = localStorage.getItem(HIGH_SCORE);
	if (!HIGH_SCORE) localStorage.setItem("HIGH_SCORE", SCORE);
};

// TILES

const createAndUpdateTile = (row, board_array) => {
	for (let column = 0; column < COLUMNS; column++) {
		const TILE = document.getElementById(`${row}-${column}`);
		updateTile(TILE, BOARD_ARRAY[row][column]);
		updateScore();
	}
};

const mergeEachRow = (board_row) => {
	board_row = removeZeros(board_row);

	for (let i = 0; i < board_row.length - 1; i++) {
		if (board_row[i] === board_row[i + 1]) {
			board_row[i] *= 2;
			board_row[i + 1] = 0;
			SCORE += board_row[i];
		}
		board_row = removeZeros(board_row);
	}
	board_row = addZeros(board_row, COLUMNS);
	return board_row;
};

// MOVEMENTS

const moveLeft = () => {
	let originalBoard = [...BOARD_ARRAY];
	didNotMoveLeft = false;
	for (let row = 0; row < ROWS; row++) {
		let board_row = BOARD_ARRAY[row];
		board_row = mergeEachRow(board_row);
		BOARD_ARRAY[row] = board_row;
		createAndUpdateTile(row);
	}

	if (isNotSame(originalBoard, BOARD_ARRAY)) generateTile();
	else didNotMoveLeft = true;
};

const moveRight = () => {
	let originalBoard = JSON.parse(JSON.stringify(BOARD_ARRAY));
	didNotMoveRight = false;
	for (let row = 0; row < ROWS; row++) {
		let board_row = BOARD_ARRAY[row];
		board_row.reverse();
		board_row = mergeEachRow(board_row);
		board_row.reverse();
		BOARD_ARRAY[row] = board_row;
		createAndUpdateTile(row);
	}
	if (isNotSame(originalBoard, BOARD_ARRAY)) generateTile();
	else didNotMoveRight = true;
};

const moveUp = () => {
	let originalBoard = [...BOARD_ARRAY];
	didNotMoveUp = false;
	let transposedBoard = transpose(BOARD_ARRAY);
	for (let row = 0; row < ROWS; row++) {
		let board_row = transposedBoard[row];
		board_row = mergeEachRow(board_row);
		transposedBoard[row] = board_row;
	}
	BOARD_ARRAY = transpose(transposedBoard);

	for (let row = 0; row < ROWS; row++) {
		createAndUpdateTile(row);
	}
	if (isNotSame(originalBoard, BOARD_ARRAY)) generateTile();
	else didNotMoveUp = true;
};

const moveDown = () => {
	let originalBoard = [...BOARD_ARRAY];

	didNotMoveDown = false;
	let transposedBoard = transpose(BOARD_ARRAY);
	for (let row = 0; row < ROWS; row++) {
		let board_row = transposedBoard[row];
		board_row.reverse();
		board_row = mergeEachRow(board_row);
		board_row.reverse();
		transposedBoard[row] = board_row;
	}
	BOARD_ARRAY = transpose(transposedBoard);

	for (let row = 0; row < ROWS; row++) {
		createAndUpdateTile(row);
	}
	if (isNotSame(originalBoard, BOARD_ARRAY)) generateTile();
	else didNotMoveDown = true;
};

const startGame = () => {
	SCORE = 0;
	SCORE_ELEMENT.innerText = SCORE;
	GAMEOVER_ELEMENT.classList.remove("d-flex");
	BOARD.innerText = "";
	BOARD_ARRAY = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	];

	for (let row = 0; row < ROWS; row++) {
		for (let column = 0; column < COLUMNS; column++) {
			const TILE = createTile(row, column);
			TILE.classList.add("tile");
			const TILE_VALUE = BOARD_ARRAY[row][column];
			updateTile(TILE, TILE_VALUE);
			BOARD.append(TILE);
		}
	}

	generateTile();
	generateTile();
};

window.onload = () => {
	startGame();
};

RESTART_BUTTON.addEventListener("click", () => {
	startGame();
});
