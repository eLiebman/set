export const attributes = ["color", "number", "shape", "pattern"];
export const values = [1, 2, 3];
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
})()

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

export const removeCard = (index, cardsInDeck) => {
  return [
    ...cardsInDeck.slice(0, index),
    ...cardsInDeck.slice(index + 1)
  ];
}
export const getRemainingCardIndex = cardsInDeck => Math.ceil(cardsInDeck.length * Math.random());

export const pickCards = (cardsInDeck, numberOfCards) => {
  const hand = [];
  let deck = cardsInDeck;
  while (hand.length < numberOfCards) {
    let randomIndex = getRemainingCardIndex(cardsInDeck);
    hand.push(cardsInDeck[randomIndex]);
    deck = removeCard(randomIndex, cardsInDeck);
  }
  return [hand, deck];
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
