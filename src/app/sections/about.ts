import { Component } from '@angular/core';
import { PROFILE, EDUCATION, LANGUAGES } from '../data/portfolio.data';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-about',
  imports: [RevealDirective],
  template: `
    <section id="about" class="relative mx-auto max-w-6xl px-6 py-24">
      <!-- heading -->
      <div appReveal class="mb-14">
        <p class="font-mono text-xs uppercase tracking-[0.4em] text-cyan">01 — About</p>
        <h2 class="mt-3 font-display text-4xl font-bold sm:text-5xl">
          Who <span class="text-gradient">I Am</span>
        </h2>
      </div>

      <div class="grid gap-8 lg:grid-cols-5">
        <!-- terminal bio -->
        <div appReveal class="lg:col-span-3">
          <div class="glass overflow-hidden rounded-2xl">
            <div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <span class="h-3 w-3 rounded-full bg-magenta/70"></span>
              <span class="h-3 w-3 rounded-full bg-lime/70"></span>
              <span class="h-3 w-3 rounded-full bg-cyan/70"></span>
              <span class="ml-3 font-mono text-xs text-faint">~/prakhar/about.md</span>
            </div>
            <div class="space-y-4 p-6 font-mono text-sm leading-relaxed sm:p-8">
              <p class="text-faint">
                <span class="text-cyan">const</span>
                <span class="text-ink"> engineer</span> =
                <span class="text-magenta">"Full Stack + AI"</span>;
              </p>
              <p class="text-muted">{{ profile.about }}</p>
              <p class="text-faint">
                <span class="text-cyan">return</span>
                <span class="text-lime"> shipFast &amp;&amp; shipClean</span>;
              </p>
            </div>
          </div>
        </div>

        <!-- side facts -->
        <div appReveal stagger=".fact" [delay]="0.1" class="space-y-5 lg:col-span-2">
          <div class="fact glass glass-hover rounded-2xl p-6">
            <p class="font-mono text-xs uppercase tracking-wider text-cyan">Education</p>
            <h3 class="mt-2 font-display text-lg font-semibold text-ink">{{ education.degree }}</h3>
            <p class="mt-1 text-sm text-muted">{{ education.school }}</p>
            <p class="mt-1 font-mono text-xs text-faint">{{ education.period }}</p>
            <p class="mt-3 text-sm leading-relaxed text-muted">{{ education.detail }}</p>
          </div>

          <div class="fact glass glass-hover rounded-2xl p-6">
            <p class="font-mono text-xs uppercase tracking-wider text-violet">Based In</p>
            <h3 class="mt-2 font-display text-lg font-semibold text-ink">{{ profile.location }}</h3>
            <div class="mt-4 flex flex-wrap gap-2">
              @for (lang of languages; track lang) {
                <span
                  class="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-muted"
                  >{{ lang }}</span
                >
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class About {
  readonly profile = PROFILE;
  readonly education = EDUCATION;
  readonly languages = LANGUAGES;
}
