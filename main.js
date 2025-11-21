import { Game } from "./game.js";

Game.initUI();
Game.choosePlayer("pikachu");

document.getElementById("start").onclick = () => {
  const choice = document.getElementById("player-select").value;
  Game.choosePlayer(choice);
};

document.getElementById("attack-random").onclick = Game.bothAttack;
document.getElementById("attack-strong").onclick = Game.strongAttack;
document.getElementById("reset").onclick = Game.reset;
document.getElementById("auto-toggle").onclick = Game.toggleAuto;
