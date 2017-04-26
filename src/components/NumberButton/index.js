import view from 'thea';
import classnames from 'classnames';
import styles from './styles.css';


const render = ({
  value,
  isSelected,
  isSuccess,
  isFailure,
  onClick = () => {},
  hint,
  class: className,
}) => (
  <button
    onclick={onClick}
    class={classnames(
      styles.button,
      isSelected && styles.selected,
      isSuccess && styles.success,
      isFailure && styles.failure,
      hint && styles.hint,
      className,
    )}
  >
    <span class={styles.buttoncontent}>{value}</span>
  </button>
);

export default view(render);
