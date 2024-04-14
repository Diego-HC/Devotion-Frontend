import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="
    bg-white
    p-4 fixed z-10 w-full shadow-lg">
        <div class="min-w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-full items-center">
          <!-- Aquí puedes colocar el contenido de tu navbar -->
          <div class = "px-10">Logo</div>
          <div>Opciones</div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {

}
