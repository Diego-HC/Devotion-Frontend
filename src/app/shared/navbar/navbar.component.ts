import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="
    bg-white
    p-4 fixed z-10 w-full shadow-lg">
        <div class="min-w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-full items-center">
          <div class = "flex flex-grow px-10">
            <app-devotion-logo>
              height = "15"
              width = "55"
            </app-devotion-logo>
            <h1 class = "font-robotoCondensed font-extrabold text-3xl pl-8">Administración de Proyectos</h1>
          </div>

          <div class = "flex items-center justify-end pr-2">
          <img src = "https://soymotor.com/sites/default/files/2024-02/sergio-perez-2024.png" class = " w-10 rounded-full" />
            <h1 class = "px-5 align-middle font-robotoCondensed"> Hermenegildo </h1> 
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {

}
