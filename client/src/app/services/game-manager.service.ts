import { Injectable, Output, EventEmitter } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Response } from '../models/response.modal';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {

  invitedEvent: EventEmitter<string> = new EventEmitter();
  joinedEvent: EventEmitter<Array<string>> = new EventEmitter();
  userLeftEvent: EventEmitter<string> = new EventEmitter();

  isInGame: boolean = false;

  gameId: string = '';

  constructor(private socket: Socket) { 
    socket.on("game:invited", (response:Response) => {

      if (response.isError) {
        console.log(response.message);
      } else {
        this.invitedEvent.emit(response.message.inviter);
      }
    });

    socket.on("game:joined", (response:Response) => {

      if (response.isError) {
        console.log(response.message);
      } else {
        this.isInGame = true;
        this.gameId = response.message.gameId;
        this.joinedEvent.emit(response.message.usernames);
      }
    });

    socket.on("game:userleft", (response:Response) => {

      if (response.isError) {
        console.log(response.message);
      } else {
        this.userLeftEvent.emit(response.message.username);
      }
    });
  }

  inviteUser(inviter: string, invited: string) {
    this.socket.emit('game:inviteuser', { payload: {'inviter': inviter, 'invited': invited}});
  }

  joinUser(accepter: string, inviter: string) {
    this.socket.emit('game:joinuser', { payload: {'accepter': accepter, 'inviter': inviter}});
  }

  leaveGame(username: string) {
    this.isInGame = false;
    this.socket.emit('game:leavegame', { payload: {'username': username}});
  }

  /*
  getScores(callback: (response: Response) => void) {
      this.socket.emit('game:scores', callback);
    }
  */
}
