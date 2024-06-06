import { WidgetDisplayType } from "../widget-display-type";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-widget",
  template: `
    <div class="widget p-4 m-2 bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-start items-center">
      <h3 class="text-lg font-bold text-center mb-2">{{ widgetName }}</h3>
      <div class="w-full h-full flex justify-center items-center">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class WidgetComponent {
  @Input() widget!: Widget;
  @Input() widgetName: string = "";
  @Input() isEditing = false;
  WidgetDisplayType = WidgetDisplayType;
}
