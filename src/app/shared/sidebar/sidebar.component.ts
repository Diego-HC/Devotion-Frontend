import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <aside class= " sideBar
          fixed z-20 flex flex-col justify-between w-16 min-h-screen
          rounded-md rounded-bl-none rounded-tl-none
          shadow-lg
          text-white pr-16" 
          style = " background-color: #2A4365;" >
          
            <div class="px-2 py-7">
            <app-dashboard-icon fill="#FFFFFF">
            </app-dashboard-icon>
            <app-projects-icon fill="#FFFFFF">
            </app-projects-icon>
            <app-files-icon fill= "#FFFFFF">
            </app-files-icon>
            </div>

           <div class = " px-2 py-7">
              <p class = " text-white"> Inicio </p>
          </div>
    </aside>
  `
})
export class SidebarComponent {

}
