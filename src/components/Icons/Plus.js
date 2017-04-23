/* eslint-disable max-len */
import view from 'thea';
import Icon from './Icon';

const render = attrs => (
  <Icon {...attrs}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </Icon>
);

export default view(render);