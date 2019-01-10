// code to create alarm (on click of "Hours" or "Minutes" button in UI)
let snoozeButton = document.getElementById('snooze');

snoozeButton.addEventListener('click', function() {
  chrome.alarms.create('one-min', { delayInMinutes: 1 });
});
