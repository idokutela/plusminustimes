import findCombination, { removeTwoItemsAndOperate } from 'util/findCombination';
import { plus, minus, times } from 'util/operations';
import { PLAYING, START_GAME, SELECT_NUMBER, KILL_SELECTION, ADVANCE_ROUND, TICK,
  SET_HIGHSCORE,
  SELECT_OPERATION, UNDO, REDO, PLUS, MINUS, TIMES, NOT_PLAYING } from './constants';

const operations = [];
operations[PLUS] = plus;
operations[MINUS] = minus;
operations[TIMES] = times;

export const initialState = {
  gameState: NOT_PLAYING,
  undoStack: [],
  undoStackIndex: 0,
  highscore: 0,
};

function makeNewRound(rounds) {
  rounds += 0.2; // eslint-disable-line
  const { result: total, array: numbers } = findCombination(Math.floor(rounds));
  return {
    total,
    numbers,
    rounds,
    score: 0,
    selected: [],
    done: false,
  };
}

export default function reduce(state = initialState, { type, value } = {}) {
  switch (type) {
    case START_GAME: {
      if (state.gameState === PLAYING) return state;
      return Object.assign({}, state, {
        gameState: PLAYING,
        time: 0,
        timeout: 3 * 60,
        score: 0,
        roundState: Object.assign(makeNewRound(3)),
      });
    }
    case KILL_SELECTION: {
      let { roundState, gameState } = state; // eslint-disable-line
      if (gameState !== PLAYING) return state;
      roundState = Object.assign({}, roundState, { selected: [] });
      return Object.assign({}, state, { roundState });
    }
    case SELECT_NUMBER: {
      let { gameState, roundState } = state; // eslint-disable-line
      if (gameState !== PLAYING) return state;
      const { selected, done } = roundState;
      if (value === selected[0] || value === selected[1] || done) return state;
      if (selected.length < 2) {
        roundState = Object.assign({}, roundState, { selected: selected.concat(value) });
        return Object.assign({}, state, { roundState });
      }
      roundState = Object.assign({}, roundState, { selected: selected.concat(value).slice(1) });
      return Object.assign({}, state, { roundState });
    }
    case SELECT_OPERATION: {
      let { gameState, roundState, undoStackIndex, undoStack } = state; // eslint-disable-line
      if (gameState !== PLAYING) return state;
      let { selected, total, numbers, rounds, done, score } = roundState; // eslint-disable-line
      if (selected.length !== 2 || done) return state;

      const operation = operations[value];
      const [i, j] = selected;
      numbers = removeTwoItemsAndOperate(roundState.numbers, i, j, operation);
      selected = [];
      undoStackIndex += 1;
      undoStack = undoStack
        .slice(0, undoStackIndex)
        .concat(roundState);
      score += 1;
      if (numbers.length === 1 && numbers[0] === total) {
        undoStack = [];
        undoStackIndex = 0;
        done = true;
      }
      roundState = Object.assign({}, roundState, {
        selected,
        numbers,
        score,
        done,
      });
      return Object.assign({}, state, {
        undoStack,
        undoStackIndex,
        roundState,
      });
    }
    case UNDO: {
      let { gameState, roundState, undoStackIndex, undoStack } = state; // eslint-disable-line
      if (gameState !== PLAYING) return state;
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
      let { gameState, roundState, undoStackIndex, undoStack } = state; // eslint-disable-line
      if (gameState !== PLAYING) return state;
      if (undoStackIndex >= undoStack.length - 1) return state;
      undoStackIndex += 1;
      roundState = undoStack[undoStackIndex];
      return Object.assign({}, state, {
        undoStack,
        undoStackIndex,
        roundState,
      });
    }
    case TICK: {
      const { gameState, time, timeout, highscore, score } = state;
      if (gameState !== PLAYING) return state;
      if (time === timeout) {
        return Object.assign({},
          state,
          {
            gameState: NOT_PLAYING,
            score,
            highscore: score > highscore ? score : highscore,
            roundState: undefined,
          },
        );
      }
      return Object.assign({}, state, { time: time + 1 });
    }
    case ADVANCE_ROUND: {
      const { gameState, roundState, score } = state;
      if (gameState !== PLAYING) return state;
      const { done, rounds, score: roundScore } = roundState;
      if (!done) return state;
      return Object.assign({}, state, {
        undoStack: [],
        undoStackIndex: 0,
        score: score + roundScore + 3,
        roundState: makeNewRound(rounds),
      });
    }
    case SET_HIGHSCORE: {
      const { highscore } = state;
      if (highscore < value) {
        return Object.assign({}, state, { highscore: value });
      }
      return state;
    }
    default: return state;
  }
}
