import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { pickCards } from '../../utils.js';

import Card from '../Card';
import '../../App.css';

const Board = ({
  cardsOnTable,
  setCardsOnTable,
  cardsInDeck,
  setCardsInDeck,
  selectCard,
  selectedCards,
}) => {
  useEffect(() => {
    const [cardsVisible, cardsLeft] = pickCards(cardsInDeck, 12);
    setCardsOnTable(cardsVisible);
    // setCardsInDeck(cardsLeft);
  }, [cardsInDeck, setCardsOnTable]);

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
