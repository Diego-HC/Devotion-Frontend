import { Component } from '@angular/core';

@Component({
  selector: 'app-kanban-card',
  template: `
  <div class = "flex w-11/12"> 
    <div class = "flex flex-col mb-3 w-full">
      <div class = "flex align-middle place-items-center mb-3">
        <div class = "shadow-sm w-2 h-2 bg-notStarted rounded-full border-gray-500 border-solid mr-1"></div>
        <h1 class = "mx-1 align-middle font-bold font-roboto"> No iniciado </h1>
        <div class = "flex place-items-center justify-center bg-[#363636] h-4 w-4 text-xs rounded-sm text-white font-medium ml-2"> 1 </div>
      </div>
      <div class = "flex bg-white shadow-md w-full border-gray-500 rounded-sm">
        <div class = "w-1 h-full bg-notStarted rounded-sm"></div>
          <div class = "flex flex-col">
            <h1 class = "font-bold font-robotoCondensed ml-2 mt-1">  Task 1 </h1>
            <h1 class = "ml-2 mb-1"> Assignee 1 </h1>
          </div>
      </div>
    </div>
  </div>
  `
})
export class KanbanCardComponent {

}
