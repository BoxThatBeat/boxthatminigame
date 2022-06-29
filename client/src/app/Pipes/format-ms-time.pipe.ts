import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'mstime' })
export class FormatMsTime implements PipeTransform{

  private divmod = (x: number, y: number) => [Math.floor(x / y), x % y];

  public transform(ms:number) {

    if (ms === 0) {
      return '00:00:000';
    }

    var seconds = 0;
    var milliseconds = 0;
    var minutes = 0;
    var result = [];
    
    result = this.divmod(ms, 1000);
    seconds = result[0];
    milliseconds = result[1];

    result = this.divmod(seconds, 60);
    minutes = result[0];
    seconds = result[1];

    return minutes.toString().padStart(2, '0') + ':' 
         + seconds.toString().padStart(2, '0') + ':' 
         + milliseconds.toString().padStart(3, '0');
  }
}