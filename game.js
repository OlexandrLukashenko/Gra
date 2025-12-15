import Pokemon from "./pokemon.js";

const sprites = {
  pikachu: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  charmander: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
  bulbasaur: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  squirtle: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
  eevee: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png",
  jigglypuff: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png"
};

const pokemons = [
  { id: "pikachu", name: "Pikachu", sprite: sprites.pikachu },
  { id: "charmander", name: "Charmander", sprite: sprites.charmander },
  { id: "bulbasaur", name: "Bulbasaur", sprite: sprites.bulbasaur },
  { id: "squirtle", name: "Squirtle", sprite: sprites.squirtle },
  { id: "eevee", name: "Eevee", sprite: sprites.eevee },
  { id: "jigglypuff", name: "Jigglypuff", sprite: sprites.jigglypuff }
];

export const Game = (() => {

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

  const createPokemon = (data, side) =>
    new Pokemon({
      name: data.name,
      avatar: data.sprite,
      level: 1,
      maxHp: 100,
      bar: dom[side].bar,
      hpText: dom[side].hp,
      card: dom[side].card
    });

  let player, enemy, round = 0, auto = null;

  const initUI = () => {
    [[player, dom.left], [enemy, dom.right]].forEach(([p, d]) => {
      d.name.textContent = p.name;
      d.img.src = p.avatar;
      d.level.textContent = "Lv. " + p.level;
      p.updateUI();
    });
  };

  const log = text => {
    const div = document.createElement("div");
    div.className = "log-row";
    div.textContent = text;
    dom.logs.prepend(div);
  };

  const choosePlayer = choice => {
    let p1, p2;

    if (choice === "random") {
      [p1, p2] = [...pokemons].sort(() => Math.random() - 0.5);
    } else {
      p1 = pokemons.find(p => p.id === choice);
      p2 = pokemons.filter(p => p.id !== choice)
                   .sort(() => Math.random() - 0.5)[0];
    }

    player = createPokemon(p1, "left");
    enemy = createPokemon(p2, "right");

    round = 0;
    dom.logs.innerHTML = "";
    log(`Гравець: ${player.name}, Противник: ${enemy.name}`);
    initUI();
  };

  const bothAttack = () => {
    if (!player || !enemy) return;
    round++;
    const dmg1 = enemy.attack(player, { min: 5, max: 20 });
    const dmg2 = player.attack(enemy, { min: 5, max: 20 });
    log(`Раунд ${round}: ${player.name} -${dmg1}, ${enemy.name} -${dmg2}`);
    checkEnd();
  };

  const strongAttack = () => {
    if (!player || !enemy) return;
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

  const reset = () => choosePlayer("random");

  const toggleAuto = () => {
    if (auto) {
      clearInterval(auto);
      auto = null;
    } else {
      auto = setInterval(bothAttack, 1200);
    }
  };

  return { choosePlayer, bothAttack, strongAttack, reset, toggleAuto };
})();
