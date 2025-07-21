import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ScrollSpyService } from './scroll-spy.service';

@Directive({
  selector: '[appScrollSpy]',
  standalone: true
})
export class ScrollSpyDirective implements OnInit, OnDestroy {
  @Input('appScrollSpy') label!: string;   // e.g., 'Home'
  @Input() spyId!: string;                 // e.g., 'home' (optional fallback: auto from element id)

  private _id!: string;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private spy: ScrollSpyService
  ) {}

  ngOnInit() {
    const el = this.elRef.nativeElement;
    this._id = this.spyId || el.id;
    if (!this._id) {
      return;
    }
    this.spy.registerTarget(this._id, this.label, el);
  }

  ngOnDestroy() {
    if (this._id) {
      this.spy.unregisterTarget(this._id);
    }
  }
}
