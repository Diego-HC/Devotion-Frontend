import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `<app-navbar /> <router-outlet /> `,
})
export class AppComponent {
  title = "Devotion";
}
