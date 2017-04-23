import 'thea/types/dom/domKnowledge';
import mountOnNode, { Game } from 'components/GameContainer';
import './styles.css';

export default Game;

if (typeof document !== 'undefined') {
  console.log('Live'); // eslint-disable-line

  // Kill any loading messages and remove the listeners
  document.body.parentNode.removeAttribute('class');
  const container = document.body;
  container.removeEventListener('click', window.a, true);
  container.removeEventListener('focus', window.a, true);

  // Start the app
  mountOnNode(container);

  // refocus anything that was focussed
  if (document.activeElement) {
    const activeElement = document.activeElement;
    activeElement.blur();
    requestAnimationFrame(() => activeElement.focus());
  }
}
