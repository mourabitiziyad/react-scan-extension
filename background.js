// Background service worker for React Scan extension
let isEnabled = false;

// Set initial icon state
chrome.runtime.onInstalled.addListener(() => {
  console.log('React Scan extension installed');
  updateIcon();
});

// Handle extension icon clicks
chrome.action.onClicked.addListener(async (tab) => {
  // Toggle the global state
  isEnabled = !isEnabled;
  
  console.log('React Scan toggled globally:', isEnabled ? 'enabled' : 'disabled');
  
  // Update icon to reflect new state
  updateIcon();
  
  if (isEnabled) {
    // When enabling React Scan, hard refresh only the current tab to ensure proper loading
    console.log('Enabling React Scan - refreshing current tab to ensure proper initialization');
    try {
      await chrome.tabs.reload(tab.id, { bypassCache: true });
    } catch (error) {
      console.log('Could not refresh tab:', error);
    }
  } else {
    // When disabling, just send toggle message (no refresh needed)
    try {
      await chrome.tabs.sendMessage(tab.id, {
        action: 'toggle'
      });
      console.log('React Scan disabled in current tab');
    } catch (error) {
      console.log('Could not disable React Scan in current tab');
    }
    
    // Also send disable message to all other tabs
    try {
      const allTabs = await chrome.tabs.query({});
      const togglePromises = allTabs
        .filter(t => t.id !== tab.id && t.url && !t.url.startsWith('chrome://'))
        .map(async (t) => {
          try {
            await chrome.tabs.sendMessage(t.id, { action: 'toggle' });
          } catch (error) {
            // Tab might not have content script, ignore
          }
        });
      
      await Promise.all(togglePromises);
      console.log('React Scan disabled in all tabs');
    } catch (error) {
      console.log('Error disabling React Scan in all tabs:', error);
    }
  }
});

// Update icon and badge based on current state
function updateIcon() {
  const badgeText = isEnabled ? 'ON' : 'OFF';
  const badgeColor = isEnabled ? '#00ff00' : '#ff0000';
  
  chrome.action.setBadgeText({ text: badgeText });
  chrome.action.setBadgeBackgroundColor({ color: badgeColor });
  chrome.action.setTitle({ 
    title: `React Scan: ${isEnabled ? 'Enabled' : 'Disabled'} (Click to toggle)` 
  });
}

// Handle tab updates to apply current state to new pages
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('chrome://')) {
    // If React Scan is enabled globally, ensure it's enabled in this tab
    // If disabled globally, ensure it's disabled in this tab
    try {
      await chrome.tabs.sendMessage(tabId, {
        action: 'setState',
        enabled: isEnabled
      });
    } catch (error) {
      // Tab might not be ready yet or doesn't support content scripts
    }
  }
});





 