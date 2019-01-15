chrome.storage.local.get(['snoozedTabs'], function(results) {
  results.snoozedTabs.forEach(function(tab) {
    const main = document.getElementById('main');
    const tabRow = document.createElement('div');
    tabRow.setAttribute('id', 'row');
    main.appendChild(tabRow);
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('id', 'delete-btn');
    deleteBtn.textContent = 'delete';
    const link = document.createElement('a');
    link.setAttribute('href', tab.tabUrl);
    link.textContent = tab.title || tab.tabUrl;
    tabRow.appendChild(deleteBtn);
    tabRow.appendChild(link);

    deleteBtn.addEventListener('click', function() {
      deleteRow(tab, tabRow);
    });
  });
});

function deleteRow(tab, tabRow) {
  chrome.storage.local.get(['snoozedTabs'], function(results) {
    const rowsToKeep = results.snoozedTabs.filter(function(result) {
      if (result.tabUrl === tab.tabUrl) {
        return tab.snoozeUntil !== result.snoozeUntil;
      }
      return true;
    });
    chrome.storage.local.set({ snoozedTabs: rowsToKeep }, function() {
      tabRow.parentNode.removeChild(tabRow);
    });
  });
}
