import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & input[type=number] {
    width: 3.1rem;
    margin-left: 5px;
    text-align: center;
  }
`
