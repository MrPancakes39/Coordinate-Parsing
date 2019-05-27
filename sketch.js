const xValues = [];
const yValues = [];
const blob = [];
var equation = "";

function setup() {
	noCanvas();

	// Creates a choose file button.
	createFileInput(fileSelected);

	// Creates a variable "cButton" from the existing button in html.
	const cButton = select("#createTextButton");
	cButton.mousePressed(createBlob);

	const lButton = select("#LIPButton");
	lButton.mousePressed(generateLIP);
}

// Checks the file selected if it's a text file and initiates getData();
function fileSelected(file) {
	if (file.type == "text" && file.subtype == "plain") {
		getData(file.data);
	} else {
		createP("I need a text file.");
	}
}

// Gets the data from the file selected and parse it.
async function getData(data) {
	//const response = await fetch("text/LIP-test.txt");
	//const data = await response.text();
	//console.log(data);

	const points = data.split(" ");
	points.forEach(coordinates => {
		const points = coordinates.split(",");
		const xValue = points[0];
		const yValue = points[1];

		xValues.push(xValue);
		yValues.push(yValue);
	})
	createP("Ready");
	//console.log(xValues);
	//console.log(yValues);
}

// Saves the coordinates as a list in a text file.
function createBlob() {
	for (let i = 0; i < xValues.length; i++) {
		blob.push("x: " + String(xValues[i]) + ", y: " + String(yValues[i]))
	}
	saveStrings(blob, 'coodrinateList.txt');
}

function generateLIP() {
	var i = 0;
	var j = 0;
	var k = 0;

	var nom = "";
	var den = 1;

	const noms = []
	const dens = [];

	const arrayLength = xValues.length;
	//console.log(arrayLength);

	while (j < arrayLength) {

		if (k == arrayLength) {
			k = 0;
			j++;
			dens.push(den);
			den = 1;
			noms.push(nom + yValues[j - 1]);
			nom = "";
		}

		if (j == k) {
			k++;
		} else {
			den *= (float(xValues[j]) - float(xValues[k]));
			nom += ("(x - " + xValues[k] + ") * ");
			k++;
		}

	}
	//console.log(dens);
	//console.log(noms);

	while (i < (arrayLength - 1)) {
		equation += "{" + noms[i] + "} / {" + String(dens[i]) + "}" + " + ";
		i++;
	}

	if (i == (arrayLength - 1)) {
		equation += "{" + noms[i] + "} / {" + String(dens[i]) + "}";
	}

	console.log(equation);

	saveStrings([equation], 'Curve.txt');
}
