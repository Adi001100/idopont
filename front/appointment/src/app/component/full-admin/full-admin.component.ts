import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAdminView, UserRole } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-full-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './full-admin.component.html',
  styleUrls: ['./full-admin.component.css']
})
export class FullAdminComponent implements OnInit {
  users: UserAdminView[] = [];
  roles: UserRole[] = ['CLIENT', 'ADMIN', 'FULL_ADMIN'];

  constructor(private userService: UserService, private popup: PopupService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.userService.list().subscribe({
      next: (users) => this.users = users,
      error: () => this.popup.error('Nem sikerült lekérni a felhasználókat')
    });
  }

  onRoleChange(user: UserAdminView, event: Event) {
    const select = event.target as HTMLSelectElement;
    const newRole = select.value as UserRole;

    this.userService.updateRole(user.id, newRole).subscribe({
      next: (updated) => {
        this.popup.success(`${updated.fullName} szerepköre frissítve (${updated.role}).`);
        this.refresh();
      },
      error: () => this.popup.error('Nem sikerült módosítani a szerepkört'),
    });
  }
}
