function executeAlgorithm(){

  var elements = cy.elements();
  console.log(elements);
  for (var i = 0 ; i < elements.length ; i++){
    console.log(elements.data());
  }
}
