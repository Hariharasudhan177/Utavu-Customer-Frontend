import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Import AuthService

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  hideAuthLinks = false;
  userName: string | null = null;
  userLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    // Subscribe to router events and check the URL
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.hideAuthLinks = event.url.includes('/signup');  // Hide on signup page
      }
    });
  }

  ngOnInit() {
    // Subscribe to the AuthService's user observable
    this.authService.user$.subscribe(userName => {
      this.userName = userName;
      this.userLoggedIn = !!userName;  // Update the logged-in state based on the user
    });
  }

  logout() {
    // Call AuthService to clear user state
    this.authService.clearUser();
  }
}
