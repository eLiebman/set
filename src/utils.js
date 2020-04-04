export const attributes = ["color", "number", "shape", "pattern"];
export const values = [1, 2, 3];

// Export colors, numbers, shapes, patterns. All are [1, 2, 3];
export const {
  color: colors,
  number: numbers,
  shape: shapes,
  pattern: patterns
} = attributes.reduce(
  (obj, attr) => ({
    ...obj,
    [attr]: [...values]
  }),
  {}
);

export const colorMap = {
  1: 'red',
  2: 'green',
  3: 'purple',
};

export const shapeMap = {
  1: 'oval',
  2: 'diamond',
  3: 'squiggle',
}

export const patternMap = {
  1: 'clear',
  2: 'solid',
  3: 'polkaDot',
}

export const deck = (() => {
  let deck = [];
  let key = 0;
  colors.map(color =>
    numbers.map(number =>
      shapes.map(shape =>
        patterns.map(pattern =>{
          deck.push({ color, number, shape, pattern, key });
          key++;
        })
      )
    )
  )
  return deck;
})();

export const removeCard = cardsInDeck => {
  let index = Math.ceil(cardsInDeck.length * Math.random());;
  return [
    cardsInDeck[index],
    [
      ...cardsInDeck.slice(0, index),
      ...cardsInDeck.slice(index + 1),
    ]
  ];
}

export const pickCards = (number, deck, hand = []) => {
  if (!number) return [hand, deck];
  if (!deck.length) return [hand, deck];
  
  const [card, newDeck] = removeCard(deck);
  
  return pickCards(number - 1, newDeck, [...hand, card]);
}

export const featureIsSet = ([a, b, c]) => {
  return (a === b && b === c) || (a !== b && b !== c && a !== c);
};

export const isSet = hand => {
  return !attributes.find(attr => {
    const featureList = hand.map(card => card[attr]);
    return !featureIsSet(featureList);
  });
};

export const featureCompleteSet = ([a, b]) => {
  return a === b ? a : values.find(val => val !== a && val !== b);
}

export const completeSet = (hand) =>
  attributes.reduce((card, attr) => ({
    ...card,
    [attr]: featureCompleteSet(hand.map(card => card[attr])),
  }), {})
