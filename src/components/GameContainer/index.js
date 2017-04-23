import view from 'thea';
import classnames from 'classnames';
import NumberButton from 'components/NumberButton';
import Plus from 'components/Icons/Plus';
import Minus from 'components/Icons/Minus';
import Times from 'components/Icons/Times';
import Undo from 'components/Icons/Undo';
import Redo from 'components/Icons/Redo';
import IconButton from 'components/IconButton';

import makeStateWrapper from 'wrappers';
import reducer from './reducer';
import { undo, redo, selectOperation, selectNumber, startGame, killSelection } from './actions';
import { PLUS, MINUS, TIMES, PLAYING } from './constants';

import styles from './styles.css';

const render = ({
  dispatch,
  state,
  roundState: { total, numbers, selected = [] } = {},
  undoStack,
  undoStackIndex,
}) => {
  const disallowOperation = selected.length !== 2 || undefined;
  const isNotPlaying = state !== PLAYING;
  /* eslint-disable no-undef */
  return (
    <view>
      <section>
        <div class={styles.description}>
          <h1>Plus Minus Times</h1>
          <p>
            It seems easy: just combine pairs of numbers
            with plus, minus or times and achieve the
            given total. But is it?
          </p>
          <branch>
            <if test={isNotPlaying}>
              <p>
                Press “Start!” to start.
              </p>
            </if>
            <default>
              <p>
                Clicking on numbers selects them. Once you’ve selected a pair,
                you can combine them with +, - or ×.
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
      <section class={styles.gameContainer}>
        <div
          class={classnames(styles.container, state !== PLAYING && styles.startContainer)}
          onClick={e => e.target.tagName === 'DIV' && dispatch(killSelection())}
        >
          <branch>
            <if test={state !== PLAYING}>
              <button class={styles.startButton} onClick={() => dispatch(startGame())}>
                <div class={styles.startButtonInt}>Start!</div>
              </button>
            </if>
            <default>
              <div class={styles.target}>
                {total}
              </div>
              <div class={styles.operations}>
                <IconButton
                  disabled={disallowOperation}
                  onClick={() => dispatch(selectOperation(PLUS))}
                >
                  <Plus />
                </IconButton>
                <IconButton
                  disabled={disallowOperation}
                  onClick={() => dispatch(selectOperation(MINUS))}
                >
                  <Minus />
                </IconButton>
                <IconButton
                  disabled={disallowOperation}
                  onClick={() => dispatch(selectOperation(TIMES))}
                >
                  <Times />
                </IconButton>
              </div>
              <div class={styles.operations}>
                <IconButton
                  disabled={undoStackIndex === 0 || undefined}
                  onClick={() => dispatch(undo())}
                >
                  <Undo />
                </IconButton>
                <IconButton
                  disabled={undoStackIndex >= undoStack.length - 1 || undefined}
                  onClick={() => dispatch(redo())}
                >
                  <Redo />
                </IconButton>
              </div>
              <div class={styles.numbers}>
                <each item="value" of={numbers}>
                  <NumberButton
                    value={value}
                    onClick={() => dispatch(selectNumber(key))}
                    isSelected={selected.indexOf(key) !== -1}
                  />
                </each>
              </div>
            </default>
          </branch>
        </div>
      </section>
    </view>
  );
  /* eslint-enable no-undef */
};

export const Game = makeStateWrapper(reducer)(view(render));

/*
 * Mounts the component on a node.
 */
export default function mountOnNode(node) {
  if (!node || node.nodeType !== Node.ELEMENT_NODE) {
    throw new Error('Expected a node to mount the TodoList into.');
  }
  // Revive or make new
  const inst = Game.call(node && node.firstChild && node.firstChild.tagName === 'SECTION' && node.firstChild);

  // If there is something to revive on, return.
  if (node.firstChild) return;

  // Add the new nodes.
  const docFrag = document.createDocumentFragment();
  [...inst.children()].forEach(c => docFrag.appendChild(c));
  node.appendChild(docFrag);
}
