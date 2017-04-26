import view from 'thea';
import { startGame } from 'state/actions';

import styles from './styles.css';

const render = ({ dispatch, score, highscore = 0 }) => (
  <view>
    <section>
      <div class={styles.description}>
        <branch>
          <if test={score === highscore}>
            <h1>High score!</h1>
            <p>
              You scored {score} points, the highest score so far!
              How about another round to set the bar even higher?
            </p>
          </if>
          <if test={score !== undefined}>
            <h1>Game over.</h1>
            <p>
              You scored {score} points!
              A little more luck, and you’ll reach the high score of {highscore}.
            </p>
          </if>
          <default>
            <h1>Plus Minus Times</h1>
            <p>
              It seems easy: combine all the numbers
              and achieve the given total. But when time gets
              tight, suddenly things get harder…
            </p>
            <p>
              <branch>
                <if test={highscore !== 0}>
                  The high score is {highscore}. Can you beat it?
                </if>
                <default>
                  Have a go; set the record!
                </default>
              </branch>
            </p>
          </default>
        </branch>
        <p class="noscript">
            Javascript seems not to be working. Please enable it to use the demo.
        </p>
        <p class="loading-message">
            One second while the javascript loads …
        </p>
      </div>
    </section>
    <button class={styles.startButton} onClick={() => dispatch(startGame())}>
      <div class={styles.startButtonInt}>{score !== undefined ? 'Play again!' : 'Start!' }</div>
    </button>
  </view>
);

export default view(render);
