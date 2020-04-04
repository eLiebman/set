import React, { useEffect } from 'react';

import { pickCards } from '../utils.js';

import Card from './Card.js';
import '../App.css';

const Board = ({
  state: {
    cardsOnTable,
    selectedCards,
  },
  selectCard,
}) => {

  return (
    <div className="container">
      {cardsOnTable.map(card => {
        const selected = selectedCards.includes(card.key);
        return (
          <Card
            onClick={() => selectCard(card.key)}
            selected={selected}
            {...card}
          />
        );
      })}
    </div>
);}

export default Board;
