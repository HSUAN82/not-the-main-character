
const player = document.getElementById("player");
const npc = document.getElementById("npc");
const item = document.getElementById("item");
const energyFill = document.getElementById("energyFill");

let px = 50, py = 180;
let energy = 100;
let npcX = 600, npcDir = -2;
let itemX = 400, itemY = 100;
const speed = 10;

function updatePosition() {
  player.style.left = px + "px";
  player.style.top = py + "px";
  npc.style.left = npcX + "px";
  npc.style.top = "180px";
  item.style.left = itemX + "px";
  item.style.top = itemY + "px";
}

function checkCollision(a, b) {
  const ab = a.getBoundingClientRect();
  const bb = b.getBoundingClientRect();
  return !(ab.right < bb.left || ab.left > bb.right || ab.bottom < bb.top || ab.top > bb.bottom);
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") px += speed;
  if (e.key === "ArrowLeft") px -= speed;
  if (e.key === "ArrowUp") py -= speed;
  if (e.key === "ArrowDown") py += speed;
  px = Math.max(0, Math.min(760, px));
  py = Math.max(0, Math.min(360, py));
  updatePosition();
});

function gameLoop() {
  npcX += npcDir;
  if (npcX < 0 || npcX > 760) npcDir *= -1;
  if (checkCollision(player, npc)) {
    energy -= 1;
    energy = Math.max(0, energy);
    energyFill.style.width = energy + "%";
  }
  if (checkCollision(player, item)) {
    energy = Math.min(100, energy + 20);
    energyFill.style.width = energy + "%";
    itemX = -100;
  }
  if (px >= 760) window.location.href = "result.html";
  updatePosition();
  requestAnimationFrame(gameLoop);
}

updatePosition();
gameLoop();
