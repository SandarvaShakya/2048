const ROWS = 4;
const COLUMNS = 4;

// Scores
let SCORE = 0;
let HIGH_SCORE = 0;

const SCORE_ELEMENT = document.getElementById("score");
const HIGH_SCORE_ELEMENT = document.getElementById("high-score");

// The board where tiles generate
const BOARD = document.getElementById("board");

// All event listeners
document.addEventListener("keydown", (event) => {
	switch (event.key) {
		case "ArrowRight":
			moveRight();
			break;
		case "d":
			moveRight();
			break;
		case "ArrowLeft":
			moveLeft();
			break;
		case "a":
			moveLeft();
			break;
		case "ArrowUp":
			moveUp();
			break;
		case "w":
			moveUp();
			break;
		case "ArrowDown":
			moveDown();
			console.log("Slide down");
			break;
		case "s":
			console.log("Slide down");
			break;
	}
});

let BOARD_ARRAY;

window.onload = () => {
	BOARD_ARRAY = [
		[2, 2, 2, 0],
		[2, 2, 4, 0],
		[4, 0, 0, 16],
		[4, 4, 4, 16],
	];
	// const BOARD_ARRAY = [
	// 	[0, 0, 0, 0],
	// 	[0, 0, 0, 0],
	// 	[0, 0, 0, 0],
	// 	[0, 0, 0, 0],
	// ];

	for (let row = 0; row < ROWS; row++) {
		for (let column = 0; column < COLUMNS; column++) {
			const TILE = createTile(row, column);
			TILE.classList.add("tile");
			const TILE_VALUE = BOARD_ARRAY[row][column];
			updateTile(TILE, TILE_VALUE);
			BOARD.append(TILE);
		}
	}
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

const createAndUpdateTile = (row, board_array) => {
	for (let column = 0; column < COLUMNS; column++) {
		const TILE = document.getElementById(`${row}-${column}`);
		updateTile(TILE, BOARD_ARRAY[row][column]);
	}
};

const removeZeros = (array) => {
	return array.filter((item) => {
		return item !== 0;
	});
};

const addZeros = (array) => {
	while (array.length < COLUMNS) {
		array.push(0);
	}

	return array;
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
	board_row = addZeros(board_row);
	return board_row;
};

const moveLeft = () => {
	for (let row = 0; row < ROWS; row++) {
		let board_row = BOARD_ARRAY[row];
		board_row = mergeEachRow(board_row);
		BOARD_ARRAY[row] = board_row;
		createAndUpdateTile(row, BOARD_ARRAY);
	}
};

const moveRight = () => {
	for (let row = 0; row < ROWS; row++) {
		let board_row = BOARD_ARRAY[row];
		board_row.reverse();
		board_row = mergeEachRow(board_row);
		board_row.reverse();
		BOARD_ARRAY[row] = board_row;
		createAndUpdateTile(row, BOARD_ARRAY);
	}
};

function transpose(board) {
	return board[0].map((col, i) => {
		return board.map((row) => {
			return row[i];
		});
	});
}

const moveUp = () => {
	let transposedBoard = transpose(BOARD_ARRAY);
	for (let row = 0; row < ROWS; row++) {
		let board_row = transposedBoard[row];
		board_row = mergeEachRow(board_row);
		transposedBoard[row] = board_row;
	}
	BOARD_ARRAY = transpose(transposedBoard);

	for (let row = 0; row < ROWS; row++) {
		createAndUpdateTile(row, BOARD_ARRAY);
	}
};

const moveDown = () => {
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
		createAndUpdateTile(row, BOARD_ARRAY);
	}
};
