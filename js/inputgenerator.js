//CONSTANTS
const distance = 100;


function generatePersonalizedInput(form){
	var totalRoads = form.totalRoads.value;
	var totalOffices = form.totalOffices.value;
	var layout = radioChecked();


	if(totalOffices <= 0 || totalRoads <= 0)
		alert("Are you kidding me?");
	else if(totalOffices - 1 > totalRoads)
			alert("The number of roads have to be at least numberOffices - 1");
	else{
		console.log("The input is correct");
		generateCytoscapeGraph(totalOffices, totalRoads,layout);
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

function generateCytoscapeGraph(totalOffices, totalRoads, layout){
	var script = 	"var cy = cytoscape({\n\n" +
								"\tcontainer: document.getElementById('cytoscape'), // container to render in\n\n";

	var color = "red", linecolor = "blue";
	var elements = generateElements(totalOffices, totalRoads);
	var style = generateStyle(color, linecolor);
	var layout = generateLayout(layout);

	script += elements + style + layout + "\n\n});";

	console.log(script);

	var scriptTag = document.createElement('script');
	scriptTag.innerHTML = script;
	document.body.appendChild(scriptTag);

	var play = document.getElementsByName('play')[0];
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
function generateElements(totalOffices, totalRoads){

	var elements = "\telements: [ // list of graph elements to start with\n";

	//Creating node's information
	for(var i = 0 ; i < totalOffices ; i++){
		var node = 	"\t\t{"+ " // node "+ i +"\n " +
					"\t\t\tdata: { id: '"+ i +"' }\n" +
					"\t\t},\n";

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
						var sEdge = "\t\t{"+ " // edge e"+ i +"\n " +
												"\t\t\tdata: \t{\n" +
												"\t\t\t\tid: 'e"+ i +  "',\n" +
												"\t\t\t\tsource: '"+randomFirstOffice+"', target: '" + randomSecondOffice + "',\n" +
												"\t\t\t\tweight: " + randomDistance + "\n" +
												"\t\t\t}\n" + 
												"\t\t},\n";

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
