import { PostsService } from './../../services/posts.service';
import { PetsService } from 'src/app/services/pets.service';
import { Post } from './../../interfaces/post';
import { Pet } from './../../interfaces/pet';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pets:Pet[];
  posts:Post[];

  constructor(private petsService:PetsService, private PostsService:PostsService) { }

  ngOnInit() {
    this.pets = this.petsService.getPets();
    this.posts = this.PostsService.getPosts();
  }

}
