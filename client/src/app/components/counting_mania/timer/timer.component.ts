import { Component, OnInit } from '@angular/core';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  totalTimerDisplay: number = 0;
  elapsedTimerDisplay: number = 0;

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
    this.timerService.totalMilliseconds.subscribe( milliseconds => {
      this.totalTimerDisplay = milliseconds;
    });
    this.timerService.elapsedMilliseconds.subscribe( milliseconds => {
      this.elapsedTimerDisplay = milliseconds;
    });
  }

}
