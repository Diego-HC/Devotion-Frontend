import { Component } from '@angular/core';

@Component({
  selector: 'app-task-create-edit-page',
  template: `
    <div class="overflow-x-auto mx-32">
      <div class="bg-white py-8 rounded-lg">
        <h2 class="font-roboto font-bold">
          Nueva Tarea
        </h2>
        <div class="flex flex-row items-center mt-2 gap-4">
          <input type="text"
                 class="input-md input-bordered input-['#5CCEFF'] md:w-5/12 text-3xl font-helvetica rounded-box font-bold shadow-md"/>
          <div class="flex flex-col items-center">
            <button class="btn-circle items-center justify-center" style="background-color: #2A4365">+</button>
            <p class="text-xs font-robotoCondensed">Publicar</p>
          </div>
        </div>
        <div class="flex flex-row items-center mt-2 gap-8">
          <div class="flex flex-col items-center">
            <h2 class="font-roboto font-bold">Fecha Inicio</h2>
            <input type="date" class="input-md input-bordered input-['#5CCEFF'] md:w-40 font-helvetica font-bold"/>
          </div>
          <div class="flex flex-col items-center">
            <h2 class="font-roboto font-bold">Fecha Fin</h2>
            <input type="date" class="input-md input-bordered input-['#5CCEFF'] md:w-40 font-helvetica font-bold"/>
          </div>
          <div class="flex flex-col items-center">
            <h2 class="font-roboto font-bold">Prioridad</h2>
            <div class="dropdown dropdown-right">
              <div tabindex="0" role="button" class="btn m-1">Click</div>
              <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Baja</a></li>
                <li><a>Media</a></li>
                <li><a>Alta</a></li>
              </ul>
            </div>
          </div>
        </div>
        <h2 class="font-roboto font-bold mt-4">Descripción</h2>
        <textarea class="textarea-md text-['#5CCEFF'] textarea-bordered w-1/2 h-40 rounded-box shadow-md"></textarea>
        <div class="w-1/2">
          <h2 class="font-roboto font-bold mt-4">Asignado</h2>
          <app-search-select></app-search-select>
        </div>
      </div>
    </div>
  `
})
export class TaskCreateEditPageComponent {

}
