import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeroComponent } from './landing/hero/hero.component';
import { FeaturesComponent } from './landing/features/features.component';
import { HowitworksComponent } from './landing/howitworks/howitworks.component';
import { ContactComponent } from './landing/contact/contact.component';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SignupComponent } from './account/signup/signup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    RouterLink,
    RouterLinkActive,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    FeaturesComponent,
    HowitworksComponent,
    ContactComponent,
    SignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UtavuCustomerFrontend';
  constructor(private router: Router) {}

  isHomePage(): boolean {
    return this.router.url === '/'; // Check if the current URL is the root/home page
  }
}
