import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="bg-white py-3 fixed z-10 w-full shadow-lg">
      <div class="min-w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-full items-center">
          <div class = "flex flex-grow pl-20 pr-10">
            <a href="/"><app-devotion-logo fill="#000000" width="100" height="35" /></a>
            <h1 class="font-semibold text-2xl pl-8 text-black">Administración de Proyectos</h1>
          </div>

          <div class="flex items-center justify-end pr-2">
          <img src="https://soymotor.com/sites/default/files/2024-02/sergio-perez-2024.png" class="w-10 rounded-full" />
            <h1 class="px-5 align-middle font-robotoCondensed">Hermenegildo</h1>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {

}
