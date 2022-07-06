import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../store';
import { Container, IconBtn } from './style';

type Position = {
  x: number;
  y: number
}

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [ context, setContext ] = useState<CanvasRenderingContext2D | null>(null);
  const images = useSelector((state: rootState ) => state.image);

  useEffect(() => {
    const x = bannerRef.current?.scrollWidth as number;
    bannerRef.current?.scrollTo(x, 0)
  }, [images]);

  useEffect(()=> {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const width = 600;
    const height = 400;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.style.backgroundColor = `white`;

    setContext(canvas.getContext('2d'));
  }, []);

  function loadFrame(index: number){
    const image = new Image();
    image.src = images.data[index];
    image.onload = function(){
      const ctx = context as CanvasRenderingContext2D;
      clearStage(ctx);
      const centerPosition = getCenterPositionAxis(image);
      ctx.drawImage(image, centerPosition.x , centerPosition.y);
    }
  }

  function clearStage(context: CanvasRenderingContext2D){
    const width = canvasRef.current?.width as number;
    const height = canvasRef.current?.height as number;
    context.clearRect(0,0,width,height);
  }

  function getCenterPositionAxis(image: HTMLImageElement): Position {
    const width = canvasRef.current?.width as number;
    const height = canvasRef.current?.height as number;
    return {
      x: width/2 - image.width/2,
      y: height/2 - image.height/2,
    }
  }

  return (
    <div>
      <Container ref={bannerRef}>
      {images.data.map((item, index) =>
        <IconBtn key={index}
        onClick={() => loadFrame(index)}>
          <img src={item} alt={`${index}`} />
        </IconBtn>)
        }
      </Container>
      <canvas ref={canvasRef}
      style={{ display: `${images.data.length ? '' : 'none'}` }}>
      </canvas>
    </div>
  )
}

export default App;
