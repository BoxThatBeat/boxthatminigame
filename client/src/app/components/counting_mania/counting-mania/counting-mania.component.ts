import { Component, OnInit } from '@angular/core';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'counting-mania',
  templateUrl: './counting-mania.component.html',
  styleUrls: ['./counting-mania.component.css']
})
export class CountingManiaComponent implements OnInit {

  constructor(private timerService: TimerService) { }

  ngOnInit(): void {
  }

  onStartTimer() {
    this.timerService.startTimer();
  }

  onPauseTimer() {
    this.timerService.pauseTimer();
  }

  onAddToTotal() {
    this.timerService.addElapsedToTotal();
  }
}
