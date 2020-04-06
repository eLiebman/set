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

  const selectCard = key => {
    const { selectedCards } = state;
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
    const { cardsInDeck, cardsOnTable, selectedCards, initialRender } = state;
    
    const dealCards = number => {
      const [newCards, remainingCards] = pickCards(number, cardsInDeck);
      dispatch({
        type: 'SET_CARDS_IN_DECK',
        cardsInDeck: [...remainingCards]
      });
      dispatch({
        type: 'SET_CARDS_ON_TABLE',
        cardsOnTable: [...cardsOnTable, ...newCards]
      });
    };

    const replaceSelectedCards = () => {
      const [newCards, remainingCards] =  pickCards(3, cardsInDeck);
      dispatch({
        type: 'SET_CARDS_ON_TABLE',
        cardsOnTable: [
          ...cardsOnTable.filter(card => !selectedCards.includes(card.key)),
          ...newCards,
        ],
      });
      dispatch({
        type: 'SET_SELECTED_CARDS',
        selectedCards: [],
      });
      dispatch({
        type: 'SET_CARDS_IN_DECK',
        cardsInDeck: [...remainingCards],
      });
    }

    if (initialRender) {
      dealCards(12)
      dispatch({
        type: 'INITIAL_RENDER_COMPLETE',
      });
    };

    if (state.selectedCards.length === 3) {
      if (isSet(state.selectedCards.map(key =>
        state.cardsOnTable.find(card => card.key === key)))
      ) {
        replaceSelectedCards();
      } else {

      }
    }
  }, [state]);

  return (
    <div className={s.container}>
      <Board
        cardsOnTable={state.cardsOnTable}
        selectedCards={state.selectedCards}
        selectCard={selectCard}
      />
    </div>
  );
}

export default App;
