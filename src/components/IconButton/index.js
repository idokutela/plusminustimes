import view from 'thea';
import classnames from 'classnames';
import styles from './styles.css';


const render = ({
  label,
  children,
  onClick = () => {},
  class: className,
  disabled,
  hint,
  selected,
}) => (
  <button
    onclick={onClick}
    class={classnames(
      styles.button,
      hint && styles.hint,
      selected && styles.selected,
      className)
    }
    disabled={disabled}
  >
    <span class={styles.buttoncontent}>{children}</span>
    <span class={styles.label}>{label}</span>
  </button>
);

export default view(render);
