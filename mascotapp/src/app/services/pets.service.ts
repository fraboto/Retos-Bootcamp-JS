import { Injectable } from '@angular/core';
import { Pet } from '../interfaces/pet';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  pets: AngularFireList<Pet>;  

  constructor(private angularFireDatabase:AngularFireDatabase) { 
    this.pets = this.angularFireDatabase.list('/pets');
  }

  getPets()
  {
    return this.pets;
  }

  createPet(pet: Pet)
  {
    return this.pets.push(pet);
  }

  updatePet(pet: Pet)
  {
    return this.pets.update(pet.key, pet);
  }

  deletePet(key: any)
  {
    return this.pets.remove(key);
  }

}
