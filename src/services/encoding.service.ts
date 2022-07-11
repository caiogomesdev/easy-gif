
import { GifEncoder} from 'gif-encoder-2';

export class Encoding {
  constructor(private gitEncoder: GifEncoder){
    this.gitEncoder.start();
  }
  finish(): Buffer {
    return this.gitEncoder.out.getData();
  }
}
