import { Component, Input } from '@angular/core';
import {Color, ScaleType} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-widget-vertical-bar-chart',
  template: `
    <div class="widget p-4 m-2 bg-white border border-gray-200 rounded-lg shadow">
      <ngx-charts-bar-vertical
        [view]="view"
        [results]="info"
        [scheme]="colorScheme"
        [xAxis]="true"
      />
    </div>
  `
})
export class WidgetVerticalBarChartComponent {
  @Input() info: any;
  view: [number, number] = [400, 400];

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#363636', "#FFC700", "#0094D3", "#00D387"]
  };
}
