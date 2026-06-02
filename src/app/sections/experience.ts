import { Component } from '@angular/core';
import { EXPERIENCE } from '../data/portfolio.data';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-experience',
  imports: [RevealDirective],
  template: `
    <section id="experience" class="relative mx-auto max-w-6xl px-6 py-24">
      <div appReveal class="mb-14">
        <p class="font-mono text-xs uppercase tracking-[0.4em] text-cyan">03 — Journey</p>
        <h2 class="mt-3 font-display text-4xl font-bold sm:text-5xl">
          Work <span class="text-gradient">Experience</span>
        </h2>
      </div>

      <div class="relative">
        <!-- vertical line -->
        <div
          class="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-cyan via-violet to-transparent md:left-1/2"
        ></div>

        @for (job of experience; track job.company; let i = $index) {
          <div
            appReveal
            class="relative mb-10 pl-12 md:pl-0"
            [class.md:pr-[52%]]="i % 2 === 0"
            [class.md:pl-[52%]]="i % 2 !== 0"
          >
            <!-- node -->
            <span
              class="absolute left-2.5 top-6 z-10 grid h-4 w-4 place-items-center rounded-full bg-base ring-2 ring-cyan md:left-1/2 md:-translate-x-1/2"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-cyan"></span>
            </span>

            <div class="glass glass-hover rounded-2xl p-6 sm:p-7">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <h3 class="font-display text-xl font-bold text-ink">{{ job.role }}</h3>
                <span
                  class="rounded-full border border-cyan/30 bg-cyan/5 px-3 py-1 font-mono text-xs text-cyan"
                  >{{ job.period }}</span
                >
              </div>
              <p class="mt-1 font-mono text-sm text-violet">
                {{ job.company }} · <span class="text-faint">{{ job.location }}</span>
              </p>
              <p class="mt-3 text-sm leading-relaxed text-muted">{{ job.summary }}</p>

              <ul class="mt-4 space-y-2">
                @for (b of job.bullets; track b) {
                  <li class="flex gap-3 text-sm text-muted">
                    <span class="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-r from-cyan to-violet"></span>
                    <span>{{ b }}</span>
                  </li>
                }
              </ul>
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class Experience {
  readonly experience = EXPERIENCE;
}
