
// Mini‑juego “Atrapa la burbuja”
// ——————————————————————————————————

(function () {
  const canvas = document.getElementById("bubbleGame"),
    ctx = canvas.getContext("2d"),
    timerEl = document.getElementById("timer"),
    scoreEl = document.getElementById("score"),
    messageEl = document.getElementById("game-message"),
    restartBtn = document.getElementById("restart"),
    verses = [
      "“El Señor es mi pastor; nada me faltará.” — Salmo 23:1",
      "“Todo lo puedo en Cristo que me fortalece.” — Filipenses 4:13",
      "“Jehová es mi luz y mi salvación; ¿de quién temeré?” — Salmo 27:1",
      "“Buscad primeramente el reino de Dios…” — Mateo 6:33",
      "“Porque de tal manera amó Dios al mundo...” — Juan 3:16",
    ];

  let width, height, bubble, score, timeLeft, timerId;

  function resizeCanvas() {
    width = canvas.clientWidth;
    height = width;
    canvas.width = width;
    canvas.height = height;
  }

  function startGame() {
    score = 0;
    timeLeft = 20;
    scoreEl.textContent = score;
    timerEl.textContent = timeLeft;
    messageEl.hidden = true;
    restartBtn.hidden = true;
    bubble = createBubble();
    resizeCanvas();
    if (timerId) clearInterval(timerId);
    timerId = setInterval(mainLoop, 1000 / 60);
    countdown();
  }

  function countdown() {
    const inv = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(inv);
        endGame(false);
      }
    }, 1000);
  }

  function createBubble() {
    const size = width * (0.15 + Math.random() * 0.1);
    const x = Math.random() * (width - size) + size / 2;
    const y = Math.random() * (height - size) + size / 2;
    const speed = 1 + Math.random() * 1.5;
    const dx = (Math.random() < 0.5 ? -1 : 1) * speed;
    const dy = (Math.random() < 0.5 ? -1 : 1) * speed;
    return { x, y, size, dx, dy };
  }

  function drawBubble() {
    ctx.fillStyle = "#967effff";
    ctx.beginPath();
    ctx.arc(bubble.x, bubble.y, bubble.size / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect(),
      mx = e.clientX - rect.left,
      my = e.clientY - rect.top;
    const dist = Math.hypot(mx - bubble.x, my - bubble.y);
    if (dist < bubble.size / 2) {
      score++;
      scoreEl.textContent = score;
      bubble = createBubble();
    }
  });

  function mainLoop() {
    ctx.clearRect(0, 0, width, height);
    bubble.x += bubble.dx;
    bubble.y += bubble.dy;
    if (
      bubble.x < bubble.size / 2 ||
      bubble.x > width - bubble.size / 2
    ) {
      bubble.dx *= -1;
    }
    if (
      bubble.y < bubble.size / 2 ||
      bubble.y > height - bubble.size / 2
    ) {
      bubble.dy *= -1;
    }
    drawBubble();
  }

  function endGame(didWin) {
    clearInterval(timerId);
    canvas.removeEventListener("click", mainLoop);
    messageEl.hidden = false;
    restartBtn.hidden = false;
    messageEl.className = "game-message " + (didWin ? "win" : "lose");
    if (didWin) {
      messageEl.textContent = `¡Ganaste! 🎉 Puntos: ${score}`;
    } else {
      const verse = verses[Math.floor(Math.random() * verses.length)];
      messageEl.innerHTML = `¡Se acabo! Puntos: ${score}<br><em>${verse}</em>`;
    }
  }

  restartBtn.addEventListener("click", startGame);
  window.addEventListener("resize", resizeCanvas);

  // start automáticamente al cargar
  document.addEventListener("DOMContentLoaded", startGame);
})();
