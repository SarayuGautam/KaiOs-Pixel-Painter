function drawCanvas(grid) {
  const numberOfPixels = grid.pixelsPerLine;
  const drawing=grid.drawing;
  const association=grid.drawingColorAssociation;
  
   const colorGrid=drawing.map((drawPixel)=>{
     return (association[drawPixel]);
  });
  const availableColors=grid.availableColors;
 
  const screenWidth = document.documentElement.clientWidth;
  const screenHeight = document.documentElement.clientHeight;
  const padding = 5;
  const canvasSize =
    screenWidth < screenHeight
      ? screenWidth - 2*padding 
      : screenHeight - 2*padding ;
  var sizeOfPixel = (canvasSize / numberOfPixels);
  localStorage.setItem("numberOfPixels", numberOfPixels);
  localStorage.setItem('colorGrid', JSON.stringify(colorGrid));
  localStorage.setItem('availableColors', JSON.stringify(availableColors));
  localStorage.setItem("padding", padding);
  localStorage.setItem("sizeOfPixel", sizeOfPixel);
  localStorage.setItem("canvasSize",canvasSize);
  window.location.href = "./displayGrid.html";
}

$(document).ready(function () {
  $(".box").click(function () {
    const grid = $(this).data("grid");
    drawCanvas(grid);
  });
});


const softkeyCallbackTempPage= {
  center: function() { 
    const currentElement=$(":focus");
    const drawGrid=currentElement.data("grid");
    drawCanvas(drawGrid);
   },
};


$('div[tabIndex=1]').focus();

document.addEventListener('keydown',handlekeyDownTemplate);



function handlekeyDownTemplate(e) {
  const currentIndex = document.activeElement.tabIndex;
  const numberOfElements=document.getElementsByClassName("box").length;
  switch(e.key) {
    case 'ArrowUp':
      if(currentIndex==1){
         navTemp(numberOfElements-1);
      }else if(currentIndex==2){
        navTemp(-1);
      }
      else{
        navTemp(-2);
      }
      break;
    case 'ArrowDown':
    if(currentIndex==numberOfElements||currentIndex==numberOfElements-1){
      navTemp(2-numberOfElements);
    }else{
      navTemp(2);
     }
      break;
    case 'ArrowRight':
      if(currentIndex==numberOfElements){
        navTemp(1-numberOfElements);
      }else{
        navTemp(1);
      }
      break;
    case 'ArrowLeft':
      if(currentIndex==1){
        navTemp(numberOfElements-1);
     }else{
      navTemp(-1);
     }
      break;
    case 'Enter':
      softkeyCallbackTempPage.center();
      break;
  }
}

function navTemp(move) {
  const currentIndex = document.activeElement.tabIndex;
  const next = currentIndex + move;
  const targetElement = $(`div[tabIndex=${next}]`).eq(0);
  targetElement.focus();
}

let template ={

  "pixelsPerLine" : 29,
  "availableColors" : ["#ff6f00","#fcbe37","#81d8d0","#f9c2cc","#bf929a","#8bbf8c","#0c6772","#2c5e00","#782351"],
  "drawingColorAssociation" : {
      "0" : "#d2d2d2", 
      "1" : "#505050", 
      "2" : "#9e9e9e", 
      "3" : "#8b8b8b", 
      "4" : "#5f5f5f"
  },
  "drawing" : [
      1,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,2,2,2,1,1,
      1,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,2,2,2,2,1,1,
      1,2,2,2,0,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,2,2,2,2,0,1,1,
      1,2,2,2,0,2,2,2,1,1,1,3,2,2,2,2,2,1,1,1,3,2,2,0,2,2,2,1,1,
      1,2,2,2,2,0,0,2,2,2,2,2,0,0,2,0,2,2,2,2,2,2,0,2,2,2,2,1,1,
      1,2,2,2,2,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,1,1,
      1,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,1,1,
      1,2,2,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,1,1,
      1,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,1,1,
      1,2,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,
      1,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,
      1,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
      1,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
      1,2,2,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,1,1,
      2,2,0,2,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,2,1,
      2,2,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,2,1,
      2,2,2,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,
      2,2,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,
      1,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
      3,2,2,2,2,2,2,2,0,0,0,0,0,1,1,0,0,0,0,0,2,2,2,2,2,2,2,3,3,
      1,1,2,2,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,1,1,1,
      1,1,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,1,1,1,
      1,4,2,2,2,0,0,0,0,2,2,0,2,2,2,2,0,2,2,0,0,0,0,0,2,2,3,1,1,
      3,1,1,1,2,2,2,0,0,0,0,2,2,3,3,3,2,0,0,0,0,0,0,0,1,1,1,4,1,
      1,1,1,1,1,2,2,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,0,1,1,1,1,1,1,
      1,1,1,1,1,1,2,2,0,2,0,0,0,3,3,2,0,0,0,0,0,0,1,1,1,1,1,1,1,
      1,1,1,1,1,1,1,2,2,0,0,2,2,2,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,
      1,1,1,1,1,1,1,1,1,1,2,2,0,0,2,0,2,0,1,1,1,1,1,1,1,1,1,1,1
  ]
}

$('div[tabIndex=1]').data("grid", template); 