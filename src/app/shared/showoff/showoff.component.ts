import { Component } from '@angular/core';

@Component({
  selector: 'app-showoff',
  template: `
    <div class="w-full h-[calc(100vh-180px)] flex flex-col justify-center items-center">
      <video autoplay loop muted width="400">
        <source src="/assets/animation.mp4" type="video/mp4"/>
        Video not supported
      </video>
    </div>
  `
})
export class ShowoffComponent {

}
