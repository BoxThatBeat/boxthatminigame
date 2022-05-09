import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Response } from 'src/app/models/response.modal';
import { GameManagerService } from 'src/app/services/game-manager.service';
import { SidebarUser } from 'src/app/models/sidebar-user.model';

@Component({
  selector: 'sidebar-players',
  templateUrl: './sidebar-players.component.html',
  styleUrls: ['./sidebar-players.component.css']
})
export class SidebarPlayersComponent implements OnInit {

  users:SidebarUser[] = [];

  constructor(
    private accountService: AccountService,
    private gameManagerService: GameManagerService) {
  }
  
  ngOnInit(): void {
    var currentUsername = this.accountService.userValue.username;
    var allUsernames: string[] = [];

    // Get all usernames
    this.accountService.getAllUsernames((response: Response) => {
      if (response.isError) {
        console.log(response.message)
      } else {
        allUsernames = response.message.filter((username: string) =>
          username != currentUsername);
        
        // Get online user's usernames
        this.accountService.getOnlineUsernames((response: Response) => {
          if (response.isError) {
            console.log(response.message)
          } else {
            this.createSideBarUserList(allUsernames, response.message);
          }
        });

      }
    });


    // Subscribe to event that we are invited to play by another user
    this.gameManagerService.invitedEvent.subscribe( (inviterUsername: string) => {
      this.users.forEach( (user: SidebarUser) => {
        if (user.username === inviterUsername) {
          user.isInviter = true;
        }
      });
      this.sortSidebarUsers();
    });

    // Subscribe to event that we joined a room with another user (initiated by this user or another)
    this.gameManagerService.joinedEvent.subscribe( (usernames: Array<string>) => { 
      
      var currentUser: string = this.accountService.userValue.username;
      var otherUser: string = '';

      if (usernames.length > 0) {
        if (usernames[0] === currentUser) {
          otherUser = usernames[1];
        } else {
          otherUser = usernames[0];
        }
      }
      
      // Clear selected and invite of user joined
      this.users.forEach( (user: SidebarUser) => {
        user.isSelected = false;

        if (user.username === otherUser) {
          user.isInviter = false;
        }
      });
      this.sortSidebarUsers();
    });

    // Subscribe to event that another user has logged on
    this.accountService.otherUserLoginEvent.subscribe( (usernameLoggedIn: string) => {
      this.users.forEach( (user: SidebarUser) => {
        if (user.username === usernameLoggedIn) {
          user.isOnline = true;
        }
      });
      this.sortSidebarUsers();
    });

    // Subscribe to event that another user has logged off
    this.accountService.otherUserLogoutEvent.subscribe( (usernameLoggedOff: string) => {
      this.users.forEach( (user: SidebarUser) => {
        if (user.username === usernameLoggedOff) {
          user.isOnline = false;
          user.isSelected = false;
        }
      });
      this.sortSidebarUsers();
    });
  }

  private createSideBarUserList(allUsernames: string[], onlineUsernames: string[]) {

    var sidebarUsers: SidebarUser[] = [];
    if (allUsernames.length > 0) {
      allUsernames.forEach(function (username:string, i:number) {
        sidebarUsers.push(new SidebarUser(username, onlineUsernames.includes(username), false));
      });
    }

    this.users = sidebarUsers;
    this.sortSidebarUsers();
  }

  private sortSidebarUsers() {
    this.users.sort(function(x,y) { 
      if (x.isInviter && y.isInviter) return 0;
      if (x.isInviter && !y.isInviter) return -1;
      if (!x.isInviter && y.isInviter) return 1;
      if (x.isOnline && y.isOnline) return 0;
      if (x.isOnline && !y.isOnline) return -1;
      if (!x.isOnline && y.isOnline) return 1;
      return 0;
    });
  }

  onUserSelect(newUsernameSelection: string) {

    var previouslySelectedUser: SidebarUser;

    this.users.forEach( (user: SidebarUser) => {
      if (user.isSelected) {
        previouslySelectedUser = user;
      }
    });

    this.users.forEach( (user: SidebarUser) => {
      if (user.username === newUsernameSelection) {
        user.isSelected = true;
      }
      if (previouslySelectedUser && (user.username != previouslySelectedUser.username)) {
        previouslySelectedUser.isSelected = false;
      }
    });

    this.sortSidebarUsers();
  }

  onInviteUser(invitedUsername: string) {
    this.gameManagerService.inviteUser(this.accountService.userValue.username, invitedUsername);
  }
  
  onJoinGame(usernameToJoin: string) {
    this.gameManagerService.joinUser(this.accountService.userValue.username, usernameToJoin);
  }

  //onLeaveGame()

}
