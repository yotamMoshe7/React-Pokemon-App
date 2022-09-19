import React from 'react';
import styled from 'styled-components';
import { LARGE } from '../../utills/constants';
import Text from '../text/Text';

const Dice = ({ num }) => {
  return (
    <DiceStyle>
      <Text text={num} fontWeight={800} fontSize={LARGE} />
    </DiceStyle>
  );
};

const DiceStyle = styled.div`
  border: 0.1rem solid black;
  height: 5rem;
  width: 5rem;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Dice;
