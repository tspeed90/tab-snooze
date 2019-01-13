let hourSnooze = document.getElementById('hours-btn');
let daySnooze = document.getElementById('days-btn');
let timeInput = document.getElementById('time-input');

function getTimestamp(hours) {
  let currentTime = Date.now();
  return currentTime + hours * 60 * 60 * 1000;
}

function snoozeTab(hours) {
  chrome.alarms.create('tabsAlarm', { periodInMinutes: 10 });
  chrome.storage.local.get(['snoozedTabs'], function(results) {
    if (results.snoozedTabs === undefined) {
      results.snoozedTabs = [];
    }
    chrome.tabs.query({ active: true, currentWindow: true }, function(tab) {
      results.snoozedTabs.push({
        tabUrl: tab[0].url,
        snoozeUntil: getTimestamp(hours)
      });
      chrome.storage.local.set(
        { snoozedTabs: results.snoozedTabs },
        function() {
          chrome.tabs.remove(tab[0].id);
        }
      );
    });
  });
}

hourSnooze.addEventListener('click', function() {
  snoozeTab(timeInput.value);
});

daySnooze.addEventListener('click', function() {
  const hoursToSnooze = timeInput.value * 24 * 60;
  snoozeTab(hoursToSnooze);
});
