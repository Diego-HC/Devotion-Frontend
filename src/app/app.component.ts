import { Component } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-root',
  template: `
    <app-navbar
      *ngIf="showNavbar"
    ></app-navbar>
    <app-sidebar
      *ngIf="showSidebar"
    ></app-sidebar>
    <div [ngClass]="globalStyles">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  title = 'Devotion';

  showNavbar = false;
  showSidebar = false;

  constructor(public router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const isLoginPage = event.url === '/login';
        this.showNavbar = !isLoginPage;
        this.showSidebar = !isLoginPage && !event.url.includes('invite');
      }
    });
  }

  get globalStyles() {
    if (this.showNavbar && this.showSidebar) {
      return 'pt-20 pl-5';
    }
    if (this.showNavbar) {
      return 'pt-20';
    }
    if (this.showSidebar) {
      return 'pl-5';
    }
    return '';
  }
}
