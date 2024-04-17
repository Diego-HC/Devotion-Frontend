import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="router.url !== '/login'">
      <app-navbar /><app-sidebar />
    </div>
    <div class="pt-20 pl-5">
      <router-outlet />
    </div>
    `
})
export class AppComponent {
  title = 'Devotion';

  constructor(public router: Router) { }
}
