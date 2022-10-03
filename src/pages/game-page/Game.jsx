import { useCallback, useEffect, useRef, useState } from 'react';
import Button from '../../components/button/Button';
import Dice from '../../components/dice/Dice';
import Text from '../../components/text/Text';
import Player from '../../components/player/Player';
import {
  BASE_URL,
  LARGE,
  MAX_POKEMON,
  OPPONENT_ID,
  PLAYER_ID,
} from '../../utills/constants';
import axios from 'axios';
import { getRandomNumber } from '../../utills/utility';
import { GameStyled } from './GameStyle';
import EndGame from '../end-game-page/EndGame';
import Score from '../../components/score/Score';
import Loader from '../../loader/Loader';

const emptyDiceObj = {
  playerDice: null,
  opponentDice: null,
};

const emptyPokemonImagesObj = {
  playerImage: '',
  opponentImage: '',
};

const emptyScoreObj = {
  win: 0,
  lost: 0,
};

const GamePage = () => {
  const [gameSessionEnd, setGameSessionEnd] = useState(false);
  const [message, setGameMessage] = useState('');
  const [playerPokemonName, setPlayerPokemonNames] = useState('');
  const [pokemonImages, setPokemonImages] = useState(emptyPokemonImagesObj);
  const [dicesNum, setDicesNum] = useState(emptyDiceObj);
  const [score, setScore] = useState(emptyScoreObj);
  const [loader, setLoader] = useState(false);
  const pokemonsArray = useRef([]);

  const attackButtonClicked = useCallback(() => {
    const playerEnableRollDice = dicesNum.opponentDice !== 6;
    const oponnentEnableRollDice = dicesNum.playerDice !== 6;

    setDicesNum({
      playerDice: playerEnableRollDice ? getRandomNumber(1, 6) : null,
      opponentDice: oponnentEnableRollDice ? getRandomNumber(1, 6) : null,
    });
  }, [dicesNum]);

  const selectPokemon = useCallback(() => {
    const randomNum = getRandomNumber(1, MAX_POKEMON);
    return pokemonsArray.current[randomNum].name;
  }, []);

  const getPokemonImage = useCallback(async (pokemonName) => {
    try {
      const response = await axios.get(`${BASE_URL}/${pokemonName}/`);

      return response.data.sprites.front_default;
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Generate 2 pokemon image in first app render
  useEffect(() => {
    function fetchPokemonData() {
      try {
        setLoader(true);

        // Display pokadur loader for 2 sec
        setTimeout(async () => {
          const response = await axios.get(`${BASE_URL}?limit=${MAX_POKEMON}`);

          pokemonsArray.current = response.data.results;

          // Get player and opponent pokemon name and image
          const playerPokemonName = selectPokemon();
          const opponentPokemonName = selectPokemon();

          setPlayerPokemonNames(playerPokemonName);

          setPokemonImages({
            playerImage: await getPokemonImage(playerPokemonName),
            opponentImage: await getPokemonImage(opponentPokemonName),
          });
          setLoader(false);
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPokemonData();
  }, [selectPokemon, getPokemonImage]);

  const onGameOver = useCallback(
    (id) => {
      setScore({
        ...score,
        lost: score.lost + 1,
      });
      setGameSessionEnd(true);
      setGameMessage('Game Over');
    },
    [score]
  );

  const onGameWin = useCallback(() => {
    setScore({
      ...score,
      win: score.win + 1,
    });
    setGameSessionEnd(true);
    setGameMessage('You Win!');
  }, [score]);

  const endGameSession = useCallback(
    (playerPokemonName, opponentPokemonName) => {
      setLoader(true);
      setGameSessionEnd(false);
      setDicesNum(emptyDiceObj);

      // Display pokadur loader for 2 sec
      setTimeout(async () => {
        setPokemonImages({
          playerImage: await getPokemonImage(playerPokemonName),
          opponentImage: await getPokemonImage(opponentPokemonName),
        });
        setLoader(false);
      }, 2000);
    },
    [getPokemonImage]
  );

  const onNewGameClicked = useCallback(async () => {
    setScore(emptyScoreObj);

    const playerPokemonName = selectPokemon();
    const opponentPokemonName = selectPokemon();

    setPlayerPokemonNames(playerPokemonName);

    endGameSession(playerPokemonName, opponentPokemonName);
  }, [endGameSession, selectPokemon]);

  const onContinueGameClicked = useCallback(async () => {
    const opponentPokemonName = selectPokemon();
    endGameSession(playerPokemonName, opponentPokemonName);
  }, [endGameSession, playerPokemonName, selectPokemon]);

  if (!gameSessionEnd) {
    return (
      <GameStyled>
        <div className='app-wrapper'>
          <Text
            text='Pokemon Battle Simulator'
            fontSize={LARGE}
            className='game-title'
          />
          <div className='game-wrapper'>
            <div className='left player-wrapper'>
              {!loader ? (
                <Player
                  id={PLAYER_ID}
                  title='Player'
                  screenSide='left'
                  image={pokemonImages.playerImage}
                  diceNum={dicesNum}
                  onGameOver={onGameOver}
                />
              ) : (
                <Loader />
              )}
            </div>
            <div className='center-screen-wrapper'>
              <div className='dices-wrapper'>
                <Dice num={dicesNum.playerDice} />
                <Dice num={dicesNum.opponentDice} />
              </div>
              <div className='dices-text-wrapper'>
                <Text
                  text={
                    dicesNum.playerDice
                      ? `You hit for ${dicesNum.playerDice}`
                      : ''
                  }
                  fontWeight={800}
                />
                <Text
                  text={
                    dicesNum.opponentDice
                      ? `Your oponent hit ${dicesNum.opponentDice}`
                      : ''
                  }
                  fontWeight={800}
                />
              </div>

              <div className='attack-button-wrapper'>
                <Button
                  text='Attack!'
                  onClick={attackButtonClicked}
                  className='attack-button'
                  size={LARGE}
                />
              </div>
            </div>
            <div className='right player-wrapper'>
              {!loader ? (
                <Player
                  id={OPPONENT_ID}
                  title='Opponent'
                  screenSide='right'
                  image={pokemonImages.opponentImage}
                  diceNum={dicesNum}
                  onGameWin={onGameWin}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
          {!loader ? (
            <Score
              win={score.win}
              lost={score.lost}
              pokemonName={playerPokemonName}
            />
          ) : null}
        </div>
      </GameStyled>
    );
  } else {
    return (
      <EndGame
        message={message}
        onContinueGame={onContinueGameClicked}
        onStartNewGame={onNewGameClicked}
      />
    );
  }
};

export default GamePage;
