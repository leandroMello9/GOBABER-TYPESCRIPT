import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signUpBackGround from '../../assets/sigin-up-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  margin-top: 70px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  place-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromRigth = keyframes`
    from {
      opacity: 0;
      transform: translateX(50px);
    },
    to{
      opacity: 1;
      transform: translateX(0);
    }
`;
export const AnimationContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  animation: ${appearFromRigth} 1s;
  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;
export const BackGround = styled.div`
  flex: 1;
  background: url(${signUpBackGround}) no-repeat;
  background-size: cover;
`;
