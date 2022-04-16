import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'sidebar-players',
  templateUrl: './sidebar-players.component.html',
  styleUrls: ['./sidebar-players.component.css']
})
export class SidebarPlayersComponent implements OnInit {

  currentUser: User;
  users:User[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService) { 
      
      this.currentUser = this.authenticationService.currentUserValue;
    }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
      this.userService.delete(id)
          .pipe(first())
          .subscribe(() => this.loadAllUsers());
  }

  private loadAllUsers() {
      this.userService.getAll()
          .pipe(first())
          .subscribe(users => this.users = users);
  }

}
