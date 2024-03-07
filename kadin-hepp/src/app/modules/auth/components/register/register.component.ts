import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { confirmPasswordValidator } from 'src/app/shared/utils/validators';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { cities } from '../../models/cities';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  cities = cities;

  registerForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      rePassword: new FormControl(''),
      location: new FormControl(''),
    },
    { validators: confirmPasswordValidator }
  );

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  submit() {
    if (this.registerForm.invalid) {
      return;
    }

    const user: User = {
      email: this.registerForm.get('email')?.value!,
      location: this.registerForm.get('location')?.value!,
      name: this.registerForm.get('name')?.value!,
      password: this.registerForm.get('password')?.value!,
    };

    this.authService.signUp(user).subscribe(
      (res) => {},
      (err) => {
        alert(err.error.error);
      }
    );
  }
}
