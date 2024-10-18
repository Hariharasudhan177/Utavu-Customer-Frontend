import { Routes } from '@angular/router';
import { SignupComponent } from './account/signup/signup.component';

export const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
];