import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ...MATERIAL_IMPORTS],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  skills = [
    { name: 'Angular', icon: '/icons/angular.svg' },
    { name: 'TypeScript', icon: '/icons/typescript.svg' },
    { name: 'JavaScript', icon: '/icons/javascript.svg' },
    { name: 'HTML', icon: '/icons/html.svg' },
    { name: 'CSS', icon: '/icons/css.svg' },
    { name: 'REST-API', icon: '/icons/api.svg' },
    { name: 'Firebase', icon: '/icons/firebase.svg' },
    { name: 'Git', icon: '/icons/git.svg' },
    { name: 'Scrum Master', icon: '/icons/scrum.svg' },
    { name: 'Material design', icon: '/icons/material_design.svg' },
    { name: 'Challenge me', icon: '/icons/challenge.svg' },
    { name: 'ITL4 Fundation', icon: '/icons/ITL4.svg' },
    { name: 'React', icon: '/icons/react.svg' },
  ];
}
