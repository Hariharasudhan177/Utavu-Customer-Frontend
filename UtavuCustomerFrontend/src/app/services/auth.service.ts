import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject to track the current user
  private userSubject = new BehaviorSubject<string | null>(this.getLocalStorageItem('userName'));
  user$ = this.userSubject.asObservable();

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

  // Call this when the user logs in
  setUser(userName: string) {
    if (this.isBrowser()) {
      localStorage.setItem('userName', userName);
      this.userSubject.next(userName);
    }
  }

  // Call this when the user logs out
  clearUser() {
    if (this.isBrowser()) {
      localStorage.clear();
      this.userSubject.next(null);
    }
  }
}
