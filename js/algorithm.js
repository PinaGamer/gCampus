function executeAlgorithm(){

  var elements = cy.elements();
  var nodes = cy.nodes();

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
    console.log("\nFrom node " + nodes[i].data('id'));
    var bf = elements.dijkstra(options);
    

    //End node
    for (var j = 0 ; j < nodes.length ; j ++){
      if(i != j){
        console.log("To node " + nodes[j].data('id'))
        var pathEdges = bf.pathTo(nodes[j]).edges();

        for(var k = 0 ; k < pathEdges.length ; k++)
          console.log(pathEdges[k].data());
      }
        // printCollection(pathEdges);
    }
  }

}

function printCollection(collection){
  for(var i = 0 ; i < collection.length ; i++){
    console.log(collection[i].data());
  }
}