import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Socket } from 'ngx-socket-io';
import { Response } from '../models/response.modal';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private socket: Socket
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')  || '{}'));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    getAllUsernames(callback: (response: Response) => void) {
      this.socket.emit('user:allusers', callback);
    }

    register(user: User, callback: (response: Response) => void) {
      this.socket.emit('user:register', { payload: user }, callback);
    }

    login(user: User, callback: (response: Response) => void) {
      this.socket.emit('user:login', {payload: {'username': user.username, 'password': user.password}}, callback);
    }

    logout(): void {
      localStorage.removeItem('user');
      this.userSubject.next(new User());
    }

    saveUser(user: User) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
    }
}