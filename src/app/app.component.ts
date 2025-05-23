import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { IForm } from './interface/form.interface';
import { rsvpFormConfig } from './constants/item-form.constant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'carol-and-vannes-wedding';
  showConfirmation = false;
  rsvpForm = rsvpFormConfig as IForm;
  showForm = true;



  copyText() {
    const textToCopy = 'IT00A00000test000000000000';

    // Prova con Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        console.log('Copiato con clipboard API');
      }).catch(err => {
        console.warn('Clipboard API fallita, fallback in uso', err);
        this.fallbackCopyText(textToCopy);
      });
    } else {
      // Fallback
      this.fallbackCopyText(textToCopy);
    }
  }

  fallbackCopyText(text: string) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';  // evita scroll
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      const success = document.execCommand('copy');
      if (success) {
        console.log('Testo copiato con fallback');
      } else {
        console.error('Copia fallback fallita');
      }
    } catch (err) {
      console.error('Errore durante fallback copy', err);
    }

    document.body.removeChild(textarea);
  }



  onFormSubmitted() {
    // Mostra subito la card
    this.showConfirmation = true;

    // Nasconde il form e lo ri-renderizza (reset totale)
    this.showForm = false;
    setTimeout(() => {
      this.showForm = true;
    });
  }

  closeConfirmation() {
    this.showConfirmation = false;
  }
}
