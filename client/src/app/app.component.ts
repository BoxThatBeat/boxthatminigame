import { Component } from '@angular/core';
import { User } from './models/user.model';
import { AuthenticationService } from './services/authentication.service';

@Component({ 
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  
  title = 'BoxThatMiniGame';
  currentUser: User = new User;

  constructor(
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe((x: any) => this.currentUser = x);
  }

  logout() {
      this.authenticationService.logout();
  }
}