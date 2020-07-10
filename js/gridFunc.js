$(document).ready(function () {
  const sizeOfPixel = localStorage.getItem("sizeOfPixel");
  const canvasSize = localStorage.getItem("canvasSize");
  const numberOfPixels = localStorage.getItem("numberOfPixels");
  const buttonIndex = localStorage.getItem("buttonIndex");
 
  const coloringNumber  = JSON.parse(localStorage.getItem("coloringNumber"));
  const numberColorAssociation =JSON.parse(localStorage.getItem("numberColorAssociation"));
  const colorGrid = JSON.parse(localStorage.getItem('colorGrid'));
  const availableColors = JSON.parse(localStorage.getItem('availableColors'));
  // const availableColors = [];
  const numberOfColors = availableColors.length;
  var isGrid = true;
  const paletteColors = ["#003366", "#336699", "#3366CC", "#003399", "#000099", "#0000CC", "#000066", "#006666", "#006699", "#0099CC", "#0066CC", "#0033CC", "#0000FF", "#3333FF", "#333399", "#669999", "#009999", "#33CCCC", "#00CCFF", "#0099FF", "#0066FF", "#3366FF", "#3333CC", "#666699", "#339966", "#00CC99", "#00FFCC", "#00FFFF", "#33CCFF", "#3399FF", "#6699FF", "#6666FF", "#6600FF", "#6600CC", "#339933", "#00CC66", "#00FF99", "#66FFFF", "#99CCFF", "#9999FF", "#9966FF", "#9933FF", "#9900FF", "#006600", "#00CC00", "#00FF00", "#66FF99", "#99FFCC", "#CCCCFF", "#CC99FF", "#CC66FF", "#CC33FF", "#CC00FF", "#9900CC", "#003300", "#009933", "#33CC33", "#66FF66", "#99FF99", "#CCFFCC", "#FF99FF", "#FF66FF", "#FF00FF", "#CC00CC", "#660066", "#336600", "#009900", "#66FF33", "#99FF66", "#CCFF99", "#FFFFCC", "#FFCCCC", "#FF99CC", "#FF33CC", "#CC0099", "#993399", "#333300", "#669900", "#99FF33", "#CCFF66", "#FFFF99", "#FFCC99", "#FF9999", "#FF6699", "#FF3399", "#CC3399", "#990099", "#666633", "#99CC00", "#CCFF33", "#FFFF66", "#FFCC66", "#FF9966", "#FF6666", "#FF0066", "#CC6699", "#993366", "#999966", "#CCCC00", "#FFFF00", "#FFCC00", "#FF9933", "#FF6600", "#FF5050", "#CC0066", "#660033", "#996633", "#CC9900", "#FF9900", "#CC6600", "#FF3300", "#FF0000", "#CC0000", "#990033", "#663300", "#996600", "#CC3300", "#993300", "#990000", "#800000", "#993333"];
  const numberOfPaletteColors = Math.floor(Math.sqrt(paletteColors.length));
  const sizeOfColor = (canvasSize - 60) / numberOfPaletteColors;



  
 



  //Grid
  $(".canvas").css({
    width: canvasSize,
    height: canvasSize,
    "grid-template-columns": `repeat(${numberOfPixels},${sizeOfPixel}px)`,
    "grid-template-rows": `repeat(${numberOfPixels},${sizeOfPixel}px)`,

  });
  for (let i = 0; i < Math.pow(numberOfPixels, 2); i++) {
     if(coloringNumber[i]>=0){
      buttonIndex==2?$(".canvas").append(`<div class="pixel" id="pixel${i+1}" tabIndex="${i+1}" style="background-color:${colorGrid[i]};"><p style="font-size: ${sizeOfPixel-2}px; text-align: center;">${coloringNumber[i]}</p></div>`):$(".canvas").append(`<div class="pixel" id="pixel${i+1}" tabIndex="${i+1}" style="background-color:${colorGrid[i]};"></div>`);

     }else{
      buttonIndex==2?$(".canvas").append(`<div class="pixel" id="pixel${i+1}" tabIndex="${i+1}" style="background-color:${colorGrid[i]};"></div>`):$(".canvas").append(`<div class="pixel" id="pixel${i+1}" tabIndex="${i+1}" style="background-color:${colorGrid[i]};"></div>`);
     }
  }
  $(".pixel").each(function () {
    $(this).css({
      height: sizeOfPixel,
      width: sizeOfPixel,
    });
  });

  $('.pixel[tabIndex=1]').focus();










  //Available Colors
  if(buttonIndex==2){
    const numberedColor = Object.values(numberColorAssociation);
    $(".wrapper").append('<div class="bottomPicker"></div>');
    $(".bottomPicker").append(`<div class="space"></div>`);
      for (let i = 0; i < numberedColor.length; i++) {
        $(".bottomPicker").append(`<div class="color_bottom" id="color${i+1}" tabIndex="${i+1}" style="background-color:${numberedColor[i]};"><p style="font-size: 15px; color:white; text-align: center;">${i}</p></div>`);
      }
      $(".bottomPicker").append(`<div class="space"></div>`);
  }else{
    if (availableColors.length > 0) {
      $(".wrapper").append('<div class="bottomPicker"></div>');
      $(".bottomPicker").append(`<div class="space"></div>`);
      for (let i = 0; i < availableColors.length; i++) {
        $(".bottomPicker").append(`<div class="color_bottom" id="color${i+1}" tabIndex="${i+1}" style="background-color:${availableColors[i]};"></div>`);
      }
      $(".bottomPicker").append(`<div class="space"></div>`);
    } else{
      $(".wrapper").append('<div tabIndex="1" class="customPicker"></div>');
    }
  }
  








  //Press Available Colors
  $(".color_bottom").each(function () {
    $(this).keydown(function () {
      let currentColor = $(this).css("background-color");
      localStorage.setItem("currentColor", currentColor);
      localStorage.setItem("fColor", $(this).attr("id")); 
    });
  });










//Modal

  $(".modal").css({
    width: canvasSize - 40,
    height: canvasSize - 40,
  });

  $(".modalColor").css({
    width: canvasSize - 60,
    height: canvasSize - 60,
    "grid-template-columns": `repeat(${numberOfPaletteColors},${sizeOfColor}px)`,
    "grid-template-rows": `repeat(${numberOfPaletteColors},${sizeOfColor}px)`,
  });

  for (let i = 0; i < paletteColors.length; i++) {
    $(".modalColor").append(`<div class="colorPixel" id="colorPixel${i + 1}" tabIndex="${i + 1}" style="background-color:${paletteColors[i]};height:${sizeOfColor}px;width:${sizeOfColor}px;"></div>`);
  }








//Press Grid or Custom Palette

  const softkeycallbackGridColor = {
    center: function () {
      let focused = $(":focus");
      if (focused.hasClass("pixel")) {
        availableColors.length > 0 ? $(":focus").css({
          "background-color": localStorage.getItem("currentColor")
        }) : $(":focus").css({
          "background-color": localStorage.getItem("paletteColor")
        });
      }else if(focused.hasClass("colorPixel")){ 
        let currentColor = focused.css("background-color");
        localStorage.setItem("paletteColor", currentColor);
        localStorage.setItem("fPalette", focused.attr("id"));
        $.modal.close();
        var fGrid = document.getElementById(localStorage.getItem("fGrid"));
        fGrid ? fGrid.focus() : $("#pixel1").focus();
        isGrid=true;
      }else if(focused.hasClass("customPicker")){
        var fPalette = document.getElementById(localStorage.getItem("fPalette"));
        $("#colorModal").modal({
          showClose: false,
        });
        fPalette?fPalette.focus():$("#colorPixel1").focus();
        isGrid=false;
      }
    },
    left: function () {
      isGrid = !isGrid;
      var fGrid = document.getElementById(localStorage.getItem("fGrid"));
      $(":focus").blur();
      if (availableColors.length > 0) {
        var fColor = document.getElementById(localStorage.getItem("fColor"));
        if (isGrid) {
          fGrid ? fGrid.focus() : $("#pixel1").focus();
        } else {
          fColor ? fColor.focus() : $("#color1").focus();
        }
      } else {
        if (isGrid) {
          fGrid ? fGrid.focus() : $("#pixel1").focus();
        } else {
          $(".customPicker").focus();
        }
      }
    }
  };













  //Handle Key Events

  document.addEventListener('keydown', handleKeyDownGrid);

  function handleKeyDownGrid(e) {
    const currentIndex = document.activeElement.tabIndex;
    const numberOfElements = document.getElementsByClassName("pixel").length;
    const numberOfPalette=paletteColors.length;
    switch (e.key) {
      case 'ArrowUp':
        if (isGrid) {
          if (currentIndex == 1) {
            navGrid(numberOfElements - 1);
          } else if (currentIndex <= numberOfPixels) {
            navGrid(-1);
          } else {
            navGrid(-numberOfPixels);
          }
        } else {
          if(availableColors.length>0){
            if (currentIndex == numberOfColors) {
              navColor(1 - numberOfColors);
            } else {
              navColor(+1);
            }
          }else{
            if (currentIndex == 1) {
              navPalette(numberOfPalette - 1);
            } else if (currentIndex <= numberOfPaletteColors) {
              navPalette(-1);
            } else {
              navPalette(-numberOfPaletteColors);
            }
          }  
        }
        break;
      case 'ArrowDown':
        if (isGrid) {
          if (currentIndex == numberOfElements || currentIndex > (numberOfElements - numberOfPixels)) {
            navGrid(+numberOfPixels - numberOfElements);
          } else {
            navGrid(+numberOfPixels);
          }
        } else {
          if(availableColors.length>0){
            if (currentIndex == 1) {
              navColor(numberOfColors - 1);
            } else {
              navColor(-1);
            }
          }else{
            if (currentIndex == numberOfPalette || currentIndex > (numberOfPalette - numberOfPaletteColors)) {
              navPalette(+numberOfPaletteColors - numberOfPalette);
            } else {
              navPalette(+numberOfPaletteColors);
            }
          }
        }
        break;
      case 'ArrowRight':
        if (isGrid) {
          if (currentIndex == numberOfElements) {
            navGrid(1 - numberOfElements);
          } else {
            navGrid(1);
          }
        } else {
          if(availableColors.length>0){
            if (currentIndex == numberOfColors) {
              navColor(1 - numberOfColors);
            } else {
              navColor(+1);
            }
          }else{
            if (currentIndex == numberOfPalette) {
              navPalette(1 - numberOfPalette);
            } else {
              navPalette(1);
            }
          }
        }
        break;
      case 'ArrowLeft':
        if (isGrid) {
          if (currentIndex == 1) {
            navGrid(numberOfElements - 1);
          } else {
            navGrid(-1);
          }
        } else {
          if(availableColors.length>0){
            if (currentIndex == 1) {
              navColor(numberOfColors - 1);
            } else {
              navColor(-1);
            }
          }else{
            if (currentIndex == 1) {
              navPalette(numberOfPalette - 1);
            } else {
              navPalette(-1);
            }
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









  

  //Navigation Functions
  function navGrid(move) {
    const currentIndex = document.activeElement.tabIndex;
    const next = currentIndex + move;
    const targetElement = $(`.pixel[tabIndex=${next}]`).eq(0);
    targetElement.focus();
    localStorage.setItem("fGrid", targetElement.attr("id"));
  }

  function navColor(move) {
    const currentIndex = document.activeElement.tabIndex;
    const next = currentIndex + move;
    const targetElement = $(`.color_bottom[tabIndex=${next}]`).eq(0);
    targetElement.focus();
  }

  function navPalette(move) {
    const currentIndex = document.activeElement.tabIndex;
    const next = currentIndex + move;
    const targetElement = $(`.colorPixel[tabIndex=${next}]`).eq(0);
    targetElement.focus();
  }
});