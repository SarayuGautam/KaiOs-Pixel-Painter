
// A $( document ).ready() block.
$(document).ready(function () {
  var templates = JSON.parse(localStorage.getItem("templates"));
  var numberOfTemplates = Object.keys(templates).length;
  for (var i = 1; i <= numberOfTemplates; i++) {
    $(".template").append(`<div tabIndex="${i}" id="T${i}" class="box"></div>`);
    $(`.box[tabIndex=${i}]`).data("grid", JSON.stringify(templates[i]));
    if (localStorage.getItem(`OverlayedT${i}`)) {
      $(`.box[id="T${i}"]`).append(`<div class="box-overlay"></div>`);
      $(`.box[id="T${i}"]`).append(`<img class="tick-img" src="../images/tick.png">`);
    }
    $(`.box[tabIndex=${i}]`).append(`<div class="imageWrapper"><div class="image" id="preview${i}"></div></div>`);
    if (templates[i].isNew == true) {
      $(`.box[tabIndex=${i}]`).append(`<img src="../images/new.png" class="new-label">`);
    }
    if (i < 3) { //cache x number of templates
      $(`#preview${i}`).cacheImages({
        url: `${templates[i].previewUrl}`
      });
      $.fn.cacheImages.fetchURL(`${templates[i].previewUrl}`, function (url, image) {});
    } else {
      $(`#preview${i}`).css({
        "background-image": `url("${templates[i].previewUrl}")`
      });
    }
  }
  document.getElementById("T1").focus();
});











//Function to draw canvas

function drawCanvas(grid, index) {

  const numberOfPixelsWidth = grid.pixelsPerWidth;
  const numberOfPixelsHeight = grid.pixelsPerHeight;
  const drawing = grid.drawing;
  const association = grid.drawingColorAssociation;
  const challengeTime = grid.challengeTime;

  const colorGrid = drawing.map((drawPixel) => {
    return (association[drawPixel]);relative
  });
  const availableColors = grid.availableColors;

  const screenWidth = document.documentElement.clientWidth;
  const screenHeight = document.documentElement.clientHeight;
  const padding = 0.17 * screenHeight;
  const canvasHeight = screenHeight - 2.2 * padding;
  const canvasWidth = screenWidth;
  const canvasSize = canvasHeight * canvasWidth;
  var widthOfPixel = (canvasWidth / numberOfPixelsWidth);
  var heightOfPixel = (canvasHeight / numberOfPixelsHeight);
  localStorage.setItem("numberOfPixelsWidth", numberOfPixelsWidth);
  localStorage.setItem("numberOfPixelsHeight", numberOfPixelsHeight);
  localStorage.setItem('colorGrid', JSON.stringify(colorGrid));
  localStorage.setItem('availableColors', JSON.stringify(availableColors));
  localStorage.setItem("padding", padding);
  localStorage.setItem("widthOfPixel", widthOfPixel);
  localStorage.setItem("challengeTime",challengeTime);
  localStorage.setItem("heightOfPixel", heightOfPixel);
  localStorage.setItem("canvasSize", canvasSize);
  localStorage.setItem("buttonIndex", index);
  localStorage.setItem("canvasHeight", canvasHeight);
  localStorage.setItem("canvasWidth", canvasWidth);
  if (index == 1) {
    const coloringNumber = grid.coloringNumber;
    const numberColorAssociation = grid.numberColorAssociation;
    localStorage.setItem("coloringNumber", JSON.stringify(coloringNumber));
    localStorage.setItem("numberColorAssociation", JSON.stringify(numberColorAssociation));
  }
  localStorage.removeItem('currentColor');
  localStorage.removeItem('fColor');
  localStorage.removeItem('paletteColor');
  localStorage.removeItem('fPalette');
  localStorage.removeItem('fGrid');
  window.location.href = "./displayGrid.html";
}






//send grid display

const softkeyCallbackTempPage = {
  center: function () {
    const currentElement = $(":focus");
    const tempId = currentElement.attr("id");
    const drawGrid = JSON.parse(currentElement.data("grid"));
    $("#chooseModal").modal();
    $("#chooseModal").on('shown.bs.modal', function (e) {
      $(".mode[tabIndex=1]").focus();
      $(".mode").data("currentGrid", drawGrid);
    });
    localStorage.setItem(`Overlayed${tempId}`, tempId);
  },
};





//Handle Keydown

document.addEventListener('keydown', handlekeyDownTemplate);
function handlekeyDownTemplate(e) {

  const activeElm = document.activeElement;
  const currentIndex = document.activeElement.tabIndex;
  const isModalOpen = $('#chooseModal').is(':visible');
  const numberOfElements = document.getElementsByClassName("box").length;
  window.scroll({top: activeElm.offsetTop, behavior: 'smooth'});
  switch (e.key) {
    case 'ArrowUp':
      if (isModalOpen) {
        navMode(-1);
      } else {
        if (currentIndex == 1) {
          navTemp(numberOfElements - 1);
        } else if (currentIndex <= 2) {
          navTemp(-1);
        } else {
          navTemp(-2);
        }
      }
      break;
    case 'ArrowDown':
      if (isModalOpen) {
        navMode(+1);
      } else {
        if (currentIndex == numberOfElements || currentIndex > (numberOfElements - 2)) {
          navTemp(+2 - numberOfElements);
        } else {
          navTemp(+2);
        }
      }
      break;
    case 'ArrowRight':
      if (!isModalOpen) {
        if (currentIndex == numberOfElements) {
          navTemp(1 - numberOfElements);
        } else {
          navTemp(1);
        }
      }
      break;
      case 'ArrowLeft':
        if (!isModalOpen) {
          if (currentIndex == 1) {
            navTemp(numberOfElements - 1);
          } else {
            navTemp(-1);
          }
        }
        break;
      case 'Enter':
        if (isModalOpen) {
          const currentGrid = $(".mode").data("currentGrid");
          drawCanvas(currentGrid, currentIndex);
        } else {
          softkeyCallbackTempPage.center();
        }
        break;
      case 'SoftRight':
        if (isModalOpen) {
          $("#chooseModal").modal('hide');
        }else{
          window.close();
        }
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

function navMode(move) {
  const currentIndex = document.activeElement.tabIndex;
  const next = currentIndex + move;
  const targetElement = $(`.mode[tabIndex=${next}]`).eq(0);
  targetElement.focus();
}

getNewAd("ad-container");

document.addEventListener("DOMContentLoaded", () => {
  getFullAd();
});
