"use client";
import { useState, useRef, useEffect, use, ReactNode } from "react";
import Input from "./Input";
import useBearStore from "../state";

export default function TableGame() {
  const wordsApplied = useBearStore((state) => state.wordsApplied);
  const wordsHistoric = useBearStore((state) => state.wordsHistoric);
  const word = useBearStore((state) => state.word);
  const hasWon = useBearStore((state) => state.hasWon);
  const wordPut = useBearStore((state) => state.wordPut);
  const wordGrammarCorrect = useBearStore((state) => state.wordGrammarCorrect);
  useEffect(() => {
    console.log(wordsApplied + "<<<< counter of words applied\n");
  }, [wordsApplied]);

  function update() {
    return new Array(wordsApplied).fill("").map((item, id) => {
      return (
        <div key={id} className="grid grid-cols-5 gap-3 px-3 py-3 rounded-xl ">
          <div
            className={` bg-gray-200 ${
              word[0] == wordsHistoric[id][0]
                ? "bg-green-300"
                : word.indexOf(wordsHistoric[id][0]) != -1
                ? "bg-yellow-300"
                : "bg-gray-200"
            }  text-gray-700  input-1 w-14 h-16 md:w-32 md:h-24  rounded-xl text-center font-extrabold text-2xl md:text-4xl text-black-300 uppercase color-grey-400 p-3 flex justify-center align-middle items-center`}
          >
            {word[0] == wordsHistoric[id][0]
              ? wordGrammarCorrect[0]
              : wordsHistoric[id][0]}
          </div>

          <div
            className={` bg-gray-200 ${
              word[1] == wordsHistoric[id][1]
                ? "bg-green-300"
                : word.indexOf(wordsHistoric[id][1]) != -1
                ? "bg-yellow-300"
                : "bg-gray-200"
            }  text-gray-700  input-1 w-14 h-16 md:w-32 md:h-24  rounded-xl text-center font-extrabold text-2xl md:text-4xl text-black-300 uppercase color-grey-400 p-3 flex justify-center align-middle items-center`}
          >
            {word[1] == wordsHistoric[id][1]
              ? wordGrammarCorrect[1]
              : wordsHistoric[id][1]}
          </div>

          <div
            className={` bg-gray-200 ${
              word[2] == wordsHistoric[id][2]
                ? "bg-green-300"
                : word.indexOf(wordsHistoric[id][2]) != -1
                ? "bg-yellow-300"
                : "bg-gray-200"
            }  text-gray-700  input-1 w-14 h-16 md:w-32 md:h-24  rounded-xl text-center font-extrabold text-2xl md:text-4xl text-black-300 uppercase color-grey-400 p-3 flex justify-center align-middle items-center`}
          >
            {word[2] == wordsHistoric[id][2]
              ? wordGrammarCorrect[2]
              : wordsHistoric[id][2]}
          </div>

          <div
            className={` bg-gray-200 ${
              word[3] == wordsHistoric[id][3]
                ? "bg-green-300"
                : word.indexOf(wordsHistoric[id][3]) != -1
                ? "bg-yellow-300"
                : "bg-gray-200"
            }  text-gray-700  input-1 w-14 h-16 md:w-32 md:h-24  rounded-xl text-center font-extrabold text-2xl md:text-4xl text-black-300 uppercase color-grey-400 p-3 flex justify-center align-middle items-center`}
          >
            {word[3] == wordsHistoric[id][3]
              ? wordGrammarCorrect[3]
              : wordsHistoric[id][3]}
          </div>

          <div
            className={` bg-gray-200 ${
              word[4] == wordsHistoric[id][4]
                ? "bg-green-300"
                : word.indexOf(wordsHistoric[id][4]) != -1
                ? "bg-yellow-300"
                : "bg-gray-200"
            }  text-gray-700  input-1 w-14 h-16 md:w-32 md:h-24  rounded-xl text-center font-extrabold text-2xl md:text-4xl text-black-300 uppercase color-grey-400 p-3 flex justify-center align-middle items-center`}
          >
            {word[4] == wordsHistoric[id][4]
              ? wordGrammarCorrect[4]
              : wordsHistoric[id][4]}
          </div>
        </div>
      );
    });
  }

  return (
    <main className="">
      <section className="flex flex-col justify-center bg-gray-50 w-full rounded-xl px-3 py-3">
        {update()}
        {wordsApplied < 5 && <Input />}

        {wordsApplied < 5 &&
          new Array(Math.abs(wordsApplied - 5 + 1)).fill("").map((item, id) => (
            <div
              key={id}
              className="grid grid-cols-5  md:gap-3 px-3 py-3 rounded-xl"
            >
              <div className="text-gray-700  input-1 w-14 h-16 md:w-32 md:h-24 bg-gray-200 rounded-xl text-center font-extrabold text-2xl md:text-4xl text-black-300 uppercase color-grey-400 p-3 flex justify-center align-middle items-center"></div>
              <div className="text-gray-700  input-1 w-14 h-16 md:w-32 md:h-24 bg-gray-200 rounded-xl text-center font-extrabold text-2xl md:text-4xl text-black-300 uppercase color-grey-400 p-3 flex justify-center align-middle items-center"></div>
              <div className="text-gray-700  input-1 w-14 h-16 md:w-32 md:h-24 bg-gray-200 rounded-xl text-center font-extrabold text-2xl md:text-4xl text-black-300 uppercase color-grey-400 p-3 flex justify-center align-middle items-center"></div>
              <div className="text-gray-700  input-1 w-14 h-16 md:w-32 md:h-24 bg-gray-200 rounded-xl text-center font-extrabold text-2xl md:text-4xl text-black-300 uppercase color-grey-400 p-3 flex justify-center align-middle items-center"></div>
              <div className="text-gray-700  input-1 w-14 h-16 md:w-32 md:h-24 bg-gray-200 rounded-xl text-center font-extrabold text-2xl md:text-4xl text-black-300 uppercase color-grey-400 p-3 flex justify-center align-middle items-center"></div>
            </div>
          ))}

        {wordsApplied >= 5 && !hasWon && (
          <div className="grid grid-cols-5 md:gap-3 px-3 py-3 rounded-xl">
            <div className="text-gray-700  input-1 w-14 h-16 md:w-32 md:h-24 bg-gray-400 rounded-xl text-center font-extrabold text-2xl md:text-4xl text-black-300 uppercase color-grey-400 p-3 flex justify-center align-middle items-center">
              {" "}
              {wordGrammarCorrect[0]}
            </div>
            <div className="text-gray-700  input-1 w-14 h-16 md:w-32 md:h-24 bg-gray-400 rounded-xl text-center font-extrabold text-2xl md:text-4xl text-black-300 uppercase color-grey-400 p-3 flex justify-center align-middle items-center">
              {" "}
              {wordGrammarCorrect[1]}
            </div>
            <div className="text-gray-700  input-1 w-14 h-16 md:w-32 md:h-24 bg-gray-400 rounded-xl text-center font-extrabold text-2xl md:text-4xl text-black-300 uppercase color-grey-400 p-3 flex justify-center align-middle items-center">
              {" "}
              {wordGrammarCorrect[2]}
            </div>
            <div className="text-gray-700  input-1 w-14 h-16 md:w-32 md:h-24 bg-gray-400 rounded-xl text-center font-extrabold text-2xl md:text-4xl text-black-300 uppercase color-grey-400 p-3 flex justify-center align-middle items-center">
              {" "}
              {wordGrammarCorrect[3]}
            </div>
            <div className="text-gray-700  input-1 w-14 h-16 md:w-32 md:h-24 bg-gray-400 rounded-xl text-center font-extrabold text-2xl md:text-4xl text-black-300 uppercase color-grey-400 p-3 flex justify-center align-middle items-center">
              {" "}
              {wordGrammarCorrect[4]}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
