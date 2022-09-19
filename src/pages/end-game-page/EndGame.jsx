import BasePage from '../component/BasePage';

const EndGame = ({ message, onContinueGame, onStartNewGame }) => {
  return (
    <BasePage
      title={message}
      secondButtonText='Continue Game'
      onSecondButtonClicked={onContinueGame}
      onStartNewGame={onStartNewGame}
    />
  );
};

export default EndGame;
