import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'mascotapp';
  auth;

  constructor(private router:Router, private authenticationService:AuthenticationService) {}

  logOut()
  {
    this.authenticationService.logOut().then( data => {
      console.log(data);
      this.router.navigate(['login']);
    }).catch(function(error) {
      console.log("no pudimos hacer log out, error: ", error);
    });
  }
}
