const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const banner = document.getElementById("banner");
const messageBox = document.querySelector(".message");
const successMessage = document.getElementById("success-message");
const messageImage = document.getElementById("message-image");
const heartSound = document.getElementById("heartSound");

const musicToggle = document.getElementById("music-toggle");
const bgMusic = document.getElementById("bgMusic");

const questionHeading = document.getElementById("question-heading");

const herName1 = "Buggi";
const herName = "Ayushi";

/* 📝 GOOGLE FORM */
const GOOGLE_FORM_ENTRY = "entry.1234567890";
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse";

function recordResponse(answer) {
  const data = new FormData();
  data.append(GOOGLE_FORM_ENTRY, answer);
  fetch(GOOGLE_FORM_URL, {
    method: "POST",
    body: data,
    mode: "no-cors"
  });
}

/* ❓ Dynamic Questions */
const questions = [
  `Will you be my Valentine, <span>${herName}</span>? 💘`,
  `Will you be a part of my little world, ${herName}? 🌍`,
  `Can I care for you the way you deserve? 🤍`,
  `May I stand by you, always and gently? 🌸`,
  `Will you let me love you, honestly and fully? ❤️`
];
let questionIndex = 0;

/* 😢 NO texts + GIFs */
const noFlow = [
  { text: "No 🙈", img: "./public/images/no1_sad.gif" },
  { text: `${herName}, are you sure?`, img: "./public/images/no1_sad.gif" },
  { text: "That made my heart sink a little 💔", img: "./public/images/no2_cry.gif" },
  { text: "I promise I’d always treat you gently 💞", img: "./public/images/no3_lonely.gif" },
  { text: `${herName1}, Think again pls 💔`, img: "./public/images/no1_sad.gif" },
  { text: "I’m still here… still hoping 🌸", img: "./public/images/no4_hope.gif" },
  { text: "Even now, my feelings are kind and real ❤️", img: "./public/images/no5_smile.gif" },
  { text: "Okay… let’s start again from the heart ❤️", img: "./public/images/no5_smile.gif" }
];

let noIndex = 0;
let yesSize = 18;

/* 🎵 MUSIC */
const songs = [
  "./public/sounds/tere_bin.mp3",
  "./public/sounds/fanna_mere_haath.mp3",
  "./public/sounds/iktara.mp3",
  "./public/sounds/Tu_Hai_Meri.mp3",
  "./public/sounds/kaise_mujhe_tum_mill.mp3",
  "./public/sounds/tum_hi_ho.mp3",
  "./public/sounds/tere_bin (1).mp3",
  "./public/sounds/Soni Soni Ishq Vishk.mp3",
  "./public/sounds/laavan_tere_naal.mp3",
  "./public/sounds/jatti_da_crush.mp3",
  "./public/sounds/Samjhawan.mp3"
];
let songIndex = 0;
let isPlaying = false;

/* ❤️ YES message sequence */
const loveSequence = [
  { text: "Yayyy 💖", img: "./public/images/love3.png" },
  { text: `${herName}, my heart feels so full right now 💞`, img: "./public/images/love3.png" },
  { text: "Every moment with you feels magical ✨", img: "./public/images/love3.png" },
  { text: "I promise to listen, care, and stand by you always 🤍", img: "./public/images/love3.png" },
  { text: "I promise, I'll always be there for you in your good and bad times ✨", img: "./public/images/meyou1.png" },
  { text: "I promise to take care of your heart ❤️", img: "./public/images/meyou1.png" }
];
let msgIndex = 0;

/* ❌ NO click */
noButton.addEventListener("click", () => {
  const current = noFlow[noIndex % noFlow.length];

  noButton.innerText = current.text;
  banner.src = current.img;

  // increase YES button size
  yesSize += 6;
  yesButton.style.fontSize = yesSize + "px";

  // change question
  questionIndex = (questionIndex + 1) % questions.length;
  questionHeading.innerHTML = questions[questionIndex];

  recordResponse("No");
  noIndex++;
});

/* 🎵 Music toggle */
musicToggle.addEventListener("click", () => {
  if (!isPlaying) {
    bgMusic.src = songs[songIndex];
    bgMusic.volume = 0.5;
    bgMusic.play();
    musicToggle.innerText = "⏭ Next Song";
    isPlaying = true;
  } else {
    songIndex = (songIndex + 1) % songs.length;
    bgMusic.src = songs[songIndex];
    bgMusic.play();
  }
});

/* ❤️ YES click */
yesButton.addEventListener("click", () => {
  document.body.style.backgroundColor = "#ffd1dc";
  banner.src = "./public/images/yes.gif";

  heartSound.currentTime = 0;
  heartSound.play();

  document.querySelector(".buttons").style.display = "none";
  messageBox.style.display = "block";

  if (!isPlaying) {
    bgMusic.src = songs[0];
    bgMusic.play();
    isPlaying = true;
    musicToggle.innerText = "⏭ Next Song";
  }

  recordResponse("Yes");
  launchConfetti();
  startHearts();
  typeMessage();
});

/* ⌨️ Typing animation */
function typeMessage() {
  if (msgIndex >= loveSequence.length) return;

  const { text, img } = loveSequence[msgIndex];
  let i = 0;
  successMessage.innerHTML = "";
  messageImage.src = img;

  const typing = setInterval(() => {
    successMessage.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(typing);
      msgIndex++;
      setTimeout(typeMessage, 1500);
    }
  }, 50);
}

/* 🎉 Confetti */
function launchConfetti() {
  confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });
}

/* 💕 Floating hearts */
function startHearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }, 300);
}
