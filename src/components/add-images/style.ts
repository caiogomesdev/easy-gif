import styled from 'styled-components';

export const OtherOptions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
`

export const Button = styled.button`
  transition: all .4s;
  background-color: #fcbf49;
  border: none;
  margin-left: 10px;
  padding: 3px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
  background-color: #f77f00;
  }
`

interface MoreParams {
  dragActive: boolean;
}

export const More = styled.h1<MoreParams>`
  border: ${props => props.dragActive ? 'solid 1px #219ebc' : 'dashed 1px #ddd'};
  border-radius: ${props => props.dragActive ? '5px': '0px'};
  padding: 40px 80px;
  text-align: center;
  cursor: pointer;
`
