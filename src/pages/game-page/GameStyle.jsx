import styled from 'styled-components';

export const GameStyled = styled.div`
  display: flex;
  margin-top: 5rem;
  justify-content: center;

  .app-wrapper {
    width: 60rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .game-wrapper {
    margin-top: 2rem;
    height: 28rem;
    width: 100%;
    position: relative;
  }

  .game-title {
    font-family: 'Passion One', cursive;
  }

  .player-wrapper {
    width: 18rem;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
  }

  .left.player-wrapper {
    left: 0rem;
  }

  .right.player-wrapper {
    right: 0rem;
    top: 0rem;
  }

  .center-screen-wrapper {
    display: flex;
    flex-direction: column;
    width: 14rem;
    margin: auto auto;
    text-align: left;
  }

  .dices-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    display: flex;
  }

  .dices-text-wrapper {
    height: 4rem;
  }

  .attack-button-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .attack-button {
    margin-top: 2rem;
    border: 0.1rem solid black;
    font-family: 'Passion One', cursive;
  }
`;
