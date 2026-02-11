import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LegalComponent } from './pages/legal/legal.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'legal', component: LegalComponent },
	{ path: 'privacy', component: PrivacyComponent },
	{ path: '**', redirectTo: '' },
];
