import { Routes } from '@angular/router';
import { SignupComponent } from './account/signup/signup.component';
import { LandingComponent } from './landing/landing/landing.component';
import { ProfileComponent } from './profile/profile/profile.component';

export const routes: Routes = [
    { path: '',  component: LandingComponent},
    { path: 'signup', component: SignupComponent },
    { path : 'profile', component: ProfileComponent}
];