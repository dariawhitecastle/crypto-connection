import * as types from './types';
import { getTickerPrices, getIntervalPrices } from '../../api.ts';

export function receiveCoinsData(data) {
  return {
    payload: data,
    type: types.RECEIVE_COINS_DATA
  };
}

export function receiveLatest(data) {
  return {
    payload: data,
    type: types.RECEIVE_LATEST_PRICE
  };
}

export function fetchCoinsData() {
  return dispatch =>
    getTickerPrices((err, data) => {
      return dispatch(receiveCoinsData(data));
    });
}

export function fetchLatestData() {
  return dispatch =>
    getIntervalPrices((err, data) => {
      return dispatch(receiveLatest(data));
    });
}
