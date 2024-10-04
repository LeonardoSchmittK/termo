import React, { useEffect, useRef, useState } from "react";
import useBearStore from "../state";
import validator from "validator";
import { AnimatePresence, motion } from "framer-motion";

function Input() {
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [counter, setCounter] = useState(0);
  const [word, setWord] = useState(new Array(5).fill(""));
  const incrementWord = useBearStore((state) => state.increaseWordsApplied);
  const zeroWords = useBearStore((state) => state.zeroWords);
  const transformWordPut = useBearStore((state) => state.transformWordPut);
  const setWordsHistoric = useBearStore((state) => state.setWordsHistoric);
  const wordsHistoric = useBearStore((state) => state.wordsHistoric);
  const hasWon = useBearStore((state) => state.hasWon);
  const setHasWon = useBearStore((state) => state.setHasWon);
  const rightWord = useBearStore((state) => state.word);
  const setLettersGone = useBearStore((state) => state.setLettersGone);
  const setInputRefs = useBearStore((state) => state.setInputRefs);
  const setWordInput = useBearStore((state) => state.setWordInput);
  const wordInput = useBearStore((state) => state.wordInput);
  const [isWiggle, setIsWiggle] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  function handleChangeInput(index) {
    const preWord = [...wordInput];

    preWord[index] = inputRefs[index].current.value.toLowerCase();

    setWordInput(preWord);

    if (index != 4) {
      inputRefs[(index + 1) % 5].current.focus();
    }

    inputRefs.map((ref) => {
      ref.current.placeholder = "";
    });
  }

  function handleKeyDown(index) {
    inputRefs[index].current.value = "";

    inputRefs.map((ref) => {
      ref.current.placeholder = "";
    });
  }

  function checkArrowKey(event, idInput) {
    if (event.key == "ArrowLeft") {
      try {
        inputRefs[idInput - 1].current.focus();
      } catch (e) {}
      return;
    }
    if (event.key == "ArrowRight") {
      try {
        inputRefs[idInput + 1].current.focus();
      } catch (e) {}

      return;
    }
  }

  function checkBackspaceKey(event, id) {
    event.preventDefault();
    if (event.keyCode == 8) {
      // backspace (del) key
      if (inputRefs[id].current.value != "") {
        inputRefs[id].current.value = "";
        handleChangeInput(id);
        handleKeyDown(id);
        try {
          inputRefs[id].current.focus();
        } catch (e) {}
      } else {
        try {
          inputRefs[id - 1].current.focus();
        } catch (e) {}
      }
    }
  }

  function checkEnterKey(event) {
    if ([...wordInput].join("").trim().length === 5) {
      if (event.keyCode == 13 || event.which == 13 || event.key == "Enter") {
        // enter key
        const checkWordExistence = async () => {
          try {
            const response = await fetch(
              "https://termo-back.vercel.app/words/doesExist",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ checkingWord: wordInput.join("") }),
              }
            );

            const data = await response.json();
            if (data.doesExist) {
              checkIfWordIsRight();
            }
          } catch (error) {
            console.error("Error checking word:", error);
          }
        };

        checkWordExistence();

        const checkIfWordIsRight = () => {
          incrementWord();
          const incorrectWord = wordInput
            .join("")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[~^`]+/g, "")
            .trim();

          transformWordPut(incorrectWord);
          inputRefs.forEach((item) => (item.current.value = ""));
          inputRefs[0].current.focus();
          setWordsHistoric(incorrectWord);

          setLettersGone(incorrectWord);

          setWordInput("");

          if (rightWord == incorrectWord) {
            setHasWon(true);
            if (typeof window !== undefined) {
              if (localStorage.getItem("timesWon")) {
                localStorage.setItem(
                  "timesWon",
                  localStorage.getItem("timesWon") + "1"
                );
              } else {
                localStorage.setItem("timesWon", "1");
              }
            }
          }
        };
      }
    }
  }

  useEffect(() => {
    setInputRefs(inputRefs[0]);
    setInputRefs(inputRefs[1]);
    setInputRefs(inputRefs[2]);
    setInputRefs(inputRefs[3]);
    setInputRefs(inputRefs[4]);

    const handleResize = () => {
      if (window.innerWidth <= 650) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
  }, word);

  const animateConfig = { opacity: 0, x: -20 };

  return (
    <AnimatePresence>
      {isMobile && (
        <button
          className="fixed bottom-5 right-5 bg-slate-600 text-white py-2 px-4 rounded-md shadow-lg"
          onClick={() => checkEnterKey({ key: "Enter" })}
          onTouchStart={() => checkEnterKey({ key: "Enter" })}
          onTouchEnd={() => checkEnterKey({ key: "Enter" })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="4"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      )}

      <div className="rounded-xl">
        <div className="grid grid-cols-5 md:gap-3 px-3 py-3 rounded-xl ">
          <motion.input
            disabled={wordsHistoric.length >= 5 || hasWon}
            contentEditable
            placeholder="T"
            maxLength={1}
            minLength={1}
            initial={animateConfig}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.1, delay: 0 * 0.2 }}
            type="text"
            tabIndex={-1}
            onKeyDown={(event) => {
              if (validator.isAlpha(event.key) && event.key.length === 1) {
                if (isMobile) {
                  console.log("opaa");
                  checkEnterKey({ key: "Enter" });
                }
                inputRefs[0].current.value = event.key.toLocaleUpperCase();
                handleChangeInput.bind(null, 0);
                handleKeyDown.bind(null, 0);
              } else {
                checkArrowKey(event, 0);
                checkEnterKey(event, 0);
                checkBackspaceKey(event, 0);
              }
            }}
            ref={inputRefs[0]}
            onKeyPress={handleChangeInput.bind(null, 0)}
            className={`text-gray-700 caret-transparent ${
              isWiggle ? "bg-red-500" : ""
            }  input-1 w-14 h-16 md:w-32 md:h-24 bg-gray-300 rounded-xl text-center 
            font-extrabold text-2xl md:text-4xl  text-black-300 uppercase color-grey-400 p-3 
            flex justify-center align-middle items-center focus:outline-none focus:ring focus:border-gray-500 caret-transparent"`}
          />
          <motion.input
            disabled={wordsHistoric.length >= 5 || hasWon}
            contentEditable
            placeholder="E"
            maxLength={1}
            minLength={1}
            tabIndex={-1}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.1, delay: 1 * 0.2 }}
            type="text"
            //   onKeyDown={handleKeyDownInput2}
            onKeyDown={(event) => {
              if (validator.isAlpha(event.key) && event.key.length === 1) {
                if (isMobile) {
                  console.log("opaa");
                  checkEnterKey({ key: "Enter" });
                }
                inputRefs[1].current.value = event.key.toLocaleUpperCase();
                handleChangeInput.bind(null, 1);
                handleKeyDown.bind(null, 1);
              } else {
                checkArrowKey(event, 1);
                checkEnterKey(event, 1);
                checkBackspaceKey(event, 1);
              }
            }}
            ref={inputRefs[1]}
            onKeyPress={handleChangeInput.bind(null, 1)}
            className="text-gray-700  w-14 h-16 md:w-32 md:h-24 bg-gray-300 rounded-xl text-center font-extrabold text-2xl md:text-4xl  text-black-300 uppercase color-grey-400 p-3 flex justify-center align-middle items-center focus:outline-none focus:ring focus:border-gray-500 caret-transparent"
          />
          <motion.input
            disabled={wordsHistoric.length >= 5 || hasWon}
            contentEditable
            placeholder="R"
            maxLength={1}
            minLength={1}
            tabIndex={-1}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.1, delay: 2 * 0.2 }}
            type="text"
            //   onKeyDown={handleKeyDownInput3}
            ref={inputRefs[2]}
            onKeyDown={(event) => {
              if (validator.isAlpha(event.key) && event.key.length === 1) {
                if (isMobile) {
                  console.log("opaa");
                  checkEnterKey({ key: "Enter" });
                }
                inputRefs[2].current.value = event.key.toLocaleUpperCase();
                handleChangeInput.bind(null, 2);
                handleKeyDown.bind(null, 2);
              } else {
                checkArrowKey(event, 2);
                checkEnterKey(event, 2);
                checkBackspaceKey(event, 2);
              }
            }}
            onKeyPress={handleChangeInput.bind(null, 2)}
            className="text-gray-700  w-14 h-16 md:w-32 md:h-24 bg-gray-300 rounded-xl text-center font-extrabold text-2xl md:text-4xl text-black-300 uppercase color-grey-400 p-3 flex justify-center align-middle items-center focus:outline-none focus:ring focus:border-gray-500 caret-transparent"
          />
          <motion.input
            disabled={wordsHistoric.length >= 5 || hasWon}
            contentEditable
            placeholder="M"
            maxLength={1}
            minLength={1}
            tabIndex={-1}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.1, delay: 3 * 0.2 }}
            type="text"
            // onKeyDown={handleKeyDownInput4}
            ref={inputRefs[3]}
            onKeyDown={(event) => {
              if (validator.isAlpha(event.key) && event.key.length === 1) {
                if (isMobile) {
                  console.log("opaa");
                  checkEnterKey({ key: "Enter" });
                }
                inputRefs[3].current.value = event.key.toLocaleUpperCase();
                handleChangeInput.bind(null, 3);
                handleKeyDown.bind(null, 3);
              } else {
                checkArrowKey(event, 3);
                checkEnterKey(event, 3);
                checkBackspaceKey(event, 3);
              }
            }}
            onKeyPress={handleChangeInput.bind(null, 3)}
            className="text-gray-700  w-14 h-16 md:w-32 md:h-24 bg-gray-300 rounded-xl text-center font-extrabold text-2xl md:text-4xl text-black-300 uppercase color-grey-400 p-3 flex justify-center align-middle items-center focus:outline-none focus:ring focus:border-gray-500 caret-transparent"
          />
          <motion.input
            disabled={wordsHistoric.length >= 5 || hasWon}
            contentEditable
            placeholder="O"
            maxLength={1}
            minLength={1}
            tabIndex={-1}
            type="text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.1, delay: 4 * 0.2 }}
            //    onKeyDown={handleKeyDownInput5}
            ref={inputRefs[4]}
            onKeyPress={handleChangeInput.bind(null, 4)}
            onKeyDown={(event) => {
              if (validator.isAlpha(event.key) && event.key.length === 1) {
                if (isMobile) {
                  console.log("opaa");
                  checkEnterKey({ key: "Enter" });
                }
                inputRefs[4].current.value = event.key.toLocaleUpperCase();
                handleChangeInput.bind(null, 4);
                handleKeyDown.bind(null, 4);
              } else {
                checkArrowKey(event, 4);
                checkEnterKey(event, 4);
                checkBackspaceKey(event, 4);
              }
            }}
            className="text-gray-700 w-14 h-16 md:w-32 md:h-24 bg-gray-300 rounded-xl text-center font-extrabold text-2xl md:text-4xl text-black-300 uppercase color-grey-400 p-3 flex justify-center align-middle items-center focus:outline-none focus:ring focus:border-gray-500 caret-transparent"
          />
        </div>
      </div>
    </AnimatePresence>
  );
}

export default Input;
