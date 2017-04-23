/* eslint-disable max-len */
import view from 'thea';
import Icon from './Icon';

const render = attrs => (
  <Icon {...attrs}>
    <path d="M19 13H5v-2h14v2z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </Icon>
);

export default view(render);
