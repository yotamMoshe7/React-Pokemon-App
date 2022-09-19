import BasePage from '../component/BasePage';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GAME_PAGE_ROUTE } from '../../utills/constants';

const WelcomePage = () => {
  const navigate = useNavigate();

  const startGame = useCallback(() => {
    navigate(GAME_PAGE_ROUTE);
  }, [navigate]);

  return (
    <BasePage
      title='Welcome To Pokemon Battle App'
      onStartNewGame={startGame}
    />
  );
};

export default WelcomePage;
