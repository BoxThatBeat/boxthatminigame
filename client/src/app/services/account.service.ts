import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Socket } from 'ngx-socket-io';
import { Response } from '../models/response.modal';

@Injectable({ providedIn: 'root' })
export class AccountService {

    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    otherUserLoginEvent: EventEmitter<string> = new EventEmitter();
    otherUserLogoutEvent: EventEmitter<string> = new EventEmitter();

    constructor(
        private socket: Socket
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')  || '{}'));
        this.user = this.userSubject.asObservable();

        socket.on("otheruser:login", (username:string) => {
          this.otherUserLoginEvent.emit(username);
        });
        socket.on("otheruser:logout", (username:string) => {
          this.otherUserLogoutEvent.emit(username);
        });
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    getOnlineUsernames(callback: (response: Response) => void) {
      this.socket.emit('user:onlineusers', callback);
    }

    getAllUsernames(callback: (response: Response) => void) {
      this.socket.emit('user:allusers', callback);
    }

    register(user: User, callback: (response: Response) => void) {
      this.socket.emit('user:register', { payload: user }, callback);
    }

    login(user: User, callback: (response: Response) => void) {
      this.socket.emit('user:login', {payload: user}, callback);
    }

    logout(user: User): void {
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