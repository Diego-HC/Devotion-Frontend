import { Component, Input } from '@angular/core';
import {Color, ScaleType} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-widget-pie-chart',
  template: `
    <div class="widget p-4 m-2 bg-white border border-gray-200 rounded-lg shadow">
      <ngx-charts-pie-chart
        [view]="view"
        [results]="info"
        [doughnut]="false"
        [labels]="true"
        [maxLabelLength]="15"
        [scheme]="colorScheme"
      />
    </div>
  `
})
export class WidgetPieChartComponent {
  @Input() info: any;
  view: [number, number] = [250, 250];

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#363636', "#FFC700", "#0094D3", "#00D387"]
  };
}
