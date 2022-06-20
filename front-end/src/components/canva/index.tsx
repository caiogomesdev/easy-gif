import React, { useRef, useEffect } from 'react';

type Position = {
  x: number;
  y: number
}

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let context: CanvasRenderingContext2D | null = null;

  useEffect(()=> {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const width = 600;
    const height = 400
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.style.backgroundColor = `white`;

    context = canvas.getContext('2d');
  }, [])

  function loadFrame(){
    const image = new Image();
    //src teste, apagar depois
    image.src = process.env.REACT_APP_IMAGE as string;
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
      <button onClick={loadFrame}>TESTE</button><br />
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default App;
