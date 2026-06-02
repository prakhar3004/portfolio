import { Component } from '@angular/core';
import { PROFILE } from '../data/portfolio.data';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [RevealDirective],
  template: `
    <section id="contact" class="relative mx-auto max-w-5xl px-6 py-28 text-center">
      <div class="cyber-grid pointer-events-none absolute inset-0 opacity-60"></div>

      <div appReveal class="relative">
        <p class="font-mono text-xs uppercase tracking-[0.4em] text-cyan">06 — Contact</p>
        <h2 class="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-6xl">
          Let's build <span class="shimmer">the future</span>
        </h2>
        <p class="mx-auto mt-5 max-w-xl text-muted">
          Open to full-stack roles and freelance collaborations. Have a project, an
          idea, or a role in mind? My inbox is always on.
        </p>

        <a
          [href]="'mailto:' + profile.email"
          class="mt-9 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan to-violet px-8 py-4 font-display font-bold text-void transition-transform hover:scale-105"
        >
          ✉ {{ profile.email }}
        </a>

        <!-- quick links -->
        <div class="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            [href]="profile.github"
            target="_blank"
            rel="noopener"
            class="group flex items-center gap-2 rounded-xl glass glass-hover px-5 py-3"
          >
            <svg class="h-5 w-5 fill-muted transition-colors group-hover:fill-cyan" viewBox="0 0 24 24">
              <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7 0-.7 0-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
            </svg>
            <span class="font-mono text-sm text-muted group-hover:text-ink">GitHub</span>
          </a>

          <a
            [href]="profile.linkedin"
            target="_blank"
            rel="noopener"
            class="group flex items-center gap-2 rounded-xl glass glass-hover px-5 py-3"
          >
            <svg class="h-5 w-5 fill-muted transition-colors group-hover:fill-cyan" viewBox="0 0 24 24">
              <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.3a1.7 1.7 0 1 1 0-3.5 1.7 1.7 0 0 1 0 3.5zM19 19h-3v-4.7c0-1.1 0-2.6-1.6-2.6S12.6 13 12.6 14.2V19h-3v-9h2.9v1.2h.1a3.2 3.2 0 0 1 2.9-1.6c3.1 0 3.7 2 3.7 4.7z" />
            </svg>
            <span class="font-mono text-sm text-muted group-hover:text-ink">LinkedIn</span>
          </a>

          <a
            [href]="'tel:' + profile.phone.replace(' ', '')"
            class="group flex items-center gap-2 rounded-xl glass glass-hover px-5 py-3"
          >
            <span class="text-muted transition-colors group-hover:text-cyan">📞</span>
            <span class="font-mono text-sm text-muted group-hover:text-ink">{{ profile.phone }}</span>
          </a>
        </div>
      </div>
    </section>

    <footer class="border-t border-white/5 px-6 py-8">
      <div
        class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row"
      >
        <p class="font-mono text-xs text-faint">
          © {{ year }} {{ profile.name }} — Built with Angular, Three.js &amp; GSAP.
        </p>
      </div>
    </footer>
  `,
})
export class Contact {
  readonly profile = PROFILE;
  readonly year = new Date().getFullYear();
}
