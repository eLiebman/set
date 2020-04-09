import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Card from './Card.js';
import '../App.scss';

const Board = ({
  cardsOnTable,
  selectedCards,
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
)};

Board.propTypes = {
  cardsOnTable: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedCards: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectCard: PropTypes.func.isRequired,
};

export default Board;
