function nodeSelected(node){
  node.animate({
    style: {
      backgroundColor: 'green'
    }
  },{
    duration: 500
  })

  .delay(500)

  .animate({
    style: {
      backgroundColor: 'red'
    }
  },{
    duration: 500
  });
}

function edgeSelected(){

}
