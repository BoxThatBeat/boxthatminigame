import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  // If true, menu opens on mobile, hamburger button becomes an X
  public isOpen:boolean;

  constructor() {
    this.isOpen = false;
   }

   onHamburgerClick(): void {
    // Toggle menu on mobile
    this.isOpen = this.isOpen ? false : true;
  }

}
