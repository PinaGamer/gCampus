var inefficientRoadsCollection;
var efficientRoadsCollection;

function executeAlgorithm(){

  var elements = cy.elements();
  var nodes = cy.nodes();
  var inefficientRoads = cy.edges().toArray();
  var adjacencymat = [];
  
  

  //Initializing adjacency matrix
  for (var i = 0 ; i < nodes.length ; i++){
    adjacencymat[i] = [];
    for(var j = 0 ; j < nodes.length ; j++)
      adjacencymat[i][j] = false;
  }


  for (var i = 0 ; i < nodes.length ; i++){

      var options = {
      root : nodes[i],
      weight : function (edge){ //If you not define this function, then you can't get the REAL shortest edge between two nodes
        var minEdge = edge.data('weight');
        return minEdge;
      },
      directed : false //this is not necessary
    }

    //Start node
    // console.log("\nFrom node " + nodes[i].data('id'));
    var bf = elements.dijkstra(options);

    

    //End node
    for (var j = 0 ; j < nodes.length ; j ++){

      if(i != j && adjacencymat[i][j] === false){
        // console.log("To node " + nodes[j].data('id'))
        var pathEdges = bf.pathTo(nodes[j]).edges();

        //Transform the shortest path to array
        var shortestPathArray = pathEdges.toArray();

        // console.log(shortestPathArray);

        inefficientRoadsCollection = getInefficientRoads(inefficientRoads, shortestPathArray);

        //Update boolean matrix
        adjacencymat[i][j] = true;
        adjacencymat[j][i] = true;

        //DEBUGGING
        // for(var k = 0 ; k < pathEdges.length ; k++)
        //   console.log(pathEdges[k].data());
      }

    }
  }

  efficientRoadsCollection = cy.edges(!inefficientRoadsCollection);
  printEfficientRoads(efficientRoadsCollection);
  printInefficientRoads(inefficientRoadsCollection);
  blinkingInefficientRoads(inefficientRoadsCollection);
  disablePlayButton();

  //DEBUGGING
  if(inefficientRoadsCollection.length > 0){
    console.log("The inefficient roads are: ");
    printInefficientRoads(inefficientRoadsCollection);
    for(var k = 0 ; k < inefficientRoadsCollection.length ; k++)
      console.log(inefficientRoadsCollection[k].data());
  }
  else
    console.log("There isn't any inefficient road. Congratulations!");
  
}

function getInefficientRoads(inefficientRoadsArray, shortestPath){

  for(var i = 0 ; i < shortestPath.length ; i ++)
    if(inefficientRoadsArray.includes(shortestPath[i])){
      var pos = inefficientRoadsArray.indexOf(shortestPath[i]);
      inefficientRoadsArray.splice(pos,1);
    }

  var inefficientRoads = cy.collection(inefficientRoadsArray);

  return inefficientRoads;
}

function disablePlayButton(){
  var playbutton = document.getElementById("play");
  playbutton.disabled = true;
}

