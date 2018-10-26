import { Injectable } from '@angular/core';
import { Pet } from '../interfaces/pet';
import { AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  pets: Pet[] = [
    {
      key: 0,
      nombre: "Copito",
      tipo: "perro",
      email: "copito@correo.com"
    },
    {
      key: 1,
      nombre: "Isis",
      tipo: "gato",
      email: "isis@correo.com"
    },
    {
      key: 2,
      nombre: "Morgana",
      tipo: "gato",
      email: "morgana@correo.com"
    }
  ];   

  constructor() { 
    
  }

  getPets()
  {
    return this.pets;
  }

  getPetByKey(key:any)
  {
    return this.pets.find(pet => {
      return pet.key === key;
    });
  }

}
