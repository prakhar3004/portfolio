import { Component } from '@angular/core';
import { SKILL_GROUPS, SkillGroup } from '../data/portfolio.data';
import { RevealDirective } from '../shared/reveal.directive';

interface AccentClasses {
  text: string;
  border: string;
  glow: string;
  chip: string;
}

@Component({
  selector: 'app-skills',
  imports: [RevealDirective],
  template: `
    <section id="skills" class="relative mx-auto max-w-6xl px-6 py-24">
      <div appReveal class="mb-14">
        <p class="font-mono text-xs uppercase tracking-[0.4em] text-cyan">02 — Skills</p>
        <h2 class="mt-3 font-display text-4xl font-bold sm:text-5xl">
          Tech <span class="text-gradient">Arsenal</span>
        </h2>
        <p class="mt-4 max-w-xl text-muted">
          A full-stack toolkit — from Angular &amp; .NET Core to an AI layer that
          supercharges how I design, debug and ship.
        </p>
      </div>

      <div appReveal stagger=".skill-card" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        @for (group of groups; track group.title) {
          <div
            class="skill-card glass glass-hover group relative overflow-hidden rounded-2xl p-6"
            [class]="accent(group.accent).border"
          >
            <!-- corner glow -->
            <div
              class="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
              [class]="accent(group.accent).glow"
            ></div>

            <div class="flex items-center gap-3">
              <span
                class="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-xl"
                [class]="accent(group.accent).text"
                >{{ group.icon }}</span
              >
              <h3 class="font-display text-lg font-bold text-ink">{{ group.title }}</h3>
            </div>

            <div class="mt-5 flex flex-wrap gap-2">
              @for (skill of group.skills; track skill) {
                <span
                  class="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-muted transition-colors"
                  [class]="accent(group.accent).chip"
                  >{{ skill }}</span
                >
              }
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class Skills {
  readonly groups = SKILL_GROUPS;

  private readonly map: Record<SkillGroup['accent'], AccentClasses> = {
    cyan: {
      text: 'text-cyan',
      border: 'hover:border-cyan/40',
      glow: 'bg-cyan',
      chip: 'hover:border-cyan/40 hover:text-cyan',
    },
    violet: {
      text: 'text-violet',
      border: 'hover:border-violet/40',
      glow: 'bg-violet',
      chip: 'hover:border-violet/40 hover:text-violet',
    },
    magenta: {
      text: 'text-magenta',
      border: 'hover:border-magenta/40',
      glow: 'bg-magenta',
      chip: 'hover:border-magenta/40 hover:text-magenta',
    },
    lime: {
      text: 'text-lime',
      border: 'hover:border-lime/40',
      glow: 'bg-lime',
      chip: 'hover:border-lime/40 hover:text-lime',
    },
  };

  accent(a: SkillGroup['accent']): AccentClasses {
    return this.map[a];
  }
}
