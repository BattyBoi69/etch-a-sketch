let divContainer = document.querySelector("#container");

let gridSize = 5;
for (let i = 0; i < gridSize; i++) {
	let divGridRow = document.createElement("div");
	divGridRow.classList.add("row");
	for (let j = 0; j < gridSize; j++) {
		let divSubGrid = document.createElement("div");
		//divSubGrid.textContent = (i*gridSize + j + 1).toString();
		
		divSubGrid.addEventListener("mouseenter", () => {
			divSubGrid.style.backgroundColor = "black";
		});

		divGridRow.appendChild(divSubGrid);
	}
	divContainer.appendChild(divGridRow);
}
