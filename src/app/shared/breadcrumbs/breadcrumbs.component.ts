import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  template: `
    <nav
      class="fixed top-0 z-[9] w-full pt-[4.25rem] pb-[0.25rem] pl-20
             bg-[#F1F3F5] border-b border-gray-200 shadow-lg"
    >
      <ol class="flex flex-row items-center space-x-4">
        @for (level of this.breadcrumbs; track level[0])
        {
          <li>
            <h4 class="text-sm font-medium">
              <a [href]="(level[2] ? '/task/' : '/project/') + level[0]" class="text-sm font-medium">{{ level[1] }}</a>
              <span class="font-bold">ㅤ〉</span>
            </h4>
          </li>
        }
      </ol>
    </nav>
  `
})
export class BreadcrumbsComponent {
  @Input() breadcrumbs: any[][] = [];
}
