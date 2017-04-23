import { createStore } from 'redux';

const ATTRS = Symbol('attrs');
const CONTEXT = Symbol('context');
const STORE = Symbol('state');

const makeComponent = (inner, render, store, attrs, context) =>
  Object.assign(Object.create(inner), {
    [STORE]: Object.assign({}, store),
    [ATTRS]: attrs,
    [CONTEXT]: context,
    render,
  });


export default (
  reducer,
  stateToAttrs = (attrs = {}, state) => Object.assign({}, attrs, state),
) => (render) => {
  if (typeof render !== 'function') {
    throw new TypeError('Expected a render function');
  }

  function makeAttrs(attrs, store) {
    const state = Object.assign({}, store.getState(), { dispatch: store.dispatch });
    return stateToAttrs(attrs, state);
  }

  function doInitialRender(attrs, context) {
    if (typeof reducer !== 'function') {
      throw new Error('Please supply a reducer');
    }
    const store = createStore(reducer);
    const component = render.call(this, makeAttrs(attrs, store), context);
    const result = makeComponent(component, renderWithState, store, attrs, context); // eslint-disable-line
    store.subscribe(() => result.render.call(result, result[ATTRS], result[CONTEXT]));
    return result;
  }

  function renderWithState(attrs = {}, context) {
    if (!this || !this.unmount) {
      return doInitialRender.call(this, attrs, context);
    }
    this[ATTRS] = attrs;
    this[CONTEXT] = context;
    render.call(this, makeAttrs(attrs, this[STORE]), context);
    return this;
  }

  return renderWithState;
};
