import { AuthenticationService } from './../../services/authentication.service';
import { map, finalize } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { auth } from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  uid: any;
  action = "view";
  url: Observable<string>;
  porcentaje: Observable<number>;

  constructor(private usersService:UsersService, private angularStorage:AngularFireStorage, private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.getUserLogged( success => {
      this.uid = success.uid;
      this.usersService.getUserByUID(this.uid).valueChanges().subscribe( data => {
        this.user = data;
      }, error => {
        console.log("Error: ", error);
      });
    }, error => {
      console.log(error);
    });
  }

  updateUser(actualizacion)
  {
    this.usersService.updateUser(actualizacion);
    this.action = 'view';
  }

  uploadImage(event)
  {
    const file = event.target.files[0];
    const filePath = '/imagenes/' + file.name;
    const fileRef = this.angularStorage.ref(filePath);
    const task = this.angularStorage.upload(filePath, file);
    this.porcentaje = task.percentageChanges();
    task.snapshotChanges().pipe( finalize(() => {
        this.url = fileRef.getDownloadURL();
        this.url.subscribe( url => {
          this.user.image = url;
        });
      }))
      .subscribe((data) => {
        console.log("imagen", data);
    }); 
    
  }
}
