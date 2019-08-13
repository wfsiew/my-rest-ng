import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mform: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) { 
  }

  ngOnInit() {
    this.mform = this.fb.group({
      username: ['wfsiew', [Validators.required]],
      password: ['password.123', [Validators.required]]
    });
  }

  onSubmit() {
    let fm = this.mform.value;
    this.authService.authenticate(fm.username, fm.password)
      .subscribe(
        token => this.onSuccess(token),
        error => this.onError(error)
      );
  }

  invalid(s: string) {
    const m = this.mform.controls[s];
    return m.invalid;
  }

  onSuccess(res) {
    this.router.navigate(['/data']);
  }

  onError(error) {
    if (error === 'invalid_grant') {
      alert('login failed');
    }
  }
}
