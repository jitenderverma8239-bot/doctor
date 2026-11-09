import { Routes } from '@angular/router';
import { Landing } from './landing';
import { Appointment } from './appointment';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'appointment', component: Appointment },
  { path: '**', redirectTo: '' }
];
