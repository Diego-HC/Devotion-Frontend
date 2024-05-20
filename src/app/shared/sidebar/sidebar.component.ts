import { Component } from "@angular/core";

@Component({
  selector: "app-sidebar",
  template: `
    <aside
      class="
        fixed z-20 flex flex-col justify-between w-16 min-h-screen
        rounded-r-xl shadow-lg bg-devotionPrimary text-white"
    >
      <div>
        <div class="flex flex-col py-3">
          <a href="/dashboard" class="flex flex-col place-items-center mt-16">
            <app-icon-sidebar
              iconType="dashboard"
              [selectedIcon]="currentView"
              (selectedIconChange)="onTabClick($event)"
            >
              <app-dashboard-icon
                class="col-start-1 row-start-1" height="30" width="30"
                [fill]="currentView === 'dashboard' ? '#2A4365' : '#FFFFFF'"
              />
            </app-icon-sidebar>
          </a>
        </div>
        <div class="py-3">
          <a href="/home" class="flex flex-col place-items-center">
            <app-icon-sidebar
              iconType="projects"
              [selectedIcon]="currentView"
              (selectedIconChange)="onTabClick($event)"
            >
              <app-projects-icon
                class="col-start-1 row-start-1" height="30" width="30"
                [fill]="currentView === 'projects' ? '#2A4365' : '#FFFFFF'"
              />
            </app-icon-sidebar>
          </a>
        </div>
        <div class="py-3">
          <a href="/files" class="flex flex-col place-items-center">
            <app-icon-sidebar
              iconType="files"
              [selectedIcon]="currentView"
              (selectedIconChange)="onTabClick($event)"
            >
              <app-files-icon
                class="col-start-1 row-start-1" height="30" width="30"
                [fill]="currentView === 'files' ? '#2A4365' : '#FFFFFF'"
              />
            </app-icon-sidebar>
          </a>
        </div>
      </div>

      <div class="flex flex-col items-center gap-2 px-2 py-7">
        <app-devotion-iso fill="#FFFFFF"/>
        <p class="text-white text-center" style="font-size:0.4rem">
          Powered by SALAD.
        </p>
      </div>
    </aside>
  `,
})
export class SidebarComponent {
  currentView: string = "projects";

  onTabClick(selectedIcon: string) {
    this.currentView = selectedIcon;
  }
}
