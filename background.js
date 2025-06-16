// Background service worker for React Scan Latest extension

chrome.runtime.onInstalled.addListener(() => {
  console.log('React Scan Latest extension installed');
});

// Handle tab updates to maintain state
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('chrome://')) {
    // Get stored state
    const result = await chrome.storage.local.get({
      enabled: false,
      showToolbar: true,
      trackUnnecessaryRenders: false,
      log: false,
      allowInIframe: true, // Default to true for iframe support
      dangerouslyForceRunInProduction: false,
      animationSpeed: 'fast'
    });

    // If React Scan was enabled, re-enable it on the new page
    if (result.enabled) {
      try {
        await chrome.tabs.sendMessage(tabId, {
          action: 'enable',
          options: {
            showToolbar: result.showToolbar,
            trackUnnecessaryRenders: result.trackUnnecessaryRenders,
            log: result.log,
            allowInIframe: result.allowInIframe,
            dangerouslyForceRunInProduction: result.dangerouslyForceRunInProduction,
            animationSpeed: result.animationSpeed
          }
        });
      } catch (error) {
        // Tab might not be ready yet or doesn't support content scripts
      }
    }
  }
});

// Handle messages from content script
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'getState') {
    chrome.storage.local.get({
      enabled: false,
      showToolbar: true,
      trackUnnecessaryRenders: false,
      log: false,
      allowInIframe: true, // Default to true for iframe support
      dangerouslyForceRunInProduction: false,
      animationSpeed: 'fast'
    }).then(result => {
      sendResponse(result);
    });
    return true; // Will respond asynchronously
  }
});



 