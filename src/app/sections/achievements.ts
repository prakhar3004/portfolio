import { Component } from '@angular/core';
import { ACHIEVEMENTS } from '../data/portfolio.data';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-achievements',
  imports: [RevealDirective],
  template: `
    <section class="relative mx-auto max-w-6xl px-6 py-24">
      <div appReveal class="mb-14">
        <p class="font-mono text-xs uppercase tracking-[0.4em] text-cyan">05 — Recognition</p>
        <h2 class="mt-3 font-display text-4xl font-bold sm:text-5xl">
          Key <span class="text-gradient">Achievements</span>
        </h2>
      </div>

      <div appReveal stagger=".ach" class="grid gap-6 md:grid-cols-2">
        @for (a of achievements; track a.title; let i = $index) {
          <div class="ach glass glass-hover relative overflow-hidden rounded-2xl p-7">
            <span
              class="absolute right-5 top-4 font-display text-6xl font-extrabold text-white/5"
              >0{{ i + 1 }}</span
            >
            <span class="text-3xl">{{ i === 0 ? '🏆' : '⚡' }}</span>
            <h3 class="mt-3 font-display text-xl font-bold text-gradient">{{ a.title }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-muted">{{ a.detail }}</p>
          </div>
        }
      </div>

      <!-- AI-augmented banner -->
      <div
        appReveal
        [delay]="0.15"
        class="glass relative mt-6 overflow-hidden rounded-2xl border border-magenta/20 p-8 text-center"
      >
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan/5 via-violet/5 to-magenta/5"
        ></div>
        <p class="relative font-mono text-xs uppercase tracking-[0.4em] text-magenta">
          AI-Augmented Workflow
        </p>
        <p class="relative mx-auto mt-3 max-w-2xl text-lg text-ink/90">
          I work alongside <span class="font-semibold text-cyan">Claude</span>,
          <span class="font-semibold text-violet">GPT</span> and
          <span class="font-semibold text-magenta">Antigravity</span> — turning ideas
          into shipped features faster, with cleaner code and fewer bugs.
        </p>
      </div>
    </section>
  `,
})
export class Achievements {
  readonly achievements = ACHIEVEMENTS;
}
