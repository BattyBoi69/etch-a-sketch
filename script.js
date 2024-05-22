let divContainer = document.querySelector("#container");

for (let i = 1; i < 16 + 1; i++) {
	let divGridRow = document.createElement("div");
	divGridRow.classList.add("row");
	for (let j = 1; j < 16 + 1; j++) {
		let divSubGrid = document.createElement("div");
		divSubGrid.textContent = ((i-1)*10 + j).toString();
		divGridRow.appendChild(divSubGrid);
	}
	divContainer.appendChild(divGridRow);
}
