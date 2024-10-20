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
    jobType: '', // Added jobType field
    generalAvailabilityStartTime: '', // Added start time field
    generalAvailabilityEndTime: '' // Added end time field
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
        this.user.name = data.name;
        this.user.email = data.email;
        this.user.address = data.address;
        this.user.jobType = data.jobType; // Bind job type from API response
        this.user.generalAvailabilityStartTime = data.generalAvailabilityStartTime; // Bind start time
        this.user.generalAvailabilityEndTime = data.generalAvailabilityEndTime; // Bind end time
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
