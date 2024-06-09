import { Component, Input, Output, EventEmitter } from "@angular/core";
import { WidgetDisplayType, getDisplayTypeName } from "./widget-display-type";
import { StoreService } from "../../store.service";

@Component({
  selector: "app-widget",
  template: `
    <div class="flex flex-col h-full items-center gap-2 m-2 p-2 bg-white border border-gray-200 rounded-lg shadow">
      <div class="flex flex-row justify-end items-start w-full px-2">
        <h3 class="text-lg font-bold w-full text-center mb-2">{{ metricName }}</h3>
        @if (displayTypes.length !== 0) {
          <div
            class="dropdown dropdown-left"
            [class.open]="dropdownOpen"
          >
            <div
              tabindex="0"
              role="button"
              class="text-lg cursor-pointer text-[#5E6377]"
            >•••</div>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              @for (displayType of displayTypes; track $index) {
                <li>
                  <button
                    (click)="this.changeDisplayType({ metricId, displayType: displayType.valueOf() })"
                  >
                    {{ getDisplayTypeName(displayType) }}
                  </button>
                </li>
              }
            </ul>
          </div>
        }
      </div>
      @if (store.updatingWidget === metricId) {
        <div class="w-full h-full flex flex-col justify-center items-center">
          <video autoplay loop muted class="w-20">
            <source src="/assets/animation.mp4" type="video/mp4"/>
            Video not supported
          </video>
        </div>
      } @else {
        <ng-content></ng-content>
      }
    </div>
  `,
})
export class WidgetComponent {
  constructor(protected store: StoreService) { }

  @Input() metricId: string = "";
  @Input() metricName: string = "";
  @Input() displayTypes: WidgetDisplayType[] = [];
  @Output() onDisplayTypeChange = new EventEmitter<{ metricId: string, displayType: number }>();

  dropdownOpen = false;

  changeDisplayType(data: { metricId: string, displayType: number }) {
    this.dropdownOpen = false;
    this.onDisplayTypeChange.emit(data);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  protected readonly getDisplayTypeName = getDisplayTypeName;
}
