import { WidgetDisplayType } from "../widget-display-type";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-widget",
  template: `
    @if (widget.displayType === WidgetDisplayType.Number) {
    <app-widget-number [widget]="widget" />
    } @else if (widget.displayType === WidgetDisplayType.LineChart) {
    <!-- <app-widget-line-chart [widget]="widget" /> -->
    } @else if (widget.displayType === WidgetDisplayType.Gauge) {
    <!-- <app-widget-gauge [widget]="widget" /> -->
    } @else {
    <div>Unknown widget type</div>
    }
  `,
})
export class WidgetComponent {
  @Input() widget!: Widget;
  WidgetDisplayType = WidgetDisplayType;
}
