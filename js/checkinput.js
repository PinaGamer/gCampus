function checkInput(){
	if(document.getElementById("randominputrad").checked == true){
		document.getElementById("personalinputtext").disabled=true;
		document.getElementById("totalOffices").disabled=false;
		document.getElementById("totalRoads").disabled=false;
	}	
	else{
		document.getElementById("personalinputtext").disabled=false;
		document.getElementById("totalOffices").disabled=true;
		document.getElementById("totalRoads").disabled=true;
	}
}