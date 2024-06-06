import { WidgetDisplayType } from "../widget-display-type";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-widget",
  template: `
    <div class="widget p-4 m-2 bg-white border border-gray-200 rounded-lg shadow">
      <ng-content></ng-content>
    </div>

<!--    @if (widget.displayType === WidgetDisplayType.Pie) {-->
<!--      <app-widget-pie-chart [info]="widget.dataSource" />-->
<!--    }-->

<!--    <div class="widget p-4 m-2 bg-white border border-gray-200 rounded-lg shadow">-->
<!--      <ng-container [ngSwitch]="widget.displayType">-->
<!--        <app-widget-number *ngSwitchCase="WidgetDisplayType.Number" [widget]="widget"></app-widget-number>-->
<!--        <app-widget-pie-chart *ngSwitchCase="WidgetDisplayType.Pie" [info]="widget.dataSource.tasksByStatus"></app-widget-pie-chart>-->
<!--        <app-widget-vertical-bar-chart *ngSwitchCase="WidgetDisplayType.Vertical_bar" [info]="widget.dataSource.tasksByPriority"></app-widget-vertical-bar-chart>-->
<!--        &lt;!&ndash; Add other widget types here &ndash;&gt;-->
<!--        <div *ngSwitchDefault>Unknown widget type</div>-->
<!--      </ng-container>-->
<!--      <div *ngIf="isEditing" class="mt-2">-->
<!--        <label for="displayType">Change Display Type:</label>-->
<!--        <select id="displayType" [(ngModel)]="widget.displayType">-->
<!--          <option *ngFor="let type of widget.validDisplayTypes" [value]="type">{{ type }}</option>-->
<!--        </select>-->
<!--      </div>-->
<!--    </div>-->

<!--        @if (widget.displayType === WidgetDisplayType.Number) {-->
<!--    <app-widget-number [widget]="widget" />-->
<!--    } @else if (widget.displayType === WidgetDisplayType.Line_chart) {-->
<!--    &lt;!&ndash; <app-widget-line-chart [widget]="widget" /> &ndash;&gt;-->
<!--    } @else if (widget.displayType === WidgetDisplayType.Gauge) {-->
<!--    &lt;!&ndash; <app-widget-gauge [widget]="widget" /> &ndash;&gt;-->
<!--    } @else {-->
<!--    <div>Unknown widget type</div>-->
<!--    }-->
  `,
})
export class WidgetComponent {
  @Input() widget!: Widget;
  @Input() isEditing = false;
  WidgetDisplayType = WidgetDisplayType;
}
