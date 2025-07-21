import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface SpyTarget {
  id: string;
  label: string;
  el: HTMLElement;
}

@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  private targets: SpyTarget[] = [];
  private observer?: IntersectionObserver;

  /** Emits the *label* of the active section */
  private _active$ = new BehaviorSubject<string>('Home');
  active$ = this._active$.asObservable();

  constructor(private zone: NgZone) {
    this.initObserver();
  }

  private initObserver() {
    // Use NgZone.runOutsideAngular to avoid change detection storms on scroll.
    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        entries => this.handleIntersections(entries),
        {
          // root: null uses viewport
          root: null,
          // Trigger when ~40% of the section is visible; tweak to taste
          threshold: [0, 0.4, 0.6, 1],
        }
      );
    });
  }

  registerTarget(id: string, label: string, el: HTMLElement) {
    // Avoid duplicates
    if (this.targets.find(t => t.id === id)) return;
    this.targets.push({ id, label, el });
    this.observer?.observe(el);
  }

  unregisterTarget(id: string) {
    const idx = this.targets.findIndex(t => t.id === id);
    if (idx >= 0) {
      const [t] = this.targets.splice(idx, 1);
      this.observer?.unobserve(t.el);
    }
  }

  /** Called by IntersectionObserver callback */
  private handleIntersections(entries: IntersectionObserverEntry[]) {
    // Filter only currently intersecting sections
    const visible: SpyTarget[] = [];
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const target = this.targets.find(t => t.el === entry.target);
        if (target) visible.push(target);
      }
    }

    // If we got new intersecting entries, re-evaluate all currently intersecting targets
    // (we need a fresh list because entries only deliver deltas)
    const currentlyVisible = this.targets.filter(t => {
      const rect = t.el.getBoundingClientRect();
      return rect.bottom >= 0 && rect.top <= window.innerHeight;
    });

    if (currentlyVisible.length === 0) return;

    // Pick the one whose center is closest to viewport center
    const viewportCenter = window.innerHeight / 2;
    let closest: SpyTarget | null = null;
    let closestDist = Number.POSITIVE_INFINITY;

    for (const t of currentlyVisible) {
      const rect = t.el.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const dist = Math.abs(sectionCenter - viewportCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = t;
      }
    }

    if (closest) {
      // Switch back into Angular zone to emit and trigger CD
      this.zone.run(() => this._active$.next(closest!.label));
    }
  }
}
