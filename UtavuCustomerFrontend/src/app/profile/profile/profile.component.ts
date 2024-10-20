import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, HttpClientModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: any = {
    name: '',
    email: '',
    address: '',
    jobType: '',
    generalAvailabilityStartTime: '', // Expecting HH:mm:ss format
    generalAvailabilityEndTime: ''     // Expecting HH:mm:ss format
  };

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {
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
        this.user.jobType = data.jobType;
        this.user.generalAvailabilityStartTime = this.formatTime(data.generalAvailabilityStartTime); // Ensure correct format
        this.user.generalAvailabilityEndTime = this.formatTime(data.generalAvailabilityEndTime); // Ensure correct format
      },
      error: (error) => {
        console.error('Error fetching user profile:', error);
      }
    });
  }

  formatTime(timeString: string): string {
    // Ensure time is in HH:mm:ss format
    if (timeString) {
      // Check if timeString already has seconds
      const parts = timeString.split(':');
      if (parts.length === 2) {
        return `${timeString}:00`; // Append seconds if missing
      }
      return timeString; // Return as is if it already has seconds
    }
    return '00:00:00'; // Default fallback if time is not provided
  }

  onSubmit() {
    const token = this.authService.getToken();

    // Prepare the payload with time as strings
    const updatedProfile = {
      address: this.user.address,
      jobType: this.user.jobType,
      generalAvailabilityStartTime: this.formatTimeWithSeconds(this.user.generalAvailabilityStartTime), // e.g., "23:23:00"
      generalAvailabilityEndTime: this.formatTimeWithSeconds(this.user.generalAvailabilityEndTime)      // e.g., "23:23:00"
    };

    this.http.put('https://utavucbwa-dhhjbxguaydsecdt.uksouth-01.azurewebsites.net/profile', updatedProfile, {
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

  formatTimeWithSeconds(timeString: string): string {
    // Check if the timeString already includes seconds
    const parts = timeString.split(':');
    if (parts.length === 2) {
      return `${timeString}:00`; // Append seconds if missing
    }
    return timeString; // Return as is if it already has seconds
  }

}
