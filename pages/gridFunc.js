
$(document).ready(function () {
  const sizeOfPixel = localStorage.getItem("sizeOfPixel");
  const canvasSize = localStorage.getItem("canvasSize");
  const padding = localStorage.getItem("padding");
  const numberOfPixels = localStorage.getItem("numberOfPixels");
  const colorGrid = JSON.parse(localStorage.getItem('colorGrid'));
  // const availableColors = JSON.parse(localStorage.getItem('availableColors'));
  const availableColors=[];
  const numberOfColors=availableColors.length;
  var isGrid =true;
  

  $(".canvas").css({
    padding: padding,
    width:canvasSize,
    height:canvasSize,
    "grid-template-columns": `repeat(${numberOfPixels},${sizeOfPixel}px)`,
    "grid-template-rows": `repeat(${numberOfPixels},${sizeOfPixel}px)`,

  });
  for (let i = 0; i < Math.pow(numberOfPixels,2); i++) {
    $(".canvas").append(`<div class="pixel" id="pixel${i+1}" tabIndex="${i+1}" style="background-color:${colorGrid[i]};"></div>`);
    
  }
  $(".pixel").each(function () {
    $(this).css({
      height: sizeOfPixel,
      width: sizeOfPixel,
    });
    $(this).click(function () {
      $(this).css({ "background-color": getRandomColor() });
    });
  });

  $('.pixel[tabIndex=1]').focus();
 
  if(availableColors.length>0){
    for(let i=0;i<availableColors.length;i++){
      $(".bottomPicker").append(`<div class="color_bottom" id="color${i+1}" tabIndex="${i+1}" style="background-color:${availableColors[i]};"></div>`);
    }
    $(".bottomPicker").append(`<div class="space"></div>`);
  }

  $(".color_bottom").each(function(){
    $(this).keydown(function(){
    let currentColor = $(this).css("background-color");
    localStorage.setItem("currentColor",currentColor);
    localStorage.setItem("fColor",$(this).attr("id"));
    });
  });

  const softkeycallbackGridColor= {
    center: function() { 
      let focused=$(":focus");
      if(focused.hasClass("pixel")){
        availableColors.length>0?$(":focus").css({"background-color":localStorage.getItem("currentColor")}):$(":focus").css({"background-color":null});
      } 
     },
     left:function(){  
       if(availableColors.length>0){
        isGrid=!isGrid;
        var fGrid= document.getElementById(localStorage.getItem("fGrid"));
        var fColor=document.getElementById(localStorage.getItem("fColor"));
        $(":focus").blur();
        if(isGrid){
         fGrid?fGrid.focus():$("#pixel1").focus();
        }else{
          fColor?fColor.focus():$("#color1").focus();
        } 
       } else{
        window.location.href = "./displayColor.html";
       }  
     }
  };
  document.addEventListener('keydown',handleKeyDownGrid);

function handleKeyDownGrid(e){
  const currentIndex = document.activeElement.tabIndex;
  const numberOfElements=document.getElementsByClassName("pixel").length;
  switch(e.key){
    case 'ArrowUp':
      if(isGrid){
        if(currentIndex==1){
          navGrid(numberOfElements-1);
       }else if(currentIndex<=numberOfPixels){
         navGrid(-1);
       }
       else{
         navGrid(-numberOfPixels);
       }
      }else{
       if(currentIndex==numberOfColors){
          navColor(1-numberOfColors);
        }else{
          navColor(+1);
        }
      }
      break;
    case 'ArrowDown':
     if(isGrid){
      if(currentIndex==numberOfElements||currentIndex>(numberOfElements-numberOfPixels)){
        navGrid(+numberOfPixels-numberOfElements);
      }else{
        navGrid(+numberOfPixels);
      }
     }else{
      if(currentIndex==1){
        navColor(numberOfColors-1);
      }else {
        navColor(-1);
      }
     }
      break;
    case 'ArrowRight':
     if(isGrid){
      if(currentIndex==numberOfElements){
        navGrid(1-numberOfElements);
      }else{
        navGrid(1);
      }
     }else{
      if(currentIndex==numberOfColors){
         navColor(1-numberOfColors);
       }else{
         navColor(+1);
       }
     }
      break;
    case 'ArrowLeft':
      if(isGrid){
        if(currentIndex==1){
          navGrid(numberOfElements-1);
       }else{
        navGrid(-1);
       }
      }else{
        if(currentIndex==1){
          navColor(numberOfColors-1);
        }else {
          navColor(-1);
        }
       }
      break;
    case 'Enter':
      softkeycallbackGridColor.center();
      break;
    case 'SoftLeft':
      softkeycallbackGridColor.left();
      break;
  }
};

function navGrid(move) {
  const currentIndex = document.activeElement.tabIndex;
  const next = currentIndex + move;
  const targetElement = $(`.pixel[tabIndex=${next}]`).eq(0);
  targetElement.focus();
  localStorage.setItem("fGrid",targetElement.attr("id"));
}
function navColor(move) {
  const currentIndex = document.activeElement.tabIndex;
  const next = currentIndex + move;
  const targetElement = $(`.color_bottom[tabIndex=${next}]`).eq(0);
  targetElement.focus();
}
});





