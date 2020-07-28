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



function fetchApp() {
  console.log("is this");
  if (window.navigator.onLine) {
    fetch("https://pixel-painter-8af7b.firebaseio.com/apps.json")
      .then((res) => res.json())
      .then((apps) => {
        localStorage.setItem("apps", JSON.stringify(apps));
      })
      .catch((err) => {
        console.log(err)
        let isApp = localStorage.getItem("apps");
        if (!isApp) {
          readJsonFile("./apps.json", function (text) {
            localStorage.setItem("apps", text);
          });
        }
      });
  } else {
    let isApp = localStorage.getItem("apps");
    if (!isApp) {
      readJsonFile("./apps.json", function (text) {
        localStorage.setItem("apps", text);
      });
    }
  }
}
