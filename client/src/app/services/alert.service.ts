import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AlertType } from '../models/alert-type.model';

@Injectable({ providedIn: 'root' })
export class AlertService {

    private modalAlert = new Subject<any>();
    private mainAlert = new Subject<any>();

    constructor() {}

    getAlert(alertType: AlertType): Observable<any> {
      switch(alertType) {
        case AlertType.Main:
          return this.mainAlert.asObservable();
        case AlertType.Modal:
          return this.modalAlert.asObservable();
      }
        
    }

    writeSuccess(message: String, alertType: AlertType) {
      switch(alertType) {
        case AlertType.Main:
          this.mainAlert.next({ type: 'success', text: message });
          break;
        case AlertType.Modal:
          this.modalAlert.next({ type: 'success', text: message });
          break;
      }

      //setTimeout( () => {this.clear(alertType);}, 3000);
    }

    writeError(message: string, alertType: AlertType) {
      switch(alertType) {
        case AlertType.Main:
          this.mainAlert.next({ type: 'error', text: message });
          break;
        case AlertType.Modal:
          this.modalAlert.next({ type: 'error', text: message });
          break;
      }

      //setTimeout( () => {this.clear(alertType);}, 7000); TODO: determine if a delayed removal of altert is good UI
    }

    clear(alertType: AlertType) {
      switch(alertType) {
        case AlertType.Main:
          this.mainAlert.next(null);
          break;
        case AlertType.Modal:
          this.modalAlert.next(null);
          break;
      }
    }
}
