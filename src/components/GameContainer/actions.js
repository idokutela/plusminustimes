import { SELECT_NUMBER,
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
