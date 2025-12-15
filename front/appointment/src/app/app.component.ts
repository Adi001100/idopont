// app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "./component/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  title = 'appointment';
  errorMessage = '';
  successMessage = '';

 showSuccess(msg: string) {
  this.successMessage = msg;
  setTimeout(() => this.successMessage = '', 3000);
}

showError(msg: string) {
  this.errorMessage = msg;
  setTimeout(() => this.errorMessage = '', 3000);
}
}
