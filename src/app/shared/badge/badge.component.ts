import { Component } from "@angular/core";
import { Input } from "@angular/core";

@Component({
  selector: "app-badge",
  template: `
    <div
      class="flex px-2 py-px rounded-full place-items-center text-xs font-medium leading-4 text-white w-32"
      [class]="badgeClass"
    >
      <span
        class="w-3 h-3 rounded-full self-start bg-white p-[7px] -ml-1 m-1"
      ></span>
      <span class="font-inter font-black flex-grow">{{
        status.toUpperCase()
      }}</span>
    </div>
  `,
})
export class BadgeComponent {
  @Input() status: string = "";

  get badgeClass(): string {
    switch (this.status) {
      case "En revisión":
        return "bg-inReview";
      case "Completado":
        return "bg-done";
      case "En proceso":
        return "bg-inProgress";
      case "No iniciado":
        return "bg-notStarted";
      default:
        return "";
    }
  }
}
