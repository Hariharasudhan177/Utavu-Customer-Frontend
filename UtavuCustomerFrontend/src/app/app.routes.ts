import { Routes } from '@angular/router';
import { SignupComponent } from './account/signup/signup.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
];