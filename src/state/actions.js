import { SELECT_NUMBER, KILL_SELECTION, ADVANCE_ROUND, TICK,
  SET_HIGHSCORE, HINT,
  SELECT_OPERATION, UNDO, REDO, START_GAME } from './constants';

function makeAction(type, value) {
  return { type, value };
}
export function undo() {
  return makeAction(UNDO);
}
export function redo() {
  return makeAction(REDO);
}
export function selectOperation(value) {
  return makeAction(SELECT_OPERATION, value);
}
export function selectNumber(value) {
  return makeAction(SELECT_NUMBER, value);
}
export function startGame() {
  return makeAction(START_GAME);
}
export function killSelection() {
  return makeAction(KILL_SELECTION);
}
export function advanceRound() {
  return makeAction(ADVANCE_ROUND);
}
export function tick() {
  return makeAction(TICK);
}
export function setHighscore(value) {
  return makeAction(SET_HIGHSCORE, value);
}
export function hint() {
  return makeAction(HINT);
}
