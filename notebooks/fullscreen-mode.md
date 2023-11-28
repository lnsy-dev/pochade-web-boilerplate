---
{"date-created":"Mon Nov 27 2023 21:24:08 GMT-0800 (Pacific Standard Time)"}
---
# Fullscreen Mode

```js
// Create a full screen button
var fullScreenButton = document.createElement('button');
fullScreenButton.innerText = 'Toggle Full Screen';

// Add button to the document body
document.body.appendChild(fullScreenButton);

// Function to toggle full screen mode
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    // Enter full screen
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
  } else {
    // Exit full screen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
  }
}

// Attach click event listener to the full screen button
fullScreenButton.addEventListener('click', toggleFullScreen);

```