import view from 'thea';
import wrap from 'thea-wrapper-redux/wrapper';
import StartScreen from 'components/StartScreen';
import GameScreen from 'components/GameScreen';

import { PLAYING } from 'state/constants';


const render = (attrs) => {
  const { gameState } = attrs;
  return (
    <view>
      <branch>
        <if test={gameState === PLAYING}>
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
