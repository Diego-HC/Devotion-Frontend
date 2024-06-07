import { Component, Input, Output, EventEmitter } from "@angular/core";
import { WidgetDisplayType, getDisplayTypeName } from "./widget-display-type";

@Component({
  selector: "app-widget",
  template: `
    <div class="flex flex-col justify-center items-center gap-2 m-2 p-2 bg-white border border-gray-200 rounded-lg shadow">
      <div class="flex flex-row justify-end items-start w-full px-2">
        <h3 class="text-lg font-bold w-full text-center mb-2">{{ metricName }}</h3>
        @if (displayTypes.length !== 0) {
          <div
            class="dropdown dropdown-right"
          >
            <div tabindex="0" role="button" class="text-lg cursor-pointer text-[#5E6377]">•••</div>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              @for (displayType of displayTypes; track $index) {
                <li>
                  <button
                    (click)="this.onDisplayTypeChange.emit({ metricName: metricId, displayType: displayType.valueOf() })"
                  >
                    {{ getDisplayTypeName(displayType) }}
                  </button>
                </li>
              }
            </ul>
          </div>
        }
      </div>
      <ng-content></ng-content>
    </div>
  `,
})
export class WidgetComponent {
  @Input() metricId: string = "";
  @Input() metricName: string = "";
  @Input() displayTypes: WidgetDisplayType[] = [];
  @Output() onDisplayTypeChange = new EventEmitter<{ metricName: string, displayType: number }>();
  protected readonly getDisplayTypeName = getDisplayTypeName;
}
