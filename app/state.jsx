import { create } from "zustand";

const initialState = {
  hasWon: false,
  word: "furia",
  lettersGone: [],
  wordsApplied: 0,
  wordPut: "",
  wordsHistoric: [],
  wordGrammarCorrect: "fúria",
  preword: "",
  wordInput: "",
  inputRefs: [],
};

const useBearStore = create((set) => ({
  ...initialState,
  setPreword: (txt) => set((state) => ({ preword: txt })),
  setWordInput: (txt) => set((state) => ({ wordInput: txt })),
  setInputRefs: (ref) =>
    set((state) => ({ inputRefs: [...state.inputRefs, ref] })),
  setWord: (txt) => set((state) => ({ word: txt })),
  setWordGrammarCorrect: (txt) => set((state) => ({ wordGrammarCorrect: txt })),
  setHasWon: (bool) => set((state) => ({ hasWon: bool })),
  zeroLettersGone: () => set({ zeroLettersGone: [] }),
  setLettersGone: (word) =>
    set((state) => {
      const alphabet = Array.from({ length: 26 }, (_, i) =>
        String.fromCharCode(97 + i)
      );
      const set = Array.from(new Set([state.lettersGone, ...word]));
      const newArr = [];

      return {
        lettersGone: [...set],
      };
    }),
  zeroWordsApplied: () => set({ wordsApplied: 0 }),
  increaseWordsApplied: () =>
    set((state) => ({ wordsApplied: state.wordsApplied + 1 })),
  zeroWords: () => set({ wordsApplied: 0 }),
  transformWordPut: (txt) => set((state) => ({ wordPut: txt })),
  setWordsHistoric: (word) =>
    set((state) => ({ wordsHistoric: [...state.wordsHistoric, word] })),

  reset: () => set(initialState),
}));

export default useBearStore;
