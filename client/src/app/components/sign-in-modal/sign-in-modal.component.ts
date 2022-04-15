import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.css']
})
export class SignInModalComponent implements OnDestroy {

  public isOpen:boolean;
  subscription: Subscription;

  constructor(private modalService: ModalService) {
    this.isOpen = false;
    
    this.subscription = this.modalService.modalOpened.subscribe(modalName => {
      if (modalName === 'SignIn') {
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
