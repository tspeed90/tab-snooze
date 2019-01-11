// code to run

function alertUser() {
  chrome.storage.local.get(['tabUrl'], function(result) {
    chrome.tabs.create({ url: result.tabUrl });
  });
}

chrome.alarms.onAlarm.addListener(alertUser);
