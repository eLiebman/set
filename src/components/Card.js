import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import {
  colorMap,
  shapeMap,
  patternMap,
} from '../utils.js';

import '../App.scss';

const Card = ({color, number, shape, pattern, selected, onClick,}) => {
  return (
      <div
          className={cn('card', {"selected": selected})}
          onClick={onClick}
          tabIndex={0}
          role="button"
      >
        {new Array(number).fill().map((entry, index) => (
            <div className={`
            ${shapeMap[shape]}-wrap`
            }>
              <div
                  key={index}
                  className={`
            // shape
            ${shapeMap[shape]}-${colorMap[color]}-${patternMap[pattern]
                  }
            cn
          `}
              />
            </div>
        ))}
      </div>
  );
};


Card.propTypes = {
  color: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  shape: PropTypes.number.isRequired,
  pattern: PropTypes.number.isRequired,
};

export default Card;
