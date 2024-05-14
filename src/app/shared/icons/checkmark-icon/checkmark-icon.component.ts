import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkmark-icon',
  template: `
    <svg
      width="204"
      height="154"
      viewBox="0 0 204 154"
      xmlns="http://www.w3.org/2000/svg"
      style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
      [style.width]="width"
      [style.height]="height"
    >
      <path
        d="M68.376,153.991c0,-0 -39.902,-39.902 -58.742,-58.743c-5.321,-5.321 -5.321,-13.947 -0,-19.267c-0,-0.001 0,-0.001 0.001,-0.001c5.32,-5.321 13.946,-5.321 19.267,-0c14.3,14.3 39.474,39.474 39.474,39.474c0,0 78.083,-78.082 105.821,-105.82c5.321,-5.321 13.947,-5.321 19.267,-0c0.001,-0 0.001,0 0.001,0.001c5.321,5.32 5.321,13.946 0,19.267c-30.833,30.833 -125.089,125.089 -125.089,125.089Z"
        [style.fill]="fill"
      />
    </svg>
  `
})
export class CheckmarkIconComponent {
  @Input() fill: string = '#ffffff';
  @Input() width: string = '27';
  @Input() height: string = '20';
}
