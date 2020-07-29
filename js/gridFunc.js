$(document).ready(function () {
  const widthOfPixel = localStorage.getItem("widthOfPixel");
  const heightOfPixel = localStorage.getItem("heightOfPixel");
  const canvasWidth = localStorage.getItem("canvasWidth");
  const canvasHeight = localStorage.getItem("canvasHeight");
  const numberOfPixelsWidth = localStorage.getItem("numberOfPixelsWidth");
  const numberOfPixelsHeight = localStorage.getItem("numberOfPixelsHeight");
  const challengeTime = localStorage.getItem("challengeTime");
  const buttonIndex = localStorage.getItem("buttonIndex");
  const coloringNumber = localStorage.getItem("coloringNumber") ? JSON.parse(localStorage.getItem("coloringNumber")) : [];
  const numberColorAssociation = JSON.parse(localStorage.getItem("numberColorAssociation"));
  const colorGrid = JSON.parse(localStorage.getItem('colorGrid'));
  const apps = JSON.parse(localStorage.getItem("apps"));
  // const availableColors = JSON.parse(localStorage.getItem('availableColors')) || [];
  const availableColors = [];
  const numberOfColors = availableColors.length;
  var isGrid = true;
  const paletteColors = ["#003366", "#336699", "#3366CC", "#003399", "#000099", "#0000CC", "#000066", "#006666", "#006699", "#0099CC", "#0066CC", "#0033CC", "#0000FF", "#3333FF", "#333399", "#669999", "#009999", "#33CCCC", "#00CCFF", "#0099FF", "#0066FF", "#3366FF", "#3333CC", "#666699", "#339966", "#00CC99", "#00FFCC", "#00FFFF", "#33CCFF", "#3399FF", "#6699FF", "#6666FF", "#6600FF", "#6600CC", "#339933", "#00CC66", "#00FF99", "#66FFFF", "#99CCFF", "#9999FF", "#9966FF", "#9933FF", "#9900FF", "#006600", "#00CC00", "#00FF00", "#66FF99", "#99FFCC", "#CCCCFF", "#CC99FF", "#CC66FF", "#CC33FF", "#CC00FF", "#9900CC", "#003300", "#009933", "#33CC33", "#66FF66", "#99FF99", "#CCFFCC", "#FF99FF", "#FF66FF", "#FF00FF", "#CC00CC", "#660066", "#336600", "#009900", "#66FF33", "#99FF66", "#CCFF99", "#FFFFCC", "#FFCCCC", "#FF99CC", "#FF33CC", "#CC0099", "#993399", "#333300", "#669900", "#99FF33", "#CCFF66", "#FFFF99", "#FFCC99", "#FF9999", "#FF6699", "#FF3399", "#CC3399", "#990099", "#666633", "#99CC00", "#CCFF33", "#FFFF66", "#FFCC66", "#FF9966", "#FF6666", "#FF0066", "#CC6699", "#993366", "#999966", "#CCCC00", "#FFFF00", "#FFCC00", "#FF9933", "#FF6600", "#FF5050", "#CC0066", "#660033", "#996633", "#CC9900", "#FF9900", "#CC6600", "#FF3300", "#FF0000", "#CC0000", "#990033", "#663300", "#996600", "#CC3300", "#993300", "#990000", "#800000", "#993333"];
  const numberOfPaletteColors = Math.floor(Math.sqrt(paletteColors.length));
  const heightOfColor = (canvasHeight) / numberOfPaletteColors;
  const widthOfColor = (canvasWidth) / numberOfPaletteColors;
  const sizeOfColor = heightOfColor > widthOfColor ? widthOfColor : heightOfColor;








  // Timer Function Code
  function startTimer(duration, display) {
    var timer = duration,
      minutes, seconds;
    var timerFunc = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer <= 0) {
        clearInterval(timerFunc);
        $("#time").remove();
        $("#challengeModal").modal('show');
        $('.close-modal').css({
          display: "none"
        });
        if ($(`#challengeModal`).is(':visible')) {
          $(".choice[tabIndex=1]").focus();
        }
        $('.softkey-app-modal').remove();
        $(`.grid-page`).append('<footer class="softkey-grid"></footer>')
        $(".softkey-grid ").append(
          `  <div id="softkey-left" style="text-align:center;">color</div>
              <div id="softkey-center" style="text-align:center;">DRAW</div>
              <div id="softkey-right" style="text-align:center;">finish</div>`
        );
      }
    }, 1000);
  }






  //appPromotion

  const listGroup = $('.list-group');
  for (i = 0; i < apps.length; i++) {
    var app = apps[i];
    listGroup.append(`<a href="#" class="list-group-item list-group-item-action flex-column align-items-start" tabIndex=${i + 1} data-appId=${app.storeAppName}></a>`);
    $(`.list-group-item[tabIndex=${i + 1}]`).append(
      `<div class="d-flex imageApp w-100 justify-content-between">
        <div class="appImg d-flex w-70 justify-content-between">
          <img src=${app.image}>
            <div class="d-flex flex-column nameCategory">
              <div class="appCategory">
                <small>${app.category}</small>
              </div>
              <small class="appName">${i + 1}${app.title}</small>
            </div>
              </div>
          <div class="getDownload w-30">
            <img class="download" src="../images/download.png">
              <small>Get</small>
              </div>
          </div>
          <small class="description">Description</small>
          <small class="mb-1 des-text">${app.description} </small>  `
    )
  }

  function appModalVisible() {
    $("#time").remove();
    $("#appModal").modal('show');
    $('.close-modal').css({
      display: "none"
    });
    if ($(`#appModal`).is(':visible')) {
      $(".list-group-item[tabIndex=1]").focus().addClass('appActive');
    }
  }






  // Clear Local Storage While Refresh

  if (performance.navigation.type == 1) {
    localStorage.removeItem('currentColor');
    localStorage.removeItem('fColor');
    localStorage.removeItem('paletteColor');
    localStorage.removeItem('fPalette');
    localStorage.removeItem('fGrid');
  }





  // Display Timer
  if (buttonIndex == 1) {
    var minutes = Math.floor(challengeTime / 60);
    var seconds = challengeTime - minutes * 60;
    $("#ad-container2").append(`<div id="time" class="timer-overlay">0${minutes}:0${seconds}</div>`);
    display = document.querySelector('#time');
    startTimer(challengeTime, display);
  }









  //Grid
  $(".canvas").css({
    width: canvasWidth,
    height: canvasHeight,
    "grid-template-columns": `repeat(${numberOfPixelsWidth},${widthOfPixel}px)`,
    "grid-template-rows": `repeat(${numberOfPixelsHeight},${heightOfPixel}px)`,

  });
  for (let i = 0; i < numberOfPixelsHeight * numberOfPixelsWidth; i++) {
    if (coloringNumber[i] >= 0) {
      buttonIndex == 1 ? $(".canvas").append(`<div class="pixel" id="pixel${i + 1}" tabIndex="${i + 1}" style="background-color:${colorGrid[i]};"><p style="font-size: ${heightOfPixel - 2}px; text-align: center;">${coloringNumber[i]}</p></div>`) : $(".canvas").append(`<div class="pixel" id="pixel${i + 1}" tabIndex="${i + 1}" style="background-color:${colorGrid[i]};"></div>`);

    } else {
      buttonIndex == 1 ? $(".canvas").append(`<div class="pixel" id="pixel${i + 1}" tabIndex="${i + 1}" style="background-color:${colorGrid[i]};"></div>`) : $(".canvas").append(`<div class="pixel" id="pixel${i + 1}" tabIndex="${i + 1}" style="background-color:${colorGrid[i]};"></div>`);
    }
  }
  $(".pixel").each(function () {
    $(this).css({
      height: heightOfPixel,
      width: widthOfPixel,
    });
  });

  $('.pixel[tabIndex=1]').focus();







  //Available Colors
  if (buttonIndex == 1) {
    const numberedColor = Object.values(numberColorAssociation);
    $(".wrapper").append('<div class="bottomWrapper"><div class="bottomPicker"></div></div>');
    for (let i = 0; i < numberedColor.length; i++) {
      $(".bottomPicker").append(`<div class="color_bottom" id="color${i + 1}" tabIndex="${i + 1}" style="background-color:${numberedColor[i]};"><p style="font-size: 15px; color:white; text-align: center;">${i + 1}</p></div>`);
    }
  } else {
    if (availableColors.length > 0) {
      $(".wrapper").append('<div class="bottomWrapper"><div class="bottomPicker"></div></div>');
      for (let i = 0; i < availableColors.length; i++) {
        $(".bottomPicker").append(`<div class="color_bottom" id="color${i + 1}" tabIndex="${i + 1}" style="background-color:${availableColors[i]};"></div>`);
      }
    } else {
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

  $(".modalColor").css({

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
        (availableColors.length > 0 || buttonIndex == 1) ? $(":focus").css({
          "background-color": localStorage.getItem("currentColor") ? localStorage.getItem("currentColor") : $("#color1").css("background-color")
        }) : $(":focus").css({
          "background-color": localStorage.getItem("paletteColor") ? ocalStorage.getItem("currentColor") : $("#colorPixel1").css("background-color")
        });
      } else if (focused.hasClass("colorPixel")) {
        let currentColor = focused.css("background-color");
        localStorage.setItem("paletteColor", currentColor);
        localStorage.setItem("fPalette", focused.attr("id"));
        $.modal.close();
        var fGrid = document.getElementById(localStorage.getItem("fGrid"));
        fGrid ? fGrid.focus() : $("#pixel1").focus();
        isGrid = true;
      } else if (focused.hasClass("customPicker")) {
        var fPalette = document.getElementById(localStorage.getItem("fPalette"));
        $("#colorModal").modal({
          showClose: false,
        });
        fPalette ? fPalette.focus() : $("#colorPixel1").focus();
        isGrid = false;
      } else if (focused.hasClass("list-group-item")) {
        var storeAppName = focused.attr("data-appId");
        var activity = new MozActivity({
          name: "inline-open-by-name",
          data: {
            name: storeAppName,
            type: "name"
          }
        });
      }
    },
    left: function () {
      isGrid = !isGrid;
      var fGrid = document.getElementById(localStorage.getItem("fGrid"));
      var fColor = document.getElementById(localStorage.getItem("fColor"));
      $(":focus").blur();
      if (isGrid) {
        $('#softkey-left').text('color');
        $('#softkey-center').text('DRAW');
        fGrid ? fGrid.focus() : $("#pixel1").focus();
      } else {
        $('#softkey-left').text('drawing');
        $('#softkey-center').text('SELECT');
        if (availableColors.length > 0 || buttonIndex == 1) {
          fColor ? fColor.focus() : $("#color1").focus();
        } else if (availableColors.length == 0 || buttonIndex == 2) {
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
    const numberOfPalette = paletteColors.length;
    const numberofApps = apps.length;
    const isModalOpen = $('#colorModal').is(':visible');
    const ischallengeModal = $(`#challengeModal`).is(':visible');
    const isappModal = $(`#appModal`).is(':visible');
    switch (e.key) {
      case 'ArrowUp':
        if (isGrid) {
          if (currentIndex == 1) {
            navGrid(numberOfElements - 1);
          } else if (currentIndex <= numberOfPixelsWidth) {
            navGrid(-1);
          } else {
            navGrid(-numberOfPixelsWidth);
          }
        } else {
          if (availableColors.length > 0) {
            if (currentIndex == numberOfColors) {
              navColor(1 - numberOfColors);
            } else {
              navColor(+1);
            }
          } else {
            if (currentIndex == 1) {
              navPalette(numberOfPalette - 1);
            } else if (currentIndex <= numberOfPaletteColors) {
              navPalette(-1);
            } else {
              navPalette(-numberOfPaletteColors);
            }
          }
        }
        if (isappModal) {
          if (currentIndex == 1) {
            navAppModal(numberofApps - 1);
          } else {
            navAppModal(-1);
          }
        }
        break;
      case 'ArrowDown':
        if (isGrid) {
          if (currentIndex == numberOfElements || currentIndex > (numberOfElements - numberOfPixelsWidth)) {
            navGrid(+numberOfPixelsWidth - numberOfElements);
          } else {
            navGrid(+numberOfPixelsWidth);
          }
        } else {
          if (availableColors.length > 0) {
            if (currentIndex == 1) {
              navColor(numberOfColors - 1);
            } else {
              navColor(-1);
            }
          } else {
            if (currentIndex == numberOfPalette || currentIndex > (numberOfPalette - numberOfPaletteColors)) {
              navPalette(+numberOfPaletteColors - numberOfPalette);
            } else {
              navPalette(+numberOfPaletteColors);
            }
          }
        }
        if (isappModal) {
          if (currentIndex == numberofApps) {
            navAppModal(1 - numberofApps);
          } else {
            navAppModal(+1);
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
          if (availableColors.length > 0) {
            if (currentIndex == numberOfColors) {
              navColor(1 - numberOfColors);
            } else {
              navColor(+1);
            }
          } else {
            if (currentIndex == numberOfPalette) {
              navPalette(1 - numberOfPalette);
            } else {
              navPalette(1);
            }
          }
        }
        if (ischallengeModal) {
          isGrid = false;
          $(":focus").blur();
          $(".choice[tabIndex=2]").focus();
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
          if (availableColors.length > 0) {
            if (currentIndex == 1) {
              navColor(numberOfColors - 1);
            } else {
              navColor(-1);
            }
          } else {
            if (currentIndex == 1) {
              navPalette(numberOfPalette - 1);
            } else {
              navPalette(-1);
            }
          }
        }
        if (ischallengeModal) {
          isGrid = false;
          $(":focus").blur();
          $(".choice[tabIndex=1]").focus();
        }
        break;
      case 'Enter':
        if (ischallengeModal) {
          $(":focus").removeClass("appActive");
          if ($(":focus").attr("id") == "continue") {
            $.modal.close();
            var fGrid = document.getElementById(localStorage.getItem("fGrid"));
            $(":focus").blur();
            fGrid ? fGrid.focus() : $("#pixel1").focus();
          } else if ($(":focus").attr("id") == "exit") {
            window.location.href = "./displayTemp.html";
          }
        }
        softkeycallbackGridColor.center();
        break;
      case 'SoftLeft':
        softkeycallbackGridColor.left();
        break;
      case 'SoftRight':
        if (isGrid) {
          $(':focus').blur();
          isGrid = !isGrid;
          appModalVisible();
          $('.softkey-grid').remove();
          $(`.grid-page`).append('<footer class="softkey-app-modal"></footer>')
          $(".softkey-app-modal ").append(
            ` <small id="softkey-center-app" style="text-align:center;">DOWNLOAD</small>
            <small id="softkey-right-app" style="text-align:center;">Close</small>`
          );

        } else if (isappModal) {
          $.modal.close();
          window.location.href = "./displayTemp.html";
        } else {
          if (isModalOpen) {
            $.modal.close();
          }
          isGrid = !isGrid;
          var fGrid = document.getElementById(localStorage.getItem("fGrid"));
          $(":focus").blur();
          fGrid ? fGrid.focus() : $("#pixel1").focus();
        }
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

  function navAppModal(move) {
    const currentIndex = document.activeElement.tabIndex;
    const next = currentIndex + move;
    const targetElement = $(`.list-group-item[tabIndex=${next}]`).eq(0);
    $(":focus").removeClass("appActive");
    targetElement.focus().addClass("appActive");
    scrollIntoViewIfNeeded($(targetElement), { instant: false, $container: $(".list-group"), animationOptions: { duration: 1000 } });
  }
});



//Ads
getNewAd("ad-container2");

// document.addEventListener("DOMContentLoaded", () => {
//   getFullAdPageGrid();
// });
