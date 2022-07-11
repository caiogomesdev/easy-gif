import styled from 'styled-components';

export const Button = styled.button`
  border-radius: 40%;
  position: relative;
  padding: 15px;
  transition: ease-in-out .2s;
  cursor: pointer;
  & i {
    font-size: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  &:hover{
    background-color: #ddd;
  }
`
