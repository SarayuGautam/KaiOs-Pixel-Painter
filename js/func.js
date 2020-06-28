

  


//render template from json file

function readJsonFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
          callback(rawFile.responseText);
      }
  }
  rawFile.send(null);
}
readJsonFile("../template/templates.json", function(text){
$('.box[tabIndex=1]').focus();
  var data = JSON.parse(text);
  var templates =data.templates;
  var numberOfTemplates= Object.keys(templates).length;
  for(var i=1;i<=numberOfTemplates;i++){
    $(".template").append(`<div tabIndex="${i}" class="box"></div>`);
    $(`.box[tabIndex=${i}]`).data("grid", JSON.stringify(templates[i]));
    if(i<3){//cache x number of templates  
      $(`.box[tabIndex=${i}]`).cacheImages({url: `${templates[i].previewUrl}`});
      $.fn.cacheImages.fetchURL(`${templates[i].previewUrl}`, function(url, image){ });
    }else{
      $(`.box[tabIndex=${i}]`).css({"background-image":`url("${templates[i].previewUrl}")`});
    }
  }
});











//Function to draw canvas

function drawCanvas(grid) {



  //defining constants

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






//send grid display

$(document).ready(function () {
  $('.box[tabIndex=1]').focus();
  $(".box").click(function () {
    const grid = JSON.parse($(this).data("grid"));
    drawCanvas(grid);
  });
});


const softkeyCallbackTempPage= {
  center: function() { 
    const currentElement=$(":focus");
    const drawGrid=JSON.parse(currentElement.data("grid"));
    drawCanvas(drawGrid);
   },
};







document.addEventListener('keydown',handlekeyDownTemplate);











//Handle Keydown


function handlekeyDownTemplate(e) {
  const currentIndex = document.activeElement.tabIndex;
  const numberOfElements=document.getElementsByClassName("box").length;
  switch(e.key) {
    case 'ArrowUp':
      if (currentIndex == 1) {
        navTemp(numberOfElements - 1);
      } else if (currentIndex <= 2) {
        navTemp(-1);
      } else {
        navTemp(-2);
      }
      break;
    case 'ArrowDown':
      if (currentIndex == numberOfElements || currentIndex > (numberOfElements - 2)) {
        navTemp(+2 - numberOfElements);
      } else {
        navTemp(+2);
      }
      break;
    case 'ArrowRight':
      if (currentIndex == numberOfElements) {
        navTemp(1 - numberOfElements);
      } else {
        navTemp(1);
      }
      break;
    case 'ArrowLeft':
      if (currentIndex == 1) {
        navTemp(numberOfElements - 1);
      } else {
        navTemp(-1);
      }
      break;
    case 'Enter':
      softkeyCallbackTempPage.center();
      break;
  }
}







//navigate template


function navTemp(move) {
  const currentIndex = document.activeElement.tabIndex;
  const next = currentIndex + move;
  const targetElement = $(`.box[tabIndex=${next}]`).eq(0);
  targetElement.focus();
}







