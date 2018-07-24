import initialState from './initialState';
import {
  FETCH_COINS_DATA,
  RECEIVE_COINS_DATA,
  RECEIVE_LATEST_PRICE
} from '../actions/types';

function coinReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_COINS_DATA: {
      return {
        ...state,
        recentPrices: action.payload
      };
    }
    case RECEIVE_LATEST_PRICE: {
      const newPrices = action.payload;
      return {
        ...state,
        latestSetOfPrices: newPrices
      };
    }
    default:
      return state;
  }
}

export default coinReducer;
