import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
      <aside class= " sideBar
      fixed z-20 flex flex-col justify-between w-16 min-h-screen
      rounded-md rounded-bl-none rounded-tl-none
      shadow-lg
      text-white " 
      style = " background-color: #2A4365;" >
        <div class="px-2 py-7">
            <h1 class="text-xl font-semibold">Ola</h1>
        </div>
       <div class = " px-2 py-7">
          <p class = " text-white"> Inicio </p>
      </div>
</aside>
  `
})
export class SidebarComponent {

}
