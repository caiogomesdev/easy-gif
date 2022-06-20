import React, { useRef, useEffect } from 'react';

type position = {
  x: number;
  y: number
}

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let context: CanvasRenderingContext2D | null = null;

  useEffect(()=> {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const size = 400
    canvas.width = size;
    canvas.height = size;
    canvas.style.backgroundColor = `white`;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    context = canvas.getContext('2d') as CanvasRenderingContext2D;
  }, [])
  function loadFrame(){
    const image = new Image()
    //src teste, apagar depois
    image.src = process.env.REACT_APP_IMAGE as string;
    image.onload = function(){
      const ctx = context as CanvasRenderingContext2D
      ctx.clearRect(0,0,400,400);

      const centerPosition = GetCenterPositionAxis(image);
      ctx.drawImage(image, centerPosition.x , centerPosition.y);
    }
  }

  function GetCenterPositionAxis(image: HTMLImageElement): position {
    const width = canvasRef.current?.width as number;
    const height = canvasRef.current?.width as number;
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
