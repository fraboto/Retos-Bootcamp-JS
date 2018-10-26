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
    this.pets = this.petsService.getPets();

  }

}
