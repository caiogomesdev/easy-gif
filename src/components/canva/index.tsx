import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rootState } from '../../store';
import { Container, IconBtn, ButtonDelete, Canvas } from './style';
import { removeFrame, changeScale } from '../../store/image-store';
import { size } from '../../utils';

type Position = {
  x: number;
  y: number
}

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [ context, setContext ] = useState<CanvasRenderingContext2D | null>(null);
  const [ currentFrame, setCurrentFrame ] = useState(0);
  const images = useSelector((state: rootState ) => state.image);
  const dispatch = useDispatch();

  useEffect(() => {
    const x = bannerRef.current?.scrollWidth as number;
    bannerRef.current?.scrollTo(x, 0)

    const index = images.currentIndex;
    loadFrame(index);
  }, [images]);

  useEffect(()=> {
    const canvas = canvasRef.current as HTMLCanvasElement;
    canvas.width = size.width;
    canvas.height = size.height;
    canvas.style.backgroundColor = `white`;

    setContext(canvas.getContext('2d'));
  }, []);

  function loadFrame(index: number){
    const image = new Image();
    image.src = images.data[index]?.image;
    image.onload = function(){
      const ctx = context as CanvasRenderingContext2D;
      clearStage(ctx);
      const scale = images.data[index]?.scale;
      const width = image.width * scale;
      const height = image.height * scale;
      const centerPosition = getCenterPositionAxis(image, scale);
      ctx.drawImage(image, centerPosition.x , centerPosition.y, width, height);
    }
    console.log(index)
    setCurrentFrame(index);
  }

  function clearStage(context: CanvasRenderingContext2D){
    const width = canvasRef.current?.width as number;
    const height = canvasRef.current?.height as number;
    context.clearRect(0,0,width,height);
  }

  function getCenterPositionAxis(image: HTMLImageElement, scale: number): Position {
    return {
      x: size.width/2 - (image.width * scale)/2,
      y: size.height/2 - (image.height * scale)/2,
    }
  }

  function handleWheel(event: React.WheelEvent<HTMLDivElement>){
    const velocity = 2;
    const direction = event.deltaY;
    bannerRef.current?.scrollTo({
      left: bannerRef.current?.scrollLeft + direction * velocity,
      behavior: 'smooth'
    })
  }

  function deleteFrame(){
    dispatch(removeFrame(currentFrame));
  }

  return (
    <div style={{position: 'relative'}}>
      <Container ref={bannerRef} onWheel={handleWheel}>
      {images.data.map((item, index) =>
        <IconBtn key={index}
        onClick={() => loadFrame(index)}
        frameActual={currentFrame === index}
        >
          <img src={item.image} alt={`${index}`} />
        </IconBtn>)
        }
      </Container >
      <div
      style={
        { display: `${images.data.length ? '' : 'none'}` }}>

<ButtonDelete
      onClick={() => deleteFrame()}>X</ButtonDelete>
      <Canvas ref={canvasRef}></Canvas>
      <br />
      <input
      type="range"
      style={
        { width: '100%' }}
      value={images?.data[currentFrame]?.scale}
      max={5}
      step="0.0001"
      onChange={(ev) =>
        dispatch(changeScale(
        {
          index: currentFrame,
          value: +ev.target.value
        }
        ))}/>
      </div>

    </div>
  )
}

export default App;
