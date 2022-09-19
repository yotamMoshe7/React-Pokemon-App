import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GamePage from './pages/game-page/Game';
import WelcomePage from './pages/welcome-page/Welcome';
import { GAME_PAGE_ROUTE, WELCOME_PAGE_ROUTE } from './utills/constants';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path={WELCOME_PAGE_ROUTE} element={<WelcomePage />} />
        <Route exact path={GAME_PAGE_ROUTE} element={<GamePage />} />
      </Routes>
    </Router>
  );
};

export default App;
