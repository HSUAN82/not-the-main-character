
const player = document.getElementById("player");
const npc = document.getElementById("npc");
const item = document.getElementById("item");
const energyFill = document.getElementById("energyFill");

let px = 380;
let energy = 100;
let bgOffset = 0;
let npcY = 300, npcDir = -1;
let itemY = 150, itemActive = true;
const speed = 5;

function updatePosition() {
  player.style.left = px + "px";
  player.style.top = "180px";
  npc.style.left = "380px";
  npc.style.top = (npcY - bgOffset) + "px";
  item.style.left = "420px";
  item.style.top = (itemY - bgOffset) + "px";
}

function checkCollision(a, b) {
  const ab = a.getBoundingClientRect();
  const bb = b.getBoundingClientRect();
  return !(ab.right < bb.left || ab.left > bb.right || ab.bottom < bb.top || ab.top > bb.bottom);
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") bgOffset += speed;
  if (e.key === "ArrowDown") bgOffset -= speed;
  if (e.key === "ArrowLeft") px -= speed;
  if (e.key === "ArrowRight") px += speed;
  px = Math.max(0, Math.min(760, px));
  bgOffset = Math.max(0, bgOffset);
  updatePosition();
});

function gameLoop() {
  npcY += npcDir;
  if (npcY < bgOffset || npcY > bgOffset + 350) npcDir *= -1;

  if (checkCollision(player, npc)) {
    energy -= 0.5;
    energy = Math.max(0, energy);
    energyFill.style.width = energy + "%";
  }

  if (itemActive && checkCollision(player, item)) {
    energy = Math.min(100, energy + 20);
    energyFill.style.width = energy + "%";
    itemActive = false;
    item.style.display = "none";
  }

  if (bgOffset >= 1000) window.location.href = "result.html";

  updatePosition();
  requestAnimationFrame(gameLoop);
}

updatePosition();
gameLoop();
