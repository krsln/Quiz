import {Component, HostListener, input, model, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'q-flip-card',
  imports: [],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './flip-card.component.html',
  styleUrl: './flip-card.component.scss',
})
export class FlipCardComponent {
  // Whether the whole card is visible / active
  active = input<boolean>(false);

  // The actual card content
  item = input.required<{ front: string; back: string }>();

  // 'front' | 'back' — controlled from parent (optional)
  initialSide = input<'front' | 'back'>('back');

  // Internal flip state — we prefer signal + model() pattern
  // isFlipped = model<'front' | 'back'>('back');
  isFlipped = model<'front' | 'back'>('back');

  constructor() {
    // Sync initial side once
    // this.isFlipped.set(this.initialSide() === 'front');
  }

  flipCard(): void {
    this.isFlipped.update(
      side => side === 'front' ? 'back' : 'front'
    );
  }

  speak(isBackSide: boolean): void {
    console.log('Speak requested', this.item(), isBackSide ? 'back' : 'front');
    // TODO: implement TTS
  }

  toggleFavorite(): void {
    console.log('Favorite toggled for', this.item());
    // TODO: implement
  }

  edit(): void {
    console.log('edit for', this.item());
    // TODO: implement
  }

  @HostListener('click', ['$event'])
  onCardClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // Prevent flip when clicking buttons
    if (target.closest('button')) {
      event.stopPropagation();
      return;
    }

    // Flip only when clicking inside the card body
    if (target.closest('.flip-card-body')) {
      this.flipCard();
    }
  }
}
