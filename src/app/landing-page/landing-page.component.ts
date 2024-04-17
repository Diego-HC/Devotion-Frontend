import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  template: `
    <div class="ml-20">
      <app-table-icon />
      <app-kanban-icon />
      <app-calendar-icon />
      <app-roadmap-icon />
      <app-devotion-iso />
    </div>
    <button (click)="goToLogin()" class="my-button">Go to Login</button>
  `,
  styles: [`
    .my-button {
      background-color: #4CAF50;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
    }
  `]
})
export class LandingPageComponent {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
