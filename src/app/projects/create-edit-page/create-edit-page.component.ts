import { Component, OnInit } from '@angular/core';
import { ApiService} from "../../api.service";

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
            <textarea rows = "4" class="textarea textarea-bordered mr-4 shadow-md font-robotoCondensed text-s w-full min-h-10"></textarea>
          </div>
          <h1 class=" text-l font-roboto font-extrabold mb-3 mt-3">Líderes</h1>
          <app-search-select></app-search-select>
          <h1 class=" text-l font-roboto font-extrabold mb-3 mt-3">Miembros</h1>
          <app-search-select></app-search-select>
        </form>
      </div>
    </div>
  </div>
  `
})
export class CreateEditPageComponent implements OnInit {
  constructor(private api: ApiService) { }

  response: any;

  ngOnInit() {
    this.api.post('projects/', {}, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0Njc0MzIyLCJpYXQiOjE3MTMzNzgzMjIsImp0aSI6IjRkNGY2MDI0Nzg2NjQ3Y2ZiM2IwNTZhNWI4MDBmYmMxIiwidXNlcl9pZCI6IjI5YzQxNzk0LTAzM2QtNDRlYS05ZWY4LWExMjcxNjZiYmE1NSJ9.yEmFdABl4Mt9YmS-kSoD1QsGi4m73vhBYhkGHt-yJUA").subscribe((response) => {
      console.log(response);
      this.response = response;
    });
  }
}
