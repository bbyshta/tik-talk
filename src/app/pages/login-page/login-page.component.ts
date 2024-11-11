import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService = inject(AuthService)
  router = inject(Router)
  isPasswordVisible = signal<boolean>(false)

  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });



  onSubmit() {
    if (this.form.valid) {
      //@ts-ignore TODO: настроить типизацию формы
      this.authService.login(this.form.value).subscribe(res => {
        this.router.navigate([''])
        console.log(res)
      })
    }
}
}
