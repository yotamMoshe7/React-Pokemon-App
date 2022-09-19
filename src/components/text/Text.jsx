import styled from 'styled-components';
import {
  LARGE,
  LARGE_TEXT_SIZE,
  MEDIUM,
  MEDIUM_TEXT_SIZE,
  SMALL,
  SMALL_TEXT_SIZE,
} from '../../utills/constants';

const Text = ({ text, fontSize, fontWeight, className }) => {
  return (
    <TextStyle
      fontSize={fontSize}
      fontWeight={fontWeight}
      className={className}
    >
      {text}
    </TextStyle>
  );
};

const TextStyle = styled.div`
  font-size: ${({ fontSize }) =>
    fontSize === LARGE
      ? LARGE_TEXT_SIZE
      : fontSize === MEDIUM
      ? MEDIUM_TEXT_SIZE
      : fontSize === SMALL
      ? SMALL_TEXT_SIZE
      : MEDIUM_TEXT_SIZE}rem;
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '500')};
`;

export default Text;
