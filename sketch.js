const xValues = [];
const yValues = [];
const blob = [];

function setup() {
	noCanvas();

	// Creates a "choose file" button.
	createFileInput(fileSelected);

	// Creates a variable from the existing button in html.
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
	;
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

// Saves the coordinates as a list in a text file.
function createBlob() {
	for (let i = 0; i < xValues.length; i++) {
		blob.push("x: " + String(xValues[i]) + ", y: " + String(yValues[i]))
	}
	saveStrings(blob, 'coodrinateList.txt');
}

// Generates Lagrange Interpolating Polynomial using the coordinates.
// Then saves it the equation as a text file.

function generateLIP() {
	var i = 0;
	var j = 0;
	var k = 0;

	var den = 1;
	var nom = "";
	var equation = "";

	const noms = []
	const dens = [];

	while (j < (xValues.length)) {

		if (k == (xValues.length)) {
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

	while (i < ((yValues.length) - 1)) {
		equation += "{" + noms[i] + "} / {" + String(dens[i]) + "}" + " + ";
		i++;
	}

	if (i == ((yValues.length) - 1)) {
		equation += "{" + noms[i] + "} / {" + String(dens[i]) + "}";
	}

	saveStrings([equation], 'Curve.txt');
}
