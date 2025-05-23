import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-confirmation.component.html',
  styleUrl: './form-confirmation.component.scss'
})
export class FormConfirmationComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
