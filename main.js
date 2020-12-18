const alfabet = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ";

const Caesar = (slowo) => {
  let zaszyfrowane = "";
  for (let i = 0; i < slowo.length; i++) {
    const litera = slowo[i].toUpperCase();
    const pozycjaWAlfabecie = alfabet.indexOf(litera);
    zaszyfrowane += alfabet[(pozycjaWAlfabecie + 3) % 35];
  }
  return zaszyfrowane;
};

const initCaesar = () => {
  console.log(document.querySelector(".input").value);
  document.querySelector(".caesar").addEventListener("click", () => {
    const userInput = document.querySelector(".input").value;
    const cipherCode = Caesar(userInput);
    const value = (document.querySelector(".cipher_code").value = cipherCode);
    return value;
  });
};

const init = () => {
  initCaesar();
};

document.addEventListener("DOMContentLoaded", () => {
  init();
});
