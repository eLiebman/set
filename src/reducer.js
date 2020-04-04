export default (state, action) => {
  switch (action.type) {
    case 'SET_CARDS_IN_DECK':
      return {
        ...state,
        cardsInDeck: action.cardsInDeck,
      };
    case 'SET_CARDS_ON_TABLE':
      return {
        ...state,
        cardsOnTable: action.cardsOnTable,
      };
    case 'SET_SELECTED_CARDS':
      return {
        ...state,
        selectedCards: action.selectedCards,
      };
    default:
      return state;
  }
};
