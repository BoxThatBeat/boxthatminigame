import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.css']
})
export class CreateAccountModalComponent implements OnDestroy {

  public isOpen:boolean;
  subscription: Subscription;

  constructor(private modalService: ModalService) {
    const MODAL_NAME = 'CreateAccount';

    this.isOpen = false;
    
    this.subscription = this.modalService.modalOpened.subscribe(modalName => {
      if (modalName === MODAL_NAME) {
        this.isOpen = true;
      }
    });
  }

  onModalCloseClick(): void {
    this.isOpen = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
