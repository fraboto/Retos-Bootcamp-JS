import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = true;
  user: User = {
    name: '',
    last_name: '',
    username: '',
    email: '',
    pets: [],
    uid: '',
    provider: '',
    image: ''
  }
  password: string = null;
  pass_confirmation: string = null;
  error_pass: boolean = false;
  
  constructor(private authenticationService:AuthenticationService, private routes:Router) { }

  ngOnInit() {
    /* document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, {});
    }); */
  }

  actionRegister()
  {
    this.login = !this.login;
  }

  signInFacebook()
  {
    this.authenticationService.signInFacebook().then( data => {
      console.log(data);
      if (data.additionalUserInfo.isNewUser)
      {
        this.user.email = data.user.email;
        this.user.uid = data.user.uid;
        this.user.provider = data.additionalUserInfo.providerId;        
        this.authenticationService.registerUser(this.user);
        this.user = {
          name: '',
          last_name: '',
          username: '',
          email: '',
          pets: [],
          uid: '',
          provider: '',
          image: ''
        }
      }
      this.routes.navigate(['home']);
    })
    .catch( error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      console.log("Error", errorCode, ":", errorMessage, "al ingresar con: ", email);
    })
  }

  signInEmail()
  {
    this.authenticationService.signInEmail(this.user, this.password)
    .then( data => {
      console.log(data);
      this.routes.navigate(['home']);
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMsg = error.message;
      console.log("Error:", errorCode, ": ", errorMsg);
    });
  }

  registerEmail()
  {
    if(this.password === this.pass_confirmation)
    {
      this.authenticationService.registerEmail(this.user, this.password).then( data => { 
          console.log(data);
          this.user.uid = data.user.uid;
          this.user.provider = data.additionalUserInfo.providerId;
          this.authenticationService.registerUser(this.user);
          this.routes.navigate(['home']);
          this.user = {
            name: '',
            last_name: '',
            username: '',
            email: '',
            pets: [],
            uid: '',
            provider: '',
            image: ''
          }
        }).catch( error => {
          var errorCode = error.code;
          var errorMsg = error.message;
          console.log("Error:", errorCode, ": ", errorMsg);
      });
      this.password = null;
      this.pass_confirmation = null;
      this.error_pass = false;
    }
    else
    {
      this.error_pass = true;
    }
  }
}
