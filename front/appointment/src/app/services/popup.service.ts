import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type PopupType = 'info' | 'success' | 'error' | 'confirm';

export interface PopupState {
  open: boolean;
  title?: string;
  message: string;
  type: PopupType;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

@Injectable({ providedIn: 'root' })
export class PopupService {
  private stateSubject = new BehaviorSubject<PopupState | null>(null);
  state$ = this.stateSubject.asObservable();

  info(message: string, title = 'Információ') {
    this.open({ open: true, type: 'info', title, message });
  }

  success(message: string, title = 'Siker') {
    this.open({ open: true, type: 'success', title, message });
  }

  error(message: string, title = 'Hiba') {
    this.open({ open: true, type: 'error', title, message });
  }

  confirm(
    message: string,
    onConfirm: () => void,
    title = 'Megerősítés',
    confirmText = 'Igen',
    cancelText = 'Mégse'
  ) {
    this.open({
      open: true,
      type: 'confirm',
      title,
      message,
      confirmText,
      cancelText,
      onConfirm
    });
  }

  close() {
    this.stateSubject.next(null);
  }

  private open(state: PopupState) {
    this.stateSubject.next(state);
  }
}
