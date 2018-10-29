import { PostsService } from './../../services/posts.service';
import { PetsService } from 'src/app/services/pets.service';
import { Post } from './../../interfaces/post';
import { Pet } from './../../interfaces/pet';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';

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
    this.petsService.getPets().snapshotChanges().pipe(
      map(
        (changes => {
          return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
        })
      )).subscribe((data: any[]) => {
        this.pets = data;
      }
    );
    this.posts = this.PostsService.getPosts();
  }

}
