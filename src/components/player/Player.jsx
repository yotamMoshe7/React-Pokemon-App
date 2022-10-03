import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { PLAYER_ID } from '../../utills/constants';
import HealthScale from '../health-scale/HealthScale';
import Text from '../text/Text';

// ----------- Component Description -----------
// Each player component can only tell if he lost
// when his health get to 0.
// So in case the player component is an opponent,
// health equal to 0 means player win.
// On the other hand, if the player component is
// the main player,and the health equal to 0, it
// means game over.

const Player = ({
  id,
  title,
  screenSide,
  image,
  diceNum,
  onGameOver,
  onGameWin,
}) => {
  const [playerHealth, setPlayerHealth] = useState(100);
  const enableDecrease = useRef(true);

  // Avoid infinitie loops in second useEffect
  useEffect(() => {
    enableDecrease.current = true;
  }, [diceNum]);

  useEffect(() => {
    if (diceNum && enableDecrease.current) {
      if (id === PLAYER_ID) {
        setPlayerHealth(playerHealth - diceNum.opponentDice);
      } else if (id !== PLAYER_ID) {
        setPlayerHealth(playerHealth - diceNum.playerDice);
      }
    }
    enableDecrease.current = false;
  }, [diceNum, playerHealth, id]);

  // Check if player health get to 0
  useEffect(() => {
    if (playerHealth <= 0 && id === PLAYER_ID) {
      onGameOver();
      setPlayerHealth(100);
    } else if (playerHealth <= 0 && id !== PLAYER_ID) {
      onGameWin();
      setPlayerHealth(100);
    }
  }, [playerHealth, id, onGameOver, onGameWin]);

  return (
    <PlayertStyle screenSide={screenSide}>
      <Text text={title} fontWeight={800} className='player-title' />
      <HealthScale
        className='health-scale'
        screenSide={screenSide}
        playerHealth={playerHealth}
      />
      <img alt='pokemon' className='image' src={image} />
    </PlayertStyle>
  );
};

const PlayertStyle = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 20rem;

  .player-title {
    position: absolute;
    left: ${({ screenSide }) => screenSide === 'left' && 0};
    right: ${({ screenSide }) => screenSide === 'right' && 0};
  }

  .health-scale {
    margin-top: 3rem;
    position: absolute;
    width: 80%;
    left: ${({ screenSide }) => screenSide === 'right' && 0};
    right: ${({ screenSide }) => screenSide === 'left' && 0};
  }

  .image {
    position: absolute;
    bottom: 0rem;
    width: 15rem;
    left: ${({ screenSide }) => screenSide === 'left' && 0};
    right: ${({ screenSide }) => screenSide === 'right' && 0};
  }
`;

export default Player;
