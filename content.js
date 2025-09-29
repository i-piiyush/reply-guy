console.log("🚀 Reply Guy content script injected");

// Update counters safely with increment/decrement
function updateCounter(type, delta = 1) {
  chrome.storage.local.get([type], (data) => {
    if (chrome.runtime.lastError) {
      console.error(`Storage get error for ${type}:`, chrome.runtime.lastError);
      return;
    }
    const current = data[type] || 0;
    const updated = Math.max(0, current + delta);
    chrome.storage.local.set({ [type]: updated }, () => {
      if (chrome.runtime.lastError) {
        console.error(`Storage set error for ${type}:`, chrome.runtime.lastError);
      }
    });
  });
}

// Button selectors — update if Twitter UI changes
const BUTTON_SELECTORS = {
  likes: [
    'button[data-testid="like"]',
    'button[aria-label*="Like"][role="button"]',
    'div[role="button"][aria-label*="Like"]',
  ],
  posts: [
    'button[data-testid="tweetButtonInline"]',
    'button[data-testid="tweetButton"]',
    'button[data-testid="tweetButtonRichText"]',
  ],
};

// Find buttons matching selectors, return first matching set
function findButtons(selectors) {
  for (const sel of selectors) {
    try {
      const found = document.querySelectorAll(sel);
      if (found.length) {
        return Array.from(found);
      }
    } catch (e) {
      // Invalid selector; silently continue
    }
  }
  return [];
}

// Create click handler for a given type
function createHandler(type) {
  return (event) => {
    if (type === "likes") {
      const btn = event.currentTarget;
      setTimeout(() => {
        if (btn && typeof btn.getAttribute === "function") {
          const ariaLabelVal = btn.getAttribute("aria-label") || "";
          const isLiked = ariaLabelVal.trim().toLowerCase().endsWith("liked");
          updateCounter(type, isLiked ? 1 : -1);
        }
      }, 300);
    } else {
      updateCounter(type, 1);
    }
  };
}

// Attach event listeners to buttons if not already bound
function attachListeners() {
  for (const [type, selectors] of Object.entries(BUTTON_SELECTORS)) {
    const buttons = findButtons(selectors);
    buttons.forEach((btn) => {
      if (!btn.dataset.replyGuyBound) {
        btn.dataset.replyGuyBound = "true";
        btn.addEventListener("click", createHandler(type));
      }
    });
  }
}

// Debounced mutation observer callback to avoid rapid calls
let attachTimeout;
const observer = new MutationObserver(() => {
  clearTimeout(attachTimeout);
  attachTimeout = setTimeout(attachListeners, 500);
});

if (document.body) {
  observer.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", attachListeners);
} else {
  attachListeners();
}

console.log("🎯 Reply Guy content script initialized");
