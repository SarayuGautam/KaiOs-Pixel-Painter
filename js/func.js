// A $( document ).ready() block.
$(document).ready(function () {
  var templates = JSON.parse(localStorage.getItem("templates"));
  var numberOfTemplates = templates.length;
  for (var i = 0; i < numberOfTemplates; i++) {
    $(".template").append(`<div tabIndex="${i + 1}" id="T${i + 1}" class="box"></div>`);
    $(`.box[tabIndex=${i + 1}]`).data("grid", JSON.stringify(templates[i]));
    if (localStorage.getItem(`OverlayedT${i + 1}`)) {
      $(`.box[id="T${i + 1}"]`).append(`<div class="box-overlay"></div>`);
      $(`.box[id="T${i + 1}"]`).append(`<img class="tick-img" src="../images/tick.png">`);
    }
    $(`.box[tabIndex=${i + 1}]`).append(`<div class="imageWrapper"><div class="image" id="preview${i + 1}"></div></div>`);
    if (templates[i].isNew == true) {
      $(`.box[tabIndex=${i + 1}]`).append(`<img src="../images/new.png" class="new-label">`);
    }
    // if (i < 3) { //cache x number of templates
    //   $(`#preview${i+1}`).cacheImages({
    //     url: `${templates[i].previewUrl}`
    //   });
    //   $.fn.cacheImages.fetchURL(`${templates[i].previewUrl}`, function (url, image) {});
    // } else {
    // }
    $(`#preview${i + 1}`).css({
      "background-image": `url("${templates[i].previewUrl}")`
    });
  }
  if ($(":focus").attr("class") != "box") {
    document.getElementById("T1").focus();
  }
});

getNewAd("ad-container1");







//appPromotion
const apps = JSON.parse(localStorage.getItem("apps"));

const listGroup = $('.list-group');
for (i = 0; i < apps.length; i++) {
  var app = apps[i];
  listGroup.append(`<a href="#" class="list-group-item list-group-item-action flex-column align-items-start" tabIndex=${i + 1} data-appId=${app.storeAppName}></a>`);
  $(`.list-group-item[tabIndex=${i + 1}]`).append(
    `<div class="d-flex imageApp w-100 justify-content-between">
        <div class="appImg d-flex w-70 justify-content-between">
          <img src=${app.image}>
            <div>
              <small class="appCategory">${app.category}</small>
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
  $("#appModal").modal('show');
  $('.close-modal').css({
    display: "none"
  });
  if ($(`#appModal`).is(':visible')) {
    $(":focus").blur();
    $(".box").attr('tabindex', '-1');
    $(".list-group-item[tabIndex=1]").focus().addClass('appActive');
  }
}










//Function to draw canvas

function drawCanvas(grid, index) {

  const numberOfPixelsWidth = grid.pixelsPerWidth;
  const numberOfPixelsHeight = grid.pixelsPerHeight;
  const drawing = grid.drawing;
  const association = grid.drawingColorAssociation;
  const challengeTime = grid.challengeTime;

  const colorGrid = drawing.map((drawPixel) => {
    return (association[drawPixel]);
  });
  const availableColors = grid.availableColors;

  const screenWidth = document.documentElement.clientWidth;
  const screenHeight = document.documentElement.clientHeight;
  const padding = 0.17 * screenHeight;
  const canvasHeight = Math.ceil(screenHeight - 2.2 * padding);
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
  localStorage.setItem("challengeTime", challengeTime);
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
  const numberofApps = apps.length;
  const isModalOpen = $('#chooseModal').is(':visible');
  const isappModal = $(`#appModal`).is(':visible');
  const numberOfElements = document.getElementsByClassName("box").length;
  switch (e.key) {
    case 'ArrowUp':
      if (isappModal) {
        isGrid = false;
        if (currentIndex == 1) {
          navAppModal(numberofApps - 1);
        } else {
          navAppModal(-1);
        }
      }
      else if (isModalOpen) {
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
      if (isappModal) {
        if (currentIndex == numberofApps) {
          navAppModal(1 - numberofApps);
        } else {
          navAppModal(+1);
        }
      }
      else if (isModalOpen) {
        navMode(+1);
      } else {
        if (currentIndex == numberOfElements) {
          navTemp(+1 - numberOfElements);
        }
        if (currentIndex > (numberOfElements - 2)) {
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
    case 'SoftLeft':
      appModalVisible();
      $('.softkey').remove();
      $(`.template-page`).append('<footer class="softkey-app-modal"></footer>')
      $(".softkey-app-modal ").append(
        ` <small id="softkey-center-app" style="text-align:center;">DOWNLOAD</small>
            <small id="softkey-right-app" style="text-align:center;">Close</small>`
      );
      break;
    case 'SoftRight':
      if (isModalOpen) {
        $("#chooseModal").modal('hide');
        document.getElementById("T1").focus();
      } else if (isappModal) {
        $("#appModal").modal('hide');
        document.getElementById("T1").focus();
        $('.softkey-app-modal').remove();
        $(`.template-page`).append('<footer class="softkey"></footer>')
        $(".softkey").append(
          `   <div id="softkey-center">SELECT</div>
              <small id="softkey-left" class="px-2">Other-Apps</small>`
        );
      } else {
        window.close();
      }
      break;
  }
}



if (performance.navigation.type == 1) {
  localStorage.removeItem('currentColor');
  localStorage.removeItem('fColor');
  localStorage.removeItem('paletteColor');
  localStorage.removeItem('fPalette');
  localStorage.removeItem('fGrid');
  document.getElementById("T1").focus();
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

function navAppModal(move) {
  const currentIndex = document.activeElement.tabIndex;
  $(":focus").blur().removeClass("appActive");
  const next = currentIndex + move;
  const targetElement = $(`.list-group-item[tabIndex=${next}]`).eq(0);
  targetElement.focus().addClass("appActive");
  if (move > 0) {
    $(".list-group").scrollTop($(".list-group").scrollTop() + 130);
  } else {
    $(".list-group").scrollTop(($(".list-group").scrollTop() - 130));
  }
}


document.addEventListener("DOMContentLoaded", () => {
  getFullAdPageTemp();
});
