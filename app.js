// STREAM
if (document.getElementById("player")) {
  fetch("videos.json")
    .then(r => r.json())
    .then(data => {
      const id = new URLSearchParams(location.search).get("v");
      if (!id || !data[id]) return;

      empty.style.display = "none";
      watch.classList.remove("hidden");

      title.textContent = data[id].title;
      player.src = data[id].url;
      download.href = data[id].download || data[id].url;
    });
}

// ADMIN
function generate() {
  if (!document.getElementById("json")) return;

  const id = document.getElementById("id").value.trim();
  const title = document.getElementById("titleInput").value.trim();
  const url = document.getElementById("stream").value.trim();
  const dl = document.getElementById("downloadInput").value.trim();

  if (!id || !title || !url) {
    alert("Lengkapi data");
    return;
  }

  document.getElementById("json").value =
`"${id}": {
  "title": "${title}",
  "url": "${url}",
  "download": "${dl}"
},`;

  document.getElementById("link").value =
`${location.origin}${location.pathname.replace("admin.html","")}?v=${id}`;
}
