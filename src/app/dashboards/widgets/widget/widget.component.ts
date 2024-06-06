import { WidgetDisplayType } from "../widget-display-type";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-widget",
  template: `
    <div class="widget p-4 m-2 bg-white border border-gray-200 rounded-lg shadow">
        <ng-content></ng-content>
    </div>
  `,
})
export class WidgetComponent {
  @Input() widget!: Widget;
  @Input() isEditing = false;
  WidgetDisplayType = WidgetDisplayType;
}
