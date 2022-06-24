import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertType } from 'src/app/models/alert-type.model';

import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css']
})
export class AlertBoxComponent implements OnDestroy, OnInit {

  private subscription: Subscription = new Subscription();
  message: any;

  @Input() alertType: AlertType = AlertType.Main;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.subscription = this.alertService.getAlert(this.alertType)
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
    this.alertService.clear(this.alertType);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
