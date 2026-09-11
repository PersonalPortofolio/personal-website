import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID, NgZone, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('typedElement') typedElement!: ElementRef;
  
  // Salvăm instanța pentru a o putea distruge ulterior
  private typedInstance: any;

  seTrimite: boolean = false;
  mesajSucces: boolean = false;
  mesajEroare: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone // Injectăm NgZone aici
  ) {}

  ngAfterViewInit(): void {
    // Ne asigurăm că Typed.js rulează doar în browser (SSR safe)
    if (isPlatformBrowser(this.platformId)) {
      
      // Mutăm librăria în afara monitorizării Angular (rezolvă lag-ul!)
      this.ngZone.runOutsideAngular(() => {
        this.typedInstance = new Typed(this.typedElement.nativeElement, {
          strings: [
            'Soluții Software & Aplicații Web, Mobile, Desktop', //(CAEN 6201)
            'Consultanță în Tehnologia Informației', //(CAEN 6202)
            'Administrare Servere & Infrastructură IT', //(CAEN 6203)
            'Servicii & Suport Tehnic IT Complet' //(CAEN 6209)
          ],
          typeSpeed: 60,
          backSpeed: 40,
          loop: true,
          contentType: 'text'
        });
      });
      
    }
  }

  ngOnDestroy(): void {
    // Curățăm memoria: oprim animația când componenta este distrusă
    if (this.typedInstance) {
      this.typedInstance.destroy();
    }
  }

  async trimiteMesaj(event: Event) {
    event.preventDefault(); // Oprește refresh-ul clasic al paginii
    
    this.seTrimite = true;
    this.mesajSucces = false;
    this.mesajEroare = false;

    const formular = event.target as HTMLFormElement;
    const dateFormular = new FormData(formular);

    try {
      const raspuns = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: dateFormular
      });
      
      if (raspuns.ok) {
        this.mesajSucces = true;
        formular.reset(); // Golește câmpurile după trimitere
      } else {
        this.mesajEroare = true;
      }
    } catch (eroare) {
      this.mesajEroare = true;
    } finally {
      this.seTrimite = false;
    }
  }
}