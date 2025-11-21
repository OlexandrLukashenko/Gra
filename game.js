import Pokemon from "./pokemon.js";

const sprites = {
  pikachu: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  charmander: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
};

export const Game = (() => {

  // Отримання DOM
  const dom = {
    left: {
      bar: document.getElementById("left-bar"),
      hp: document.getElementById("left-hp"),
      name: document.getElementById("left-name"),
      img: document.getElementById("left-img"),
      level: document.getElementById("left-level"),
      card: document.getElementById("left-card")
    },
    right: {
      bar: document.getElementById("right-bar"),
      hp: document.getElementById("right-hp"),
      name: document.getElementById("right-name"),
      img: document.getElementById("right-img"),
      level: document.getElementById("right-level"),
      card: document.getElementById("right-card")
    },
    logs: document.getElementById("logs")
  };

  // Масив персонажів
  const pokemons = [
    { name: "Pikachu", sprite: sprites.pikachu },
    { name: "Charmander", sprite: sprites.charmander }
  ];

  // Створюємо через масив
  const [left, right] = pokemons.map((p, i) =>
    new Pokemon({
      name: p.name,
      avatar: p.sprite,
      level: 1,
      maxHp: 100,
      bar: dom[i === 0 ? "left" : "right"].bar,
      hpText: dom[i === 0 ? "left" : "right"].hp,
      card: dom[i === 0 ? "left" : "right"].card
    })
  );

  let player = left, enemy = right;
  let auto = null;
  let round = 0;

  const initUI = () => {
    const pairs = [
      [player, dom.left],
      [enemy, dom.right]
    ];

    pairs.forEach(([poke, block]) => {
      block.name.textContent = poke.name;
      block.img.src = poke.avatar;
      block.level.textContent = "Lv. " + poke.level;
      poke.updateUI();
    });
  };

  const log = text => {
    const div = document.createElement("div");
    div.className = "log-row";
    div.textContent = text;
    dom.logs.prepend(div);
  };

  const choosePlayer = choice => {
    if (choice === "random")
      [player, enemy] = Math.random() < 0.5 ? [left, right] : [right, left];
    else if (choice === "pikachu")
      [player, enemy] = [left, right];
    else
      [player, enemy] = [right, left];

    log(`Гравець: ${player.name}, Противник: ${enemy.name}`);
    initUI();
  };

  const bothAttack = () => {
    round++;
    const dmg1 = enemy.attack(player, { min: 5, max: 20 });
    const dmg2 = player.attack(enemy, { min: 5, max: 20 });
    log(`Раунд ${round}: ${player.name} -${dmg1}, ${enemy.name} -${dmg2}`);
    checkEnd();
  };

  const strongAttack = () => {
    round++;
    const dmg = player.attack(enemy, { min: 18, max: 30 });
    log(`Раунд ${round}: ${player.name} завдав ${dmg}`);
    checkEnd();
  };

  const checkEnd = () => {
    if (player.hp === 0 && enemy.hp === 0) log("Нічия!");
    else if (player.hp === 0) log(enemy.name + " переміг!");
    else if (enemy.hp === 0) log(player.name + " переміг!");
  };

  const reset = () => {
    left.reset();
    right.reset();
    round = 0;
    dom.logs.innerHTML = "";
    log("Гру скинуто");
  };

  const toggleAuto = () => {
    if (auto) {
      clearInterval(auto);
      auto = null;
      return;
    }
    auto = setInterval(bothAttack, 1200);
  };

  return { initUI, choosePlayer, bothAttack, strongAttack, reset, toggleAuto };
})();
