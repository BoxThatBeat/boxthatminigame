import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { GameManagerService } from 'src/app/services/game-manager.service';

@Component({
  selector: 'game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.css']
})
export class GameContainerComponent implements OnInit {

  inRoom: boolean = false;
  bannerText: string = '';
  gameTitle: string = 'Counting Mania';
  otherUsername: string = '';

  constructor(
    private gameManagerService: GameManagerService,
    private accountService: AccountService
    ) { }

  ngOnInit(): void {

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
        
        this.bannerText = currentUser + ' + ' + otherUser;
        this.otherUsername = otherUser;
        this.inRoom = true;
      }

    });
  }

}
