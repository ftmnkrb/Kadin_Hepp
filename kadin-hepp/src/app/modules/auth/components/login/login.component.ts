import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  submit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginModel = {
      email: this.loginForm.get('email')?.value!,
      password: this.loginForm.get('password')?.value!,
    };

    this.authService.signIn(loginModel.email, loginModel.password).subscribe(
      (res) => {},
      (err) => {
        alert(err.error.error);
      }
    );
  }
}
