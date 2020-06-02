import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EcoaService } from "../../services/ecoa.service";
import { LogedInUserService } from '../../services/loged-in-user.service';
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

  scoreError: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private ecoaService: EcoaService,
    private router: Router,
    private logedInUserService: LogedInUserService,
  ) { this.scoreError = false; }

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

    this.ecoaService.loginStudent(user).subscribe(
      (response) => {
        this.logedInUserService.setUser({
          object_id: response.object_id,
          idStudent: response.idStudent,
          studentName: response.studentName
        });
        this.router.navigate(['ecoa']);
      },
      (err) => {
        this.scoreError = true;
        this.errorMessage = err.error;
        console.log("HTTP Error", err);
      }
    );
  }
}
