import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Response } from '../models/response.modal';

@Injectable({
  providedIn: 'root'
})
export class GameCountingManiaService {

  recievedInputEvent: EventEmitter<number> = new EventEmitter();

  constructor(private socket: Socket) {

    socket.on("countingmania:recieveinput", (response:Response) => {

      if (response.isError) {
        console.log(response.message);
      } else {
        this.recievedInputEvent.emit(response.message.input);
      }
    });

   }

  sendInput(inputNum: number) {
    this.socket.emit('countingmania:sendInput', { payload: {'input': inputNum}});
  }
}
