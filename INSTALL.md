# Installation Guide - React Scan Extension

## 🚀 Quick Install (Developer Mode)

1. **Download** this extension folder to your computer
2. **Open Chrome** and go to `chrome://extensions/`
3. **Enable Developer mode** (toggle in top-right corner)
4. **Click "Load unpacked"** and select this folder
5. **Done!** The React Scan extension is now installed

## 🎯 Usage

1. **Navigate** to any React website (e.g., react.dev, airbnb.com, netflix.com)
2. **Click** the React Scan extension icon in your browser toolbar
3. **Toggle ON** React Scan using the main switch
4. **Watch** components get highlighted as they re-render!

## 🧪 Test Sites

Try these React applications to see React Scan in action:
- https://react.dev
- https://airbnb.com
- https://netflix.com  
- https://facebook.com
- Any Next.js or Create React App site

## ✨ Features

- ✅ **Patched React Scan** (bundled with enhanced iframe support)
- 🎛️ **Easy toggle interface**
- ⚙️ **Advanced options** (toolbar, tracking, logging)
- 🔄 **Auto React detection**
- 🎨 **Modern, beautiful UI**
- 🖼️ **Enhanced iframe support** (patched source code)

## 🔧 Troubleshooting

**Extension not working?**
1. Refresh the page after enabling React Scan
2. Check browser console for any errors
3. Make sure you're on a React website
4. Try disabling and re-enabling the extension
5. Ensure Developer mode is still enabled

**Performance issues?**
1. Disable "Track Unnecessary Renders"
2. Disable "Console Logging"  
3. Only use React Scan when debugging
4. Turn off the extension when not needed

**Iframe issues?**
This extension has enhanced iframe support by default - no additional configuration needed!

## 🚀 What's Different?

This extension uses a **patched version of React Scan** with enhanced iframe support, compared to other extensions that use unmodified versions. You get:

- **Enhanced iframe compatibility** - works where other extensions fail
- **Patched source code** - `allowInIframe` forced to `true` by default
- **Bundled locally** - no CDN dependencies or loading delays
- **Reliable performance** - consistent behavior across all sites
- Modern extension interface
- **Specialized for iframe use cases**

## 🔒 Security & Privacy

- **No data collection** - the extension only injects React Scan
- **Local bundle** - uses a locally bundled, patched version of React Scan
- **Local processing** - all analysis happens in your browser
- **No external servers** - no data sent anywhere, no CDN dependencies

## 📋 System Requirements

- **Chrome** (or Chromium-based browser)
- **Developer mode** enabled in Chrome extensions
- **React website** to analyze

## 🛠️ Advanced Installation

### For Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/react-scan-extension.git
   ```
2. Follow the quick install steps above

### For Distribution

This extension is designed for developer use. For production distribution, you would need to:
1. Package the extension
2. Submit to Chrome Web Store
3. Follow Chrome's review process

---

**Note**: This extension uses a locally bundled version of React Scan that has been specifically patched to enhance iframe compatibility. The source code modifications ensure `allowInIframe` is always enabled, making it work reliably in iframe contexts where standard React Scan extensions may fail. 