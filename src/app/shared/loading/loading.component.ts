import { Component, Input, OnInit } from "@angular/core";
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
      @if (tips === 'true') {
      <p class="text-center text-[#5E6377] font-robotoCondensed w-72">
        {{ tip }}
      </p>
      }
    </div>
  `,
})
export class LoadingComponent implements OnInit {
  tip = "";

  constructor(protected api: ApiService) {}

  ngOnInit(): void {
    this.tip = this.api.randomTip();
  }

  @Input() tips: string = "true";
}
