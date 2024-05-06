import { Component, Input } from "@angular/core";

@Component({
  selector: "app-widget-number",
  template: `
    <div class="flex flex-col w-52 h-52 bg-slate-200 rounded-lg py-3 px-5">
      <h2 class="text-xl font-bold truncate">{{ widget.name }}</h2>
      <div class="flex flex-grow w-full items-center justify-center">
        <p class="text-5xl font-black">
          {{
            value.toPrecision(5).length > 6
              ? value.toPrecision(2)
              : value.toPrecision(5)
          }}
        </p>
        <p class="text-3xl">{{ widget.unit }}</p>
      </div>
    </div>
  `,
})
export class WidgetNumberComponent {
  @Input() widget!: Widget;
  value = 9;
}
