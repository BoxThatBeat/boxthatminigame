import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({    
  providedIn: 'root'    
})  
export class ModalService {

  private modalOpenedSource = new Subject<string>();

  modalOpened = this.modalOpenedSource.asObservable();

  openModal(modalName: string) {
    this.modalOpenedSource.next(modalName);
  }
}
