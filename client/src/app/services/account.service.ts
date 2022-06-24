import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Socket } from 'ngx-socket-io';
import { Response } from '../models/response.modal';

@Injectable({ providedIn: 'root' })
export class AccountService {

    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    public isLoggedIn: boolean = false;

    otherUserLoginEvent: EventEmitter<string> = new EventEmitter();
    otherUserLogoutEvent: EventEmitter<string> = new EventEmitter();

    signedInEvent: EventEmitter<string> = new EventEmitter();

    constructor(
        private socket: Socket
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')  || '{}'));
        this.user = this.userSubject.asObservable();

        // When our socket has connected to the server it will ask us if we are signed in to associate the new socketId to username
        socket.on('connection:new', (serverCallback: (currentUsername: string) => void) => {
          serverCallback(this.userSubject.value.username);
          if (this.userSubject.value != undefined && this.userSubject.value.username != '') {
            this.isLoggedIn = true;
          }
        });

        socket.on("otheruser:login", (username: string) => {
          this.otherUserLoginEvent.emit(username);
        });
        socket.on("otheruser:logout", (username: string) => {
          this.otherUserLogoutEvent.emit(username);
        });
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    getOnlineUsernames(clientCallback: (response: Response) => void) {
      this.socket.emit('user:onlineusers', clientCallback);
    }

    getAllUsernames(clientCallback: (response: Response) => void) {
      this.socket.emit('user:allusers', clientCallback);
    }

    register(user: User, clientCallback: (response: Response) => void) {
      this.socket.emit('user:register', { payload: user }, clientCallback);
    }

    login(user: User, clientCallback: (response: Response) => void) {
      this.isLoggedIn = true;
      this.signedInEvent.emit(user.username);
      this.socket.emit('user:login', {payload: user}, clientCallback);
    }

    logout(user: User): void {
      this.isLoggedIn = false;
      localStorage.removeItem('user');
      this.userSubject.next(new User());

      //Update server that this user is no longer online
      this.socket.emit('user:logout', {payload: user});
    }

    saveUser(user: User) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
    }
}