import React from 'react';

export type Card = {
    suit: string;
    value: string;
    symbol: string;
  };

const cardSymbols: { [key: string]: { [key: string]: string } } = {
  Spades: {
    Two: "🂢",
    Three: "🂣",
    Four: "🂤",
    Five: "🂥",
    Six: "🂦",
    Seven: "🂧",
    Eight: "🂨",
    Nine: "🂩",
    Ten: "🂪",
    Jack: "🂫",
    Queen: "🂭",
    King: "🂮",
    Ace: "🂡",
  },
  Hearts: {
    Two: "🂲",
    Three: "🂳",
    Four: "🂴",
    Five: "🂵",
    Six: "🂶",
    Seven: "🂷",
    Eight: "🂸",
    Nine: "🂹",
    Ten: "🂺",
    Jack: "🂻",
    Queen: "🂽",
    King: "🂾",
    Ace: "🂱",
  },
  Clubs: {
    Two: "🃒",
    Three: "🃓",
    Four: "🃔",
    Five: "🃕",
    Six: "🃖",
    Seven: "🃗",
    Eight: "🃘",
    Nine: "🃙",
    Ten: "🃚",
    Jack: "🃛",
    Queen: "🃝",
    King: "🃞",
    Ace: "🃑",
  },
  Diamonds: {
    Two: "🃁",
    Three: "🃂",
    Four: "🃃",
    Five: "🃄",
    Six: "🃅",
    Seven: "🃆",
    Eight: "🃇",
    Nine: "🃈",
    Ten: "🃉",
    Jack: "🃊",
    Queen: "🃋",
    King: "🃍",
    Ace: "🃎",
  },
};

const generateDeck = (): Card[] => {
  const newDeck: Card[] = [];
  const suits = Object.keys(cardSymbols);
  const values = Object.keys(cardSymbols[suits[0]]);

  suits.forEach((suit) => {
    values.forEach((value) => {
      newDeck.push({ suit, value, symbol: cardSymbols[suit as keyof typeof cardSymbols][value] });
    });
  });

  return newDeck;
};

export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
};

// Export a function that returns a new shuffled deck
export const getNewShuffledDeck = () => shuffleDeck(generateDeck());