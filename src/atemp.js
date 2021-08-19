const FOUND_CHAR = "-";

const Atemp = function (word) {
  this.word = word;
  this.lives = 3;
  this.formated = word
    .toLowerCase()
    .normalize("NFD") //Esto le quita las tildes y las ñ
    .replace(/[\u0300-\u036f]/g, "");
  this.alive = true;
};

Atemp.prototype = {
  showedWord: function () {
    let arr = [];
    for (let i = 0; i < this.formated.length; i++) {
      arr.push(this.formated[i] === FOUND_CHAR ? this.word[i] : "-");
    }
    return arr.join("");
  },
  try: function (letter) {
    if (!this.isAlive() || this.isComplete()) return;
    let lower = letter.toLowerCase();
    if (this.formated.includes(lower)) {
      this.formated = this.formated.replaceAll(lower, FOUND_CHAR);
    } else {
      this.loseLive();
    }
  },
  loseLive: function () {
    if (this.lives === 0) {
      this.die();
      return;
    }
    this.lives--;
  },
  die: function () {
    this.alive = false;
  },
  isAlive: function () {
    return this.alive;
  },
  isComplete: function () {
    return this.formated.split("").every((val) => val === FOUND_CHAR);
  },
  getLives: function () {
    return this.lives;
  }
};
Atemp.prototype.constructor = Atemp;

export default Atemp;
