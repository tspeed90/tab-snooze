function returnTab() {
  chrome.storage.local.get(['snoozedTabs'], function(result) {
    result.snoozedTabs.forEach(function(tab) {
      if (Date.now() > tab.snoozeUntil) {
        chrome.tabs.create({ url: tab.tabUrl });
      }
    });
    let pendingTabs = result.snoozedTabs.filter(function(tab) {
      return tab.snoozeUntil > Date.now();
    });
    chrome.storage.local.set({ snoozedTabs: pendingTabs });
  });
}

chrome.alarms.onAlarm.addListener(returnTab);
