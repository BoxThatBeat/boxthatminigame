import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  // If true, menu opens on mobile, hamburger button becomes an X
  public isOpen:boolean = false;

  constructor(private modalService: ModalService) {}

   onHamburgerClick(): void {
    // Toggle menu on mobile
    this.isOpen = this.isOpen ? false : true;
  }

  onCreateAccountClick(): void {
    this.modalService.openModal('CreateAccount');
  }

  onSignInClick(): void {
    this.modalService.openModal('SignIn');
  }

}
