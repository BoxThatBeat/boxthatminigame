import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  public totalMilliseconds = new BehaviorSubject<number>(0);
  public elapsedMilliseconds = new BehaviorSubject<number>(0);

  constructor() {
    var since = new Date();
    var now = new Date();

    // Assuming you count every 1/100th of a second
    setInterval(() => {
      now = new Date();
      this.totalMilliseconds.next(now.getTime() - since.getTime());
    }, 10)
   }

  getTotalMilliseconds(): Observable<any> {
    return this.totalMilliseconds.asObservable();
  }

  getElapsedMilliseconds(): Observable<any> {
    return this.elapsedMilliseconds.asObservable();
  }

  updateTotalCounter(): void {
    this.totalMilliseconds.next(this.totalMilliseconds.getValue() + this.elapsedMilliseconds.getValue());
    this.elapsedMilliseconds.next(0);
  }
}
