
$(document).ready(function () {
  const softkeyCallbackPage1 = {
    center: function() { window.location.href = "./pages/displayTemp.html"; },
  };
  function handleKeyDownPage(evt) {
    switch (evt.key) {
        case 'Enter':
            softkeyCallbackPage1.center();
        break;
    }
  };
document.addEventListener('keydown', handleKeyDownPage);
});


