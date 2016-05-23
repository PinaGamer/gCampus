//CONSTANTS
const distance = 100;


//FUNCTIONS
function generateInput(form){
	if(form.inputformat[0].value =="random")
		generateRandomInput(form);
	else
		generatePersonalizedInput(form);
}

function generatePersonalizedInput(form){
	if(analyzerPersonalizedInputSyntax(form)){
		console.log("Correct syntax!");

		var text = form.personalinputtext.value;
		var arrayLines = text.split("\n");
		var firstLineNumbers = arrayLines[0].split(" ").map(function(item){
			return parseInt(item);
		});

		var totalOffices =firstLineNumbers[0];
		var totalRoads = firstLineNumbers[1];

		// console.log("The number of offices is: " + totalOffices);
		// console.log("The number of roads is: " + totalRoads);

		var layout = radioChecked();

		//Take a copy of arrayLines variable since position 1 (only edges)
		var edges = arrayLines.slice(1);

		//It already isn't necessary
		delete arrayLines

		generatePersonalizedCytoscapeGraph(totalOffices,totalRoads,layout,edges);
	}
}



function generateRandomInput(form){
	var totalRoads = form.totalRoads.value;
	var totalOffices = form.totalOffices.value;
	var layout = radioChecked();


	if(totalOffices <= 0 || totalRoads <= 0)
		alert("Are you kidding me?");
	else if(totalOffices - 1 > totalRoads)
			alert("The number of roads have to be at least numberOffices - 1");
	else{
		console.log("The input is correct");
		generateRandomCytoscapeGraph(totalOffices, totalRoads,layout);
	}
}

function radioChecked(){
	var radioElements = document.getElementsByName('opc');
	for(var i = 0 ; i < radioElements.length ; i++){
		if(radioElements[i].checked)
			var value = radioElements[i].value;
	}
	return value;
}

function generateRandomCytoscapeGraph(totalOffices, totalRoads, layout){
	var script = 	"var cy = cytoscape({\n\n" +
								"\tcontainer: document.getElementById('cytoscape'), // container to render in\n\n";

	var color = "red", linecolor = "blue";

	var elements = generateRandomElements(totalOffices, totalRoads);
	var style = generateStyle(color, linecolor);
	var layout = generateLayout(layout);

	script += elements + style + layout + "\n\n});";

	console.log(script);

	var scriptTag = document.createElement('script');
	scriptTag.innerHTML = script;
	document.body.appendChild(scriptTag);

	var play = document.getElementById('play');
	play.disabled = false;
}

function generatePersonalizedCytoscapeGraph(totalOffices,totalRoads,layout,edgesArray){
	var script = 	"var cy = cytoscape({\n\n" +
								"\tcontainer: document.getElementById('cytoscape'), // container to render in\n\n";

	var color = "red", linecolor = "blue";
	var elements = generatePersonalizedElements(totalOffices,totalRoads,edgesArray);
	var style = generateStyle(color, linecolor);
	var layout = generateLayout(layout);

	script += elements + style + layout + "\n\n});";

	console.log(script);

	var scriptTag = document.createElement('script');
	scriptTag.innerHTML = script;
	document.body.appendChild(scriptTag);

	var play = document.getElementById('play');
	play.disabled = false;
}

function generateStyle(color, linecolor){
	var arrowform = "none";
	var style = "\tstyle: [ // the stylesheet for the graph\n" +
							"\t\t{\n" +
							"\t\t\tselector: 'node',\n" +
							"\t\t\tstyle: {\n" +
							"\t\t\t\t'background-color': '" + color + "',\n" +
							"\t\t\t\t'label': '" + "data(id)" + "',\n" +
							"\t\t\t\t'text-valign': '" + "center" + "',\n" +
							"\t\t\t\t'text-halign': '" + "center" + "'\n" +
							"\t\t\t}\n" +
							"\t\t},\n\n" +
							"\t\t{\n" +
							"\t\t\tselector: 'edge',\n" +
							"\t\t\tstyle: {\n" +
							"\t\t\t\t'curve-style': '" + "bezier" + "',\n" +
							"\t\t\t\t'control-point-step-size': " + 50 + ",\n" +
							"\t\t\t\t'label': '" + "data(weight)" + "',\n" +
							"\t\t\t\t'line-color': '" + linecolor + "',\n" +
							"\t\t\t\t'line-style': '" + "solid" + "',\n" +
							"\t\t\t\t'target-arrow-shape': '" + arrowform + "',\n" +
							"\t\t\t\t'target-arrow-color': '" + linecolor + "',\n" +
							"\t\t\t\t'text-outline-color': '" + "white" + "',\n" +
							"\t\t\t\t'text-outline-width': '" + 2 + "',\n" +
							"\t\t\t\t'width': " + 3 + "\n" +
							"\t\t\t}\n" +
							"\t\t}\n" +
							"\t],\n\n";
	return style;
}

//This function set the initial disposition of the nodes in the graph
function generateLayout(layout){
	var layout = 	"\tlayout: {\n" +
								"\t\tname: '" + layout + "',\n" +
								"\t\trows: " + 1 + ",\n" +
								"\t\tanimate: " + true + ",\n" +
								"\t\tanimationDuration: " + 1500 + ",\n" +
								"\t\tanimationEasing: " + undefined + "\n" +

								"\t}\n\n";
	return layout;
}

//This function generates JSON data to pass it to Cytoscape
function generateRandomElements(totalOffices, totalRoads){

	var elements = "\telements: [ // list of graph elements to start with\n";

	//Creating node's information
	for(var i = 0 ; i < totalOffices ; i++){
		var node = 	generateNodeInfo(i);
		elements += node;
	}

	//Creating edge's information
	for (var i = 0 ; i < totalRoads ; i++){

		var randomFirstOffice, randomSecondOffice, randomDistance;

		//First, I'm going to make sure that every office is connected to the graph
		if(i < totalOffices - 1){
			randomFirstOffice = i;
			do{
				randomSecondOffice = Math.floor(Math.random() * totalOffices);
			}
			while(randomFirstOffice >= randomSecondOffice);
			randomDistance = Math.round(Math.random() * distance) + 1;
			// console.log(i+1 + ": " + randomFirstOffice + " " + randomSecondOffice + " " + randomDistance);
		}
		else{
			randomFirstOffice = Math.floor(Math.random() * totalOffices);
			randomSecondOffice = Math.floor(Math.random() * totalOffices);
			randomDistance = Math.round(Math.random() * distance) + 1;
			// console.log(i+1 + ": " + randomFirstOffice + " " + randomSecondOffice + " " + randomDistance);
		}
		//It's very important that the edge's identifier be unique
		var sEdge = generateEdgeInfo(i,randomFirstOffice,randomSecondOffice,randomDistance);
		// console.log(sFirstOffice);
		// console.log(sSecondOffice);
		// console.log(sEdge);

		//BLUNDER!!!
		if(i === totalRoads - 1){
			sEdge = sEdge.substring(0,sEdge.length - 2) + "\n";
		}

		elements += sEdge;
		// if(!btotalOffices[randomFirstOffice] && !btotalOffices[randomSecondOffice]){
		// 	console.log(randomFirstOffice + " " + randomSecondOffice + " " + randomDistance);
		// }
	}
	elements += "\t],\n\n";
	// console.log(elements);
	return elements;
}

function generatePersonalizedElements(totalOffices, totalRoads, edgeArray){

	var elements = "\telements: [ // list of graph elements to start with\n";

	//Creating node's information
	for(var i = 0 ; i < totalOffices ; i++){
		var node = 	generateNodeInfo(i);
		elements += node;
	}

	//Create road's information
	for (var i = 0 ; i < totalRoads ; i++){
		var numericEdge = getNumericInfoEdge(edgeArray[i]);

		var firstOffice = numericEdge[0];
		var secondOffice = numericEdge[1];
		var distance = numericEdge[2];

		var sEdge = generateEdgeInfo(i,firstOffice,secondOffice,distance);

		if(i === totalRoads - 1){
			sEdge = sEdge.substring(0,sEdge.length - 2) + "\n";
		}

		elements += sEdge;
	}
	elements += "\t],\n\n";
	// console.log(elements);
	return elements;

}

function getNumericInfoEdge(edgeLine){
	var numericEdge = edgeLine.split(" ").map(function(item){
		return parseInt(item);
	});

	return numericEdge;
}

function generateNodeInfo(node){
	var node = 	"\t\t{"+ " // node "+ node +"\n " +
					"\t\t\tdata: { id: '"+ node +"' }\n" +
					"\t\t},\n";

	return node;
}

function generateEdgeInfo(edgeid,firstOffice, secondOffice, distance){
	var sEdge = "\t\t{"+ " // edge e"+ edgeid +"\n " +
				"\t\t\tdata: \t{\n" +
				"\t\t\t\tid: 'e"+ edgeid +  "',\n" +
				"\t\t\t\tsource: '" + firstOffice + "', target: '" + secondOffice + "',\n" +
				"\t\t\t\tweight: " + distance + "\n" +
				"\t\t\t}\n" + 
				"\t\t},\n";
	return sEdge;
}