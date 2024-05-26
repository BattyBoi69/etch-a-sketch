let userInputGridSize = 16;
generateGrid(userInputGridSize);

document.querySelector("#gridPrecision").addEventListener("click", () => {
	do {
		userInputGridSize = prompt("Please enter precision (positive integer, max 100)") || 16;
	} while (!(userInputGridSize <= 100 && 
		userInputGridSize > 0 && 
		userInputGridSize % 1 === 0));

	generateGrid(userInputGridSize);
});

document.querySelectorAll("#options button").forEach((btn) => {
	btn.addEventListener("click", () => {
		document.querySelectorAll("#options button").forEach((subLoopBtn) => {
			if (subLoopBtn === btn) {
				subLoopBtn.classList.toggle("btn-toggle-on");
				if (!subLoopBtn.classList.contains("btn-toggle-on")) {
					subLoopBtn.classList.add("btn-toggle-off");
				} else {
					subLoopBtn.classList.remove("btn-toggle-off");
				}
			} else {
				subLoopBtn.classList.remove("btn-toggle-on");
				subLoopBtn.classList.add("btn-toggle-off");
			}
		});
		generateGrid(userInputGridSize);
	});
});

function generateGrid(gridSize) {
	let divContainer = document.querySelector("#container");
	divContainer.textContent = "";

	for (let i = 0; i < gridSize; i++) {
		let divGridRow = document.createElement("div");
		divGridRow.classList.add("row");
		for (let j = 0; j < gridSize; j++) {
			let divSubGrid = document.createElement("div");

			divSubGrid.addEventListener("mouseenter", () => {
				divSubGrid.style.backgroundColor = pickSubGridColor();
			});

			divGridRow.appendChild(divSubGrid);
		}
		divContainer.appendChild(divGridRow);
	}
}

function pickSubGridColor() {
	let isCR = document.querySelector("#toggleColorRandomize");
	let isS = document.querySelector("#toggleShading");
	if (isCR.classList.contains("btn-toggle-on")) {
		let randomColor = "rgb(";
		for (let i = 0; i < 3; i++) {
			randomColor += Math.floor(Math.random() * 256) + ",";
		}
		return randomColor.slice(0, -1) + ")";
	} else if (isS.classList.contains("btn-toggle-on")) {
		return "blue";
	} else {
		return "black";
	}
}


