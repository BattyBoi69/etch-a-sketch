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
			divSubGrid.style.backgroundColor = "rgb(255,99,71)"; // tomato

			divSubGrid.addEventListener("mouseenter", () => {
				divSubGrid.style.backgroundColor = pickSubGridColor(divSubGrid.style.backgroundColor);
			});

			divGridRow.appendChild(divSubGrid);
		}
		divContainer.appendChild(divGridRow);
	}
}

function pickSubGridColor(subGridBColor) {
	let isCR = document.querySelector("#toggleColorRandomize");
	let isS = document.querySelector("#toggleShading");
	if (isCR.classList.contains("btn-toggle-on")) {
		return generateRandomRGB();
	} else if (isS.classList.contains("btn-toggle-on")) {
		return darkenRGB(subGridBColor);
	} else {
		return "rgb(0,0,0)"; // black
	}
}

function generateRandomRGB() {
	let randomColor = "rgb(";
	for (let i = 0; i < 3; i++) {
		randomColor += Math.floor(Math.random() * 256) + ",";
	}
	return randomColor.slice(0, -1) + ")";
}

function darkenRGB(colorRGB, percentage = 15) {
	const colorHSL = convertRGBtoHSL(colorRGB);
	const regex = /[0-9]+/g;
	const hslArrayString = colorHSL.match(regex);
	const hslArray = [];
	hslArrayString.forEach((value) => hslArray.push(+value));
	hslArray[2] = Math.max(0,hslArray[2]-percentage);
	return `hsl(${hslArray[0]},${hslArray[1]}%,${hslArray[2]}%)`;
}

function convertRGBtoHSL(colorRGB) {
	const regex = /[0-9]+/g;
	const rgbArrayString = colorRGB.match(regex);
	const rgbArray = [];
	rgbArrayString.forEach( (value) => rgbArray.push(value/255));

	const rgbMax = Math.max(...rgbArray);
	const rgbMin = Math.min(...rgbArray);

	const lightness = (rgbMax + rgbMin)/2 * 100;

	let saturation;
	if (rgbMax === rgbMin) {
		saturation = 0;
	} else if (lightness <= 50) {
		saturation = (rgbMax - rgbMin)/(rgbMax + rgbMin);
	} else {
		saturation = (rgbMax - rgbMin)/(2 - rgbMax - rgbMin);
	}
	saturation *= 100;

	let hue;
	if (rgbMax === rgbMin) {
		hue = 0;
	} else {
		let maxComponent = rgbArray.indexOf(rgbMax);
		let maxPlus1 = (maxComponent + 1) % 3;
		let maxPlus2 = (maxComponent + 2) % 3;
		hue = 2 * maxComponent + (rgbArray[maxPlus1] - rgbArray[maxPlus2])/(rgbMax-rgbMin);
		hue *= 60;
		if (hue < 0) hue += 360;
	}
	
	let hslArray = [];
	[hue, saturation, lightness].forEach( (value) => hslArray.push(Math.round(value)));
	return `hsl(${hslArray[0]},${hslArray[1]}%,${hslArray[2]}%)`;
}
