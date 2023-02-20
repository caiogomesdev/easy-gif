import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EncodingService } from '../../../services/encoding.service';
import { rootState } from '../../../store';
import { changeCurrentFrame } from '../../../store/image-store';
import { Container, Content, Row } from '../styles';
import { Button } from './styles';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const images = useSelector((state: rootState) => state.image);
  const resolution = useSelector((state: rootState) => state.resolution);
  const [isPlay, setPlay] = useState(false);
  const [running, setRunning] = useState(-1);

  function playPause() {
    if (!isPlay) {
      setRunning(0);
    } else {
      setRunning(-1);
    }
    setPlay(!isPlay);
  }

  async function download() {
    const params = {
      width: resolution.width,
      height: resolution.height,
      interval: images.interval,
      frames: images.data,
    };
    const encodingService = new EncodingService(params);
    await encodingService.init();
    const buffer = encodingService.finish();

    const base64String = Buffer.from(buffer.buffer).toString('base64');
    const url = `data:image/gif;base64,${base64String}`;

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `meugif.gif`);
    document.body.appendChild(link);
    link.click();

    dispatch(changeCurrentFrame(images.length - 1));
  }

  useEffect(() => {
    if (isPlay) {
      const frame = (images.currentIndex + 1) % images.data.length;
      dispatch(changeCurrentFrame(frame));
      setTimeout(() => {
        setRunning(running + 1);
      }, images.interval);
    }
  }, [running]);

  return (
    <Container>
      <Row>
        <h3>
          frame {images.currentIndex + 1} of {images.length}
        </h3>
        <Content>
          <Button onClick={download}>
            <i className="bi bi-cloud-arrow-down-fill"></i>
          </Button>
          <Button onClick={playPause}>
            {isPlay ? (
              <i className="bi bi-pause-fill"></i>
            ) : (
              <i className="bi bi-play-fill"></i>
            )}
          </Button>
        </Content>
      </Row>
    </Container>
  );
};

export default App;
