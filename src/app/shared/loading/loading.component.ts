import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { ApiService } from "../../api.service";

@Component({
  selector: "app-loading",
  template: `
    <div
      class="flex flex-col justify-center items-center w-[100vw] h-[100vh] mt-[-64px] gap-6"
    >
      <video autoplay loop muted class="w-20">
        <source src="/assets/animation.mp4" type="video/mp4" />
        Video not supported
      </video>
      @if (message !== 'none') {
        <p class="text-center text-[#5E6377] font-robotoCondensed w-72">
          {{ tipOrMessage }}
        </p>
      }
    </div>
  `,
})
export class LoadingComponent implements OnInit, OnChanges {
  tipOrMessage = "";

  constructor(private api: ApiService) {}

  @Input() message: string = "tips";

  ngOnInit(): void {
    this.tipOrMessage = this.message === 'tips' ? this.api.randomTip() : this.message
  }

  ngOnChanges(): void {
    this.tipOrMessage = this.message === 'tips' ? this.api.randomTip() : this.message
  }
}
