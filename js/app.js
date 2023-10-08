const ROWS = 4;
const COLUMNS = 4;

// Scores
const SCORE = 0;
const HIGH_SCORE = 0;

const SCORE_ELEMENT = document.getElementById("score");
const HIGH_SCORE_ELEMENT = document.getElementById("high-score");

// The board where tiles generate
const BOARD = document.getElementById("board");

// All event listeners
document.addEventListener("keydown", (event) => {
	switch (event.key) {
		case "ArrowRight":
			console.log("Slide right");
			break;
		case "a":
			console.log("Slide right");
			break;
		case "ArrowLeft":
			console.log("Slide left");
			break;
		case "d":
			console.log("Slide left");
			break;
		case "ArrowUp":
			console.log("Slide up");
			break;
		case "w":
			console.log("Slide up");
			break;
		case "ArrowDown":
			console.log("Slide down");
			break;
		case "s":
			console.log("Slide down");
			break;
	}
});

window.onload = () => {
	const BOARD_ARRAY = [
		[2, 2, 2, 2],
		[2, 2, 4, 8],
		[4, 4, 4, 16],
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
			const TILE = createTile();
			TILE.classList.add("tile");
			const TILE_VALUE = BOARD_ARRAY[row][column];
			updateTile(TILE, TILE_VALUE);
			BOARD.append(TILE);
		}
	}
};

const createTile = () => {
	return document.createElement("div");
};

const updateTile = (tile, tileValue) => {
	tile.innerText = "";

	if (tileValue > 0) {
		tile.innerText = tileValue.toString();
		if (tileValue <= 4096) tile.classList.add(`color-${tileValue}`);
		else tile.classList.add(`color-4096`);
	}
};
