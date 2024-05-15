import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-data-sources-main-page',
  template: `
    <div class="ml-20 mr-10">
      @for (dataSource of dataSources; track $index) {
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-semibold text-gray-800">{{ dataSource.name }}</h1>
        <button class="mr-6" (click)="startEdit()">
          <app-projects-icon fill="#000000" width="60" height="60" />
        </button>
      </div>
      }
    </div>
  `
})
export class DataSourcesMainPageComponent implements OnInit {
  @Input() dataSources: DataSource[] = [];

  constructor() { }

  ngOnInit(): void {

  }

  startEdit() {
    // Some code here
  }
}
