const attributes = ['color', 'number', 'shape', 'pattern'];
const values = [1, 2, 3];
const {
  color: colors,
  number: numbers,
  shape: shapes,
  pattern: patterns,
} = attributes.reduce((obj, attr) => (
  {
    ...obj,
    [attr]: [...values],
  }), {})

class Card {
  constructor({ color, number, shape, pattern }) {
    return {
      color,
      number,
      shape,
      pattern,
    };
  }
}

class Deck {
  constructor() {
    this.deck = [];
    this.setDeck = deck => this.deck = deck;
    this.addToDeck = card => this.setDeck([...this.deck, card]);
    this.generateDeck = () =>
      colors.map(color =>
        numbers.map(number =>
          shapes.map(shape =>
            patterns.map(pattern =>
              this.addToDeck(new Card({ color, number, shape, pattern }))
            )
          )
        )
      );
    this.generateDeck();

    this.remainingCards = this.deck.map((card, index) => index);
    this.setRemainingCards = remainingCards => this.remainingCards = remainingCards;
    this.removeCard = indexToRemove => {
      const sliceIndex = this.remainingCards.indexOf(indexToRemove);
      this.setRemainingCards([
        ...this.remainingCards.slice(0, sliceIndex),
        ...this.remainingCards.slice(sliceIndex + 1)
      ]);
    }
    this.getRemainingCardIndex = () => Math.ceil(this.remainingCards.length * Math.random());
    this.pickCards = numberOfCards => {
      const hand = [];
      while (hand.length < numberOfCards) {
        let randomIndex = this.getRemainingCardIndex();
        this.removeCard(randomIndex);
        hand.push(this.deck[
            this.remainingCards[randomIndex]
        ]);
      }
      return hand;
    }

    this.featureIsSet = ([a, b, c]) => {
      return (a === b && b === c) || (a !== b && b !== c && a !== c);
    }

    this.isSet = hand => {
      return !attributes.find(attr => {
        const featureList = hand.map(card => card[attr]);
        return !this.featureIsSet(featureList);
      });
    }

    this.featureCompleteSet = ([a, b]) => {
      return a === b ? a : values.find(val => val !== a && val !== b);
    }

    this.completeSet = (hand) =>
      attributes.reduce((card, attr) => ({
        ...card,
        [attr]: this.completeSetFeature(hand.map(card => card[attr])),
      }), {})
  }
}

const deck = new Deck();
const cards = deck.pickCards(2);
console.log(cards);
console.log(deck.remainingCards);
