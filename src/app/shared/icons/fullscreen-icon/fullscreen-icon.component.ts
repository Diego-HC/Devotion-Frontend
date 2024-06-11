import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fullscreen-icon',
  template: `
    <svg
      width="149"
      height="149"
      viewBox="0 0 149 149"
      xmlns="http://www.w3.org/2000/svg"
      style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
      [style.width]="width"
      [style.height]="height"
    >
      <path
        d="M0,148.652l0,-60.702c0,-7.524 6.1,-13.624 13.625,-13.624c7.524,-0 13.624,6.1 13.624,13.624l0,14.184l74.885,-74.885l-14.184,0c-7.524,0 -13.624,-6.1 -13.624,-13.624c-0,-7.525 6.1,-13.625 13.624,-13.625l60.702,0l-0,60.702c-0,7.524 -6.101,13.624 -13.625,13.624c-7.524,-0 -13.625,-6.1 -13.625,-13.624l0,-14.184l-74.884,74.884l14.184,0c7.524,0 13.624,6.101 13.624,13.625c-0,7.524 -6.1,13.625 -13.624,13.625l-60.702,-0Z"
        [style.fill]="fill"
      />
    </svg>
  `
})
export class FullscreenIconComponent {
  @Input() fill: string = '#2A4365';
  @Input() width: string = '10';
  @Input() height: string = '16';
}
