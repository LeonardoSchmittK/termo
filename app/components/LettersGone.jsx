import React, { useRef, useState } from "react";
import useBearStore from "../state";
function LettersGone() {
  const lettersGone = useBearStore((state) => state.lettersGone);
  const [word, setWord] = useState(new Array(5).fill(""));
  const wordsHistoric = useBearStore((state) => state.wordsHistoric);
  const rightWord = useBearStore((state) => state.word);
  const lettersInput = useRef(null);
  const setInputRefs = useBearStore((state) => state.setInputRefs);
  const inputRefs = useBearStore((state) => state.inputRefs);
  const handleChangeInputt = useBearStore((state) => state.handleChangeInputt);

  const setWordInput = useBearStore((state) => state.setWordInput);
  const wordInput = useBearStore((state) => state.wordInput);

  function handleChangeInput(index) {
    const preWord = [...wordInput];

    preWord[index] = inputRefs[index].current.value.toLowerCase();

    setWordInput(preWord);

    if (index != 4) {
      inputRefs[(index + 1) % 5].current.focus();
    }

    if (index == 4) {
      inputRefs[4].current.focus();
    }
  }

  function handleClick(letter) {
    console.log(letter);
    for (let i = 0; i < 5; ++i) {
      if (!inputRefs[i].current.value) {
        inputRefs[i].current.value = letter;
        handleChangeInput(i);

        break;
      }
    }
  }

  return (
    <div className="w-full grid grid-cols-10 text-center gap-3 mt-5 ">
      {Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)).map(
        (letter, id) => {
          const wordsGone = [...wordsHistoric];
          const letters = wordsGone.join("");
          return (
            <div
              key={id}
              ref={lettersInput}
              onClick={() => handleClick(letter)}
              className={`
            ${
              letters.indexOf(letter.toLowerCase()) != -1
                ? "bg-gray-100"
                : "bg-gray-50"
            }
            ${
              [...rightWord].indexOf(letter.toLowerCase()) != -1 &&
              letters.indexOf(letter) != -1
                ? "border-b-2 border-dotted border-gray-300"
                : ""
            }
          
                
            p-4  rounded-sm text-center flex justify-center hover:scale-110 transition-all cursor-pointer`}
            >
              <h2 className={`  uppercase font-bold text-gray-400 text-md`}>
                {letter}
              </h2>
            </div>
          );
        }
      )}
    </div>
  );
}

export default LettersGone;
