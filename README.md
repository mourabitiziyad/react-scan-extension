# React Scan Extension

A browser extension that automatically injects the latest React Scan into web pages to detect and analyze React performance issues. This extension ensures you always have the most up-to-date version with proper iframe support.

## 🚀 Features

- **Patched React Scan**: Uses a locally bundled version with enhanced iframe support
- **Iframe Support**: Works correctly in iframes with source code modifications
- **Zero Configuration**: Works out of the box with sensible defaults
- **Simple Toggle**: Easy on/off switch in the popup
- **Auto-Injection**: Automatically injects into all web pages
- **Performance Optimized**: Minimal overhead when disabled

## 📦 Installation

### Option 1: Developer Mode (Recommended)

1. **Download** or clone this repository
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable "Developer mode"** in the top right corner
4. **Click "Load unpacked"** and select the extension directory
5. **Done!** The extension will appear in your toolbar

### Option 2: Quick Setup

See [INSTALL.md](INSTALL.md) for detailed installation instructions with screenshots.

## 🎯 Usage

1. **Enable the extension** by clicking the React Scan icon in your toolbar
2. **Toggle on** React Scan using the switch in the popup
3. **Navigate to any React application** - React Scan will automatically detect and highlight performance issues
4. **Works in iframes** without any additional configuration

### Test Sites

Try these React applications to see React Scan in action:
- https://react.dev
- https://airbnb.com
- https://netflix.com
- https://facebook.com
- Any Next.js or Create React App site

## 🎯 How It Works

This extension:

1. **Auto-injects** a locally bundled, patched version of React Scan (`react-scan.js`)
2. **Enhances iframe support** with source code modifications (`allowInIframe` forced to `true`)
3. **Uses safe defaults** for all options
4. **Works immediately** without requiring page refreshes in most cases

The extension follows a simple, reliable pattern:
- Content script injects the locally bundled React Scan with iframe patches
- Page script applies configuration with enhanced iframe support
- React Scan automatically starts analyzing React performance

## 🔧 Configuration

The extension uses these optimized default settings:

```javascript
{
  enabled: true,
  allowInIframe: true,        // Enhanced iframe support
  showToolbar: true,
  log: false,
  dangerouslyForceRunInProduction: false,
  animationSpeed: 'fast',
  trackUnnecessaryRenders: false
}
```

You can toggle the extension on/off using the popup interface.

## ✨ Key Improvements

This extension addresses common issues with other React Scan extensions:

- ✅ **Uses patched React Scan version** with enhanced iframe compatibility
- ✅ **Enhanced iframe support** with improved compatibility
- ✅ **Simple and reliable** injection mechanism  
- ✅ **No complex configuration** required
- ✅ **Minimal performance impact** when disabled
- ✅ **Based on proven patterns** from successful React Scan extensions

## 🏗️ Technical Details

### Architecture

- **Manifest V3** compatible for modern browsers
- **Content Script**: Minimal signal for injection
- **Background Script**: Manages extension state and configuration
- **Popup**: Clean, simple toggle interface

### Security

- Uses Chrome's secure extension APIs for injection
- Uses locally bundled React Scan (no external network requests)
- No data collection or external communication
- Follows Chrome extension security best practices

## 🔍 Troubleshooting

### React Scan Not Showing

1. **Check the extension is enabled** in the popup
2. **Refresh the page** if React loaded before the extension
3. **Check developer console** for any error messages
4. **Verify the page has React** - React Scan only works on React applications

### Iframe Issues

This extension specifically addresses iframe compatibility by:
- Setting `allowInIframe: true` by default
- Using proper injection timing
- Working with the latest React Scan version that has improved iframe support
- Enhanced iframe detection and handling

### Performance Issues

If you experience performance issues:
1. Disable the extension when not debugging
2. Check if "Track Unnecessary Renders" is enabled (can be resource-intensive)
3. Ensure you're not running multiple React debugging tools simultaneously

## 🛠️ Development

To modify this extension:

1. Edit the source files as needed
2. Reload the extension in `chrome://extensions/`
3. Test on React applications

### File Structure

```
├── manifest.json          # Extension configuration
├── background.js           # Manages extension state
├── content.js             # Signals for injection
├── popup.html             # Simple toggle interface
├── popup.js               # Popup logic
├── react-scan.js          # Patched React Scan bundle with iframe support
├── page-script.js         # Page-level injection script
├── icons/                 # Extension icons
├── README.md              # This file
└── INSTALL.md             # Detailed installation guide
```

## 🙏 Credits

This extension is inspired by and builds upon:
- [React Scan](https://github.com/aidenybai/react-scan) by Aiden Bai
- [Chrome React Scan Inspector](https://github.com/jantimon/chrome-react-scan-inspector) by Jan Nicklas
- Various community React Scan extension implementations

## 📄 License

MIT License - feel free to modify and distribute.

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Make your changes
3. Test thoroughly
4. Submit a pull request

This extension aims to be simple, reliable, and specifically optimized for iframe compatibility with patched React Scan. 