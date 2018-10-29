import { map } from 'rxjs/operators';
import { PetsService } from './../../services/pets.service';
import { Pet } from './../../interfaces/pet';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  pets:Pet[];
  tipo_busqueda = "";

  constructor(private petsService:PetsService ) { }

  ngOnInit() {
    this.petsService.getPets().snapshotChanges().pipe(
      map(
        (changes => {
          return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
        })
      )).subscribe((data: any[]) => {
        this.pets = data;
      }
    );
  }

}
