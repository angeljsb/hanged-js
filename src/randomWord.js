const words = [
  "Sagitario",
  "Ornitorrinco",
  "Palabrota",
  "Carne",
  "Decoración",
  "Facilidad",
  "Javascript",
  "Memorizador",
  "Aprender",
  "Palíndromo",
  "Código",
  "Felicidad",
  "Bondad",
  "Ahorcado",
  "Querida"
];

const randomWord = () => words[Math.floor(Math.random() * words.length)];

export default randomWord;
