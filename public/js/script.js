const noButton = document.getElementById("no-button");
const yesButton = document.getElementById("yes-button");
const banner = document.getElementById("banner");
const message = document.querySelector(".message");
const heartSound = document.getElementById("heartSound");

let yesSize = 18;

const noTexts = [
  "Are you sure, my favorite person? 😢",
  "Think again pls 💔",
  "My heart is fragile 🥺",
  "I’ll wait for you 💞",
  "Okay okay… last chance 😭",
  "Really sure? I’d love you either way 💗",
  "Maybe think once more, pretty please?",
  "I promise I’ll make you smile 😊",
  "We could make something beautiful together",
  "I’d take really good care of your heart ❤️",
  "Just imagine us laughing together",
  "I already saved a spot for you 🥰",
  "My heart’s still hoping softly",
  "It would mean a lot to me 💞",
  "I’m right here, whenever you’re ready",
  "No pressure — just love 💕",
  "Still hoping, with a smile",
  "Okay… but my heart isn’t giving up 💖"
];

let noIndex = 0;

// NO button logic
noButton.addEventListener("click", () => {
  noButton.innerText = noTexts[noIndex % noTexts.length];
  noIndex++;

  yesSize += 6;
  yesButton.style.fontSize = yesSize + "px";
});

// YES button logic
yesButton.addEventListener("click", () => {
  document.body.style.backgroundColor = "#ffd1dc"; // pink background
  banner.src = "./public/images/yes.gif";

  // Play heart sound
  heartSound.currentTime = 0;
  heartSound.play();

  document.querySelector(".buttons").style.display = "none";
  message.style.display = "block";

  launchConfetti();
  startHearts();
});

// Confetti
function launchConfetti() {
  confetti({
    particleCount: 200,
    spread: 90,
    origin: { y: 0.6 }
  });
}

// Floating hearts
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
