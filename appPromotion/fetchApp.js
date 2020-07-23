

if (window.navigator.onLine) {
    fetch("https://pixel-painter-8af7b.firebaseio.com/apps.json")
        .then((res) => res.json())
        .then((apps) => {
            localStorage.setItem("appsFirebase", JSON.stringify(apps));
        })
        .catch((err) => {
            console.log(err)
            let isApp = localStorage.getItem("appsFirebase");
            isApp ? localStorage.setItem("apps", isApp) :
                readJsonFile("./apps.json", function (text) {
                    localStorage.setItem("apps", text);
                });
        });
} else {
    let isApp = localStorage.getItem("appsFirebase");
    isApp ? localStorage.setItem("apps", isApp) :
        readJsonFile("../template/apps.json", function (text) {
            localStorage.setItem("apps", text);
        });
}


