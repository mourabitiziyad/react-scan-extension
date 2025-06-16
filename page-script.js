// Page script to control React Scan in page context
(function() {
  'use strict';
  
  let reactScanReady = false;
  let currentOptions = {
    enabled: false,
    showToolbar: true,
    log: false,
    dangerouslyForceRunInProduction: false,
    animationSpeed: 'fast',
    trackUnnecessaryRenders: false,
    allowInIframe: true  // Default to true for iframe support
  };
  
  // Wait for React Scan to be available
  function waitForReactScan() {
    return new Promise((resolve) => {
      const check = () => {
        if (window.reactScan && window.reactScan.setOptions) {
          reactScanReady = true;
          console.log('React Scan v0.3.4+ ready in page context');
          
          // Set initial options immediately with allowInIframe: true
          try {
            window.reactScan.setOptions({
              enabled: false,
              showToolbar: true,
              log: false,
              dangerouslyForceRunInProduction: false,
              animationSpeed: 'fast',
              trackUnnecessaryRenders: false,
              allowInIframe: true  // Ensure iframe support is enabled
            });
            console.log('React Scan initialized with allowInIframe: true');
          } catch (error) {
            console.error('Failed to set initial React Scan options:', error);
          }
          
          resolve();
        } else {
          setTimeout(check, 50);
        }
      };
      check();
    });
  }
  
  // Listen for messages from content script
  window.addEventListener('message', (event) => {
    if (event.source !== window || event.data?.type !== 'REACT_SCAN_PAGE_UPDATE') {
      return;
    }
    
    if (!reactScanReady) {
      console.warn('React Scan not ready, queuing update');
      return;
    }
    
    const newOptions = event.data.options;
    
    // Always ensure allowInIframe is true unless explicitly set to false
    if (newOptions.allowInIframe !== false) {
      newOptions.allowInIframe = true;
    }
    
    try {
      if (window.reactScan && window.reactScan.setOptions) {
        // Update current options
        currentOptions = { ...currentOptions, ...newOptions };
        
        // Apply to React Scan
        window.reactScan.setOptions(currentOptions);
        
        console.log('React Scan options updated:', currentOptions);
      }
    } catch (error) {
      console.error('Failed to update React Scan options:', error);
    }
  });
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForReactScan);
  } else {
    waitForReactScan();
  }
  
  // Send ready signal to content script
  waitForReactScan().then(() => {
    window.postMessage({
      type: 'REACT_SCAN_PAGE_READY'
    }, '*');
  });
})(); 