import React, { useEffect, useReducer } from 'react';

import reducer from './reducer.js';

import Board from './components/Board.js';
import {
  initialState,
  isSet,
  pickCards,
} from './utils.js';

import s from './App.css';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    cardsInDeck,
    cardsOnTable,
    selectedCards,
  } = state;
  
  const dealCards = number => {
    const [newCards, remainingCards] = pickCards(number, cardsInDeck);
    dispatch({
      type: 'SET_CARDS_IN_DECK',
      cardsInDeck: [...remainingCards]
    });
    dispatch({
      type: 'SET_CARDS_ON_TABLE',
      cardsOnTable: [ ...cardsOnTable, ...newCards ]
    });
  };

  const selectCard = key => {
    console.log(key);
    if (selectedCards.includes(key)) {
      dispatch({
        type: 'SET_SELECTED_CARDS',
        selectedCards:
        [ ...selectedCards.filter(selectedCard => selectedCard !== key)]
      });
    } else {
      dispatch({
        type: 'SET_SELECTED_CARDS',
        selectedCards: [
          ...selectedCards,
          key,
        ]
      });
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
