function analyzerPersonalizedInputSyntax(form){

	//Take text from textArea
	var text = form.personalinputtext.value;
	var arrayLines = text.split("\n");

	if(containsCodeorText(text)){
		alert("Only you can use numbers, whitespaces and enter");
		return false;
	}
	else{
		for(var i = 0 ; i < arrayLines.length; i++){

			//Ordered by priority
			if(i === 0 && !analyzerFirstLine(arrayLines[i])){
				alert("The line " + (i+1) +" has incorrect format.\nRemember the format of the personalized input's beginning:\n[NumberOffices] [NumberRoads]");
				return false;
			}
			else if(i === 0 && !sameRoadsNumber(arrayLines[i],arrayLines.length)){
				alert("The roads number it's not the same that in the first line");
				return false;
			}
			else if(i > 0 && !analyzerEdgeLine(arrayLines[i])){
				alert("The line " + (i+1) + " has incorrect format.\nRemember the format of the creation of every edge:\n[FirstOffice] [SecondOffice] [Distance]");
				return false;
			}
		}
		return true;
	}
}

function analyzerEdgeLine(line){
	var numbersedge = line.split(" ").map(function(item){
		return parseInt(item);
	});

	if(numbersedge.length != 3)
		return false;
	else
		return true;
}

function sameRoadsNumber(line, arrayLength){
	var roadsNumber = line.split(" ").map(function(item){
		return parseInt(item);
	})
	//The number in position 1 has to be the roads number
	roadsNumber = roadsNumber[1];
	//DEBUG
	// console.log("The number of roads var is: " + roadsNumber);
	// console.log("The number of lines is: " + arrayLines.length);

	if(roadsNumber === arrayLength - 1)		
		return true;
	else
		return false;
}


function analyzerFirstLine(line){
	var flNumbers = line.split(" ").map(function(item){
		return parseInt(item);
	});
	//DEBUG
	// console.log(flNumbers.length);

	if(flNumbers.length === 2 )
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