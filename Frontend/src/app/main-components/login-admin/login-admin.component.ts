import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EcoaService } from "../../services/ecoa.service";
import { User } from "../../model/User";
import { Router } from '@angular/router';
import { LogedInUserService } from '../../services/loged-in-user.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {

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
    
    this.ecoaService.loginAdmin(user).subscribe(
      (response) => {
        console.log('====================================');
        console.log(response);
        console.log('====================================');
        // this.logedInUserService.setUser({
        //   object_id: response.object_id,
        //   idStudent: response.idStudent,
        //   studentName: response.studentName
        // });
        this.router.navigate(['dashboard']);
      },
      (err) => {
        this.scoreError = true;
        this.errorMessage = err.error;
        console.log("HTTP Error", err);
      }
    );
  }
}
