import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  template: `
    <div class="overflow-x-auto">
      <!-- Your existing content for the main page -->
      <h1>Main Page</h1>
      <!-- Include your TableComponent here -->
      <app-table></app-table>
    </div>

  `
})
export class MainPageComponent {

}
