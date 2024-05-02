import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks-loading',
  template: `
    <p class="fixed bottom-2 right-2 z-30 bg-white text-sm text-[#5E6377] p-1 px-4 rounded-md border border-[#5E6377]">
      Cargando elementos...
    </p>
  `
})
export class TasksLoadingComponent { }
