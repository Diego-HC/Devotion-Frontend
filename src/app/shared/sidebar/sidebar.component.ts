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
          <a href="" class="flex flex-col place-items-center mt-16">
            <app-dashboard-icon fill="#FFFFFF" height="30" width="30" />
            <p class="text-white" style="font-size:0.6rem">
              Dashboard
            </p>
          </a>
        </div>
        <div class="py-3">
          <a href="/home" class="flex flex-col place-items-center">
            <app-projects-icon fill="#FFFFFF" height="30" width="30" />
            <p class="text-white py-1.5" style="font-size:0.6rem">
              Proyectos
            </p>
          </a>
        </div>
        <div class="py-3">
          <a href="" class="flex flex-col place-items-center">
            <app-files-icon fill="#FFFFFF" height="30" width="30" />
            <p class="text-white py-1.5" style="font-size:0.6rem">
              Archivos
            </p>
          </a>
        </div>
      </div>

      <div class="flex flex-col items-center gap-2 px-2 py-7">
        <app-devotion-iso fill="#FFFFFF" />
        <p class="text-white text-center" style="font-size:0.4rem">
          Powered by SALAD.
        </p>
      </div>
    </aside>
  `,
})
export class SidebarComponent {}
