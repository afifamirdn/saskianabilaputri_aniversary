(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const gift = $("kadoIn");
  const content = $("Content");
  const audio = $("lagu");
  const hearts = [$("lv1"), $("lv2"), $("lv3"), $("lv4")];
  const messages = ["pesan3", "pesan4", "pesan5", "pesan6", "pesan7", "pesan8", "pesan9", "pesan10"];
  let started = false;
  let heartCount = 0;
  let messageIndex = -1;

  // Set a predictable initial state instead of relying on globals from the old template.
  content.style.opacity = "1";
  $("pesanditolak").hidden = true;
  $("Tombol").hidden = true;
  $("kolombaru").hidden = false;
  messages.forEach((id) => { $(id).hidden = true; });
  $("pesan2").hidden = true;
  $("opsL").hidden = true;

  gift.addEventListener("click", async () => {
    if (started) return;
    started = true;
    gift.classList.add("gift-open");
    $("ket").hidden = true;
    document.body.classList.add("started");
    try { await audio.play(); } catch (error) { /* Browser may block audio; the page still works. */ }
    const answer = window.prompt("Masukin nama kamu:");
    const name = (answer || "Sayang").trim().slice(0, 30) || "Sayang";
    $("halo").textContent = `Hai, ${name} ✨`;
    $("halo").hidden = false;
    $("kalimat").textContent = `${name}, Afif ada sesuatu nih 🤣❤️`;
    $("pesan1").hidden = false;
    hearts.forEach((heart) => heart.addEventListener("click", () => {
      if (heart.dataset.clicked) return;
      heart.dataset.clicked = "true";
      heart.textContent = "❤️";
      heartCount += 1;
      if (heartCount === 4) showMessages();
    }));
  });

  function showMessages() {
    $("pesan1").hidden = true;
    $("kolombaru").hidden = true;
    $("pesan2").hidden = false;
    window.setTimeout(() => {
      $("pesan2").hidden = true;
      messageIndex = 0;
      revealMessage();
    }, 900);
  }

  function revealMessage() {
    messages.forEach((id) => { $(id).hidden = true; });
    if (messageIndex >= messages.length) {
      $("opsL").hidden = true;
      $("Tombol").hidden = false;
      return;
    }
    $(messages[messageIndex]).hidden = false;
    $("opsL").hidden = false;
    $("By").textContent = messageIndex === messages.length - 1 ? "Selesai ❤️" : "Klik untuk Lanjut";
  }

  $("By").addEventListener("click", () => {
    messageIndex += 1;
    revealMessage();
  });

  // Gentle floating hearts/snowflakes, with a bounded number of elements.
  window.setInterval(() => {
    if (!document.body.classList.contains("started")) return;
    const particle = document.createElement("span");
    particle.className = "falling-heart";
    particle.textContent = Math.random() > 0.5 ? "🤍" : "✨";
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDuration = `${4 + Math.random() * 4}s`;
    document.body.appendChild(particle);
    window.setTimeout(() => particle.remove(), 8500);
  }, 500);
})();
