import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeroComponent } from './landing/hero/hero.component';
import { FeaturesComponent } from './landing/features/features.component';
import { HowitworksComponent } from './landing/howitworks/howitworks.component';
import { ContactComponent } from './landing/contact/contact.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    FeaturesComponent,
    HowitworksComponent,
    ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UtavuCustomerFrontend';
}
