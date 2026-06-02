import {
  Directive,
  ElementRef,
  OnDestroy,
  afterNextRender,
  inject,
  input,
} from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-triggered reveal. Put `appReveal` on any element to fade + rise it
 * into view. Pass a CSS selector to `stagger` to animate matching children
 * in sequence (e.g. a grid of cards).
 *
 *   <div appReveal></div>
 *   <div appReveal stagger=".card"></div>
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements OnDestroy {
  /** child selector to stagger; empty = animate host itself */
  readonly stagger = input('');
  /** seconds of delay before the animation starts */
  readonly delay = input(0);

  private host = inject(ElementRef<HTMLElement>);
  private triggers: ScrollTrigger[] = [];

  constructor() {
    afterNextRender(() => this.play());
  }

  private play(): void {
    const el = this.host.nativeElement as HTMLElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const targets = this.stagger()
      ? Array.from(el.querySelectorAll(this.stagger()))
      : [el];

    if (!targets.length) return;

    if (reduce) {
      gsap.set(targets, { opacity: 1, y: 0, clearProps: 'all' });
      return;
    }

    const tween = gsap.fromTo(
      targets,
      { opacity: 0, y: 42 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        delay: this.delay(),
        stagger: this.stagger() ? 0.12 : 0,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      },
    );
    if (tween.scrollTrigger) this.triggers.push(tween.scrollTrigger);
  }

  ngOnDestroy(): void {
    this.triggers.forEach((t) => t.kill());
  }
}
