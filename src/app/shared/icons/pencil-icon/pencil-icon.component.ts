import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pencil-icon',
  template: `
    <svg
      *ngIf="detailed"
      width="352"
      height="352"
      viewBox="0 0 352 352"
      xmlns="http://www.w3.org/2000/svg"
      style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
      [style.width]="width"
      [style.height]="height"
    >
      <path
        d="M49.701,242.961l198.032,-198.031c-0,0 -1.976,9.338 23.599,34.914c25.576,25.575 34.914,23.599 34.914,23.599l-198.031,198.032c-12.531,12.531 -24.416,19.442 -37.069,19.442c-18.298,0 -40.826,-22.528 -40.826,-40.826c-0,-12.694 6.85,-24.599 19.381,-37.13Zm213.155,-135.429c-0,0 -5.568,-4.15 -10.315,-8.897c-4.747,-4.747 -8.897,-10.314 -8.897,-10.314l-173.193,173.193c-6.347,6.346 -10.167,12.047 -10.167,18.516c0,5.183 5.618,10.801 10.801,10.801c6.51,-0 12.231,-3.759 18.577,-10.106l173.194,-173.193Zm-6.171,-71.554l17.181,-17.181c12.612,-12.612 25.265,-18.878 37.959,-18.796c12.693,0.081 39.35,26.779 39.35,39.473c0,12.693 -6.265,25.306 -18.796,37.836l-17.181,17.181c0,0 -8.618,2.983 -35.057,-23.456c-26.439,-26.439 -23.456,-35.057 -23.456,-35.057Zm-249.335,314.938c-2.01,0.631 -4.204,0.093 -5.693,-1.397c-1.49,-1.489 -2.028,-3.683 -1.397,-5.693l17.893,-56.997c0.17,-0.538 0.695,-0.883 1.256,-0.823c0.562,0.059 1.004,0.505 1.057,1.067c1.093,6.611 4.558,17.844 15.176,28.461c10.617,10.618 21.85,14.083 28.458,15.206c0.548,0.051 0.984,0.482 1.041,1.029c0.058,0.548 -0.278,1.06 -0.803,1.225c-12.187,3.857 -41.344,13.011 -56.988,17.922Z"
        [style.fill]="fill"
      />
    </svg>
    <svg
      *ngIf="!detailed"
      width="354"
      height="352"
      viewBox="0 0 354 352"
      xmlns="http://www.w3.org/2000/svg"
      style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
      [style.width]="width"
      [style.height]="height"
    >
      <path
        d="M60.609,330.954l241.965,-241.743l-38.812,-39.034l-242.187,241.965l-21.07,49.236c-1.035,2.662 -0.48,5.138 1.664,7.43c2.144,2.292 4.546,2.92 7.208,1.885l51.232,-19.739Zm261.482,-260.817l22.4,-21.956c5.619,-5.766 8.576,-11.533 8.871,-17.299c0.296,-5.767 -2.07,-11.237 -7.097,-16.412l-7.54,-7.541c-5.027,-5.027 -10.461,-7.319 -16.301,-6.875c-5.841,0.444 -11.57,3.401 -17.189,8.871l-22.4,22.179l39.256,39.033Z"
        [style.fill]="fill"
      />
    </svg>
  `
})
export class PencilIconComponent {
  @Input() detailed: boolean = true;
  @Input() fill: string = '#ffffff';
  @Input() width: string = '27';
  @Input() height: string = '20';
}
