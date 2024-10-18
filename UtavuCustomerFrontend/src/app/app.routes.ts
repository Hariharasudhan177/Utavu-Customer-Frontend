import { Routes } from '@angular/router';
import { SignupComponent } from './account/signup/signup.component';
import { LandingComponent } from './landing/landing/landing.component';

export const routes: Routes = [
    { path: '',  component: LandingComponent},
    { path: 'signup', component: SignupComponent },
];