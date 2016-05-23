function EffEdgeSelected(edge){
  edge.animate({
    style: {
      'line-color': '#40C70B'
    }
  },{
    duration: 500
  })
}

function UneffEdgeSelected(edge){
  edge.animate({
    style: {
      'line-color': '#C6090C'
    }
  },{
    duration: 500
  })
}

function printEfficientRoads(efficientRoads){
  for(var i = 0 ; i < efficientRoads.length ; i++)
    EffEdgeSelected(efficientRoads[i]);
}

function printInefficientRoads(inefficientRoads){
  for(var i = 0 ; i < inefficientRoads.length ; i++)
    UneffEdgeSelected(inefficientRoads[i]);
}