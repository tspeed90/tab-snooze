// code to run

function alertUser(alarm) {
  window.alert('Its been 1 minute!');
}

chrome.alarms.onAlarm.addListener(alertUser);
