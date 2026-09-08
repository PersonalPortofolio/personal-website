import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  currentYear: number = new Date().getFullYear();
  
  // Metodă apelată la click pe orice link din meniu
  onLinkClick() {
    // Verificăm dacă suntem pe un ecran de mobil (lățime sub 992px)
    if (window.innerWidth < 992) {
      const navbarElement = document.querySelector('.navbar, .sidebar');
      if (navbarElement) {
        navbarElement.classList.remove('show', 'active');
      }
    }
  }
  
  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
