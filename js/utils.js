const removeZeros = (array) => {
	return array.filter((item) => {
		return item !== 0;
	});
};

const addZeros = (array, column) => {
	while (array.length < column) {
		array.push(0);
	}

	return array;
};

const isNotSame = (board1, board2) => {
	if (JSON.stringify(board1) !== JSON.stringify(board2)) return true;
	return false;
};

const transpose = (board) => {
	return board[0].map((col, i) => {
		return board.map((row) => {
			return row[i];
		});
	});
};

const chooseRandom = (array) => {
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
};
