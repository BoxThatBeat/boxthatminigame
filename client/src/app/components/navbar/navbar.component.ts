import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  // If true, menu opens on mobile, hamburger button becomes an X
  public isOpen:boolean = false;
  public isSignedIn:boolean = false;
  public currentUser:User = new User;
  subscription: Subscription;

  constructor(
    private modalService: ModalService,
    private accountService: AccountService) {

      this.updateUser();

      this.subscription = this.modalService.modalClosed.subscribe(modalName => {
        this.updateUser();
      });
    }

   onHamburgerClick(): void {
    this.isOpen = this.isOpen ? false : true;// Toggle menu on mobile
  }

  onCreateAccountClick(): void {
    this.modalService.openModal('CreateAccount');
  }

  onSignInClick(): void {
    this.modalService.openModal('SignIn');
  }

  onSignOutClick(): void {
    this.accountService.logout();
    this.updateUser();
  }

  private updateUser(): void {
    this.currentUser = this.accountService.userValue;

    if (this.currentUser.username != null && this.currentUser.username != undefined && this.currentUser.username != '') {
      this.isSignedIn = true;
    } else {
      this.isSignedIn = false;
    }
  }

}
