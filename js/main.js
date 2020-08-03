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

var tomorrow = new Date(Date.now() + (24 * 60 * 60 * 1000));
var day3 = new Date(Date.now() + (3 * 24 * 60 * 60 * 1000));
var day5 = new Date(Date.now() + (5 * 24 * 60 * 60 * 1000));



function addalarm(adate) {
  var request = navigator.mozAlarms.add(adate, 'ignoreTimezone');
  request.onsuccess = function () {
    console.log('success');
  }
  request.onerror = function () {
    console.error('err');
  }
}
function setAlarms() {
  addalarm(tomorrow);
  addalarm(day3);
  addalarm(day5);
}

function removealarm() {
  var request = navigator.mozAlarms.getAll(); request.onsuccess = function () {
    this.result.forEach(function (alarm) {
      navigator.mozAlarms.remove(alarm.id);
    });
  }; request.onerror = function () {
    console.log('operation failed: ' + this.error);
  };
}

function addatrun() {
  removealarm();
  setAlarms();
}

function displayNotification() {
  var options = { tag: "pixelpainter" };
  var notifications = ["Check out the new Pixel Painter templates", "It's a new day, lets make a new drawing", "Time to draw with Pixel Painter", "Did you missed these new templates? Check them out!"]
  var notification = new Notification(notifications[Math.floor(Math.random() * notifications.length)], options);
  addatrun();
  notification.onclick = function (event) {
    var request = window.navigator.mozApps.getSelf();
    console.log(request);
    request.onsuccess = function () {
      if (request.result) {
        request.result.launch();
        notification.close();
      }
    };
    request.onerror = function () {
      console.log("error");
    };
  }
}
$(document).ready(function () {
  setAlarms();
  navigator.mozSetMessageHandler('alarm', function () {
    displayNotification();
  });
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
      // window.location.href = './pages/displayTemp.html';
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
          // window.location.href = './pages/displayTemp.html';
        });
      } else {
        // window.location.href = './pages/displayTemp.html';
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
        setTimeout(function () {
          // window.location.href = './pages/displayTemp.html';
        }, 3000);
      });
    } else {
      setTimeout(function () {
        // window.location.href = './pages/displayTemp.html';
      }, 3000);
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
