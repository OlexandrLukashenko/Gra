import { Game } from "./game.js";

Game.choosePlayer("random");

document.getElementById("start").onclick = () => {
  Game.choosePlayer(document.getElementById("player-select").value);
};

document.getElementById("attack-random").onclick = Game.bothAttack;
document.getElementById("attack-strong").onclick = Game.strongAttack;
document.getElementById("reset").onclick = Game.reset;
document.getElementById("auto-toggle").onclick = Game.toggleAuto;
