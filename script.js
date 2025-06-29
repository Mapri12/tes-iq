const questions = [
  {
    question: "1 + 1 = ?",
    options: ["1", "2", "3", "4"],
    answer: 1
  },
  {
    question: "Urutan setelah 2, 4, 6 adalah?",
    options: ["7", "8", "9", "10"],
    answer: 1
  },
  {
    question: "Bentuk lain dari 1000 - 1 = ?",
    options: ["999", "998", "997", "1001"],
    answer: 0
  },
  {
    question: "Jika A=1, C=3, Z=?",
    options: ["24", "25", "26", "27"],
    answer: 2
  }
];

let current = 0;
let score = 0;
let timer;
let timeLeft = 15; // detik per soal

function startTest() {
  const username = document.getElementById("username").value.trim();
  if (!username) return alert("Silakan masukkan nama Anda terlebih dahulu.");
  document.querySelector("button").style.display = "none";
  document.getElementById("username").style.display = "none";
  document.getElementById("quiz").classList.remove("hidden");
  showQuestion();
  startTimer();
}

function showQuestion() {
  const q = questions[current];
  document.getElementById("question").innerText = q.question;
  const opts = document.getElementById("options");
  opts.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(i);
    opts.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === questions[current].answer) {
    score++;
  }
  stopTimer();
  document.querySelectorAll("#options button").forEach(b => b.disabled = true);
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    showQuestion();
    resetTimer();
    startTimer();
  } else {
    showResult();
  }
}

function showResult() {
  stopTimer();
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  const iq = 80 + score * 10;
  const username = document.getElementById("username").value.trim();
  document.getElementById("user").innerText = `Nama: ${username}`;
  document.getElementById("score").innerText = `Skor IQ Anda: ${iq}`;
  document.getElementById("level").innerText = iq >= 130 ? "Genius" :
    iq >= 110 ? "Di atas rata-rata" :
    iq >= 90 ? "Normal" : "Di bawah rata-rata";
}

function startTimer() {
  timeLeft = 15;
  document.getElementById("timer").innerText = `Waktu: ${timeLeft} detik`;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `Waktu: ${timeLeft} detik`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 15;
}
