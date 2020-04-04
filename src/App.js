import React, { useState, useEffect } from 'react';

import Board from './components/Board.js';
import {
  deck,
  isSet,
  pickCards,
} from './utils.js';

import s from './App.css';

function App() {
  const [cardsInDeck, setCardsInDeck] = useState([...deck]);
  const [cardsOnTable, setCardsOnTable] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  
  const dealCards = number => {
    const [newCards, remainingCards] = pickCards(number, cardsInDeck);
    setCardsInDeck([...remainingCards]);
    setCardsOnTable([ ...cardsOnTable, ...newCards ]);
  };

  const selectCard = key => {
    if (selectedCards.includes(key)) {
      setSelectedCards(
        [ ...selectedCards.filter(selectedCard => selectedCard !== key)]
      );
    } else {
      setSelectedCards([
        ...selectedCards,
        key,
      ]);
    }
  };

  useEffect(() => {
    if (selectedCards.length === 3) {
      console.log(
        isSet(
          selectedCards.map(key => cardsOnTable.find(card => card.key === key))
        )
      )
    }
  }, [selectedCards, cardsOnTable]);

  return (
    <div className={s.container}>
      <Board
        cardsOnTable={cardsOnTable}
        dealCards={dealCards}
        selectCard={selectCard}
        selectedCards={selectedCards}
      />
    </div>
  );
}

export default App;
