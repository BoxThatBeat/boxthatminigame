import { Component, OnInit } from '@angular/core';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  totalTimerDisplay: string = '00:00:000';
  elapsedTimerDisplay: string = '00:00:000';

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
    this.timerService.totalMilliseconds.subscribe( milliseconds => {
      this.totalTimerDisplay = this.msToTimerString(milliseconds);
    });
    this.timerService.elapsedMilliseconds.subscribe( milliseconds => {
      this.elapsedTimerDisplay = this.msToTimerString(milliseconds);
    });
  }

  private getMinutes(milliseconds:number) {
    return Math.round((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  }

  private getSeconds(milliseconds:number) {
    return Math.round( ((milliseconds % (1000 * 60 * 60)) % (1000 * 60) / 1000) );
  }

  private getMilliseconds(milliseconds:number) {
    return Math.round( ((milliseconds % (1000 * 60 * 60)) % (1000 * 60)) );
  }

  private msToTimerString(ms:number) {
    const divmod = (x: number, y: number) => [Math.floor(x / y), x % y];
    var seconds = 0;
    var milliseconds = 0;
    var minutes = 0;
    var result = [];
    
    result = divmod(ms, 1000);
    seconds = result[0];
    milliseconds = result[1];

    result = divmod(seconds, 60);
    minutes = result[0];
    seconds = result[1];

    return minutes.toString().padStart(2, '0') + ':' 
         + seconds.toString().padStart(2, '0') + ':' 
         + milliseconds.toString().padStart(3, '0');
  }

}
