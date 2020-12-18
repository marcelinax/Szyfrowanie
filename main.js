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
  let offset = parseInt(document.querySelector(".key").value);
  if (isNaN(offset)) {
    offset = 3;
  }
  let encrypted = "";
  for (let i = 0; i < text.length; i++) {
    const letter = text[i].toUpperCase();
    if (letter == " ") {
      encrypted += " ";
    } else {
      const positionInTheAlphabet = alphabet.indexOf(letter);
      encrypted += alphabet[(positionInTheAlphabet + offset) % 35];
    }
  }
  return encrypted.toLocaleLowerCase();
};

const initCaesar = () => {
  document.querySelector(".caesar").addEventListener("click", () => {
    const userInput = document.querySelector(".input").value;
    const cipherCode = caesar(userInput);
    const value = (document.querySelector(".cipher_code").value = cipherCode);
    return value;
  });
};

const initPlayfair = () => {
  document
    .querySelector(".playfair")
    .addEventListener("click", encryptPlayfair);
};

const init = () => {
  initCaesar();
  initVigenere();
  initPlayfair();
};

document.addEventListener("DOMContentLoaded", () => {
  init();
});

const encryptPlayfair = () => {
  const alphabets = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const grid = [];
  const diagrams = [];

  let encryptedWord = "";

  let userInput = document.querySelector(".input").value.toLowerCase();
  const key = document.querySelector(".key").value.toLowerCase();

  for (let i = key.length - 1; i >= 0; i--) {
    const letter = key[i];
    const letterPos = alphabets.indexOf(letter);
    alphabets.splice(letterPos, 1);
    alphabets.unshift(letter);
  }

  userInput = userInput.replace(/ /g, "");
  userInput = userInput.replace(/j/g, "i");

  for (let i = 0; i < userInput.length; i += 2) {
    if (userInput[i + 1]) {
      diagrams.push(`${userInput[i]}${userInput[i + 1]}`);
    } else {
      diagrams.push(`${userInput[i]}x`);
    }
  }

  let row = [];
  for (let i = 0; i < alphabets.length; i++) {
    if (i % 5 == 0 && i != 0) {
      grid.push(row);
      row = [];
    }
    row.push(alphabets[i]);
  }
  grid.push(row);
  console.log(grid);

  diagrams.forEach((diagram) => {
    let checked = false;

    const a = diagram[0];
    const b = diagram[1];

    let aIndex = -1;
    let bIndex = -1;
    for (let i = 0; i < 5; i++) {
      aIndex = -1;
      bIndex = -1;
      for (let j = 0; j < 5; j++) {
        if (grid[i][j] == a) {
          aIndex = j;
        }
        if (grid[i][j] == b) {
          bIndex = j;
        }
        if (aIndex > -1 && bIndex > -1) {
          // TO SA W TYM SAMYM RZEDZIE
          if (!checked) {
            checked = true;
            encryptedWord += grid[i][(aIndex + 1) % 5];
            encryptedWord += grid[i][(bIndex + 1) % 5];
          }
        }
      }
    }

    if (!checked) {
      aIndex = -1;
      bIndex = -1;
      for (let i = 0; i < 5; i++) {
        aIndex = -1;
        bIndex = -1;
        for (let j = 0; j < 5; j++) {
          if (grid[j][i] == a) {
            aIndex = j;
          }
          if (grid[j][i] == b) {
            bIndex = j;
          }
          if (aIndex > -1 && bIndex > -1) {
            // TO SA W TEJ SAMEJ KOLUMNIE
            if (!checked) {
              checked = true;
              encryptedWord += grid[(aIndex + 1) % 5][i];
              encryptedWord += grid[(bIndex + 1) % 5][i];
            }
          }
        }
      }
    }

    if (!checked) {
      //  NIE SA W  TYM SAMYM RZEDZIE I W TEJ SAMEJ KOLUMNIE
      aI = -1;
      aJ = -1;
      bI = -1;
      bJ = -1;
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (grid[i][j] == a) {
            aI = i;
            aJ = j;
          }
          if (grid[i][j] == b) {
            bI = i;
            bJ = j;
          }
        }
      }
      encryptedWord += grid[aI][bJ];
      encryptedWord += grid[bI][aJ];
    }
  });

  document.querySelector(".cipher_code").value = encryptedWord;
};
