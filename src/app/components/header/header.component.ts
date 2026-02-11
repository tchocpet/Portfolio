import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener, inject, signal } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ...MATERIAL_IMPORTS],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('appToolbar', { read: ElementRef }) toolbarRef!: ElementRef<HTMLElement>;
  private platformId = inject(PLATFORM_ID);
  mobileMenuOpen = signal(false);

  ngAfterViewInit(): void {
    // Only run DOM measurements in the browser (avoid SSR errors)
    if (isPlatformBrowser(this.platformId) && typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => this.setHeaderHeight());
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.setHeaderHeight();
    }
  }

  private setHeaderHeight() {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      const height = this.toolbarRef?.nativeElement?.offsetHeight || 92;
      document.documentElement.style.setProperty('--app-header-height', `${height}px`);
    } catch (e) {
      // fallback: ensure variable exists
      try {
        document.documentElement.style.setProperty('--app-header-height', `92px`);
      } catch {}
    }
  }
  constructor(public translationService: TranslationService, private router: Router) {
    console.log('HeaderComponent initialized');
  }

  ngOnInit() {
    console.log('HeaderComponent ngOnInit - Language:', this.translationService.currentLanguage());
    this.translationService.initializeLanguage();
  }

  scrollToSection(sectionId: string) {
    this.closeMobileMenu();
    const currentPath = this.router.url.split('?')[0] || '/';
    if (currentPath === '/' || currentPath === '') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    // If we're on another route, navigate to home with a query param
    // so the Home page can scroll to the target after it loads.
    this.router.navigate(['/'], { queryParams: { scrollTo: sectionId } });
  }

  setLanguage(lang: 'EN' | 'DE') {
    console.log('Setting language to:', lang);
    this.translationService.setLanguage(lang);
  }

  toggleLanguage() {
    const newLang = this.translationService.currentLanguage() === 'EN' ? 'DE' : 'EN';
    this.setLanguage(newLang);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
