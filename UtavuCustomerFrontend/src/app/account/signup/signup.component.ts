import { Component } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

declare const gapi: any;  // Declare gapi to use Google API

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private router: Router, private authService: AuthService, private http : HttpClient) { }

  ngOnInit() {
    this.initGoogleAuth();
  }

  initGoogleAuth() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '602394270286-8a1lkumsnfio643jsmrqa69kd38lc6ch.apps.googleusercontent.com',  // Replace with your Client ID
        scope: 'email',
        plugin_name: 'makingitwork'
      });
    });
  }

  onGoogleSignUp() {
    const GoogleAuth = gapi.auth2.getAuthInstance();
    GoogleAuth.signIn().then((result: any) => {
      // Handle successful sign-up here
      console.log('User signed in: ', result);
      // You can also retrieve user information like this:
      const profile = result.getBasicProfile();
      console.log('Name: ' + profile.getName());
      console.log('Email: ' + profile.getEmail());

      const idToken = result.getAuthResponse().id_token; // Get the ID token

      // Send the ID token to your backend for verification and JWT generation
      this.http.post('https://utavucbwa-dhhjbxguaydsecdt.uksouth-01.azurewebsites.net/signup', { idToken: idToken })
      .subscribe({
        next: (response) => {
          console.log('User signed up and JWT received:', response);
          const userName = result.getBasicProfile().getName();
          this.authService.setUser(userName);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error signing up with backend:', error);
        }
      });    

    }).catch((error: any) => {
      console.error('Error signing in: ', error);
    });
  }
}