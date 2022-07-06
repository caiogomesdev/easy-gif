import styled from 'styled-components';

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
export const IconBtn = styled.button`
  height: 100px;
  width: 100px;
  margin-right: 2px;
  cursor: pointer;

  & img {
  width: 90px;
  }
`
