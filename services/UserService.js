import { BehaviorSubject } from 'rxjs';
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const UserService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
}

