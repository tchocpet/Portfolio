import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ...MATERIAL_IMPORTS],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToNext() {
    const section = document.getElementById('why-me');
    if (!section) return;
    const next = section.nextElementSibling as HTMLElement | null;
    if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
