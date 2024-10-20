import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, HttpClientModule, FormsModule], // Add FormsModule here
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: any = {
    name: '',
    email: '',
    address: '',
    availableFor: ''
  };

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    // Fetch user profile on init
    this.fetchUserProfile();
  }

  fetchUserProfile() {
    const token = this.authService.getToken();
    this.http.get<any>('https://utavucbwa-dhhjbxguaydsecdt.uksouth-01.azurewebsites.net/profile', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.user.name = data.name;       // Auto-populate name
        this.user.email = data.email;     // Auto-populate email
        this.user.address = data.address; // Fetch other user data
        this.user.availableFor = data.availableFor;
      },
      error: (error) => {
        console.error('Error fetching user profile:', error);
      }
    });
  }

  onSubmit() {
    // Update profile logic here
    const token = this.authService.getToken();
    this.http.put('https://utavucbwa-dhhjbxguaydsecdt.uksouth-01.azurewebsites.net/profile', this.user, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        console.log('Profile updated successfully');
      },
      error: (error) => {
        console.error('Error updating profile:', error);
      }
    });
  }
}
