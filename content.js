// Content script to inject React Scan and handle toggle
(function() {
  // Only inject once
  if (window.__REACT_SCAN_INJECTED__) {
    return;
  }
  window.__REACT_SCAN_INJECTED__ = true;

  let currentOptions = {
    enabled: false, // Start disabled by default
    allowInIframe: true,
    showToolbar: true,
    log: false,
    dangerouslyForceRunInProduction: false,
    animationSpeed: 'fast',
    trackUnnecessaryRenders: false
  };

  // Set up the configuration globally before React Scan loads
  window.__REACT_SCAN_OPTIONS__ = currentOptions;

  // Create and inject the React Scan script immediately
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('react-scan.js');
  script.async = false; // Load synchronously to ensure it runs before React
  
  script.onload = function() {
    console.log('React Scan loaded from extension (disabled by default)');
    
    // Configure React Scan after it loads
    setTimeout(() => {
      const reactScan = window.reactScan || window.ReactScan;
      if (reactScan && reactScan.setOptions) {
        reactScan.setOptions(currentOptions);
        console.log('React Scan configured (disabled):', currentOptions);
      }
    }, 100);
  };

  script.onerror = function() {
    console.error('Failed to load React Scan from extension');
  };

  // Inject the script into the page immediately
  (document.head || document.documentElement).appendChild(script);

  // Listen for messages from background script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggle') {
      // Toggle the enabled state
      currentOptions.enabled = !currentOptions.enabled;
      
      const reactScan = window.reactScan || window.ReactScan;
      if (reactScan && reactScan.setOptions) {
        reactScan.setOptions(currentOptions);
        console.log('React Scan toggled:', currentOptions.enabled ? 'enabled' : 'disabled');
      }
      
      sendResponse({ 
        success: true, 
        enabled: currentOptions.enabled 
      });
    } else if (request.action === 'setState') {
      // Set the enabled state to a specific value
      currentOptions.enabled = request.enabled;
      
      const reactScan = window.reactScan || window.ReactScan;
      if (reactScan && reactScan.setOptions) {
        reactScan.setOptions(currentOptions);
        console.log('React Scan state set:', currentOptions.enabled ? 'enabled' : 'disabled');
      }
      
      sendResponse({ 
        success: true, 
        enabled: currentOptions.enabled 
      });
    }
    
    return true; // Keep message channel open for async response
  });
})(); 