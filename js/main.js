//render template from json file

function readJsonFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  }
  rawFile.send(null);
}
$(document).ready(function () {
  //check internet connection
  //1. If available fetch from firebase and use that + write in template.json file(update)(delete previous and replace)
  //2. If not available read from template from json file
  setTimeout(function () {
    if (window.navigator.onLine) {
      fetch("https://pixel-painter-8af7b.firebaseio.com/templates.json")
        .then((res) => res.json())
        .then((templates) => {
          localStorage.setItem("templatesFirebase", JSON.stringify(templates));
          window.location.href = './pages/displayTemp.html';
        })
        .catch((err) => {
          console.log(err)
          let isTemplate = localStorage.getItem("templatesFirebase");
          isTemplate ? localStorage.setItem("templates", isTemplate) :
            readJsonFile("../template/templates.json", function (text) {
              localStorage.setItem("templates", text);
              window.location.href = './pages/displayTemp.html';
            });
        });
    } else {
      let isTemplate = localStorage.getItem("templatesFirebase");
      isTemplate ? localStorage.setItem("templates", isTemplate) :
        readJsonFile("../template/templates.json", function (text) {
          localStorage.setItem("templates", text);
        });
      window.location.href = './pages/displayTemp.html';
    }
  }, 6000);
});

document.addEventListener('keydown', handlekeyDownTemplate);

function handlekeyDownTemplate(e) {
  switch (e.key) {
    case 'SoftRight':
      window.close();
  }
}
