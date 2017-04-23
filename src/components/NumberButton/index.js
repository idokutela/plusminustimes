import view from 'thea';
import classnames from 'classnames';
import styles from './styles.css';


const render = ({ value, isSelected, onClick = () => {} }) => (
  <button onclick={onClick} styles class={classnames(styles.button, isSelected && styles.selected)}>
    <span class={styles.buttoncontent}>{value}</span>
  </button>
);

export default view(render);
