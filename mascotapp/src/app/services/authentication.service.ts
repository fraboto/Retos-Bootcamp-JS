import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth:AngularFireAuth, private usersService:UsersService) {}

  signInFacebook()
  {
    var provider = new firebase.auth.FacebookAuthProvider();
    return this.angularFireAuth.auth.signInWithPopup(provider);
  }

  registerEmail(user: User, password: string)
  {
    return firebase.auth().createUserWithEmailAndPassword(user.email, password);
  }

  registerUser(user: User)
  {
    this.usersService.saveUser(user).then(() => {
      alert("Usuario creado con éxito")
    });
  }

  signInEmail(user: User, password: string)
  {
    return firebase.auth().signInWithEmailAndPassword(user.email, password);
  }

  getStatus()
  {
    return this.angularFireAuth.authState;
  }

  getUserLogged(fnSuccess, fnFailure)
  {
    return this.angularFireAuth.auth.onAuthStateChanged(fnSuccess, fnFailure);
  }

  logOut()
  {
    return this.angularFireAuth.auth.signOut();
  }
}
