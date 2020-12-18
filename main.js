const alphabet = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ";

// vigenere
const vigenere = (input, key) => {
  let output = "";
  for (let i = 0, j = 0; i < input.length; i++) {
    const letter = input.charCodeAt(i);
    if (isUpperCase(letter)) {
      output += String.fromCharCode(
        ((letter - 65 + key[j % key.length]) % 26) + 65
      );
      j++;
    } else if (isLowerCase(letter)) {
      output += String.fromCharCode(
        ((letter - 97 + key[j % key.length]) % 26) + 97
      );
      j++;
    } else output += input.charAt(i);
  }
  return output;
};
const initVigenere = () => {
  document.querySelector(".vigenere").addEventListener("click", () => {
    const userInput = document.querySelector(".input").value;
    console.log(document.querySelector(".input").value);
    console.log(userInput);
    const key = filterKey(document.querySelector(".key").value);
    console.log(key);
    //decrypt
    // for (let i = 0; i < key.length; i++) {
    //   key[i] = (26 - key[i]) % 26;
    // }
    const cipherCode = vigenere(userInput, key);
    const output = (document.querySelector(".cipher_code").value = cipherCode);
    return output;
  });
};
const filterKey = (key) => {
  const keyTab = [];
  for (let i = 0; i < key.length; i++) {
    const letter = key.charCodeAt(i);
    if (isLetter(letter)) keyTab.push((letter - 65) % 32);
  }
  return keyTab;
};
const isUpperCase = (letter) => {
  return 65 <= letter && letter <= 90;
};
const isLowerCase = (letter) => {
  return 97 <= letter && letter <= 122;
};

const isLetter = (letter) => {
  return isUpperCase(letter) || isLowerCase(letter);
};

// Caesar
const caesar = (text) => {
  let encrypted = "";
  for (let i = 0; i < text.length; i++) {
    const letter = text[i].toUpperCase();
    const positionInTheAlphabet = alphabet.indexOf(letter);
    encrypted += alphabet[(positionInTheAlphabet + 3) % 35];
  }
  return encrypted;
};

const initCaesar = () => {
  document.querySelector(".caesar").addEventListener("click", () => {
    const userInput = document.querySelector(".input").value;
    const cipherCode = caesar(userInput);
    const value = (document.querySelector(".cipher_code").value = cipherCode);
    return value;
  });
};

const init = () => {
  initCaesar();
  initVigenere();
};

document.addEventListener("DOMContentLoaded", () => {
  init();
});
