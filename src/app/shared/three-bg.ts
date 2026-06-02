import {
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  viewChild,
} from '@angular/core';
import * as THREE from 'three';

/**
 * Full-screen WebGL backdrop: a slowly-drifting particle starfield with
 * connecting "constellation" lines and floating neon wireframe solids.
 * Reacts to mouse / scroll for parallax. Cleans itself up on destroy.
 */
@Component({
  selector: 'app-three-bg',
  template: `<canvas
    #canvas
    class="fixed inset-0 -z-10 h-full w-full"
    aria-hidden="true"
  ></canvas>`,
})
export class ThreeBg implements OnDestroy {
  private canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private frameId = 0;
  private disposables: Array<{ dispose: () => void }> = [];

  private readonly pointer = { x: 0, y: 0 };
  private scrollY = 0;

  private readonly onResize = () => this.resize();
  private readonly onPointer = (e: MouseEvent) => {
    this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  private readonly onScroll = () => {
    this.scrollY = window.scrollY;
  };

  constructor() {
    afterNextRender(() => this.init());
  }

  private init(): void {
    try {
      this.build();
    } catch (err) {
      // WebGL unavailable (older device / headless) — fail silently, the rest
      // of the page is unaffected.
      console.warn('[three-bg] WebGL init skipped:', err);
      this.canvasRef().nativeElement.style.display = 'none';
    }
  }

  private build(): void {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const canvas = this.canvasRef().nativeElement;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer = renderer;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060814, 0.06);
    this.scene = scene;

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.z = 14;
    this.camera = camera;

    // ---- Particle starfield --------------------------------------------
    const COUNT = prefersReduced ? 300 : 1150;
    const positions = new Float32Array(COUNT * 3);
    const colorPalette = [
      new THREE.Color(0x4d7cff),
      new THREE.Color(0x6366f1),
      new THREE.Color(0x22d3ee),
    ];
    const colors = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 38;
      positions[i3 + 1] = (Math.random() - 0.5) * 24;
      positions[i3 + 2] = (Math.random() - 0.5) * 24;
      const c = colorPalette[(Math.random() * colorPalette.length) | 0];
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.disposables.push(geo);

    const sprite = this.makeDotTexture();
    this.disposables.push(sprite);
    const mat = new THREE.PointsMaterial({
      size: 0.26,
      map: sprite,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 1,
    });
    this.disposables.push(mat);

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // ---- Floating neon wireframe solids --------------------------------
    const solids: THREE.LineSegments[] = [];
    const makeSolid = (
      g: THREE.BufferGeometry,
      color: number,
      pos: [number, number, number],
      scale: number,
    ) => {
      const edges = new THREE.EdgesGeometry(g);
      const lm = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.72,
        blending: THREE.AdditiveBlending,
      });
      const seg = new THREE.LineSegments(edges, lm);
      seg.position.set(...pos);
      seg.scale.setScalar(scale);
      scene.add(seg);
      solids.push(seg);
      this.disposables.push(g, edges, lm);
    };

    makeSolid(new THREE.IcosahedronGeometry(1, 0), 0x4d7cff, [-9, 3, -2], 2.2);
    makeSolid(new THREE.OctahedronGeometry(1, 0), 0x22d3ee, [9, -3, -3], 2.6);
    makeSolid(new THREE.TorusGeometry(1, 0.32, 8, 24), 0x6366f1, [7, 4, -5], 1.8);
    makeSolid(new THREE.DodecahedronGeometry(1, 0), 0x34d399, [-8, -4, -4], 1.4);

    // ---- Animate -------------------------------------------------------
    const clock = new THREE.Clock();
    const animate = () => {
      this.frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      points.rotation.y = t * 0.03;
      points.rotation.x = Math.sin(t * 0.1) * 0.08;

      for (let i = 0; i < solids.length; i++) {
        const s = solids[i];
        s.rotation.x += 0.0016 + i * 0.0004;
        s.rotation.y += 0.0022 + i * 0.0003;
        s.position.y += Math.sin(t * 0.6 + i) * 0.004;
      }

      // Parallax: ease camera toward pointer + scroll
      const targetX = this.pointer.x * 1.6;
      const targetY = -this.pointer.y * 1.1 - this.scrollY * 0.0015;
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onPointer, { passive: true });
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  /** Soft circular dot texture for particles. */
  private makeDotTexture(): THREE.Texture {
    const s = 64;
    const cvs = document.createElement('canvas');
    cvs.width = cvs.height = s;
    const ctx = cvs.getContext('2d')!;
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.3, 'rgba(255,255,255,0.6)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    const tex = new THREE.CanvasTexture(cvs);
    tex.needsUpdate = true;
    return tex;
  }

  private resize(): void {
    if (!this.renderer || !this.camera) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frameId);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onPointer);
    window.removeEventListener('scroll', this.onScroll);
    this.disposables.forEach((d) => d.dispose());
    this.renderer?.dispose();
  }
}
