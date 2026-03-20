import {Component, input, model, OnInit} from '@angular/core';
import {fromEvent} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FlipCardComponent} from '../flip-card/flip-card.component';

@Component({
  selector: 'q-flash-card',
  imports: [FlipCardComponent],
  templateUrl: './flash-card.component.html',
  styleUrl: './flash-card.component.scss',
})
export class FlashCardComponent implements OnInit  {
  cards = input.required<{ front: string; back: string }[]>();

  // Two-way binding with model()
  state = model<{ index: number; percent: number }>({index: 0, percent: 0});

  currentSide = model<'front' | 'back'>('back');

  constructor() {
    if (typeof window !== 'undefined') {
      fromEvent<KeyboardEvent>(document, 'keydown')
        .pipe(takeUntilDestroyed())
        .subscribe(e => {
          if (e.code === 'Space') {
            e.preventDefault();
            this.toggleFlip();
          }
          if (e.code === 'Enter') this.play();
          if (e.code === 'ArrowLeft') this.prev();
          if (e.code === 'ArrowRight') this.next();
        });
    }
  }

  ngOnInit() {
    this.updateProgress();
  }


  prev(): void {
    const current = this.state().index;
    const len = this.cards().length;

    this.state.update(s => ({
      ...s,
      index: current === 0 ? len - 1 : current - 1
    }));

    this.updateProgress();
  }

  next(): void {
    const current = this.state().index;
    const len = this.cards().length;

    this.state.update(s => ({
      ...s,
      index: current === len - 1 ? 0 : current + 1
    }));

    this.updateProgress();
  }

  private updateProgress(): void {
    const len = this.cards().length;
    if (len === 0) return;
    this.state.update(s => ({
      ...s,
      percent: ((s.index + 1) / len) * 100
    }));
  }

  toggleFlip(): void {
    this.currentSide.update(side => side === 'front' ? 'back' : 'front');
  }


  private autoPlayInterval: any = null;

  play(): void {
    if (this.autoPlayInterval) {
      this.stop();
      return;
    }

    this.autoPlayInterval = setInterval(() => {
      this.toggleFlip();

      setTimeout(() => {
        this.currentSide.set('front');
        this.next();
        this.currentSide.set('back');
        if (this.state().index === 0) { // loop bittiğinde durdur
          this.stop();
        }
      }, 1800); // kart gösterim süresi

    }, 4000); // toplam döngü süresi
  }

  stop(): void {
    clearInterval(this.autoPlayInterval);
    this.autoPlayInterval = null;
  }

  shuffle(): void {
    this.state.update(s => ({...s, index: 0}));
    this.currentSide.set('back');

    // TODO:  shuffle implementation
    console.log('Kartlar karıştırıldı (henüz tam implemente değil)');
  }
}
