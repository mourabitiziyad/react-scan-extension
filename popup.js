// React Scan Extension Popup
let isEnabled = false;

// DOM elements
const scanToggle = document.getElementById('scanToggle');
const statusElement = document.getElementById('status');

// Update UI based on current state
function updateUI() {
  scanToggle.checked = isEnabled;
  statusElement.textContent = isEnabled ? 'Enabled' : 'Disabled';
  statusElement.className = `status ${isEnabled ? 'enabled' : 'disabled'}`;
}

// Load initial state
async function loadState() {
  try {
    const result = await chrome.storage.local.get(['enabled']);
    isEnabled = result.enabled || false;
    updateUI();
  } catch (error) {
    console.error('Failed to load state:', error);
    statusElement.textContent = 'Error loading state';
    statusElement.className = 'status disabled';
  }
}

// Save state and communicate with content script
async function saveState(enabled) {
  try {
    await chrome.storage.local.set({ enabled });
    isEnabled = enabled;
    updateUI();
    
    // Notify content script
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
      try {
        await chrome.tabs.sendMessage(tab.id, { 
          action: enabled ? 'enable' : 'disable',
          options: {
            enabled,
            allowInIframe: true,
            showToolbar: true,
            log: false,
            dangerouslyForceRunInProduction: false,
            animationSpeed: 'fast',
            trackUnnecessaryRenders: false
          }
        });
      } catch (error) {
        // Content script might not be ready, that's okay
        console.log('Content script not ready, will apply on next page load');
      }
    }
  } catch (error) {
    console.error('Failed to save state:', error);
  }
}

// Event listeners
scanToggle.addEventListener('change', () => {
  saveState(scanToggle.checked);
});

// Initialize
loadState(); 