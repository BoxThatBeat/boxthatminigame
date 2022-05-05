import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Response } from 'src/app/models/response.modal';

@Component({
  selector: 'sidebar-players',
  templateUrl: './sidebar-players.component.html',
  styleUrls: ['./sidebar-players.component.css']
})
export class SidebarPlayersComponent implements OnInit {

  selectedUser:string = '';
  usernames:string[] = [];

  constructor(private accountService: AccountService) {
  }

    ngOnInit() {
      const currentUsername = this.accountService.userValue.username;
      this.accountService.getAllUsernames((response: Response) => {
        if (response.isError) {
          console.log(response.message)
        } else {
          this.usernames = response.message.filter((username: string) =>
            username != currentUsername);
        }
      });
    }

    onUserSelect(username: string) {
      if (this.selectedUser === username) {
        this.selectedUser = '';
      } else {
        this.selectedUser = username;
      }
    }

}
