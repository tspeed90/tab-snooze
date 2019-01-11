// code to run

function alertUser() {
  chrome.storage.local.get(['tabUrl'], function(result) {
    window.alert(result.tabUrl);
  });
}

chrome.alarms.onAlarm.addListener(alertUser);
