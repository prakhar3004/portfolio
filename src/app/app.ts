import { Component, afterNextRender } from '@angular/core';
import { ThreeBg } from './shared/three-bg';
import { Navbar } from './sections/navbar';
import { Hero } from './sections/hero';
import { About } from './sections/about';
import { Skills } from './sections/skills';
import { Experience } from './sections/experience';
import { Projects } from './sections/projects';
import { Achievements } from './sections/achievements';
import { Contact } from './sections/contact';

@Component({
  selector: 'app-root',
  imports: [
    ThreeBg,
    Navbar,
    Hero,
    About,
    Skills,
    Experience,
    Projects,
    Achievements,
    Contact,
  ],
  template: `
    <app-three-bg />
    <app-navbar />
    <main class="relative">
      <app-hero />
      <app-about />
      <app-skills />
      <app-experience />
      <app-projects />
      <app-achievements />
      <app-contact />
    </main>
  `,
})
export class App {
  constructor() {
    afterNextRender(() => {
      const pre = document.getElementById('preloader');
      if (!pre) return;
      pre.style.opacity = '0';
      setTimeout(() => pre.remove(), 500);
    });
  }
}
