import { Component, Input } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-loading',
  template: `
    <div class="flex flex-col justify-center items-center w-[100vw] h-[100vh] mt-[-64px] gap-6">
      <video autoplay loop muted class="w-20">
        <source src="/assets/animation.mp4" type="video/mp4" />
        Video not supported
      </video>
      <p *ngIf="tips === 'true'" class="text-center text-[#5E6377] font-robotoCondensed w-72">{{ this.api.randomTip() }}</p>
    </div>
  `
})
export class LoadingComponent {
  constructor(protected api: ApiService) { }

  @Input() tips: string = "true"
}
