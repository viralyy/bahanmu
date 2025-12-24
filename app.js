// STREAM
if (document.getElementById("player")) {
  fetch("videos.json")
    .then(r => r.json())
    .then(data => {
      const id = new URLSearchParams(location.search).get("v");
      if (!id || !data[id]) return;

      const video = data[id];

      empty.style.display = "none";
      watch.classList.remove("hidden");

      title.textContent = video.title;
      player.src = video.src;

      // tombol download 1
      if (video.downloads && video.downloads[0]) {
        download.href = video.downloads[0];
      }
    });
}

// ADMIN (generator JSON baru)
function generate() {
  if (!document.getElementById("json")) return;

  const id = document.getElementById("id").value.trim();
  const title = document.getElementById("titleInput").value.trim();
  const src = document.getElementById("stream").value.trim();
  const dl1 = document.getElementById("download1")?.value.trim() || "";
  const dl2 = document.getElementById("download2")?.value.trim() || "";

  if (!id || !title || !src) {
    alert("Lengkapi data");
    return;
  }

  const json = {
    [id]: {
      title: title,
      src: src,
      downloads: [dl1 || src, dl2 || src]
    }
  };

  document.getElementById("json").value =
    JSON.stringify(json, null, 2);

  document.getElementById("link").value =
    `${location.origin}${location.pathname.replace("admin.html","")}?v=${id}`;
}
