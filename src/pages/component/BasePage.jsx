import styled from 'styled-components';
import Button from '../../components/button/Button';
import Text from '../../components/text/Text';
import { LARGE } from '../../utills/constants';

const BasePage = ({
  title,
  secondButtonText,
  onSecondButtonClicked = null,
  onStartNewGame,
}) => {
  return (
    <BasePageStyle>
      <Text text={title} fontSize={LARGE} fontWeight={800} />
      <div>
        <Button
          text='Start New Game'
          className='start-game-button'
          fontSize={LARGE}
          size={LARGE}
          onClick={onStartNewGame}
        />
        {onSecondButtonClicked && (
          <Button
            text={secondButtonText}
            className='start-game-button'
            fontSize={LARGE}
            size={LARGE}
            onClick={onSecondButtonClicked}
          />
        )}
      </div>
    </BasePageStyle>
  );
};

const BasePageStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 98vh;
  font-family: 'Passion One', cursive;

  .start-game-button {
    margin: 2rem;
    border: 0.2rem solid black;
    border-radius: 1rem;
  }
`;

export default BasePage;
