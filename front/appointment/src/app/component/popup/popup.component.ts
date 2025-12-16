import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupService, PopupState } from '../../services/popup.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  state$: Observable<PopupState | null>;

  constructor(private popup: PopupService) {
    this.state$ = this.popup.state$;
  }

  close() {
    this.popup.close();
  }

  confirm(state: PopupState) {
    state.onConfirm?.();
    this.popup.close();
  }

  cancel(state: PopupState) {
    state.onCancel?.();
    this.popup.close();
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.popup.close();
  }
}
