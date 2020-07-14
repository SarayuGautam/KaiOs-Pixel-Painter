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
  readJsonFile("../template/templates.json", function (text) {
    var data = JSON.parse(text);
    var templates = data.templates;
    localStorage.setItem("templates",JSON.stringify(templates));
  });
setTimeout(function () {
  window.location.href= './pages/displayTemp.html';
}, 50000);
});

  

	


