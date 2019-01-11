// code to create alarm (on click of "Hours" or "Minutes" button in UI)
let snoozeButton = document.getElementById('snooze');

snoozeButton.addEventListener('click', function() {
  chrome.alarms.create('one-min', { delayInMinutes: 1 });
  chrome.tabs.query({ active: true, currentWindow: true }, function(tab) {
    chrome.storage.local.set({ tabUrl: tab[0].url }, function() {
      console.log('Value set to ' + tab[0].url);
    });
  });
});
