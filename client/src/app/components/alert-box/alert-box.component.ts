import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css']
})
export class AlertBoxComponent implements OnDestroy {

  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService) {
    this.subscription = this.alertService.getAlert()
      .subscribe(message => {
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'is-success';
            message.header = 'success'
            break;
          case 'error':
            message.cssClass = 'is-danger';
            message.header = 'Error'
            break;
        }

        this.message = message;
      });
   }

  onMessageCloseClick() {
    this.alertService.clear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
