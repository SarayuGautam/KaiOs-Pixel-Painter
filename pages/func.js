function drawCanvas(grid) {
  const screenWidth = document.documentElement.clientWidth;
  const screenHeight = document.documentElement.clientHeight;
  const padding = 10;
  const canvasSize =
    screenWidth < screenHeight
      ? screenWidth - 2*padding 
      : screenHeight - 2*padding ;
  var sizeOfPixel = (canvasSize / grid);
  localStorage.setItem("grid", grid);
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
    window.location.href="./displayGrid.html";
    drawCanvas(drawGrid);
   },
};


$('div[tabIndex=1]').focus().addClass("active");

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
      navTemp(1-numberOfElements);
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
  $(".active").removeClass("active");
  targetElement.focus().addClass("active");
}