import { PostsService } from './../../services/posts.service';
import { Post } from './../../interfaces/post';
import { Component, OnInit } from '@angular/core';
import { PetsService } from 'src/app/services/pets.service';
import { Pet } from 'src/app/interfaces/pet';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  pet: Pet;
  petKey: any;
  petPosts: Post[];
  action = "view";

  constructor(private petsService:PetsService, private activatedRoute:ActivatedRoute, private postsService:PostsService) { }

  ngOnInit() {
    this.petKey = +this.activatedRoute.snapshot.params['key'];
    this.pet = this.petsService.getPetByKey(this.petKey);
    this.petPosts = this.postsService.getPostsByPet(this.petKey);
  }
}
