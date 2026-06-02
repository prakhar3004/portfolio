import {
  Component,
  OnDestroy,
  afterNextRender,
  signal,
} from '@angular/core';
import { PROFILE, STATS, AI_TOOLS } from '../data/portfolio.data';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-hero',
  imports: [RevealDirective],
  template: `
    <section
      id="home"
      class="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-28 pb-16"
    >
      <!-- grid backdrop -->
      <div class="cyber-grid pointer-events-none absolute inset-0"></div>
      <!-- ambient glows -->
      <div
        class="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan/20 blur-[120px]"
      ></div>
      <div
        class="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-violet/25 blur-[120px]"
      ></div>
      <div
        class="float pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-cyan/10 blur-[140px]"
      ></div>

      <div class="relative z-10 mx-auto max-w-5xl text-center">
        <!-- status -->
        <div
          appReveal
          class="mb-8 inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/5 px-4 py-1.5 font-mono text-xs text-lime"
        >
          <span class="pulse-dot h-2 w-2 rounded-full bg-lime"></span>
          Available for new opportunities
        </div>

        <!-- greeting -->
        <p
          appReveal
          [delay]="0.1"
          class="mb-4 font-mono text-sm uppercase tracking-[0.4em] text-cyan"
        >
          &lt; Hello World, I'm /&gt;
        </p>

        <!-- name -->
        <h1
          appReveal
          [delay]="0.15"
          class="font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl"
        >
          <span class="text-glow text-ink">{{ profile.firstName }}</span>
          <span class="shimmer block">{{ profile.lastName }}</span>
        </h1>

        <!-- typewriter role -->
        <div
          appReveal
          [delay]="0.25"
          class="mt-6 flex h-9 items-center justify-center font-mono text-lg text-muted sm:text-2xl"
        >
          <span class="text-faint">{{ '{' }}&nbsp;</span>
          <span class="text-gradient font-semibold">{{ typed() }}</span>
          <span class="cursor-blink ml-0.5 text-cyan">▋</span>
          <span class="text-faint">&nbsp;{{ '}' }}</span>
        </div>

        <!-- tagline -->
        <p
          appReveal
          [delay]="0.35"
          class="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {{ profile.tagline }}
        </p>

        <!-- AI tools strip -->
        <div
          appReveal
          [delay]="0.45"
          class="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <span class="font-mono text-xs uppercase tracking-wider text-faint"
            >Augmented with</span
          >
          @for (ai of aiTools; track ai.name) {
            <span
              class="group flex items-center gap-2 rounded-full border border-magenta/30 bg-magenta/5 px-4 py-1.5 text-sm transition-all hover:border-magenta/60 hover:shadow-[0_0_18px_rgba(255,65,248,0.25)]"
            >
              <span class="font-semibold text-ink">{{ ai.name }}</span>
              <span class="font-mono text-[10px] uppercase text-magenta/80">{{ ai.tag }}</span>
            </span>
          }
        </div>

        <!-- CTAs -->
        <div
          appReveal
          [delay]="0.55"
          class="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            class="group relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan to-violet px-7 py-3.5 font-semibold text-void shadow-[0_0_28px_rgba(77,124,255,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_48px_rgba(77,124,255,0.8)]"
          >
            <span class="btn-sheen"></span>
            <span class="relative z-10">View My Work →</span>
          </a>
          <a
            href="#contact"
            class="rounded-xl border border-white/15 px-7 py-3.5 font-semibold text-ink transition-all hover:border-cyan/50 hover:text-cyan"
          >
            Get In Touch
          </a>
        </div>

        <!-- stats -->
        <div
          appReveal
          stagger=".stat-card"
          class="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          @for (stat of stats; track stat.label) {
            <div
              class="stat-card glass glass-hover rounded-2xl p-5 text-center"
            >
              <div class="font-display text-3xl font-bold text-gradient sm:text-4xl">
                {{ stat.value }}
              </div>
              <div class="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted">
                {{ stat.label }}
              </div>
            </div>
          }
        </div>
      </div>

      <!-- scroll cue -->
      <a
        href="#about"
        class="absolute bottom-6 left-1/2 -translate-x-1/2 text-faint transition-colors hover:text-cyan"
        aria-label="Scroll down"
      >
        <div class="flex h-10 w-6 items-start justify-center rounded-full border border-current p-1.5">
          <span class="float h-2 w-1 rounded-full bg-current"></span>
        </div>
      </a>
    </section>
  `,
})
export class Hero implements OnDestroy {
  readonly profile = PROFILE;
  readonly stats = STATS;
  readonly aiTools = AI_TOOLS;

  readonly typed = signal('');
  private timer?: ReturnType<typeof setTimeout>;
  private roleIdx = 0;
  private charIdx = 0;
  private deleting = false;

  constructor() {
    afterNextRender(() => this.tick());
  }

  private tick(): void {
    const roles = this.profile.roles;
    const current = roles[this.roleIdx % roles.length];

    if (!this.deleting) {
      this.charIdx++;
      this.typed.set(current.slice(0, this.charIdx));
      if (this.charIdx === current.length) {
        this.deleting = true;
        this.timer = setTimeout(() => this.tick(), 1600);
        return;
      }
    } else {
      this.charIdx--;
      this.typed.set(current.slice(0, this.charIdx));
      if (this.charIdx === 0) {
        this.deleting = false;
        this.roleIdx++;
      }
    }
    this.timer = setTimeout(() => this.tick(), this.deleting ? 45 : 95);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
