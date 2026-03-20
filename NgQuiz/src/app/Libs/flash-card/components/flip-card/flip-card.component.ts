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
  item = input.required<{ Front: string; Back: string }>();

  // Initial / controlled flip state from parent (optional)
  // 'front' or 'back' – defaults to 'back'
  flip = input<string>('back');

  // Internal reactive flip state (two-way if you want)
  // We use this for the actual flipped class
  flipped = model<boolean>(false);

  constructor() {
    // Sync initial Flip input to internal state once on init
    // Note: input() values are available in constructor in recent Angular versions
    const initialIsFront = this.flip() === 'front';
    this.flipped.set(initialIsFront);
  }

  /**
   * Toggles the flip state
   */
  flipCard(): void {
    console.log("flipCard called");
    this.flipped.update(current => !current);
  }

  /**
   * Logs speech action
   * @param isBack Whether the back side is currently visible
   */
  speech(isBack: boolean): void {
    console.log('Speech requested', this.item(), 'side:', isBack ? 'back' : 'front');
  }

  /**
   * Logs favorite action
   */
  favorite(): void {
    console.log('Favorite clicked for item:', this.item());
  }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    const target = event.target as HTMLElement;

    // Only flip when clicking the card body (not buttons)
    if (target.closest('.flip-card-body')) {
      this.flipCard();
    }

    // Prevent flip when clicking buttons
    if (target.closest('button')) {
      event.stopPropagation();
    }
  }

  // @HostListener('document:click')
  // clickOutside(): void {
  //   if (!this.wasInside) {
  //     this.text = "clicked outside";
  //   }
  //   this.wasInside = false;
  // }

}
