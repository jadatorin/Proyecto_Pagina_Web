import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<void>();

  handleClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
