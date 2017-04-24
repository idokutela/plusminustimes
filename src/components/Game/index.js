import view from 'thea';
import wrap from 'thea-wrapper-redux/wrapper';
import Store from 'thea-wrapper-redux/Store';
import StartScreen from 'components/StartScreen';
import GameScreen from 'components/GameScreen';

import makeStateWrapper from 'wrappers';
import { PLAYING } from 'state/constants';


const render = (attrs) => {
  const { state } = attrs;
  return (
    <view>
      <branch>
        <if test={state === PLAYING}>
          <GameScreen {...attrs} />
        </if>
        <default>
          <StartScreen {...attrs} />
        </default>
      </branch>
    </view>
  );
};

export default wrap()(view(render));
