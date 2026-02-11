import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { SkillsComponent } from '../../components/skills/skills.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, AboutComponent, SkillsComponent, ProjectsComponent, TestimonialsComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);

  ngAfterViewInit(): void {
    // If navigation included a scroll target, perform the scroll after view init
    this.route.queryParams.subscribe((params) => {
      const target = params['scrollTo'];
      if (target) {
        // Slight delay to ensure content is rendered
        setTimeout(() => {
          const el = document.getElementById(target);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          // Remove query param from URL without adding history entry
          try { this.location.replaceState(this.router.url.split('?')[0] || '/'); } catch {}
        }, 50);
      }
    });
  }
}
