import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<any>();

    constructor() {}

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: String) {
        this.subject.next({ type: 'success', text: message });
    }

    error(message: string) {
        this.subject.next({ type: 'error', text: message });
    }

    clear() {
        this.subject.next(null);
    }
}
