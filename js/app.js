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

/**
 *	Function to check if there is available space in the board
 * @returns true if the array has an empty space
 */
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

/**
 * Function to generate the actual tile in array as well as the DOM
 * @returns null
 */
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

/**
 * Function to check if there is any playable move or not
 * @param {BOARD_ARRAY} board
 * @returns true if the game has a playable move
 */
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

/**
 *	Function to check and display the gameover screen
 * @returns null if the game is no tover
 */
const gameOver = () => {
	if (!isMergeAble(BOARD_ARRAY)) {
		GAMEOVER_ELEMENT.classList.add("d-flex");
	} else return;
};

/**
 * Funtion to check if the BOARD has 0 in the array
 * @param {INT} row
 * @param {INT} column
 * @returns true if the BOARD has a 0 in its array
 */
const isZero = (row, column) => {
	if (BOARD_ARRAY[row][column] === 0) return true;
	return false;
};

/**
 * Function to create the HTML element in the DOM
 * @param {INT} row
 * @param {INT} column
 * @returns the HTML Element with id row-column
 */
const createTile = (row, column) => {
	const TILE = document.createElement("div");
	TILE.id = `${row}-${column}`;
	return TILE;
};

/**
 * Function to add the css classes and the value of the tile
 * @param {HTMLElement} tile
 * @param {INT} tileValue
 */
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
/**
 * Function to upste the score and highscore
 */
const updateScore = () => {
	SCORE_ELEMENT.innerText = SCORE;
	if (SCORE > HIGH_SCORE) {
		localStorage.setItem("HIGH_SCORE", SCORE);
		HIGH_SCORE_ELEMENT.innerText = localStorage.getItem("HIGH_SCORE");
	}
};

/**
 * Function to update the tile and the score
 * @param {INT} row
 */
const createAndUpdateTile = (row) => {
	for (let column = 0; column < COLUMNS; column++) {
		const TILE = document.getElementById(`${row}-${column}`);
		updateTile(TILE, BOARD_ARRAY[row][column]);
		updateScore();
	}
};

/**
 * Function to merge the two tiles if they are same
 * @param {1D ARRAY} board_row
 * @returns 1D Array
 */
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

/**
 * Function to intialize and start the game
 */
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
	HIGH_SCORE = localStorage.getItem("HIGH_SCORE");
	if (!HIGH_SCORE) {
		localStorage.setItem("HIGH_SCORE", 0);
		HIGH_SCORE = localStorage.getItem("HIGH_SCORE");
		HIGH_SCORE_ELEMENT.innerText = HIGH_SCORE;
	}
	HIGH_SCORE_ELEMENT.innerText = HIGH_SCORE;
	startGame();
};

RESTART_BUTTON.addEventListener("click", () => {
	startGame();
});
