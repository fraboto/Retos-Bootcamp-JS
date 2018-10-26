import { Post } from './../interfaces/post';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts:Post[] = [
      {
        text: "Hola, este es mi primer Post",
        date: Date.now() - 7200000,
        author: 2
      },
      {
        text: "Hola, este es mi primer Post",
        date: Date.now() - 3600000,
        author: 1
      },
      {
        text: "Hola, este es mi primer Post",
        date: Date.now(),
        author: 0
      }
  ];

  constructor() { }

  getPosts()
  {
    return this.posts;
  }

  getPostsByPet(author:any)
  {
    return this.posts.filter(post => {
      return post.author === author;
    })
  }
}
