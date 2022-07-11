
import gifEncoder,{ GifEncoder } from 'gif-encoder-2';
import { createCanvas } from 'canvas';

import { Frame } from '../components/contracts';
import { getCenterPositionAxis } from '../utils';

export class EncodingService {
  gitEncoder: GifEncoder | null = null
  frames: Frame[] = []
  interval = 1000
  width = 0
  height = 0
  constructor({ width, height, frames, interval}: EncodingService.Params){
    this.gitEncoder = new gifEncoder(width, height);
    this.frames = frames;
    this.interval = interval;
    this.gitEncoder.setDelay(interval);
    this.gitEncoder.start();
    this.width = width;
    this.height = height;
  }
  async init(){
    await this.setFrames()
  }
  async setFrames(){
    const canvas = createCanvas(this.width,this.height);
    const context = canvas.getContext('2d')
    for(const frame of this.frames){
      await new Promise(resolve => {
        const image = new Image();
        image.src = frame.image;
        image.onload = () => {
          context.clearRect(0,0,this.width,this.height)
          context.fillStyle = '#fff';
          context.fillRect(0,0,this.width,this.height );

          const widthImage = image.width * frame.scale;
          const heightImage = image.height * frame.scale;

          const centerPosition = getCenterPositionAxis(
            {
              width: image.width,
              height: image.height
            },
            {
              width: this.width,
              height: this.height
            }, frame.scale);

          context.drawImage(image, centerPosition.x, centerPosition.y, widthImage, heightImage)
          resolve(this.gitEncoder?.addFrame(context))
      }})
      }
    }
  finish(): Buffer {
    this.gitEncoder?.finish();
    return (this.gitEncoder as GifEncoder).out.getData();
  }
}

export namespace EncodingService{
  export type Params = {
    frames: Frame[],
    interval: number,
    width: number,
    height: number,
  }
}
