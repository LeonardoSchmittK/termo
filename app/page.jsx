"use client";
import Image from "next/image";
import TableGame from "./components/TableGame";
import Header from "./components/Header";
// import ReactConfetti from "react-confetti";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import Snow from "react-canvas-confetti/dist/presets/snow";
import useBearStore from "./state";
import LettersGone from "./components/LettersGone";
import axios from "axios";
import getRandomWord from "./getRandomWord";
import { useEffect, useRef, useState } from "react";
import Footer from "./components/Footer";

export default function Home() {
  const hasWon = useBearStore((state) => state.hasWon);
  const setWord = useBearStore((state) => state.setWord);
  const setWordGrammarCorrect = useBearStore(
    (state) => state.setWordGrammarCorrect
  );

  useEffect(() => {
    async function getData() {
      const data = await fetch(
        "https://termo-back.vercel.app/words/random"
      ).then((d) => {
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

    getData();
  }, [setWord, setWordGrammarCorrect]);

  const decorateOptions = (defaultOptions) => {
    return {
      ...defaultOptions,
      colors: ["#72A0C1", "#B2FFFF", "#002D62", "#6050DC"],
    };
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5 bg-gradient-to-r from-slate-50 to-sky-50">
      <div className="z-10 max-w-5xl w-full flex-col  items-center justify-between font-mono text-sm lg:flex">
        {hasWon && (
          <Realistic
            autorun={{ speed: 1, duration: 1500 }}
            decorateOptions={decorateOptions}
          />
        )}

        <Snow autorun={{ speed: 50 }} />
        <Header />
        <TableGame />
        <LettersGone />
        <Footer />
      </div>
    </main>
  );
}
