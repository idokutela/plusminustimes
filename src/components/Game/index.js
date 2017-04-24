import view from 'thea';
import StartScreen from 'components/StartScreen';
import GameScreen from 'components/GameScreen';

import makeStateWrapper from 'wrappers';
import { PLAYING } from 'state/constants';
import reducer from 'state/reducer';


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

export default makeStateWrapper(reducer)(view(render));
