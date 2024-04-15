import { Component } from '@angular/core';
import { Input } from "@angular/core";

@Component({
  selector: 'app-icon',
  template: `
<!--    <a data-view="{{iconType}}" (click)="onTabClick()">-->
<!--      <div>-->
<!--        <span class="col-start-1 row-start-1"></span>-->
<!--        <div class="flex flex-col place-items-center justify-center">-->
<!--          <div class="grid grid-cols-1 grid-rows-1 place-items-center h-12">-->
<!--                    <span class="col-start-1 row-start-1 bg-[#2A4365] rounded-full p-6"-->
<!--                          [ngClass]="{'hidden':selectedIcon !== iconType}"></span>-->
<!--            <img-->
<!--              src="../assets/coconut.webp"-->
<!--              alt="Coconut"-->
<!--              class="h-6 w-6 rounded-full col-start-1 row-start-1"-->
<!--            />-->
<!--          </div>-->
<!--          <span class="font-robotoCondensed">{{ iconType }}</span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </a>-->
  `
})
export class IconComponent {
  // @Input() iconType: string = "table";
  // @Input() selectedIcon: string = "table";
  //
  // onTabClick() {
  //   this.selectedIcon = this.iconType;
  // }
}
