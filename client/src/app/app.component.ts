import { Component } from '@angular/core';
import { AlertType } from './models/alert-type.model';
import { User } from './models/user.model';
import { AccountService } from './services/account.service';

@Component({ 
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  
  title = 'BoxThatMiniGame';
  user: User = new User();

  alertTypes = AlertType;

  constructor(private accountService: AccountService) {
      this.accountService.user.subscribe(x => this.user = x);
  }
}