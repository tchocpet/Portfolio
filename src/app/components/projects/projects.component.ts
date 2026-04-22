import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ...MATERIAL_IMPORTS],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  projects = [
    {
      id: 'project_1',
      title: 'Join',
      description:
        'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      tech: ['TypeScript', 'HTML', 'CSS', 'Firebase'],
      image: '/images/project_1.png',
      github: 'https://github.com/MaikeFriz/Join.git',
      liveTest: 'https://joind.netlify.app/',
    },
    {
      id: 'project_2',
      title: 'Timer-tracker',
      description:
        'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      tech: ['React', 'JavaScript', 'HTML', 'CSS', 'node.js', 'Express', 'MongoDB'],
      image: '/images/project_2.png',
      github: 'https://github.com',
      liveTest: 'https://sadakka.netlify.app/login',
    },
    {
      id: 'project_3',
      title: 'Pollo Loco',
      description:
        'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco also to defeat against the crazy hen.',
      tech: ['JavaScript', 'HTML', 'CSS'],
      image: '/images/project_3.png',
      github: 'https://github.com/tchocpet/EL-POLLO-LOCCO.git',
      liveTest: 'https://el-pollo-locco.netlify.app',
    },
  ];
}
