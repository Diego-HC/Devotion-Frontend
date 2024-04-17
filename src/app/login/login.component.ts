import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
  <div class="flex h-screen">
    <div class="w-1/2 bg-cover bg-left-top relative" style="background-image: url('/assets/tec5.png');">
      <div class="absolute bottom-0 left-0 w-full text-left text-white p-2.5 flex justify-between">
        <div class="text-left leading-tight">
          <p class="font-bold text-4xl mb-[-20px] ml-20">DEV</p>
          <p class="text-4xl mb-[-20px] ml-20"><br>OTION</p>
        </div>
        <p class="text-2xl font-bold text-right mr-20 mb-1 leading-tight">La visión <br> hace la <br> ejecución.</p>
      </div>
    </div>
    <div class="w-1/2 p-5 flex flex-col justify-center items-center relative">
      <div class="flex justify-center mb-5">
        <app-devotion-logo>
          width = "75"
        </app-devotion-logo>
        <img class="mx-2.5" src="https://cdn.icon-icons.com/icons2/2518/PNG/512/x_icon_150997.png" style="width: 50px; height: 45px">
        <img class="mx-2.5" src="/assets/FSAE.png" style="width: 200px; height: 60px;">
      </div>
      <div class="title bg-white text-xl font-bold mb-2.5 px-0.5">
        <p>¿Tienes cuenta institucional?</p>
      </div>
      <div class="flex justify-center items-center gap-1.5">
        
          <button class="mbutton" class="bg-blue-800 text-white border-none rounded px-5 py-2.5 cursor-pointer flex items-center gap-1.5">
            Ingresar con Microsoft
            <img src="https://www.pngmart.com/files/4/Microsoft-Logo-PNG-Free-Download.png" alt="Microsoft Logo" class="h-5 w-auto">
          </button>
        
      </div>
      <p class="text-xs text-justify absolute bottom-5 left-5 right-5">DEVOTION (el "Software") es un proyecto sin fines de lucro. Propiedad intelectual, y mantenido por, Society of Academic Labor and Application Development (SALAD). 
        Hermenegildo Pérez Galaz es un nombre registrado, delegado para su uso en ejemplos y demostraciones por Mango Technologies, Inc., (antes BALLAD). DEVOTION,
        y su acrónimo “Development Environment for Visualization of Organizational Tasks Inspired Obviously by Notion”, son marcas pendientes de registrar.</p>
      <div class="absolute bottom-0 left-0 right-0 text-xs ml-5">
        <p>&copy; 2024 All Rights Reserved</p>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {}
