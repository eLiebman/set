import React, { useState, useEffect } from 'react';

import Board from './components/Board';
import {
  deck,
  isSet,
} from './utils.js';

import s from './App.css';

function App() {
  const [cardsOnTable, setCardsOnTable] = useState([]);
  const [cardsInDeck, setCardsInDeck] = useState(deck);
  const [selectedCards, setSelectedCards] = useState([]);
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
  }

  useEffect(() => {
    if (selectedCards.length === 3) {
      console.log(
        isSet(
          selectedCards.map(key => cardsOnTable.find(card => card.key === key))
        )
      )
    }
  }, [selectedCards, cardsOnTable])

  // const featureCompleteSet = ([a, b]) => {
  //   return a === b ? a : values.find(val => val !== a && val !== b);
  // }

  // const completeSet = (hand) =>
  //   attributes.reduce((card, attr) => ({
  //     ...card,
  //     [attr]: featureCompleteSet(hand.map(card => card[attr])),
  //   }), {})

  return (
    <div className={s.container}>
      <Board
        cardsOnTable={cardsOnTable}
        setCardsOnTable={setCardsOnTable}
        cardsInDeck={cardsInDeck}
        setCardsInDeck={setCardsInDeck}
        selectCard={selectCard}
        selectedCards={selectedCards}
      />
    </div>
  );
}

export default App;
