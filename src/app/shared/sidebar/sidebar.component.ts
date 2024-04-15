import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <aside class=" sideBar
          fixed z-20 flex flex-col justify-between w-16 min-h-screen
          rounded-md rounded-bl-none rounded-tl-none
          shadow-lg
          text-white"
           style=" background-color: #2A4365;">
      <div>
        <div class="flex flex-col py-3">
          <a href="" class="flex flex-col place-items-center mt-16">
            <app-dashboard-icon fill="#FFFFFF" [height]="'30'" [width]="'30'"/>
            <p class="text-white font-bold" style="font-size:0.6rem">Dashboard</p>
          </a>
        </div>
        <div class="py-3">
          <a href="" class="flex flex-col place-items-center">
            <app-projects-icon fill="#FFFFFF" [height]="'30'" [width]="'30'"/>
            <p class="text-white font-bold py-1.5" style="font-size:0.6rem">Proyectos</p>
          </a>
        </div>
        <div class="py-3">
          <a href="" class="flex flex-col place-items-center">
            <app-files-icon fill="#FFFFFF" [height]="'30'" [width]="'30'"/>
            <p class="text-white font-bold py-1.5" style="font-size:0.6rem">Archivos</p>
          </a>
        </div>
      </div>


      <div class=" px-2 py-7">
        <p class=" text-white font-robotoCondensed"> DEV<br>OTION. </p>
      </div>
    </aside>
  `
})
export class SidebarComponent {

}
