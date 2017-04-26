export const PLAYING = Symbol('gamestate/playing');
export const NOT_PLAYING = Symbol('gamestate/not_playing');

export const SELECT_NUMBER = Symbol('action/select_number');
export const SELECT_OPERATION = Symbol('action/select_operation');
export const UNDO = Symbol('action/undo');
export const REDO = Symbol('action/redo');
export const KILL_SELECTION = Symbol('action/killSelection');
export const ADVANCE_ROUND = Symbol('action/advanceRound');
export const TICK = Symbol('action/tick');
export const SET_HIGHSCORE = Symbol('action/sethighscore');
export const HINT = Symbol('action/hint');
export const START_GAME = Symbol('action/start_game');

export const PLUS = 0;
export const MINUS = 1;
export const TIMES = 2;
