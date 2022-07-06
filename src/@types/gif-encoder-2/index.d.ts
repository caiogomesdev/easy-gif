const gifEncoder = require('gif-encoder-2');

declare module 'gif-encoder-2' {
  interface ByteArray {
    getData(): Buffer
  }
  interface GifEncoderClass {
    /**
   * Create a new GIFEncoder
   * @param width the width of the images in pixels.
   * @param height the height of images in pixels.
   * @param algorithm `neuquant` or `octree`. `neuquant` if undefined.
   * @param useOptimizer enables/disables optimizer. `false` if undefined.
   * @param totalFrames total number of images. `0` if undefined.
   */
    new (
      width: number,
      height: number,
      algorithm?: 'octree' | 'neuquant',
      useOptimizer?: boolean,
      totalFrames?: number): GifEncoder;
    }
    export interface GifEncoder extends NodeJS.EventEmitter {
      /** Starts the encoder */
      start(): void;
      /** Adds a frame to the GIF
       * @param input Canvas Context
      */
      addFrame(input: CanvasRenderingContext2D): void;
      /** Number of milliseconds to display frame
       * @param ms time in milliseconds
      */
      setDelay(ms: number): void;
      /** Neuquant quality
       * @param quality number 1-30
       */
      setQuality(quality: number): void;
      /** Optimizer threshold percentage
       * @param threshold number 0-100
       */
      setThreshold(threshold: number): void;
      /** Number of loops GIF does
       * @param repeat number >= 0
       */
      setRepeat(repeat: number): void;
      /** Stops the encoder */
      finish(): void;
      out: ByteArray;
    }

    export default gifEncoder as GifEncoderClass;
}
