import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../../store';
import { changeCurrentFrame } from '../../../store/image-store';
import { Container, Content, Row } from '../styles';
import { Button } from './styles';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const images = useSelector((state: rootState ) => state.image);
  const [ isPlay, setPlay ] = useState(false);
  const [ running, setRunning ] = useState(-1);

  function playPause(){
    if(!isPlay){
      setRunning(0);
    }else{
      setRunning(-1);
    }
    setPlay(!isPlay);
  }

  useEffect(() => {
    console.log('frame');
    if(isPlay){
      const frame = (images.currentIndex + 1) % images.data.length;
      dispatch(changeCurrentFrame(frame));
      setTimeout(() => {
        setRunning(running + 1);
      }, images.interval);
    }
  },[running])

  return (
    <Container>
      <Row>

          <h3>
          frame {images.currentIndex + 1} of {images.length}
          </h3>
        <Content>
        <Button>
          <i className="bi bi-cloud-arrow-down-fill"></i>

        </Button>
          <Button onClick={playPause}>
            { isPlay ?
            <i className="bi bi-pause-fill"></i> :
            <i className="bi bi-play-fill"></i> }
          </Button>
        </Content>
      </Row>
    </Container>
  )
}

export default App;
