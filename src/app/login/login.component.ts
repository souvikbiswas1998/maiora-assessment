import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../http.service';
import { CommonService } from '../common.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule, MatInputModule, ReactiveFormsModule,
    MatCardModule, MatIconModule, MatButtonModule, MatSnackBarModule, MatDividerModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpService, private cs: CommonService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.http.login(this.form.value).subscribe({
        next: (data: any) => {
          console.log(data);
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('refresh_token', data.refresh_token)
          this.router.navigate(['/home'])
        },
        error: (e) => {
          this.cs.openSnackBar(e.error.message)
        },
        complete: () => console.info('complete')
      })
    } else {
      this.cs.openSnackBar('Form is not valid')
    }
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
}
