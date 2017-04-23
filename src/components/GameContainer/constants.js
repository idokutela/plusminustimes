export const PLAYING = Symbol('gamestate/playing');
export const NOT_PLAYING = Symbol('gamestate/not_playing');

export const SELECT_NUMBER = Symbol('action/select_number');
export const SELECT_OPERATION = Symbol('action/select_operation');
export const UNDO = Symbol('action/undo');
export const REDO = Symbol('action/redo');

export const START_GAME = Symbol('action/start_game');
export const TICK_TIMER = Symbol('action/tick_timer');

export const PLUS = 0;
export const MINUS = 1;
export const TIMES = 2;
