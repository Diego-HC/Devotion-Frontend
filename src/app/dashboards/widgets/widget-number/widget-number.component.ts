import { Component, Input } from "@angular/core";

@Component({
  selector: "app-widget-number",
  template: `
    <p>hola</p>
  `,
})
export class WidgetNumberComponent {
  @Input() widget!: Widget;
  value = 10000.120;
}
