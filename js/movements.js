// MOVEMENTS
const moveLeft = () => {
	let originalBoard = [...BOARD_ARRAY];
	for (let row = 0; row < ROWS; row++) {
		let board_row = BOARD_ARRAY[row];
		board_row = mergeEachRow(board_row);
		BOARD_ARRAY[row] = board_row;
		createAndUpdateTile(row);
	}

	if (isNotSame(originalBoard, BOARD_ARRAY)) generateTile();
};

const moveRight = () => {
	let originalBoard = JSON.parse(JSON.stringify(BOARD_ARRAY));
	for (let row = 0; row < ROWS; row++) {
		let board_row = BOARD_ARRAY[row];
		board_row.reverse();
		board_row = mergeEachRow(board_row);
		board_row.reverse();
		BOARD_ARRAY[row] = board_row;
		createAndUpdateTile(row);
	}
	if (isNotSame(originalBoard, BOARD_ARRAY)) generateTile();
};

const moveUp = () => {
	let originalBoard = [...BOARD_ARRAY];
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
};

const moveDown = () => {
	let originalBoard = [...BOARD_ARRAY];
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
};
