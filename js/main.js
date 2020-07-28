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
  if (window.navigator.onLine) {
    Promise.race([
      Promise.all([
        new Promise((resolve, _) => {
          fetch("https://pixel-painter-8af7b.firebaseio.com/apps.json")
            .then((res) => res.json())
            .then((apps) => {
              localStorage.setItem("apps", JSON.stringify(apps));
              return resolve("resolved");
            }).catch(err => _(err))
        }),
        new Promise((resolve, _) => {
          fetch("https://pixel-painter-8af7b.firebaseio.com/templates.json")
            .then((res) => res.json())
            .then((templates) => {
              localStorage.setItem("templates", JSON.stringify(templates));
              return resolve("resolved");
            }).catch(err => _(err))
        })
      ]),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000))
    ]).then((res) => {
      console.log(res)
      window.location.href = './pages/displayTemp.html';
    }).catch((err) => {
      console.log(err)
      let isApp = localStorage.getItem("apps");
      if (isApp == null) {
        readJsonFile("../appPromotion/apps.json", function (text) {
          localStorage.setItem("apps", text);
        });
      };
      let isTemplate = localStorage.getItem("templates");
      if (isTemplate == null) {
        console.log("hola");
        readJsonFile("../template/templates.json", function (text) {
          localStorage.setItem("templates", text);
          window.location.href = './pages/displayTemp.html';
        });
      } else {
        window.location.href = './pages/displayTemp.html';
      }
    })
  } else {
    let isApp = localStorage.getItem("apps");
    if (isApp == null) {
      readJsonFile("../appPromotion/apps.json", function (text) {
        localStorage.setItem("apps", text);
      });
    };
    let isTemplate = localStorage.getItem("templates");
    if (isTemplate == null) {
      console.log("hola");
      readJsonFile("../template/templates.json", function (text) {
        localStorage.setItem("templates", text);
        window.location.href = './pages/displayTemp.html';
      });
    } else {
      window.location.href = './pages/displayTemp.html';
    }
  }
});

document.addEventListener('keydown', handlekeyDownTemplate);

function handlekeyDownTemplate(e) {
  switch (e.key) {
    case 'SoftRight':
      window.close();
  }
}
