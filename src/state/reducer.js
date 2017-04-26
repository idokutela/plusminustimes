import gameReducers from './gameReducers';
import { NOT_PLAYING } from './constants';

const reducers = gameReducers;

export const initialState = {
  gameState: NOT_PLAYING,
  undoStack: [],
  undoStackIndex: 0,
  highscore: 0,
};

export default function reduce(state = initialState, action) {
  return reducers.reduce((result, reducer) => reducer(result, action), state);
}
