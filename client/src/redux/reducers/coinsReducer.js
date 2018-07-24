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
        tickerPrices: action.payload
      };
    }
    case RECEIVE_LATEST_PRICE: {
      const newPrices = action.payload;
      let timestamp = new Date();

      if (state.latestPrices.length >= 30) {
        // tslint:disable-next-line:no-console
        return {
          ...state,
          latestPrices: [
            ...state.latestPrices.slice(0, 29),
            { [timestamp]: newPrices }
          ]
        };
      } else {
        return {
          ...state,
          latestPrices: [...state.latestPrices, { [timestamp]: newPrices }]
        };
      }
    }
    default:
      return state;
  }
}

export default coinReducer;
