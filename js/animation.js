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

function blinkingIneffEdge(edge){

  var times = 3;

  for(var i = 0 ; i < times ; i++)
    blinkEdge(edge);

  //Nested function
  function blinkEdge(edge){
    edge.animate({
    style: {
      'opacity': '1'
    }
    },{
    duration: 500
    })
    .delay(200)
    .animate({
      style: {
        'opacity': '0'
      }
    },{
      duration: 500
    })
  }
}

function blinkingInefficientRoads(inefficientRoads){
  inefficientRoads.forEach(function(edge){
    blinkingIneffEdge(edge);
  });
}

function printEfficientRoads(efficientRoads){
  for(var i = 0 ; i < efficientRoads.length ; i++)
    EffEdgeSelected(efficientRoads[i]);
}

function printInefficientRoads(inefficientRoads){
  for(var i = 0 ; i < inefficientRoads.length ; i++)
    UneffEdgeSelected(inefficientRoads[i]);
}