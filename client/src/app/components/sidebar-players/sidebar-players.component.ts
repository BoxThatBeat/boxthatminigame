import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'sidebar-players',
  templateUrl: './sidebar-players.component.html',
  styleUrls: ['./sidebar-players.component.css']
})
export class SidebarPlayersComponent implements OnInit {

  users:User[] = [];

  constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users.filter(value => 
              value.username != this.accountService.userValue.username));
    }

}
