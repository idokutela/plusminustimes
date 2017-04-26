import { advanceRound, tick, setHighscore } from './actions';
import { PLAYING } from './constants';

const fakeStorage = {
  setItem(key, value) {
    this[key] = value;
  },
  getItem(key) {
    return this[key];
  },
};

/*
 * Watches a game for round completion. After the given time,
 * fires the action to start the next round.
 */
export default function watchGame(store, timeout = 500) {
  const storage = (typeof window === 'undefined') ? fakeStorage : (window.localStorage || fakeStorage);
  const storedHighscore = Number(storage.getItem('highscore') || 0);
  store.dispatch(setHighscore(storedHighscore));

  let ticking = false;
  const listener = () => {
    const { roundState: { done } = {} } = store.getState();
    if (!done) {
      return;
    }
    setTimeout(() => store.dispatch(advanceRound()), timeout);
  };
  const ticker = () => {
    store.dispatch(tick());
    ticking && setTimeout(ticker, 1000); // eslint-disable-line
  };

  const gameWatcher = () => {
    const { gameState, highscore } = store.getState();
    if (gameState === PLAYING && !ticking) {
      ticking = true;
      ticker();
    }
    if (gameState !== PLAYING && ticking) {
      storage.setItem('highscore', highscore);
      ticking = false;
    }
  };
  store.subscribe(listener);
  store.subscribe(gameWatcher);
}
