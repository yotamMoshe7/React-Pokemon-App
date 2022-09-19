import styled from 'styled-components';
import Text from '../text/Text';

const Score = ({ win, lost, pokemonName }) => {
  return (
    <ScoreStyle>
      <Text text={`Score with: ${pokemonName}:`} className='score-title' />
      <Text text={`Win: ${win}`} />
      <Text text={`Lost: ${lost}`} />
    </ScoreStyle>
  );
};

const ScoreStyle = styled.div`
  position: absolute;
  left: 0rem;
  bottom: 0rem;
  border: 0.1rem solid black;
  padding: 1rem;

  .score-title {
    font-family: 'Passion One', cursive;
  }
`;

export default Score;
