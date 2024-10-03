import fs from "fs";

function isWordInFile(word, filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      return;
    }

    const words = data.split("\n");

    if (words.includes(word)) {
      console.log(`The word "${word}" is included in the file.`);
    } else {
      console.log(`The word "${word}" is NOT included in the file.`);
    }
  });
}

// Usage example
const wordToCheck = "faria";
const filePath = "words.txt";

isWordInFile(wordToCheck, filePath);
