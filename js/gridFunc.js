$(document).ready(function () {
  const widthOfPixel = localStorage.getItem("widthOfPixel");
  const heightOfPixel = localStorage.getItem("heightOfPixel");
  const canvasWidth = localStorage.getItem("canvasWidth");
  const canvasHeight = localStorage.getItem("canvasHeight");
  const numberOfPixelsWidth = localStorage.getItem("numberOfPixelsWidth");
  const numberOfPixelsHeight = localStorage.getItem("numberOfPixelsHeight");
  const challengeTime = localStorage.getItem("challengeTime");
  const templateId = localStorage.getItem("templateId");
  const buttonIndex = localStorage.getItem("buttonIndex");
  const coloringNumber = localStorage.getItem("coloringNumber") ? JSON.parse(localStorage.getItem("coloringNumber")) : [];
  const numberColorAssociation = JSON.parse(localStorage.getItem("numberColorAssociation"));
  const colorGrid = JSON.parse(localStorage.getItem('colorGrid'));
  // const availableColors = JSON.parse(localStorage.getItem('availableColors')) || [];
  const availableColors = [];
  const numberOfColors = availableColors.length;
  var isGrid = true;
  var isTimerFinished = true;
  const paletteColors = ["#003366", "#336699", "#3366CC", "#003399", "#000099", "#0000CC", "#000066", "#006666", "#006699", "#0099CC", "#0066CC", "#0033CC", "#0000FF", "#3333FF", "#333399", "#669999", "#009999", "#33CCCC", "#00CCFF", "#0099FF", "#0066FF", "#3366FF", "#3333CC", "#666699", "#339966", "#00CC99", "#00FFCC", "#00FFFF", "#33CCFF", "#3399FF", "#6699FF", "#6666FF", "#6600FF", "#6600CC", "#339933", "#00CC66", "#00FF99", "#66FFFF", "#99CCFF", "#9999FF", "#9966FF", "#9933FF", "#9900FF", "#006600", "#00CC00", "#00FF00", "#66FF99", "#99FFCC", "#CCCCFF", "#CC99FF", "#CC66FF", "#CC33FF", "#CC00FF", "#9900CC", "#003300", "#009933", "#33CC33", "#66FF66", "#99FF99", "#CCFFCC", "#FF99FF", "#FF66FF", "#FF00FF", "#CC00CC", "#660066", "#336600", "#009900", "#66FF33", "#99FF66", "#CCFF99", "#FFFFCC", "#FFCCCC", "#FF99CC", "#FF33CC", "#CC0099", "#993399", "#333300", "#669900", "#99FF33", "#CCFF66", "#FFFF99", "#FFCC99", "#FF9999", "#FF6699", "#FF3399", "#CC3399", "#990099", "#666633", "#99CC00", "#CCFF33", "#FFFF66", "#FFCC66", "#FF9966", "#FF6666", "#FF0066", "#CC6699", "#993366", "#999966", "#CCCC00", "#FFFF00", "#FFCC00", "#FF9933", "#FF6600", "#FF5050", "#CC0066", "#660033", "#996633", "#CC9900", "#FF9900", "#CC6600", "#FF3300", "#FF0000", "#CC0000", "#990033", "#663300", "#996600", "#CC3300", "#993300", "#990000", "#800000", "#993333"];
  const numberOfPaletteColors = Math.floor(Math.sqrt(paletteColors.length));
  const heightOfColor = (canvasHeight) / numberOfPaletteColors;
  const widthOfColor = (canvasWidth) / numberOfPaletteColors;
  const sizeOfColor = heightOfColor > widthOfColor ? widthOfColor : heightOfColor;



  var timeFunc;
  // Timer Function Code
  function startTimer(duration, display) {
    isTimerFinished = false;
    var timer = duration,
      minutes, seconds;
    timerFunc = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.textContent = minutes + ":" + seconds;

      if (--timer <= 0) {
        clearInterval(timerFunc);
        $("#time").remove();
        $("#challengeModal").modal('show');
        isTimerFinished = true;
        $(".modal-text").empty();
        $(".modal-text").append(` <p>You've lost the challenge.</p>
        <p>Do you want to continue drawing or exit?</p>
        <button type="button" id="continue" tabIndex="1" class="btn btn-primary choice mr-2 px-3">Continue</button>
        <button type="button" id="exit" tabIndex="2" class="btn btn-danger choice px-4">Exit</button>`);
        $('.close-modal').css({
          display: "none"
        });
        if ($(`#challengeModal`).is(':visible')) {
          $(".choice[tabIndex=1]").focus();
        }
      }
    }, 1000);
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


  function downloadImage(url, fileName) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob";
      xhr.onload = function () {
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(this.response);
        var tag = document.createElement('a');
        tag.href = imageUrl;
        tag.download = fileName;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: this.statusText
          })
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    });

  }

  function getRandName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {

      text += possible.charAt(Math.floor(Math.random() * possible.length));

    }

    return "PixelPainter" + text + ".png";
  }




  //Press Grid or Custom Palette

  const softkeycallbackGridColor = {
    center: function () {
      let focused = $(":focus");

      if (localStorage.getItem("downloadFlag")) {
        localStorage.removeItem("downloadFlag");
        $(".pixel").
          each(function () {
            $(this).css("border", "solid " + $(this).css("background-color"));
            $(this).css({
              "grid-gap": "0 0"
            });
          });
        downloadCanvas().then(res => window.location.href = "./displayTemp.html").catch(err => console.log(err));
      }
      if (focused.hasClass("pixel")) {
        if (availableColors.length > 0 || buttonIndex == 1) {
          $(":focus").css({
            "background-color": localStorage.getItem("currentColor") ? localStorage.getItem("currentColor") : $("#color1").css("background-color")
          });
        } else if (availableColors.length <= 0 && buttonIndex == 2) {
          console.log("clicked");
          $(":focus").css({
            "background-color": localStorage.getItem("paletteColor") ? localStorage.getItem("paletteColor") : $("#colorPixel1").css("background-color")
          });
        }
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
    const isModalOpen = $('#colorModal').is(':visible');
    const ischallengeModal = $(`#challengeModal`).is(':visible');
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
          if (availableColors.length > 0 || buttonIndex == 1) {
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
        break;
      case 'ArrowDown':
        if (isGrid) {
          if (currentIndex == numberOfElements || currentIndex > (numberOfElements - numberOfPixelsWidth)) {
            navGrid(+numberOfPixelsWidth - numberOfElements);
          } else {
            navGrid(+numberOfPixelsWidth);
          }
        } else {
          if (availableColors.length > 0 || buttonIndex == 1) {
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
        break;
      case 'ArrowRight':
        if (isGrid) {
          if (currentIndex == numberOfElements) {
            navGrid(1 - numberOfElements);
          } else {
            navGrid(1);
          }
        } else {
          if (availableColors.length > 0 || buttonIndex == 1) {
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
          if (availableColors.length > 0 || buttonIndex == 1) {
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
        if ($("#softkey-center-canvas").text() === "DOWNLOAD") {
          localStorage.setItem("downloadFlag", true);
        }
        if (ischallengeModal) {
          $(":focus").removeClass("appActive");
          if ($(":focus").attr("id") == "continue") {
            $.modal.close();
            var fGrid = document.getElementById(localStorage.getItem("fGrid"));
            $(":focus").blur();
            fGrid ? fGrid.focus() : $("#pixel1").focus();
          } else if (
            $(":focus").attr("id") == "exit") {
            $.modal.close();

            if (buttonIndex == 2 || (buttonIndex == 1 && isTimerFinished == false)) {
              $(":focus").blur();
              $(".pixel").attr("tabIndex", "-1");
              $("#challengeModal").remove();
              $("#time").fadeOut();
              $(".bottomWrapper").remove();
              $(".customPicker").remove();
              $('.softkey-grid').remove();
              $(`.grid-page`).append('<footer class="softkey-canvas"></footer>')
              $(".softkey-canvas ").append(
                `<div id="softkey-left">Home</div>
                 <div id="softkey-center-canvas">DOWNLOAD</div>`
              );
              $(".pixel").text("");
              $(".pixel").css({
                border: "none",
              });
              clearInterval(timerFunc);
              var bestScores = JSON.parse(localStorage.getItem("bestScores"));
              if (!bestScores[templateId]) {
                bestScores[templateId] = 10000000;
              }
              let [min, sec] = $("#time").text().split(":");
              min = parseInt(min);
              sec = parseInt(sec);
              let elapsed_time = challengeTime - 60 * min - sec;
              if (elapsed_time < bestScores[templateId] && elapsed_time != 0) {
                bestScores[templateId] = elapsed_time;
              }
              localStorage.setItem("bestScores", JSON.stringify(bestScores));
              console.log("bestScores");
            } else if (buttonIndex == 1 && isTimerFinished == true) {
              window.location.href = "./displayTemp.html";
            }
          }
        } else {
          softkeycallbackGridColor.center();
        }
        break;
      case 'SoftLeft':
        if ($("#softkey-center-canvas").text() === "DOWNLOAD") {
          window.location.href = "./displayTemp.html";
        } else {
          softkeycallbackGridColor.left();
        }
        break;
      case 'SoftRight':
        if (buttonIndex == 2) {
          $("#challengeModal").modal('show');
          $(".modal-text").empty();
          $(".modal-text").append(`<p>Do you want to finish?</p>
        <p>You  won't be able to edit the drawing anymore.</p>
        <button type="button" id="continue" tabIndex="1" class="btn btn-primary choice mr-2 px-2">Continue</button>
        <button type="button" id="exit" tabIndex="2" class="btn btn-danger choice px-3">Finish</button>`);
          $('.close-modal').css({
            display: "none"
          });
          if ($(`#challengeModal`).is(':visible')) {
            $(".choice[tabIndex=1]").focus();
          }
        } else if (buttonIndex == 1) {
          $("#challengeModal").modal('show');
          $(".modal-text").empty();
          $(".modal-text").append(`<p>You'll lose the challenge.</p>
        <p>Do you want to continue drawing or finish this?</p>
        <button type="button" id="continue" tabIndex="1" class="btn btn-primary choice mr-2 px-2">Continue</button>
        <button type="button" id="exit" tabIndex="2" class="btn btn-danger choice px-3">Finish</button>`);
          $('.close-modal').css({
            display: "none"
          });
          if ($(`#challengeModal`).is(':visible')) {
            $(".choice[tabIndex=1]").focus();
          }
        } else if (isModalOpen) {
          $.modal.close();
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

  function downloadCanvas() {
    return new Promise((resolve, _) => {
      html2canvas(document.querySelector(".canvas"), {}).then(canvas => {
        var ctx = canvas.getContext('2d');
        ctx.mozImageSmoothingEnabled = false;
        ctx.canvas.toBlob(function (blob) {
          var url = URL.createObjectURL(blob);
          downloadImage(url, getRandName()).then((_) => {
            resolve("success");
          })
        }, 'image/png', 1.0);
      }).catch(err => _(err));
    });
  }
});



//Ads
getNewAd("ad-container2");

// document.addEventListener("DOMContentLoaded", () => {
//   getFullAdPageGrid();
// });
