"use client";
import React, { useEffect, useState } from "react";
import useBearStore from "../state";

function Footer() {
  const reset = useBearStore((state) => state.reset);
  const setWord = useBearStore((state) => state.setWord);
  const setWordGrammarCorrect = useBearStore(
    (state) => state.setWordGrammarCorrect
  );
  const [timesWon, setTimesWon] = useState("");
  const hasWon = useBearStore((state) => state.hasWon);

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

  function handleClick() {
    reset();
    getData();
  }

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem("timesWon")) {
      setTimesWon(localStorage.getItem("timesWon"));
    }
  }, [hasWon]);

  return (
    <footer className="md:p-10 mt-4 w-full">
      <h4 className="text-gray-400">
        <a href="https://github.com/LeonardoSchmittK" target="_blank">
          &lt;/&gt; Leonardo Schmitt
        </a>
      </h4>
      <button
        className="flex gap-1 md:gap-3 flex-row justify-between  p-2 my-2 md:p-3 md:my-3 bg-gray-400 rounded-md shadow-md uppercase font-bold text-gray-800 hover:bg-gray-300 transition-all"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
        Try again
      </button>
      <h4 className="text-gray-400">
        {timesWon?.length} Acertos |
        {timesWon?.length > 0 && timesWon?.length < 5 && " Level 1 | Aprendiz"}
        {timesWon?.length > 5 && timesWon?.length < 15 && " Level 2 | Mago"}
        {timesWon?.length > 15 && timesWon?.length < 30 && " Level 3 | O Cara"}
        {timesWon?.length > 30 && timesWon?.length < 40 && " Level 4 | O Rei"}
        {timesWon?.length > 40 && timesWon?.length < 50 && " Level 5 | Expert"}
        {timesWon?.length > 50 && " Level 6 | Campeão"}
      </h4>
    </footer>
  );
}

export default Footer;
