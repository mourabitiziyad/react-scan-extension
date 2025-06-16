// Inject React Scan immediately before React loads
(function() {
  // Only inject once
  if (window.__REACT_SCAN_INJECTED__) {
    return;
  }
  window.__REACT_SCAN_INJECTED__ = true;

  // Set up the configuration globally before React Scan loads
  window.__REACT_SCAN_OPTIONS__ = {
    enabled: true,
    allowInIframe: true,
    showToolbar: true,
    log: false,
    dangerouslyForceRunInProduction: false,
    animationSpeed: 'fast',
    trackUnnecessaryRenders: false
  };

  // Create and inject the React Scan script immediately
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('react-scan.js');
  script.async = false; // Load synchronously to ensure it runs before React
  
  script.onload = function() {
    console.log('React Scan loaded from extension');
    
    // Simple configuration after React Scan loads
    setTimeout(() => {
      const config = {
        enabled: true,
        allowInIframe: true,
        showToolbar: true,
        log: false,
        dangerouslyForceRunInProduction: false,
        animationSpeed: 'fast',
        trackUnnecessaryRenders: false
      };

      // Try to configure React Scan
      const reactScan = window.reactScan || window.ReactScan;
      if (reactScan && reactScan.setOptions) {
        reactScan.setOptions(config);
        console.log('React Scan configured with iframe support');
      }
    }, 100);
  };

  script.onerror = function() {
    console.error('Failed to load React Scan from extension');
  };

  // Inject the script into the page
  (document.head || document.documentElement).appendChild(script);
})(); 