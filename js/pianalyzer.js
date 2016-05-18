function analyzerPersonalizedInputSyntax(form){

	//Take text from textArea
	var text = form.personalinputtext.value;
	var arrayLines = text.split("\n");

	var firstLineNumber = arrayLines[0].split(" ").map(function(item){
		return parseInt(item);
	});
	var numberOffices = firstLineNumber[0];
	var NumberRoads = firstLineNumber[1];


	if(containsCodeorText(text)){
		alert("Only you can use numbers, whitespaces and enter");
		return false;
	}
	else{
		for(var i = 0 ; i < arrayLines.length; i++){

			//Ordered by priority
			if(i === 0 && !analyzerFirstLine(firstLineNumber)){
				alert("The line " + (i+1) + " ("+ arrayLines[i] +") has incorrect format.\nRemember the format of the personalized input's beginning:\n[NumberOffices] [NumberRoads]");
				return false;
			}
			else if(i === 0 && !sameRoadsNumber(firstLineNumber,arrayLines.length)){
				alert("The roads number it's not the same that in the first line");
				return false;
			}
			else if(i > 0 && !analyzerEdgeLine(arrayLines[i])){
				alert("The line " + (i+1) + " ("+ arrayLines[i] +") has incorrect format.\nRemember the format of the creation of every edge:\n[FirstOffice] [SecondOffice] [Distance]");
				return false;
			}
			else if(i > 0 && !checkOfficesInterval(numberOffices,arrayLines[i])){
				alert("The line " + (i+1) + " ("+ arrayLines[i] +") has exceeded offices interval.\nYour interval offices goes from 0 to " + (arrayLines.length -1));
				return false;
			}

			else if(i > 0 && !analyzerWeight(arrayLines[i])){
				alert("The line "+ (i+1) +" has negative distance.\nChange it!");
				return false;	
			}
		}
		return true;
	}
}

function analyzerEdgeLine(edgeLine){
	var numbersEdge = edgeLine.split(" ").map(function(item){
		return parseInt(item);
	});

	if(numbersEdge.length != 3)
		return false;
	else
		return true;
}

function sameRoadsNumber(firstLineNumber, arrayLength){
	
	//The number in position 1 has to be the roads number
	firstLineNumber = firstLineNumber[1];
	//DEBUG
	// console.log("The number of roads var is: " + roadsNumber);
	// console.log("The number of lines is: " + arrayLines.length);

	//arrayLength - 1 = edgeList
	if(firstLineNumber === arrayLength - 1)		
		return true;
	else
		return false;
}

function analyzerWeight(edgeLine){
	var roadsNumber = edgeLine.split(" ").map(function(item){
		return parseInt(item);
	});

	var weight = roadsNumber[2];
	if(weight < 0)
		return false;
	else
		return true;
}

function checkOfficesInterval(numberOffices, edgeLine){
	var edgeNumber = edgeLine.split(" ").map(function(item){
		return parseInt(item);
	});

	var firstOffice = edgeNumber[0];
	var secondOffice = edgeNumber[1];

	if(firstOffice > numberOffices - 1 || secondOffice > numberOffices - 1 || firstOffice < 0 || secondOffice < 0)
		return false;
	else
		return true;
}

function analyzerFirstLine(firstLineNumber){
	//DEBUG
	// console.log(flNumbers.length);

	if(firstLineNumber.length === 2 )
		return true;
	else
		return false;
}

function containsCodeorText(text){
	var regCode = /[^\n\s\d+]/g;

	if(regCode.test(text))
		return true;
	else
		return false;
}