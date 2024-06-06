import { WidgetDisplayType } from "../widget-display-type";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-widget",
  template: `
    <div class="flex flex-col justify-center items-center gap-2 m-2 p-2 bg-white border border-gray-200 rounded-lg shadow">
      <h3 class="text-lg font-bold text-center mb-2">{{ widgetName }}</h3>
      <ng-content></ng-content>
    </div>
  `,
})
export class WidgetComponent {
  @Input() widget!: Widget;
  @Input() widgetName: string = "";
  @Input() isEditing = false;
  WidgetDisplayType = WidgetDisplayType;
}
