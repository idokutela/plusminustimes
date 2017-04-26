import thea from 'thea';
import classnames from 'classnames';
import NumberButton from 'components/NumberButton';
import Plus from 'components/Icons/Plus';
import Minus from 'components/Icons/Minus';
import Times from 'components/Icons/Times';
import Undo from 'components/Icons/Undo';
import Redo from 'components/Icons/Redo';
import IconButton from 'components/IconButton';
import { killSelection, selectOperation, undo, redo, selectNumber } from 'state/actions';
import { PLUS, MINUS, TIMES } from 'state/constants';
import styles from './styles.css';

/* eslint-disable no-undef, jsx-a11y/no-static-element-interactions */
const render = ({
  dispatch,
  roundState: { total, numbers, selected = [], done } = {},
  score,
  undoStack,
  undoStackIndex,
  timeout,
  time,
}) => {
  const remainingTime = (timeout - time >= 0) ? timeout - time : 0;
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const padTwo = n => `00${n}`.slice(-2);
  const disallowOperation = selected.length !== 2 || undefined;
  return (<div
    class={styles.container}
    onClick={e => e.target.tagName === 'DIV' && dispatch(killSelection())}
  >
    <div class={styles.status}>
      <div class={styles.score}>
        Score: {score}
      </div>
      <div class={classnames(styles.time, remainingTime < 10 && styles.warning)}>
        {padTwo(minutes)}:{padTwo(seconds)}
      </div>
    </div>
    <div class={classnames(styles.target, done && styles.done)}>
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
  </div>);
};

export default thea(render);
