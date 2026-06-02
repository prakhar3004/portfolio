import { Component } from '@angular/core';
import { PROJECTS, Project } from '../data/portfolio.data';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-projects',
  imports: [RevealDirective],
  template: `
    <section id="projects" class="relative mx-auto max-w-6xl px-6 py-24">
      <div appReveal class="mb-14">
        <p class="font-mono text-xs uppercase tracking-[0.4em] text-cyan">04 — Work</p>
        <h2 class="mt-3 font-display text-4xl font-bold sm:text-5xl">
          Featured <span class="text-gradient">Projects</span>
        </h2>
        <p class="mt-4 max-w-xl text-muted">
          Enterprise platforms I helped design, build and harden — from catering
          operations to nationwide fleet logistics.
        </p>
      </div>

      <div appReveal stagger=".proj-card" class="grid gap-6 lg:grid-cols-2">
        @for (p of projects; track p.name) {
          <article
            class="proj-card glass glass-hover group relative overflow-hidden rounded-3xl p-7 sm:p-8"
            [class]="border(p.accent)"
          >
            <!-- big glow -->
            <div
              class="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-[80px] transition-opacity duration-500 group-hover:opacity-50"
              [class]="glow(p.accent)"
            ></div>

            <div class="flex items-start justify-between gap-4">
              <div>
                <h3
                  class="font-display text-2xl font-extrabold tracking-tight"
                  [class]="text(p.accent)"
                >
                  {{ p.name }}
                </h3>
                <p class="mt-1 font-mono text-xs uppercase tracking-wider text-faint">
                  {{ p.category }}
                </p>
              </div>
              <span
                class="grid h-12 w-12 flex-none place-items-center rounded-2xl border border-white/10 bg-white/5 text-lg transition-transform group-hover:-rotate-12"
                [class]="text(p.accent)"
                >◰</span
              >
            </div>

            <p class="mt-4 text-sm leading-relaxed text-muted">{{ p.blurb }}</p>

            <ul class="mt-5 space-y-2">
              @for (h of p.highlights; track h) {
                <li class="flex gap-2.5 text-sm text-ink/90">
                  <span [class]="text(p.accent)">▹</span>
                  <span>{{ h }}</span>
                </li>
              }
            </ul>

            <div class="mt-6 flex flex-wrap gap-2 border-t border-white/5 pt-5">
              @for (s of p.stack; track s) {
                <span
                  class="rounded-md bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-muted"
                  >{{ s }}</span
                >
              }
            </div>
          </article>
        }
      </div>
    </section>
  `,
})
export class Projects {
  readonly projects = PROJECTS;

  private readonly textMap: Record<Project['accent'], string> = {
    cyan: 'text-cyan',
    violet: 'text-violet',
    magenta: 'text-magenta',
  };
  private readonly borderMap: Record<Project['accent'], string> = {
    cyan: 'hover:border-cyan/40',
    violet: 'hover:border-violet/40',
    magenta: 'hover:border-magenta/40',
  };
  private readonly glowMap: Record<Project['accent'], string> = {
    cyan: 'bg-cyan',
    violet: 'bg-violet',
    magenta: 'bg-magenta',
  };

  text(a: Project['accent']) {
    return this.textMap[a];
  }
  border(a: Project['accent']) {
    return this.borderMap[a];
  }
  glow(a: Project['accent']) {
    return this.glowMap[a];
  }
}
