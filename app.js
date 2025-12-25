// =====================
// STREAM PAGE
// =====================
if (document.getElementById("player")) {
  fetch("videos.json?_=" + Date.now())
    .then(r => r.json())
    .then(data => {
      const id = new URLSearchParams(location.search).get("v");
      if (!id || !data[id]) return;

      const video = data[id];

      // tampilkan video
      document.getElementById("empty").style.display = "none";
      document.getElementById("watch").classList.remove("hidden");

      document.getElementById("title").textContent = video.title;
      document.getElementById("player").src = video.src;

      // tombol download 1
      const dl1 = document.getElementById("download1");
      if (video.downloads && video.downloads[0]) {
        dl1.href = video.downloads[0];
        dl1.style.display = "block";
      } else {
        dl1.style.display = "none";
      }

      // tombol download 2
      const dl2 = document.getElementById("download2");
      if (video.downloads && video.downloads[1]) {
        dl2.href = video.downloads[1];
        dl2.style.display = "block";
      } else {
        dl2.style.display = "none";
      }
    })
    .catch(err => console.error("Video load error:", err));
}

// =====================
// ADMIN PANEL
// =====================
function generate() {
  const id = document.getElementById("id").value.trim();
  const title = document.getElementById("titleInput").value.trim();
  const src = document.getElementById("stream").value.trim();
  const dl1 = document.getElementById("download1")?.value.trim() || "";
  const dl2 = document.getElementById("download2")?.value.trim() || "";

  if (!id || !title || !src) {
    alert("Lengkapi ID, judul, dan link stream!");
    return;
  }

  const json = {
    [id]: {
      title: title,
      src: src,
      downloads: [dl1 || src, dl2 || src]
    }
  };

  const jsonText = JSON.stringify(json, null, 2);

  // tampilkan di textarea
  document.getElementById("json").value = jsonText;

  // buat link langsung ke video
  document.getElementById("link").value =
    location.origin + location.pathname.replace("admin.html", "") + "?v=" + id;

  // auto copy ke clipboard
  navigator.clipboard.writeText(jsonText).catch(() => {});
}
