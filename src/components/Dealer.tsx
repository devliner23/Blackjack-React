import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import './styles/card.css';

const Dealer = ({ dealerHand, hideSecondCard }: { dealerHand: Card[]; hideSecondCard: boolean }) => {
  const [dealerCards, setDealerCards] = useState<Card[]>(dealerHand);

  const calculateHandValue = () => {
    let handValue = 0;
    let acesCount = 0;

    dealerCards.forEach((card) => {
      switch (card.value) {
        case 'Two':
          handValue += 2;
          break;
        case 'Three':
          handValue += 3;
          break;
        case 'Four':
          handValue += 4;
          break;
        case 'Five':
          handValue += 5;
          break;
        case 'Six':
          handValue += 6;
          break;
        case 'Seven':
          handValue += 7;
          break;
        case 'Eight':
          handValue += 8;
          break;
        case 'Nine':
          handValue += 9;
          break;
        case 'Ten':
        case 'Jack':
        case 'Queen':
        case 'King':
          handValue += 10;
          break;
        case 'Ace':
          acesCount += 1;
          handValue += 11;
          break;
        default:
          break;
      }
    });

    while (handValue > 21 && acesCount > 0) {
      handValue -= 10;
      acesCount -= 1;
    }

    return handValue;
  };

  function getCardColorClass(suit: string) {
    switch (suit) {
      case 'Spades':
        return 'card'; // Use your CSS class for black cards
      case 'Clubs':
        return 'card'; // Use your CSS class for black cards
      case 'Hearts':
        return 'card-red'; // Use your CSS class for red cards
      case 'Diamonds':
        return 'card-red'; // Use your CSS class for red cards
      default:
        return ''; // Default class if suit is not recognized
    }
  }

  useEffect(() => {
    setDealerCards(dealerHand);
  }, [dealerHand]);

  return (
    <div>
      <h2>Dealer's Cards</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {dealerCards.map((card, index) => (
          <div
            className={`card ${getCardColorClass(card.suit)}`}
            key={index}
            style={{ margin: '5px' }}
          >
            {index === 1 && hideSecondCard ? 'X' : card.symbol}
          </div>
        ))}
      </div>
      <p>Hand Value: {calculateHandValue()}</p>
    </div>
  );
};

export default Dealer;
