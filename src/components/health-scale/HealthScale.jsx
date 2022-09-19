import styled from 'styled-components';
import Text from '../text/Text';

const HealthScale = ({ className, screenSide, playerHealth }) => {
  return (
    <HealthScaleStyle
      className={className}
      screenSide={screenSide}
      playerHealth={playerHealth}
    >
      <div className='scale'>
        <div className='scale-fill'></div>
        <Text className='health-numbers' text={`${playerHealth}/100`} />
      </div>
    </HealthScaleStyle>
  );
};

const HealthScaleStyle = styled.div`
  width: 100%;

  .scale {
    border: 0.01rem solid black;
    height: 1rem;
  }

  .scale-fill {
    width: ${({ playerHealth }) => playerHealth && playerHealth}%;
    height: 100%;
    padding: 0rem;
    border-right: 0.01rem solid black;
    background-color: rgba(27, 170, 73, 255);
    transition: width 1s;
  }

  .health-numbers {
    position: absolute;
    left: ${({ screenSide }) => screenSide === 'right' && 0};
    right: ${({ screenSide }) => screenSide === 'left' && 0};
    margin-top: 0.5rem;
    font-weight: bold;
  }
`;
export default HealthScale;
