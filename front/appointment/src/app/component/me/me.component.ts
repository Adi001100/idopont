import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { AuthenticatedUser } from '../../models/user.model';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent {
  user$;

  constructor(private auth: AuthService) {
    this.user$ = this.auth.currentUser$;
  }
}
