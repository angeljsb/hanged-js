import Atemp from "./atemp.js";
import randomWord from "./randomWord.js";

document.getElementById("app").innerHTML = `
<h1 id="title"></h1>
<div id="container"></div>
`;

const title = () => document.getElementById("title");
const container = () => document.getElementById("container");

const show = (atemp) => {
  if (!atemp.isAlive()) {
    title().innerHTML = "¡Estás Muerto!";
    return;
  }
  if (atemp.isComplete()) {
    title().innerHTML = "¡Ganaste! Felicitaciones";
    return;
  }
  container().innerHTML = `Tienes ${atemp.getLives()} vidas`;
  title().innerHTML = atemp.showedWord();
};

const atemp = new Atemp(randomWord());
show(atemp);

document.addEventListener("keydown", (e) => {
  if (!e.code.startsWith("Key")) return;
  atemp.try(e.key);
  show(atemp);
});
