const xValues = [];
const yValues = [];
const blob = [];
const fileData = "";
const step = false;

function setup() {
	noCanvas();
	//console.log("About to fetch data");

	createFileInput(fileSelected);

	const button = select("#createTextButton");
	button.mousePressed(createBlob);
}

function draw() {
	if (this.step) {
		createP("Ready");
		this.step = false;
	}
}

function fileSelected(file) {
	//console.log(file);
	if (file.type == "text" && file.subtype == "plain") {
		this.fileData = file.data;
	} else {
		createP("I need a text file.");
	}
	getData();
}

function createBlob() {
	for (let i = 0; i < xValues.length; i++) {
		blob.push("x: " + String(xValues[i]) + ", y: " + String(yValues[i]))
	}
	//console.log(blob);
	saveStrings(blob, 'coodrinateList.txt');
}

async function getData() {
	//const response = await fetch("text/test.txt");
	//const data = await response.text();
	const data = this.fileData;
	//console.log(data);

	const points = data.split(" ");
	points.forEach(coordinates => {
		const points = coordinates.split(",");
		const xValue = points[0];
		const yValue = points[1];

		xValues.push(xValue);
		yValues.push(yValue);
	})
	this.step = true;
}