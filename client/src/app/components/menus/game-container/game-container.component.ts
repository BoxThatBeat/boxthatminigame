import { Component, OnInit } from '@angular/core';
import { AlertType } from 'src/app/models/alert-type.model';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { GameManagerService } from 'src/app/services/game-manager.service';

@Component({
  selector: 'game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.css']
})
export class GameContainerComponent implements OnInit {

  inRoom: boolean = false;
  inRoomBannerText: string = '';
  inRoomSubText: string = 'Counting Mania';

  outOfRoomBannerText: string = 'Welcome To BoxThatMinigame!';
  outOfRoomSubText: string = 'Please log in, then join another online player on the left panel to begin!';

  otherUsername: string = '';

  constructor(
    private gameManagerService: GameManagerService,
    private accountService: AccountService,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {

    // Subscribe to event that we joined a room with another user (initiated by this user or another)
    this.gameManagerService.joinedEvent.subscribe( (usernames: Array<string>) => {
      
      this.alertService.writeSuccess("Joined game!", AlertType.Main);

      var currentUser: string = this.accountService.userValue.username;
      var otherUser: string = '';

      if (usernames.length > 0) {
        if (usernames[0] === currentUser) {
          otherUser = usernames[1];
        } else {
          otherUser = usernames[0];
        }
        
        this.inRoomBannerText = currentUser + ' + ' + otherUser;
        this.otherUsername = otherUser;
        this.inRoom = true;
      }

    });
  }

  onLeaveGame() {
    
  }

}
