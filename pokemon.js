// pokemon.js — модуль

export default class Pokemon {
  constructor({ name, avatar, level = 1, maxHp = 100, bar, hpText, card }) {
    Object.assign(this, { name, avatar, level, maxHp, hp: maxHp, bar, hpText, card });
  }

  updateUI = () => {
    const pct = Math.round((this.hp / this.maxHp) * 100);
    this.bar.style.width = pct + "%";
    this.hpText.textContent = `${this.hp} / ${this.maxHp}`;

    this.bar.style.background =
      pct > 60 ? "linear-gradient(90deg,#6ee7b7,#3dbd7a)" :
      pct > 30 ? "linear-gradient(90deg,#ffd24a,#ff8a3d)" :
                 "linear-gradient(90deg,#ff6b6b,#c0392b)";
  };

  takeDamage = dmg => {
    this.hp = Math.max(0, this.hp - dmg);
    this.updateUI();
    this.card.classList.add("hit");
    setTimeout(() => this.card.classList.remove("hit"), 200);
  };

  attack = (target, { min = 5, max = 15 } = {}) => {
    const dmg = Math.floor(Math.random() * (max - min + 1)) + min;
    target.takeDamage(dmg);
    return dmg;
  };

  reset = () => {
    this.hp = this.maxHp;
    this.updateUI();
  };
}
