# Reply Guy Chrome Extension

A Chrome extension that tracks Twitter likes and posts in real-time, providing a clean and interactive dashboard to visualize engagement progress with smooth animations and reliable data persistence.

---

## Features

- Monitors Twitter Like and Post button clicks using robust event listeners.
- Updates and stores counts safely in Chrome's local storage with error handling.
- Visually appealing dashboard with animated progress bars and status messages.
- Responsive UI with modern typography and smooth shimmer/pulse effects.
- Automatic handling of Twitter's dynamic UI changes via Mutation Observers.

---

## Installation & Usage

1. Clone or download this repository.
2. Open Chrome, go to `chrome://extensions/`, enable **Developer Mode**.
3. Click **Load unpacked** and select the project folder.
4. Open Twitter and interact with Likes and Posts.
5. Open the extension popup to view live engagement statistics and progress.

---

## File Structure

- `content-script.js`: Main script that injects into Twitter to track interactions.
- `popup.html`, `popup.js`: The dashboard UI components.
- `styles.css`: Styles and animations for the dashboard interface.

---

## Development

- Built with vanilla JavaScript and modern CSS for lightweight performance.
- Uses MutationObserver to adapt to Twitter’s changing DOM structure.
- Designed for easy updates if Twitter's UI selectors change.



Enjoy tracking your Twitter engagement with Reply Guy! 🚀
