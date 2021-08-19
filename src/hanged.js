import Atemp from "./atemp.js";
import randomWord from "./randomWord.js";
import "./hanged.css";

const createLetter = function (l) {
  const el = document.createElement("div");
  el.classList.add("hanged-view__letter");
  el.innerHTML = l;
  return el;
};

const createImg = (name) => {
  const img = document.createElement("img");
  img.src = `src/image/${name}.svg`;
  img.alt = name;
  img.className = "hanged-bg__image hanged-bg__image--person";
  return img;
};

const person = {
  3: createImg("person-3"),
  2: createImg("person-2"),
  1: createImg("person-1"),
  0: createImg("person-0"),
  die: createImg("person-die")
};

const Hanged = function () {
  this.atemp = new Atemp(randomWord());

  this.element = document.createElement("div");
  this.element.classList.add("hanged");
  this.element.innerHTML = `
  <div class="hanged-view">
  <div class="hanged-view__lives"></div>
  <div class="hanged-view__word-view"></div>
  <div class="hanged-view__last-letter"></div>
  </div>
  <div class="hanged-bg">
  <img class="hanged-bg__image hanged-bg__image--tree" src="src/image/fondo.svg" >
  <img class="hanged-bg__image hanged-bg__image--person" src="src/image/person-3.svg" >
  </div>
  `;
  this.insertWord(this.atemp.showedWord());

  this.loseView = document.createElement("div");
  this.loseView.classList.add("hanged-finish");
  this.loseView.innerHTML = `
    <p class="hanged-finish__message">Perdiste</p>
    <button class="hanged-finish__button hanged-finish__reset-button">Volver a intentar</button>
  `;
  this.winView = document.createElement("div");
  this.winView.classList.add("hanged-finish");
  this.winView.innerHTML = `
    <p class="hanged-finish__message">¡Ganaste!</p>
    <button class="hanged-finish__button hanged-finish__reset-button">Volver a intentar</button>
    <a href="https://www.angeljsb.codes" class="hanged-finish__button">¡Conóceme! ;)</a>
  `;

  document.addEventListener("keydown", (e) => {
    if (!e.code.startsWith("Key")) return;
    this.try(e.key);
  });
  this.loseView
    .querySelector(".hanged-finish__reset-button")
    .addEventListener("click", () => this.reset());
  this.winView
    .querySelector(".hanged-finish__reset-button")
    .addEventListener("click", () => this.reset());

  this.render();
};

Hanged.prototype = {
  render: function () {
    const a = this.atemp;
    if (a.isComplete()) {
      this.wordView = this.atemp.showedWord();
      this.win();
      return;
    }
    if (!a.isAlive()) {
      this.lose();
      return;
    }
    this.renderAlive();
  },
  renderAlive: function () {
    const a = this.atemp;
    this.lives = a.getLives();
    this.wordView = a.showedWord();
  },
  try: function (letter) {
    this.atemp.try(letter);
    this.lastLetter = letter;
    this.render();
  },
  reset: function () {
    this.atemp = new Atemp(randomWord());
    this.element.innerHTML = `
      <div class="hanged-view">
      <div class="hanged-view__lives"></div>
      <div class="hanged-view__word-view"></div>
      <div class="hanged-view__last-letter"></div>
      </div>
      <div class="hanged-bg">
      <img class="hanged-bg__image hanged-bg__image--tree" src="src/image/fondo.svg" />
      <img class="hanged-bg__image hanged-bg__image--person" src="src/image/person-3.svg" />
      </div> 
    `;
    this.insertWord(this.atemp.showedWord());
    this.render();
  },
  getViewElement: function (name) {
    return this.element.querySelector(".hanged-view__" + name);
  },
  getBgElement: function (name) {
    return this.element.querySelector(".hanged-bg__image--" + name);
  },
  set lives(lives) {
    this.getViewElement("lives").innerHTML = `${lives} vidas`;
    this.changePerson(lives);
  },
  set wordView(word) {
    const letters = this.getViewElement("word-view").children;
    word.split("").forEach((letter, index) => {
      if (letter === "-" || letter === letters[index].innerHTML) return;
      letters[index].replaceWith(createLetter(letter));
    });
  },
  set lastLetter(letter) {
    this.getViewElement("last-letter").innerHTML = `
    <div class="last-letter__container">
    <div class="last-letter__letter">${letter}</div>
    <div class="last-letter__info">Última letra</div>
    </div>
    `;
  },
  changePerson: function (id) {
    const image = person[id];
    const current = this.getBgElement("person");
    if (current && image !== current) {
      current.replaceWith(image);
    }
  },
  insertWord: function (word) {
    const container = this.getViewElement("word-view");
    for (let i = 0; i < word.length; i++) {
      container.appendChild(createLetter(""));
    }
  },
  win: function () {
    this.changePerson(3);
    this.element.appendChild(this.winView);
  },
  lose: function () {
    this.changePerson("die");
    this.element.appendChild(this.loseView);
  }
};
Hanged.prototype.constructor = Hanged;

export default Hanged;
