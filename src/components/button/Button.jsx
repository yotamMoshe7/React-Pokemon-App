import styled from 'styled-components';
import { LARGE, MEDIUM, SMALL } from '../../utills/constants';

const Button = ({ text, size, weight, onClick, className }) => {
  return (
    <ButtonStyle
      size={size}
      weight={weight}
      onClick={onClick}
      className={className}
    >
      {text}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button`
  width: ${({ size }) =>
    size === LARGE ? 14 : size === MEDIUM ? 6 : size === SMALL ? 4 : 6}rem;
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '800')};
  font-size: ${({ size }) =>
    size === LARGE ? 2 : size === MEDIUM ? 1 : size === SMALL ? 0.5 : 1}rem;
  padding: 1rem;
`;

export default Button;
