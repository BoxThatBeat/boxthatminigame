import { Injectable, Output, EventEmitter } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {

  invitedEvent: EventEmitter<string> = new EventEmitter();

  constructor(private socket: Socket) { 
    socket.on("game:invited", (inviter:string) => {
      console.log("I was invited to play by:" + inviter);
      this.invitedEvent.emit(inviter);
    });
  }

  inviteUser(inviter: string, invited: string) {
    this.socket.emit('game:inviteuser', { payload: {'inviter': inviter, 'invited': invited} });
  }

  /*
  getScores(callback: (response: Response) => void) {
      this.socket.emit('game:scores', callback);
    }
  */
}
