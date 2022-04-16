import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(new User);
    public currentUser: Observable<User> = new Observable;

    constructor(private http: HttpClient) {
        let possibleUser = localStorage.getItem('currentUser');

        if (possibleUser != null) {
          this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(possibleUser));
          this.currentUser = this.currentUserSubject.asObservable();
        }
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: any, password: any) {
        return this.http.post<any>(`${environment.socketUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(new User);
    }
}