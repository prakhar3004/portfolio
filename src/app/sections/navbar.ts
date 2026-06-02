import { Component, HostListener, signal } from '@angular/core';
import { PROFILE } from '../data/portfolio.data';

interface NavLink {
  label: string;
  id: string;
}

@Component({
  selector: 'app-navbar',
  template: `
    <header
      class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      [class.py-4]="!scrolled()"
      [class.py-2]="scrolled()"
    >
      <nav
        class="mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500"
        [class.glass]="scrolled()"
      >
        <!-- Logo -->
        <a
          href="#home"
          class="group flex items-center gap-2 font-display text-lg font-extrabold tracking-widest"
        >
          <span
            class="grid h-9 w-9 place-items-center rounded-lg border border-cyan/40 text-gradient shadow-[0_0_18px_rgba(0,240,255,0.25)] transition-transform group-hover:rotate-12"
            >PS</span
          >
          <span class="hidden text-ink sm:inline">PRAKHAR<span class="text-cyan">.</span></span>
        </a>

        <!-- Desktop links -->
        <ul class="hidden items-center gap-1 md:flex">
          @for (link of links; track link.id) {
            <li>
              <a
                [href]="'#' + link.id"
                class="rounded-lg px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-cyan"
                >{{ link.label }}</a
              >
            </li>
          }
        </ul>

        <!-- CTA + mobile toggle -->
        <div class="flex items-center gap-3">
          <a
            [href]="'mailto:' + profile.email"
            class="hidden rounded-lg border border-cyan/50 bg-cyan/5 px-4 py-2 font-mono text-xs uppercase tracking-wider text-cyan transition-all hover:bg-cyan/15 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] sm:inline-block"
            >Let's Talk</a
          >
          <button
            (click)="open.set(!open())"
            class="grid h-10 w-10 place-items-center rounded-lg glass md:hidden"
            [attr.aria-expanded]="open()"
            aria-label="Toggle menu"
          >
            <div class="space-y-1.5">
              <span
                class="block h-0.5 w-5 bg-cyan transition-all"
                [class.translate-y-2]="open()"
                [class.rotate-45]="open()"
              ></span>
              <span
                class="block h-0.5 w-5 bg-cyan transition-all"
                [class.opacity-0]="open()"
              ></span>
              <span
                class="block h-0.5 w-5 bg-cyan transition-all"
                [class.-translate-y-2]="open()"
                [class.-rotate-45]="open()"
              ></span>
            </div>
          </button>
        </div>
      </nav>

      <!-- Mobile menu -->
      @if (open()) {
        <div class="mx-auto mt-2 max-w-6xl px-2 md:hidden">
          <ul class="glass flex flex-col gap-1 rounded-2xl p-3">
            @for (link of links; track link.id) {
              <li>
                <a
                  [href]="'#' + link.id"
                  (click)="open.set(false)"
                  class="block rounded-lg px-4 py-3 font-mono text-sm uppercase tracking-wider text-muted hover:bg-white/5 hover:text-cyan"
                  >{{ link.label }}</a
                >
              </li>
            }
          </ul>
        </div>
      }
    </header>
  `,
})
export class Navbar {
  readonly profile = PROFILE;
  readonly open = signal(false);
  readonly scrolled = signal(false);

  readonly links: NavLink[] = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Work', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }
}
