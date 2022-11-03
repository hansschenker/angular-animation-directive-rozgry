import { Directive, Input } from '@angular/core';
import { ElementRef } from '@angular/core';
import {
  AnimationPlayer,
  AnimationBuilder,
  AnimationMetadata,
  animate,
  style,
  trigger,
  transition,
} from '@angular/animations';

const fadeInAnimation: AnimationMetadata[] = [
  style({ opacity: 0 }),
  animate('2000ms ease-in', style({ opacity: 1 })),
];

const fadeOutAnimation: AnimationMetadata[] = [
  style({ opacity: '*' }),
  animate('2000ms ease-in', style({ opacity: 0 })),
];

@Directive({
  selector: '[animeFadeInOut]',
})
export class FadeInOutDirective {
  private player: AnimationPlayer;

  @Input('animeFadeInOut')
  set show(show: boolean) {
    const metadata = show ? fadeInAnimation : fadeOutAnimation;
    this.triggerAnimation(metadata);
  }

  constructor(private builder: AnimationBuilder, private el: ElementRef) {}

  private triggerAnimation(metadata: AnimationMetadata | AnimationMetadata[]) {
    if (this.player) {
      this.player.destroy();
    }

    const factory = this.builder.build(metadata);
    const player = factory.create(this.el.nativeElement);

    player.play();
  }
}
