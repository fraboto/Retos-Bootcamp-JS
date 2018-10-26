import { Component, OnInit } from '@angular/core';
import { formSelect } from 'jquery'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  action = "login";
  
  constructor() { }

  ngOnInit() {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, options);
    });
  }

}
