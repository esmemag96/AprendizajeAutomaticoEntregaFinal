import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EcoaService } from "../../services/ecoa.service";
import { User } from "../../model/User";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  errorMessage: string;
  constructor(
    private formBuilder: FormBuilder,
    private ecoaService: EcoaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  submitLogin(): void {
    const user: User = {
      user: this.f.user.value,
      password: this.f.password.value,
    };
    console.log('====================================');
    console.log(user);
    console.log('====================================');
    this.ecoaService.loginStudent(user).subscribe(
      (response) => {
        console.log(response)
        this.router.navigate(['ecoa']);
      },
      (err) => {
        this.errorMessage = err.statusText;
        console.log("HTTP Error", err);
      }
    );
  }
}
