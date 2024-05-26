generateGrid(16);

function generateGrid(gridSize) {
	let divContainer = document.querySelector("#container");
	divContainer.textContent = "";

	for (let i = 0; i < gridSize; i++) {
		let divGridRow = document.createElement("div");
		divGridRow.classList.add("row");
		for (let j = 0; j < gridSize; j++) {
			let divSubGrid = document.createElement("div");

			divSubGrid.addEventListener("mouseenter", () => {
				divSubGrid.style.backgroundColor = "black";
			});

			divGridRow.appendChild(divSubGrid);
		}
		divContainer.appendChild(divGridRow);
	}
}

document.querySelector("button").addEventListener("click", () => {
	let userInputGridSize;
	do {
		userInputGridSize = prompt("Please enter precision (positive integer, max 100)") || 16;
	} while (!(userInputGridSize <= 100 && 
		userInputGridSize > 0 && 
		userInputGridSize % 1 === 0));

	generateGrid(userInputGridSize);
});
