import { Component, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private eRef: ElementRef) {}
  
  currentYear: number = new Date().getFullYear();
  currentSection: string = 'acasa'; 
  isServicesMenuOpen: boolean = false;
  isServicesMenuManuallyClosed: boolean = false;
  
  @Output() closeMenu = new EventEmitter<void>();
  
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
  
  sections: string[] = [
    'acasa', 'despre', 'suport-software', 'reparatii-hardware',
    'asamblare-pc', 'retelistica', 'administrare-servere',
    'dezvoltare-software', 'consultanta-it', /* 'portfoliu', */ 'contact'
  ];
  
  serviceSections: string[] = [
    'suport-software', 'reparatii-hardware', 'asamblare-pc', 
    'retelistica', 'administrare-servere', 'dezvoltare-software', 'consultanta-it'
  ];
  
  toggleServicesMenu() {
    this.isServicesMenuOpen = !this.isServicesMenuOpen; // Inversează starea (deschis/închis)
    
    // Dacă l-ai închis, ține minte asta ca să nu ți-l mai deschidă automat la scroll
    if (!this.isServicesMenuOpen) {
      this.isServicesMenuManuallyClosed = true;
    } else {
      this.isServicesMenuManuallyClosed = false;
    }
  }
  
  @HostListener('window:scroll')
  onWindowScroll() {
    const newSection = this.detectActiveSection();
    if (!newSection || this.currentSection === newSection) return;
    
    this.currentSection = newSection;
    this.handleServicesSubmenu(this.currentSection);
    
    // Opțional: Închide meniul de telefon automat dacă utilizatorul face scroll!
    //this.closeMobileMenu(); 
  }
  
  // 2. Funcția care închide la click în exterior
  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  onDocumentClick(event: Event) {
    const clickedInside = this.eRef.nativeElement.contains(event.target);
    const clickedBurgerButton = (event.target as HTMLElement).closest('.nav-toggle-btn');
    
    if (!clickedInside && !clickedBurgerButton) {
      this.closeMobileMenu();
    }
  }
  
  // 3. Aici stă funcția closeMobileMenu
  closeMobileMenu() {
    if (window.innerWidth < 992) {
      this.closeMenu.emit(); // Transmitem semnalul de închidere
    }
  }
  
  private detectActiveSection(): string {
    for (const section of this.sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Aici poți ajusta pe viitor acel "150" dacă vrei să declanșezi mai devreme sau mai târziu
        if (rect.top <= 150 && rect.bottom >= 150) {
          return section;
        }
      }
    }
    return '';
  }
  
  private handleServicesSubmenu(current: string) {
    const isCurrentlyInServices = this.serviceSections.includes(current);
    
    if (isCurrentlyInServices) {
      if (!this.isServicesMenuManuallyClosed) {
        this.isServicesMenuOpen = true;
      }
    } else {
      this.isServicesMenuOpen = false;
      this.isServicesMenuManuallyClosed = false;
    }
  }
  
  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.currentSection = sectionId; 
      
      // Închide automat meniul de mobil IMEDIAT după ce a dat click pe o secțiune
      this.closeMobileMenu();
    }
  }
}
