import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Player from './Player';
import Dealer from './Dealer';
import { Card, getNewShuffledDeck } from './Card';
import InputSlider from './InputSlider';
import { Button } from '@mui/material';
import './styles/style.css'


const Game = () => {
  const [playerPot, setPlayerPot] = useState(10000);
  const [playerBet, setPlayerBet] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameOutcome, setGameOutcome] = useState<string | null>(null);
  const [bust, setBust] = useState(false);
  const [deck, setDeck] = useState<Card[]>([]);

  useEffect(() => {
    setDeck(getNewShuffledDeck()); // Initialize a new shuffled deck
  }, []);

  const dealCard = (): Card | undefined => {
    const card = deck.pop();
    setDeck(deck => [...deck]); // Update the deck state
    return card;
  };

  const dealInitialCards = () => {
    const playerCards = [dealCard(), dealCard()].filter(Boolean) as Card[];
    const dealerCards = [dealCard(), dealCard()].filter(Boolean) as Card[];
    setPlayerHand(playerCards);
    setDealerHand(dealerCards);
  };
  
  const calculateHandValue = (hand: Card[]): number => {
    let handValue = 0;
    let acesCount = 0;
  
    hand.forEach(card => {
      switch (card.value) {
        case 'Two': handValue += 2; break;
        case 'Three': handValue += 3; break;
        case 'Four': handValue += 4; break;
        case 'Five': handValue += 5; break;
        case 'Six': handValue += 6; break;
        case 'Seven': handValue += 7; break;
        case 'Eight': handValue += 8; break;
        case 'Nine': handValue += 9; break;
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
          // Optionally handle unexpected card values
          break;
      }
    });
  
    // Adjust the value of Aces from 11 to 1 if the hand value exceeds 21
    while (handValue > 21 && acesCount > 0) {
      handValue -= 10;
      acesCount -= 1;
    }
  
    return handValue;
  };
    

  const startGame = () => {
    if (playerBet > 0) {
      setGameStarted(true);
      dealInitialCards();
    } else {
      alert('Please place a valid bet.');
    }
  };

  const handleBetInputChange = (event:ChangeEvent<HTMLInputElement>) => {
    const bet = parseInt(event.target.value, 10);
    setPlayerBet(bet);
  };

  const handleBetSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startGame();
  };

  const handleHit = () => {
    if (bust || gameOutcome) return;
  
    const newCard = dealCard();
    if (newCard) {
      const updatedPlayerHand = [...playerHand, newCard];
      setPlayerHand(updatedPlayerHand);
  
      const playerHandValue = calculateHandValue(updatedPlayerHand);
      if (playerHandValue > 21) {
        endGame('Player busted!');
        setBust(true);
      }
    }
  };
  
  const handleStand = () => {
    if (bust || gameOutcome) return;
  
    let dealerHandCopy = [...dealerHand];
    let dealerHandValue = calculateHandValue(dealerHandCopy);
  
    while (dealerHandValue < 17) {
      const newCard = dealCard();
      if (newCard) {
        dealerHandCopy.push(newCard);
        dealerHandValue = calculateHandValue(dealerHandCopy);
  
        if (dealerHandValue > 21) {
          endGame('Dealer busted! Player wins!');
          return;
        }
      } else {
        // Handle the case when no more cards are left in the deck
        break;
      }
    }
  
    setDealerHand(dealerHandCopy); // Update the dealer's displayed hand
  
    const playerHandValue = calculateHandValue(playerHand);
    if (dealerHandValue < playerHandValue) {
      endGame('Player wins!');
    } else if (dealerHandValue === playerHandValue) {
      endGame('It was a tie!');
    } else {
      endGame('Player loses to Dealer!');
    }
  };
      
  
  const endGame = (message: string) => {
    setGameOutcome(message);
  
    switch (message) {
      case 'Player wins!':
        setPlayerPot(playerPot + playerBet);
        break;
      case 'Player loses to Dealer!':
      case 'Player busted!':
        setPlayerPot(playerPot - playerBet);
        break;
      case 'It was a tie!':
        // No change to player's pot
        break;
      case 'Dealer busted! Player wins!':
        setPlayerPot(playerPot + playerBet);
        break;
      // Handle any other outcomes if necessary
    }
  
    setBust(true);
  };
    
  const handleRestart = () => {
    setPlayerBet(0);
    setGameStarted(false);
    setPlayerHand([]);
    setDealerHand([]);
    setGameOutcome(null);
    setBust(false);
    setDeck(getNewShuffledDeck()); // Reinitialize the deck
  };  

  return (
    <div className='game-container p-4'>
      <div className='game-box p-4 m-2'>
        <h1>Blackjack Game</h1>
        {!gameStarted && (
          <div>
            <h2>Place your bet:</h2>
            <form className='m-4' onSubmit={handleBetSubmit}>
              <InputSlider
              value={playerBet}
              setValue={setPlayerBet}
              max={playerPot}
              />
              <Button className='m-4' variant="outlined" type="submit">Start Game</Button>
            </form>
          </div>
        )}
        {gameStarted && (
          <div>
        
        <div className='player-dealer-cards'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='player-card-div'>
                <Player playerHand={playerHand} /> {/* Pass playerHand as a prop */}
                <Button className='p-2 m-2' variant="outlined" onClick={handleHit}>Hit</Button>
                <Button className='p-2 m-2' variant="outlined" onClick={handleStand}>Stand</Button>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='dealer-card-div'>
                <Dealer dealerHand={dealerHand} hideSecondCard={!gameOutcome && !bust} />
              </div>
            </div>
          </div>
        </div>
              <div>
              <h2>{gameOutcome}</h2>
              <Button className='p-2 m-2' variant="outlined" onClick={handleRestart}>Restart</Button>
              </div>
          </div>
        )}
          <p>Player's Pot: ${playerPot}</p>
      </div>
    </div>
  );
};

export default Game;
