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

      // =====================
      // RENDER DOWNLOAD BUTTON (JSON BARU)
      // =====================
      const box = document.getElementById("downloads");
      if (!box) return;

      box.innerHTML = "";

      if (Array.isArray(video.downloads)) {
        video.downloads.forEach(d => {
          let url = "";
          let label = "Download";

          // support JSON lama & baru
          if (typeof d === "string") {
            url = d;
          } else if (typeof d === "object") {
            url = d.url;
            label = d.label || "Download";
          }

          if (!url) return;

          const a = document.createElement("a");
          a.className = "btn";
          a.href = url;
          a.target = "_blank";
          a.innerHTML = `⬇ ${label}`;
          box.appendChild(a);
        });
      }
    })
    .catch(err => console.error("Video load error:", err));
}


// =====================
// ADMIN PANEL
// (BIARIN LOGIKA LU, TETAP JALAN)
// =====================
function generate() {
  const id = document.getElementById("id").value.trim();
  const title = document.getElementById("titleInput").value.trim();
  const src = document.getElementById("stream").value.trim();

  if (!id || !title || !src) {
    alert("Lengkapi ID, judul, dan link stream!");
    return;
  }

  const downloads = [];
  document.querySelectorAll("#downloads .download-row").forEach(r => {
    const label = r.children[0].value.trim();
    const url = r.children[1].value.trim();
    if (url) {
      downloads.push({
        label: label || "Download",
        url
      });
    }
  });

  if (!downloads.length) {
    downloads.push({ label: "Download", url: src });
  }

  const json = {
    [id]: {
      title: title,
      src: src,
      downloads: downloads
    }
  };

  const jsonText = JSON.stringify(json, null, 2);

  document.getElementById("json").value = jsonText;
  document.getElementById("link").value =
    location.origin +
    location.pathname.replace("admin.html", "") +
    "?v=" + id;

  navigator.clipboard.writeText(jsonText).catch(() => {});
}
