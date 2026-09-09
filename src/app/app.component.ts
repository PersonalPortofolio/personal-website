import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isSidebarToggled = false;

  toggleSidebar() {
    this.isSidebarToggled = !this.isSidebarToggled;
  }

  // Starea meniului pe mobil (false = închis, true = deschis)
  isMenuOpen = false;

  // Deschide/închide meniul de la butonul cu poza de profil
  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const navbarElement = document.querySelector('.navbar, .sidebar');
    if (navbarElement) {
      navbarElement.classList.toggle('show', this.isMenuOpen);
    }
  }

  // Se apelează când utilizatorul dă click pe un link din meniu
  onLinkClick() {
    if (window.innerWidth < 992) {
      this.isMenuOpen = false; // Închidem meniul
      const navbarElement = document.querySelector('.navbar, .sidebar');
      if (navbarElement) {
        navbarElement.classList.remove('show', 'active');
      }
    }
  }
}