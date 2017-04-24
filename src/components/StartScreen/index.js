import view from 'thea';
import { startGame } from 'state/actions';

import styles from './styles.css';

const render = ({ dispatch }) => (
  <view>
    <section>
      <div class={styles.description}>
        <h1>Plus Minus Times</h1>
        <p>
          It seems easy: just combine pairs of numbers
          with plus, minus or times and achieve the
          given total. But is it?
        </p>
        <p class="noscript">
            Javascript seems not to be working. Please enable it to use the demo.
        </p>
        <p class="loading-message">
            One second while the javascript loads …
        </p>
      </div>
    </section>
    <button class={styles.startButton} onClick={() => dispatch(startGame())}>
      <div class={styles.startButtonInt}>Start!</div>
    </button>
  </view>
);

export default view(render);
