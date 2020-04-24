import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'in28minutes';
  password = '';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;

  // Dependency Injection
  constructor(private router: Router, private service: HardcodedAuthenticationService,
    private basicAuthService: BasicAuthenticationService) { }

  ngOnInit() {
  }

  handleLogin() {

    /*Way 1: Using Service Class HardCoded Way */
    if (this.service.authenticate(this.username, this.password)) {
      sessionStorage.setItem('username', this.username);
      this.router.navigate(['welcome', this.username]);
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }

    /*Way 2:  Old way without service hardcoded*/
    /*
    if (this.username === 'in28minutes' && this.password === 'dummy') {
      this.router.navigate(['welcome', this.username]);
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
    console.log(this.username);
    console.log(this.password);
    */
  }

  handleBasicAuthLogin() {
    this.basicAuthService.executeAuthenticationService(this.username, this.password).subscribe(
      data => {
        console.log(data);
        sessionStorage.setItem('username', this.username);
        this.router.navigate(['welcome', this.username]);
        this.invalidLogin = false;
      },
      error => {
        console.log(error);
        this.invalidLogin = true;
      }
    );
  }
}
// 1. One way data binding using String Interpolation i.e. from Component to Template
// 2. One way data binding using Event Binding i.e. bind a view event to Component Event Method
// 3. Two way data binding using Banana Binding i.e. Banana in a box binding. binding to Component Property and
// ngModel is an angular directive
