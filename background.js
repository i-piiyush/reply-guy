console.log("🔧 Background script loaded");

chrome.runtime.onInstalled.addListener(() => {
  console.log("📦 Extension installed/updated");
  chrome.storage.local.set(
    {
      posts: 0,
      likes: 0,

      lastReset: new Date().toDateString(),
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error(
          "❌ Initial storage set error:",
          chrome.runtime.lastError
        );
      } else {
        console.log("✅ Storage initialized");
      }
    }
  );
});

function resetIfNeeded() {
  const today = new Date().toDateString();
  chrome.storage.local.get("lastReset", (data) => {
    if (chrome.runtime.lastError) {
      console.error("❌ Reset check error:", chrome.runtime.lastError);
      return;
    }

    if (data.lastReset !== today) {
      console.log("🔄 Resetting counters for new day");
      chrome.storage.local.set(
        {
          posts: 0,
          likes: 0,
          lastReset: today,
        },
        () => {
          if (chrome.runtime.lastError) {
            console.error("❌ Reset storage error:", chrome.runtime.lastError);
          } else {
            console.log("✅ Counters reset for new day");
          }
        }
      );
    }
  });
}

setInterval(resetIfNeeded, 1000 * 60 * 10); // check every 10 mins
console.log("⏰ Reset checker started");
