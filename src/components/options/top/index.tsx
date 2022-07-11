import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { rootState } from '../../../store';
import { changeInterval, changeScale, IState } from '../../../store/image-store';
import { changeHeight, changeWidth } from '../../../store/resolution-store';
import { Container, Content, Row } from '../styles';
import { Range } from './styles';

interface Props {
  images: IState,
  currentFrame: number
}
const App: React.FC<Props> = ({images, currentFrame}) => {
  const dispatch = useDispatch();
  const resolution = useSelector((state: rootState ) => state.resolution);

  return (
    <Container>
      <Row>
        <Content>
          Scale:
        <Range
          type="range"
          value={images?.data[currentFrame]?.scale || 0}
          max={5}
          step="0.01"
          onChange={(ev) =>
            dispatch(changeScale({index: currentFrame, value: +ev.target.value}))
            }/>
        <input type="number"
          value={images?.data[currentFrame]?.scale || 0}
          step="0.1"
          onChange={(ev)=> dispatch(changeScale({index: currentFrame, value: +ev.target.value}))}
          />
        </Content>
        <Content>
          Interval: <input type="number"
          step="1"
          value={images.interval}
          onChange={(ev) => dispatch(changeInterval(Math.floor(+ev.target?.value)))} />
        </Content>
        <Content>
          Resolution: <input type="number"
          value={resolution.width}
          step="1"
          onChange={(ev)=> dispatch(changeWidth(Math.floor(+ev.target?.value)))}
          />
          <input type="number"
          value={resolution.height}
          step="1"
          onChange={(ev)=> dispatch(changeHeight(Math.floor(+ev.target?.value)))}
          />
        </Content>
      </Row>
    </Container>
  )
}

export default App;

