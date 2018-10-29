import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: AngularFireList<User>;

  constructor(private angularFireDB:AngularFireDatabase)
  {
    this.users = this.angularFireDB.list('/users');
  }

  getUsers()
  {
    return this.users;
  }

  getUserByUID(uid)
  {
    return this.angularFireDB.object('/users/' + uid);
  }

  saveUser(user: User)
  {
    return this.angularFireDB.object('/users/' + user.uid).set(user);
  }

  updateUser(user: User)
  {
    return this.users.update(user.uid, user);
  }

  removeUser(key: any)
  {
    return this.users.remove(key);
  }
}
