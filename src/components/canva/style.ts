import styled from 'styled-components';

interface IIConBtn {
  frameActual: boolean;
}

export const Container = styled.div`
  width: 600px;
  display: flex;
  overflow-y: hidden;

  &::-webkit-scrollbar{
    width: 100%;
  }

  &::-webkit-scrollbar-track {
  background-color: #43474d;
  border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #134074;
  border-radius: 100vw;
  }
`

export const IconBtn = styled.button<IIConBtn>`
  height: 100px;
  width: 100px;
  margin-right: 3px;
  position: relative;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  & img {
    width: 90px;
  }
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border: ${ props => props.frameActual ? 'solid 5px #0077B6' : '' };
    border-radius: 3px;
  }
`

export const ButtonDelete = styled.button`
  position: absolute;
  width: 40px;
  height: 40px;
  right: 0px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: ease-in-out .2s;
  background-color: #fe938c;
  border-radius: 0 0 20% 20%;
  color: #fff;
  &:hover {
    background-color: #f38375;
  }
`
