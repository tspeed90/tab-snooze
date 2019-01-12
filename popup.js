let minSnooze = document.getElementById('minutes-btn');
let daySnooze = document.getElementById('days-btn');
let timeInput = document.getElementById('time-input');

function getTimestamp(mins) {
  let currentTime = Date.now();
  return currentTime + mins * 60 * 1000;
}

function snoozeTab(mins) {
  chrome.alarms.create('one-min', { periodInMinutes: 1 });
  chrome.tabs.query({ active: true, currentWindow: true }, function(tab) {
    chrome.storage.local.set(
      { tabUrl: tab[0].url, snoozeUntil: getTimestamp(mins) },
      function() {
        chrome.tabs.remove(tab[0].id);
      }
    );
  });
}

minSnooze.addEventListener('click', function() {
  snoozeTab(timeInput.value);
});

daySnooze.addEventListener('click', function() {
  const minutesToSnooze = timeInput.value * 24 * 60;
  snoozeTab(minutesToSnooze);
});
