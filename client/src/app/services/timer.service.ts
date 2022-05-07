import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  public totalMilliseconds = new BehaviorSubject<number>(0);
  public elapsedMilliseconds = new BehaviorSubject<number>(0);

  private totalMsIntervalId: any;

  constructor() {}

  public startTimer(): void {
    var since = new Date();
    var now = new Date();
    this.totalMsIntervalId = setInterval(() => {
      now = new Date();
      this.elapsedMilliseconds.next(now.getTime() - since.getTime());
    }, 1)
  }

  public pauseTimer(): void {
    clearInterval(this.totalMsIntervalId);
  }

  public continueTimer(): void {

  }

  public resetTimer(): void {

  }

  public addElapsedToTotal(): void {
    this.totalMilliseconds.next(this.totalMilliseconds.getValue() + this.elapsedMilliseconds.getValue());
    this.elapsedMilliseconds.next(0);
  }
}
