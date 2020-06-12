$(document).ready(function () {
  const sizeOfPixel = localStorage.getItem("sizeOfPixel");
  const canvasSize = localStorage.getItem("canvasSize");

  const padding = localStorage.getItem("padding");
  const grid = localStorage.getItem("grid");

  $(".canvas").css({
    padding: padding,
    width:canvasSize,
    height:canvasSize,
    "grid-template-columns": `repeat(${grid},${sizeOfPixel}px)`,
    "grid-template-rows": `repeat(${grid},${sizeOfPixel}px)`,

  });
  for (let i = 0; i < Math.pow(grid,2); i++) {
    $(".canvas").append(`<div class="pixel" id="id${i}" tabIndex="${i+1}"></div>`);
    
  }

  $(".pixel").each(function () {
    $(this).css({
      border: "1px solid black",//To be fixed
      height: sizeOfPixel,
      width: sizeOfPixel,
    });
    $(this).click(function () {
      $(this).css({ "background-color": getRandomColor() });
    });
  });
  $('div[tabIndex=1]').focus().addClass("active_grid");
});
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const softkeycallbackGridColor= {
  center: function() { 
    const currentElement=$(":focus");
    currentElement.css({"background-color":getRandomColor()});
   },
};



document.addEventListener('keydown',handleKeyDownGrid);

function handleKeyDownGrid(e){
  const grid = localStorage.getItem("grid");
  const currentIndex = document.activeElement.tabIndex;
  const numberOfElements=document.getElementsByClassName("pixel").length;
  switch(e.key){
    case 'ArrowUp':
      if(currentIndex==1){
         navGrid(numberOfElements-1);
      }else if(currentIndex<=grid){
        navGrid(-1);
      }
      else{
        navGrid(-grid);
      }
      break;
    case 'ArrowDown':
      if(currentIndex==numberOfElements||currentIndex>(numberOfElements-grid)){
        navGrid(+grid-numberOfElements);
      }else{
        navGrid(+grid);
      }
      break;
    case 'ArrowRight':
      if(currentIndex==numberOfElements){
        navGrid(1-numberOfElements);
      }else{
        navGrid(1);
      }
      break;
    case 'ArrowLeft':
      if(currentIndex==1){
        navGrid(numberOfElements-1);
     }else{
      navGrid(-1);
     }
      break;
    case 'Enter':
      softkeycallbackGridColor.center();
      break;
  }
}

function navGrid(move) {
  const currentIndex = document.activeElement.tabIndex;
  const next = currentIndex + move;
  const targetElement = $(`div[tabIndex=${next}]`).eq(0);
  $(".active_grid").removeClass("active_grid");
  targetElement.focus().addClass("active_grid");
}