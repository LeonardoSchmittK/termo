import React from "react";
import useBearStore from "../state";

function LettersGone() {
  const lettersGone = useBearStore((state) => state.lettersGone);
  const wordsHistoric = useBearStore((state) => state.wordsHistoric);
  const rightWord = useBearStore((state) => state.word);
  return (
    <div className="w-full grid grid-cols-10 text-center gap-3 mt-5 ">
      {Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)).map(
        (letter, id) => {
          const wordsGone = [...wordsHistoric];
          const letters = wordsGone.join("");
          return (
            <div
              key={id}
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
          
                
            p-4  rounded-sm text-center flex justify-center hover:scale-110 transition-all`}
            >
              <h2 className={`  uppercase font-bold text-gray-400 text-md`}>
                {letter}
              </h2>
            </div>
          );
        }
      )}
    </div>
    // <div className="w-full flex flex-row justify-center text-center gap-2 ">
    //   {lettersGone.slice(1, lettersGone.length).map((letter, id) => {
    //     return (
    //       <div key={id} className="p-3 bg-gray-100 rounded-sm">
    //         <h2 className="uppercase font-bold">{letter}</h2>
    //       </div>
    //     );
    //   })}
    // </div>
  );
}

export default LettersGone;
