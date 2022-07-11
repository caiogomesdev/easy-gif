import styled from 'styled-components';

interface IContainer{
  imagesLenght: number;
}
export const Container = styled.div<IContainer>`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${props => props.imagesLenght ? '' : 'center'};
  margin-top: ${props => props.imagesLenght ? '5' : '0'}rem;
`

export const MyGif = styled.h1`
  margin-bottom: 10px;
  position: relative;
`
