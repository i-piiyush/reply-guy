const TARGETS = {
  posts: 10,
  likes: 100,
};

function updateUI() {
  console.log("🔄 Updating popup UI");
  chrome.storage.local.get(["posts", "likes"], (data) => {
    if (chrome.runtime.lastError) {
      console.error("❌ Storage get error in popup:", chrome.runtime.lastError);
      return;
    }
    const posts = data.posts || 0;
    const likes = data.likes || 0;

    console.log(`📊 Popup data - posts: ${posts}, Likes: ${likes}`);

    document.getElementById("posts-count").textContent = `${posts} / ${TARGETS.posts}`;
    document.getElementById("likes-count").textContent = `${likes} / ${TARGETS.likes}`;

    document.getElementById("posts-bar").style.width = `${Math.min((posts / TARGETS.posts) * 100, 100)}%`;
    document.getElementById("likes-bar").style.width = `${Math.min((likes / TARGETS.likes) * 100, 100)}%`;

    document.getElementById("posts-msg").textContent = posts >= TARGETS.posts ? "🎉 Daily posts goal reached!" : "";
    document.getElementById("likes-msg").textContent = likes >= TARGETS.likes ? "🎉 Daily likes goal reached!" : "";
  });
}

document.addEventListener("DOMContentLoaded", updateUI);

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "local") {
    console.log("📦 Storage changed:", changes);
    updateUI();
  }
});
