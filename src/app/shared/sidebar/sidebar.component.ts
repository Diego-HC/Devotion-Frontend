import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <aside class= " sideBar
          fixed z-20 flex flex-col justify-between w-16 min-h-screen
          rounded-md rounded-bl-none rounded-tl-none
          shadow-lg
          text-white" 
          style = " background-color: #2A4365;" >
      <div class="flex flex-col py-7 items-center mt-16"> 
        <div class="flex flex-col py-3">
          <a href=""><app-dashboard-icon fill="#FFFFFF" height="24"/>
          <p class="text-white font-bold" style="font-size:0.6rem">Dashboard</p>
          </a>
        </div>
        <div class="py-3">
        <a href=""><app-projects-icon fill="#FFFFFF" height = "32"  />
        <p class="text-white font-bold" style="font-size:0.6rem">Proyectos</p>
        </a>
        </div>
        <div class="py-3">
        <a href=""><app-files-icon fill= "#FFFFFF" height = "30" />
        <p class="text-white font-bold" style="font-size:0.6rem">Archivos</p>
        </a>
        </div>
      </div>
            
            

      <div class = " px-2 py-7">
        <p class = " text-white font-robotoCondensed"> DEV<br>OTION. </p>
      </div>
    </aside>
  `
})
export class SidebarComponent {

}
