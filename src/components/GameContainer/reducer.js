import findCombination, { removeTwoItemsAndOperate } from 'util/findCombination';
import { plus, minus, times } from 'util/operations';
import { PLAYING, START_GAME, SELECT_NUMBER, KILL_SELECTION,
  SELECT_OPERATION, UNDO, REDO, PLUS, MINUS, TIMES, NOT_PLAYING } from './constants';

const operations = [];
operations[PLUS] = plus;
operations[MINUS] = minus;
operations[TIMES] = times;

export const initialState = {
  state: NOT_PLAYING,
  undoStack: [],
  undoStackIndex: 0,
};

function makeNewRound(score, rounds) {
  rounds += 0.2; // eslint-disable-line
  const { result: total, array: numbers } = findCombination(Math.floor(rounds));
  return {
    total,
    numbers,
    rounds,
    selected: [],
  };
}

export default function reduce(state = initialState, { type, value } = {}) {
  switch (type) {
    case START_GAME: {
      if (state.state === PLAYING) return state;
      return Object.assign({}, state, {
        state: PLAYING,
        roundState: makeNewRound(0, 2),
      });
    }
    case KILL_SELECTION: {
      let { roundState } = state;
      roundState = Object.assign({}, roundState, { selected: [] });
      return Object.assign({}, state, { roundState });
    }
    case SELECT_NUMBER: {
      let { roundState } = state;
      const { selected } = roundState;
      if (value === selected[0] || value === selected[1]) return state;
      if (selected.length < 2) {
        roundState = Object.assign({}, roundState, { selected: selected.concat(value) });
        return Object.assign({}, state, { roundState });
      }
      roundState = Object.assign({}, roundState, { selected: selected.concat(value).slice(1) });
      return Object.assign({}, state, { roundState });
    }
    case SELECT_OPERATION: {
      let { roundState, undoStackIndex, undoStack } = state;
      let { selected, score, total, numbers, rounds } = roundState; // eslint-disable-line
      if (selected.length !== 2) return state;

      score += 10;
      const operation = operations[value];
      const [i, j] = selected;
      numbers = removeTwoItemsAndOperate(roundState.numbers, i, j, operation);
      selected = [];
      if (numbers.length === 1 && numbers[0] === total) {
        score += 20;
        return Object.assign({}, state, {
          undoStack: [],
          undoStackIndex: 0,
          roundState: makeNewRound(score, rounds),
        });
      }
      undoStackIndex += 1;
      undoStack = undoStack
        .slice(0, undoStackIndex)
        .concat(roundState);
      roundState = Object.assign({}, roundState, {
        selected,
        numbers,
        score,
      });
      return Object.assign({}, state, {
        undoStack,
        undoStackIndex,
        roundState,
      });
    }
    case UNDO: {
      let { roundState, undoStackIndex, undoStack } = state;
      undoStackIndex -= 1;
      if (undoStackIndex === -1) return state;
      if (undoStackIndex + 1 === undoStack.length) {
        undoStack = undoStack.concat(roundState);
      }
      roundState = undoStack[undoStackIndex];
      return Object.assign({}, state, {
        undoStack,
        undoStackIndex,
        roundState,
      });
    }
    case REDO: {
      let { roundState, undoStackIndex, undoStack } = state; // eslint-disable-line
      if (undoStackIndex >= undoStack.length - 1) return state;
      undoStackIndex += 1;
      roundState = undoStack[undoStackIndex];
      return {
        roundState,
        undoStackIndex,
        undoStack,
      };
    }
    default: return state;
  }
}
