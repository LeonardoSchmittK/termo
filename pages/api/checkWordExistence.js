import fs from "fs/promises";

async function isWordInFile(word, filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");

    const words = data.split("\n");

    return words.includes(word);
  } catch (err) {
    console.error(`Error reading file: ${err}`);
    return false;
  }
}

async function checkWordExists(req, res) {
  const checkingWord = req.body.checkingWord;

  const ress = await isWordInFile(checkingWord, "words.txt");

  if (ress) {
    res.status(200).json({ word: checkingWord, doesExist: true });
  } else {
    res.status(404).json({ word: checkingWord, doesExist: false });
  }
}

export default checkWordExists;
