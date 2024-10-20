import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // BehaviorSubject to track the current user
  private userSubject = new BehaviorSubject<string | null>(this.getLocalStorageItem('userName'));
  user$ = this.userSubject.asObservable();
  private tokenSubject = new BehaviorSubject<string | null>(this.getLocalStorageItem('token'));
  token$ = this.tokenSubject.asObservable();

  constructor() { }

  // Safe localStorage getter
  private getLocalStorageItem(key: string): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(key);
    }
    return null;
  }

  // Check if the environment is a browser
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  setUser(userName: string, token:string) {
    localStorage.setItem('userName', userName);
    localStorage.setItem('token', token);
    this.userSubject.next(userName);
    this.tokenSubject.next(token); 
  }

  clearUser(): Observable<void> {
    localStorage.setItem('userName', '');
    localStorage.setItem('token', '');
    this.userSubject.next(null);
    this.tokenSubject.next(null); // Clear token on logout
    return of(); // Return an observable
  }

  getToken(): string | null {
    return this.getLocalStorageItem('token'); // Returns the stored token
  }

  setToken(newToken: string) {
    this.tokenSubject.next(newToken); // Store the token when user logs in
  }
}