import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-left-chevron-icon',
  template: `
    <svg
      width="100"
      height="160"
      viewBox="0 0 100 160"
      xmlns="http://www.w3.org/2000/svg"
      style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
      [style.width]="width"
      [style.height]="height"
    >
      <path
        d="M89.603,150.305c-5.321,5.32 -13.947,5.32 -19.267,-0c-21.263,-21.263 -70.336,-70.336 -70.336,-70.336c0,0 49.073,-49.073 70.336,-70.335c5.32,-5.321 13.946,-5.321 19.267,-0c0,-0 0,0 0.001,0.001c5.32,5.32 5.32,13.946 -0,19.267c-17.121,17.121 -51.068,51.067 -51.068,51.067c0,0 33.947,33.946 51.068,51.067c5.32,5.321 5.32,13.947 -0,19.268c-0.001,0 -0.001,0 -0.001,0.001Z"
        [style.fill]="fill"
      />
    </svg>
  `
})
export class LeftChevronIconComponent {
  @Input() fill: string = '#2A4365';
  @Input() width: string = '10';
  @Input() height: string = '16';
}
