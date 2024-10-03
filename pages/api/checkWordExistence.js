import Typo from "typo-js";

const dictionary = new Typo("pt_BR", {
  dictionaryPath: "./", // specify the path to the .aff and .dic files
  data: {
    aff: "pt_BR.aff", // name of the aff file
    dic: "pt_BR.dic", // name of the dic file
  },
});

function checkWordExists(req, res) {
  const checkingWord = req.body.checkingWord;
  console.log(dictionary);
  console.log(checkingWord + ")))))0");
  console.log(dictionary.check(checkingWord) + ")))))0");
  if (dictionary.check(checkingWord)) {
    console.log(checkWordExists + "existe");
    res.status(200).json({ word: checkingWord, doesExist: true });
  } else {
    console.log(checkWordExists + "naaaao existe");

    res.status(404).json({ word: checkingWord, doesExist: false });
  }
}

const cachorro = "cachorro";
console.log(dictionary.check(cachorro));

export default checkWordExists;
