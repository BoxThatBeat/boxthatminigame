import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({    
  providedIn: 'root'    
})  
export class ModalService {

  private modalOpenedSource = new Subject<string>();
  private modalClosedSource = new Subject<string>();

  modalOpened = this.modalOpenedSource.asObservable();
  modalClosed = this.modalClosedSource.asObservable();

  openModal(modalName: string) {
    this.modalOpenedSource.next(modalName);
  }

  closeModal(modalName: string) {
    this.modalClosedSource.next(modalName);
  }
}
