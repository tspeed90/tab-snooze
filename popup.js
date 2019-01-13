let minSnooze = document.getElementById('minutes-btn');
let daySnooze = document.getElementById('days-btn');
let timeInput = document.getElementById('time-input');

function getTimestamp(mins) {
  let currentTime = Date.now();
  return currentTime + mins * 60 * 1000;
}

function snoozeTab(mins) {
  chrome.alarms.create('tabsAlarm', { periodInMinutes: 1 });
  chrome.storage.local.get(['snoozedTabs'], function(results) {
    console.log(results);
    if (results.snoozedTabs === undefined) {
      results.snoozedTabs = [];
    }
    chrome.tabs.query({ active: true, currentWindow: true }, function(tab) {
      results.snoozedTabs.push({
        tabUrl: tab[0].url,
        snoozeUntil: getTimestamp(mins)
      });
      chrome.storage.local.set(
        { snoozedTabs: results.snoozedTabs },
        function() {
          chrome.tabs.remove(tab[0].id);
          chrome.storage.local.get(null, function(results) {
            console.log(results);
          });
        }
      );
    });
  });
}

minSnooze.addEventListener('click', function() {
  snoozeTab(timeInput.value);
});

daySnooze.addEventListener('click', function() {
  const minutesToSnooze = timeInput.value * 24 * 60;
  snoozeTab(minutesToSnooze);
});
