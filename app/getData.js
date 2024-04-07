async function getData() {
  const data = await fetch("http://localhost:3000/api/word").then((d) => {
    d.json().then(({ word }) => {
      const wordNotGramaticallyCorrect = word
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[~^`]+/g, "")
        .trim();
      setWord(wordNotGramaticallyCorrect);
      setWordGrammarCorrect(word);
      console.log(word);
    });
  });
}

export default getData();
