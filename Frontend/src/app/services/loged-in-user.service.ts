import { Injectable } from '@angular/core';
import { Loged } from '../model/Loged';

@Injectable({
    providedIn: 'root'
})
export class LogedInUserService {

    constructor() { }

    setUser(user: Loged) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    }

    getCurrentUser(): Loged {
        const user: Loged = JSON.parse(sessionStorage.getItem('currentUser'));
        return user;
    }

    logout() {
        sessionStorage.removeItem('currentUser');
    }
}