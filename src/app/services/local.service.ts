import { Injectable } from '@angular/core';
import { User } from '../User';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  constructor() {}

  saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  checkLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    if (user === null) return null;
    return JSON.parse(user);
  }

  logoutUser(): void {
    localStorage.removeItem('user');
  }
}
