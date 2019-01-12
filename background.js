function returnTab() {
  chrome.storage.local.get(['snoozeUntil', 'tabUrl'], function(result) {
    if (Date.now() > result.snoozeUntil) {
      chrome.tabs.create({ url: result.tabUrl });
      chrome.storage.local.remove(['snoozeUntil', 'tabUrl']);
    }
  });
}

chrome.alarms.onAlarm.addListener(returnTab);
