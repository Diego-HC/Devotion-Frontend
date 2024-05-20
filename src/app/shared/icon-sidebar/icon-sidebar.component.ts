import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-icon-sidebar',
  template: `
    <a (click)="changeSelectedIcon(iconType)">
      <div>
        <span class="col-start-1 row-start-1"></span>
        <div class="flex flex-col place-items-center justify-center">
          <div class="grid grid-cols-1 grid-rows-1 place-items-center h-12">
                    <span class="col-start-1 row-start-1 bg-white rounded-full p-6"
                          [ngClass]="{'hidden':selectedIcon !== iconType}"></span>
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </a>
  `
})
export class IconSidebarComponent {
  @Input() iconType: string = "projects";
  @Input() selectedIcon: string = "projects";
  @Output() selectedIconChange = new EventEmitter<string>();
  iconName: string = '';
  changeSelectedIcon(selectedIcon: string) {
    this.selectedIcon = selectedIcon;
    this.selectedIconChange.emit(this.selectedIcon);
  }

  ngOnInit() {
    switch (this.iconType) {
      case 'dashboard':
        this.iconName = 'Dashboard';
        break;
      case 'projects':
        this.iconName = 'Proyectos';
        break;
      case 'files':
        this.iconName = 'Archivos';
        break;
      default:
        this.iconName = 'Proyectos';
    }
  }

}
