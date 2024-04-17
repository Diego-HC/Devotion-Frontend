import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-icon',
  template: `
    <a (click)="changeSelectedIcon(iconType)">
      <div>
        <span class="col-start-1 row-start-1"></span>
        <div class="flex flex-col place-items-center justify-center">
          <div class="grid grid-cols-1 grid-rows-1 place-items-center h-12">
                    <span class="col-start-1 row-start-1 bg-[#2A4365] rounded-full p-6"
                          [ngClass]="{'hidden':selectedIcon !== iconType}"></span>
            <ng-content></ng-content>
          </div>
          <span class="font-robotoCondensed">{{ iconName }}</span>
        </div>
      </div>
    </a>
  `,
})
export class IconComponent {
  @Input() iconType: string = "table";
  @Input() selectedIcon: string = "table";
  @Output() selectedIconChange = new EventEmitter<string>();
    iconName: string = '';
  changeSelectedIcon(selectedIcon: string) {
    this.selectedIcon = selectedIcon;
    this.selectedIconChange.emit(this.selectedIcon);
  }
  ngOnInit() {
    switch (this.iconType) {
        case 'table':
            this.iconName = 'Tabla';
            break;
        case 'kanban':
            this.iconName = 'Kanban';
            break;
        case 'calendar':
            this.iconName = 'Calendario';
            break;
        case 'roadmap':
            this.iconName = 'Roadmap';
            break;
        default:
            this.iconName = 'Tabla';
    }
  }
}
