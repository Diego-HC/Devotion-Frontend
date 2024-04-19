import { Component } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="!isLoginPage">
      <app-navbar></app-navbar>
      <app-sidebar></app-sidebar>
    </div>
    <div [ngClass]="isLoginPage ? '' : 'pt-20 pl-5'">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  title = 'Devotion';

  isLoginPage: boolean = false;

  constructor(public router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login';
      }
    });
  }


}
