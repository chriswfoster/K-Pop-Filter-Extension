'use strict';

chrome.runtime.onMessage.addListener(function (request, sender) {
  let message = document.getElementById('message')
  chrome.storage.sync.get('lock', function (data) {
    let lockDown = data.lock === 'true' ? 'false' : 'true';
    if (lockDown === 'true') {
      message.innerHTML = 'UNLOCKED'
    } else {
      message.innerHTML = 'LOCKED'
    }
    // return html;
  });
});

function onWindowLoad() {
  console.log("it ran in popup... ", new Date());
  var message = document.getElementById('message');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function () {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      if (message) {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      } else {

      }
    }
  });

}

window.onload = onWindowLoad;

let changeColor = document.getElementById('changeColor');
let messageStatus = document.getElementById('message');
let pwInput = document.getElementById('pwinput');
if (changeColor) {
  console.log("exists");
  changeColor.addEventListener("click", () => {
    console.log('pw text is: ', pwInput.value)
    fireSelector();

  })
  if (pwInput) {
    pwInput.onkeypress = function (e) {
      if (!e) e = window.event;
      var keyCode = e.keyCode || e.which;
      if (keyCode == '13') {
        fireSelector();
        return false;
      }
    }
  }

  function fireSelector() {
    chrome.storage.sync.get('lock', function (data) {
      console.log("Getter of the Lock attribute ", data)
      let lockDown = data.lock === 'true' ? 'false' : 'true';
      let newColor = data.lock === 'true' ? '#3aa757' : '#FF0000'
      let newStatus = data.lock === 'true' ? 'UNLOCKED' : 'LOCKED';
      let proceed = true;
      if (lockDown === 'false') {
        if (pwInput.value === '2758') {
          proceed = true;
        } else {
          proceed = false;
        }
      } else {
        proceed = true;
      }
      if (proceed) {
        chrome.storage.sync.set({ lock: lockDown }, function () {
          console.log("Lock set to: ", lockDown);
        });
        chrome.storage.sync.set({ color: newColor }, function () {
          if (changeColor) {
            changeColor.style.backgroundColor = newColor;
          }
          console.log("The color is: ", newColor);
          if (messageStatus) {
            messageStatus.innerHTML = newStatus;
          }
        });
        pwInput.value = '';
      }
    });
  }

} else {
  console.log("changeColor Doesn't exist in popup")
}
chrome.storage.sync.get('color', function (data) {
  if (changeColor) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
  }
});
