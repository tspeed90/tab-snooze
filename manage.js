chrome.storage.local.get(['snoozedTabs'], function(results) {
  results.snoozedTabs.forEach(function(tab) {
    const main = document.getElementById('main');
    const tabRow = document.createElement('div');
    main.appendChild(tabRow);
    const deleteBtn = document.createElement('button');
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
  // chrome.storage.local.remove(tab);
  tabRow.parentNode.removeChild(tabRow);
}
