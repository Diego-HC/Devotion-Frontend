import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  /*templateUrl: './app.component.html',
  styleUrl: './app.component.css',*/
  template: `
    <app-navbar /><app-sidebar />
    <div class="pt-20 pl-5">
      <router-outlet />
    </div> 
    `
})
export class AppComponent {
  title = 'Devotion';
}
