import { Component } from '@angular/core';

@Component({
  selector: 'app-create-edit-page',
  template: `
  <div class = "px-16">
    <div class = "flex justify-center items-center">
      <div class="px-12 lg:w-1/2 py-10">
        <h1 class=" text-l font-roboto font-extrabold">Nuevo Proyecto</h1>
        <form>
          <div class = "flex flex-row flex-grow items-center justify-center">
            <input type="text" class="input input-bordered flex-grow mr-4 shadow-md font-helvetica font-bold text-3xl" />
            <div class = "flex flex-col items-center">
              <button class = "btn-circle items-center justify-center mt-4" style = "background-color: #2A4365">+</button>
              <p class = "text-xs font-robotoCondensed">Publicar</p>
            </div>
          </div>
          
          <div class = "flex flex-col flex-grow justify-center">
          <h1 class=" text-l font-roboto font-extrabold mb-3">Descripción</h1>
            <textarea rows = "4" class="textarea textarea-bordered mr-4 shadow-md font-helvetica font-bold text-3xl w-full min-h-10"></textarea>
          </div>
          <app-search-select></app-search-select>
        </form>
      </div>
    </div>
  </div>
  `
})
export class CreateEditPageComponent {

}
