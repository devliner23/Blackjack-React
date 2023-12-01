import React, { useState, useEffect } from 'react';
import {Card} from './Card';
import './styles/card.css';


const Player = ({ playerHand }: { playerHand: Card[] }) => {

  const calculateHandValue = () => {
    let handValue = 0;
    let hasAce = false;
  
    playerHand.forEach((card) => {
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
          hasAce = true;
          handValue += 11;
          break;
        default:
          break;
      }
    });
  
    if (handValue > 21 && hasAce) {
      handValue -= 10;
    }
  
    return handValue;
  };
  
    function getCardColorClass(suit: string) {
        switch (suit) {
          case 'Spades':
            return 'card'; 
          case 'Clubs':
            return 'card'; 
          case 'Hearts':
            return 'card-red';   
          case 'Diamonds':
            return 'card-red';   
          default:
            return ''; 
        }
      }
      
    

      return (
        <div>
          <h2>Player's Cards</h2>
          <div className='card-container'>
            {playerHand.map((card, index) => (
              <div className={`card ${getCardColorClass(card.suit)}`} key={index} style={{ margin: '5px' }}>
                {card.symbol}
              </div>
            ))}
          </div>
          <p>Hand Value: {calculateHandValue()}</p>
        </div>
      );
     }      
export default Player;
