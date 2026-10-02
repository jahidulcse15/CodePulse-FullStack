import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  registerForm: FormGroup;
  router=inject(Router);

  isSubmitting = false;

  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {

    this.registerForm = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]

    });

  }


  register() {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.successMessage = '';
    this.errorMessage = '';

    const request = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.authService.register(request).subscribe({

      next: (response: any) => {

  console.log('Registration successful:', response);

  this.isSubmitting = false;

  this.router.navigate(['/login'])
    .then((success) => {
      console.log('Navigation result:', success);
    })
    .catch((error) => {
      console.error('Navigation error:', error);
    });

},

      error: (error) => {

        console.error('Registration error:', error);

        this.isSubmitting = false;

        if (error.error?.message) {

          this.errorMessage = error.error.message;

        }
        else if (error.error?.errors) {

          const errors = error.error.errors;

          this.errorMessage =
            Object.values(errors)
              .flat()
              .join(' ');

        }
        else {

          this.errorMessage =
            'Registration failed. Please try again.';

        }

      }

    });

  }

}