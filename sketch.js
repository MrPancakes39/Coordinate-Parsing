const xValues = [];
const yValues = [];
const blob = [];
const fileData = "";

function setup() {
	noCanvas();

	// Creates a choose file button.
	createFileInput(fileSelected);

	// Creates a variable "button" from the existing button in html.
	const button = select("#createTextButton");
	button.mousePressed(createBlob);
}

// Checks the file selected if it's a text file and initiates getData();
function fileSelected(file) {
	if (file.type == "text" && file.subtype == "plain") {
		this.fileData = file.data;
		getData();
	} else {
		createP("I need a text file.");
	}
}

// Saves the coordinates as a list in a text file.
function createBlob() {
	for (let i = 0; i < xValues.length; i++) {
		blob.push("x: " + String(xValues[i]) + ", y: " + String(yValues[i]))
	}
	saveStrings(blob, 'coodrinateList.txt');
}

// Gets the data from the file selected and parse it.
async function getData() {
	const data = this.fileData;

	const points = data.split(" ");
	points.forEach(coordinates => {
		const points = coordinates.split(",");
		const xValue = points[0];
		const yValue = points[1];

		xValues.push(xValue);
		yValues.push(yValue);
	})
	createP("Ready");
}
