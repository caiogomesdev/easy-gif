import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rootState } from '../../store';
import { Container, IconBtn, ButtonDelete } from './style';
import { changeCurrentFrame, removeFrame } from '../../store/image-store';
import { getCenterPositionAxis, size } from '../../utils';
import OptionsTop from '../options/top';
import OptionsDown from '../options/down';

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [ context, setContext ] = useState<CanvasRenderingContext2D | null>(null);
  const images = useSelector((state: rootState ) => state.image);
  const resolution = useSelector((state: rootState ) => state.resolution);
  const dispatch = useDispatch();

  useEffect(() => {
    const x = bannerRef.current?.scrollWidth as number;
    bannerRef.current?.scrollTo(x, 0)

    const index = images.currentIndex;
    loadFrame(index);
  }, [images]);

  useEffect(() => {
    changeCanvasResolution();
  }, [resolution])

  useEffect(()=> {
    const canvas = canvasRef.current as HTMLCanvasElement;
    canvas.style.backgroundColor = `white`;
    setContext(canvas.getContext('2d'));
  }, []);

  function changeCanvasResolution(){
    const canvas = canvasRef.current as HTMLCanvasElement;
    const width = resolution.width;
    const height = resolution.height;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${size.widthDefault}px`;
    canvas.style.height = `${size.widthDefault * (height/width)}px`;
    loadFrame(images.currentIndex);
  }

  function loadFrame(index: number){
    const image = new Image();
    image.src = images.data[index]?.image;
    image.onload = function(){
      const ctx = context as CanvasRenderingContext2D;
      clearStage(ctx);
      const scale = images.data[index]?.scale;
      const width = image.width * scale;
      const height = image.height * scale;
      const centerPosition = getCenterPositionAxis(
        {
          width: image.width,
          height: image.height
        },
        {
          width: resolution.width,
          height: resolution.height
        }, scale);
      ctx.drawImage(image, centerPosition.x , centerPosition.y, width, height);
    }
    dispatch(changeCurrentFrame(index))
  }

  function clearStage(context: CanvasRenderingContext2D){
    const width = canvasRef.current?.width as number;
    const height = canvasRef.current?.height as number;
    context.clearRect(0,0,width,height);
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
    dispatch(removeFrame(images.currentIndex));
  }

  return (
    <div style={{position: 'relative'}}>
      <Container ref={bannerRef} onWheel={handleWheel}>
      {images.data.map((item, index) =>
        <IconBtn key={index}
        onClick={() => loadFrame(index)}
        frameActual={images.currentIndex === index}
        >
          <img src={item.image} alt={`${index}`} />
        </IconBtn>)
        }
      </Container >
      <div
      style={
        { display: `${images.data.length ? '' : 'none'}` }}>

      <div style={{padding: '8px 0'}}>
        <OptionsTop images={images} currentFrame={images.currentIndex}/>
      </div>
      <ButtonDelete onClick={() => deleteFrame()}>X</ButtonDelete>
      <canvas ref={canvasRef}></canvas>
      <OptionsDown />
      </div>

    </div>
  )
}

export default App;
