import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('typedElement') typedElement!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    // Ne asigurăm că Typed.js rulează doar în browser, nu și la SSR pe server
    if (isPlatformBrowser(this.platformId)) {
      new Typed(this.typedElement.nativeElement, {
        strings: [
          'Soluții Software & Web Apps', //(CAEN 6201)
          'Consultanță în Tehnologia Informației', //(CAEN 6202)
          'Administrare Servere & Infrastructură IT', //(CAEN 6203)
          'Servicii & Suport Tehnic IT Complet' //(CAEN 6209)
        ],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true
      });
    }
  }
}