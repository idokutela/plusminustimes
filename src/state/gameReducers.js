import findCombination, { removeTwoItemsAndOperate } from 'util/findCombination';
import { plus, minus, times } from 'util/operations';
import findFirstStep from 'util/findFirstStep';
import {
  PLAYING,
  START_GAME,
  SELECT_NUMBER,
  KILL_SELECTION,
  ADVANCE_ROUND,
  TICK,
  SELECT_OPERATION,
  UNDO,
  REDO,
  HINT,
  SET_HIGHSCORE,
  PLUS,
  MINUS,
  TIMES,
  NOT_PLAYING,
} from './constants';

const operations = [];
operations[PLUS] = plus;
operations[MINUS] = minus;
operations[TIMES] = times;

function makeNewRound(rounds) {
  rounds += 0.2; // eslint-disable-line
  const { result: total, array: numbers } = findCombination(Math.floor(rounds));
  return {
    total,
    numbers,
    rounds,
    score: 0,
    selected: [],
    operation: null,
    done: false,
  };
}

function performOperation(state) {
  let { roundState, undoStackIndex, undoStack, score } = state; // eslint-disable-line
  let { selected, total, numbers, rounds, done, score: roundScore, operation } = roundState; // eslint-disable-line

  if (selected.length !== 2 || done || !operations[operation]) return state;

  const op = operations[operation];
  const [i, j] = selected;
  numbers = removeTwoItemsAndOperate(roundState.numbers, i, j, op);
  selected = [];
  operation = undefined;
  undoStackIndex += 1;
  undoStack = undoStack
    .slice(0, undoStackIndex)
    .concat(roundState);
  roundScore += 1;

  if (numbers.length === 1 && numbers[0] === total) {
    score = score + roundScore + 2;
    if (score < 0) score = 0;
    roundScore = 0;
    undoStack = [];
    undoStackIndex = 0;
    done = true;
  }

  roundState = Object.assign({}, roundState, {
    selected,
    operation,
    numbers,
    score: roundScore,
    done,
    hint: null,
  });

  return Object.assign({}, state, {
    score,
    undoStack,
    undoStackIndex,
    roundState,
  });
}

export function startGame(state, { type }) {
  const { gameState } = state;
  if (type !== START_GAME || gameState === PLAYING) return state;
  return Object.assign({}, state, {
    gameState: PLAYING,
    time: 0,
    timeout: 3 * 60,
    score: 0,
    roundState: Object.assign(makeNewRound(3)),
  });
}

export function killSelection(state, { type }) {
  let { roundState, gameState } = state; // eslint-disable-line
  if (type !== KILL_SELECTION || gameState !== PLAYING) return state;
  roundState = Object.assign({}, roundState, { selected: [], operation: null });
  return Object.assign({}, state, { roundState });
}

export function selectNumber(state, { type, value }) {
  let { gameState, roundState } = state; // eslint-disable-line
  if (type !== SELECT_NUMBER || gameState !== PLAYING) return state;

  const { selected, done } = roundState;
  if (value === selected[0] || value === selected[1] || done) return state;

  if (selected.length < 2) {
    roundState = Object.assign({}, roundState, { selected: selected.concat(value) });
    return performOperation(Object.assign({}, state, { roundState }));
  }

  roundState = Object.assign({}, roundState, { selected: selected.concat(value).slice(1) });
  return performOperation(Object.assign({}, state, { roundState }));
}

export function selectOperation(state, { type, value }) {
  const { roundState, gameState } = state;
  if (type !== SELECT_OPERATION || gameState !== PLAYING) return state;
  if (!operations[value]) return state;
  return performOperation(Object.assign({}, state, {
    roundState: Object.assign({}, roundState, { operation: value }),
  }));
}

export function undo(state, { type }) {
  let { gameState, roundState, undoStackIndex, undoStack } = state; // eslint-disable-line
  if (type !== UNDO || gameState !== PLAYING) return state;
  undoStackIndex -= 1;
  if (undoStackIndex === -1) return state;
  if (undoStackIndex + 1 === undoStack.length) {
    undoStack = undoStack.concat(roundState);
  }
  roundState = Object.assign({}, undoStack[undoStackIndex]);
  roundState.selected = [];
  roundState.operation = null;
  return Object.assign({}, state, {
    undoStack,
    undoStackIndex,
    roundState,
  });
}

export function redo(state, { type }) {
  let { gameState, roundState, undoStackIndex, undoStack } = state; // eslint-disable-line
  if (type !== REDO || gameState !== PLAYING) return state;
  if (undoStackIndex >= undoStack.length - 1) return state;
  undoStackIndex += 1;
  roundState = Object.assign({}, undoStack[undoStackIndex]);
  roundState.selected = [];
  roundState.operation = null;
  return Object.assign({}, state, {
    undoStack,
    undoStackIndex,
    roundState,
  });
}

export function tick(state, { type }) {
  const { gameState, time, timeout, highscore, score } = state;
  if (type !== TICK || gameState !== PLAYING) return state;
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

export function advanceRound(state, { type }) {
  const { gameState, roundState } = state;
  if (type !== ADVANCE_ROUND || gameState !== PLAYING) return state;
  const { done, rounds } = roundState;
  if (!done) return state;
  return Object.assign({}, state, {
    undoStack: [],
    undoStackIndex: 0,
    roundState: makeNewRound(rounds),
  });
}

function setHighscore(state, { type, value }) {
  if (type !== SET_HIGHSCORE) return state;
  const { highscore } = state;
  if (highscore < value) {
    return Object.assign({}, state, { highscore: value });
  }
  return state;
}

function hint(state, { type }) {
  let { gameState, roundState, undoStackIndex, undoStack } = state; // eslint-disable-line
  if (type !== HINT || gameState !== PLAYING) return state;
  const { numbers, done, rounds, total } = roundState;
  if (done) return state;
  const firstStep = findFirstStep(numbers, total);
  if (firstStep) {
    undoStack = undoStack.map(
      undoState => Object.assign({}, undoState, { score: undoState.score - Math.floor(rounds) }),
    );

    roundState = Object.assign({}, roundState, {
      score: roundState.score - Math.floor(rounds),
      hint: firstStep,
    });
    undoStack[undoStackIndex] = roundState;
    return Object.assign(state, { roundState, undoStack });
  }
  if (undoStackIndex === 0) return state;

  roundState = Object.assign({}, roundState);
  const theResult = Object.assign({}, state, {
    undoStack: undoStack.slice(),
  });
  theResult.undoStack[undoStackIndex] = roundState;
  roundState.hint = 'UNDO';

  return redo(
    hint(
      undo(theResult, { type: UNDO }),
      { type: HINT },
    ),
    { type: REDO },
  );
}

export default [
  startGame,
  killSelection,
  selectNumber,
  selectOperation,
  undo,
  redo,
  hint,
  tick,
  advanceRound,
  setHighscore,
];
