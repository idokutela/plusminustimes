import Store from 'thea-wrapper-redux/Store';
import view from 'thea';
import 'thea/types/dom/domKnowledge';
import Game from 'components/Game';
import reducer from 'state/reducer';
import watchGame from 'state/gameWatcher';
import { createStore } from 'redux';

import './styles.css';

const store = createStore(reducer);

const render = () => (
  <Store store={store}>
    <Game />
  </Store>
);
const App = view(render);
if (typeof window !== 'undefined') {
  requestAnimationFrame(() => watchGame(store, 1000));
}

export default App;

/*
 * Mounts the component on a node.
 */
function mountOnNode(node) {
  if (!node || node.nodeType !== Node.ELEMENT_NODE) {
    throw new Error('Expected a node to mount the TodoList into.');
  }
  // Revive or make new
  const firstNode = (node && node.firstChild && node.firstChild.tagName === 'SECTION' && node.firstChild) || undefined;
  const inst = App.call(firstNode);

  // If there is something to revive on, return.
  if (firstNode) return;

  // Add the new nodes.
  const docFrag = document.createDocumentFragment();
  [...inst.children()].forEach(c => docFrag.appendChild(c));
  node.appendChild(docFrag);
}


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
