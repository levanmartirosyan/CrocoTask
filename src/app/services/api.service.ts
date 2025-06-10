import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, User } from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private apiLink: string = 'https://jsonplaceholder.typicode.com';

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiLink + '/users');
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiLink + '/posts');
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(this.apiLink + `/users/${userId}`);
  }

  getCommentsByPost(PostId: number) {}

  getTodosByUser(UserId: number) {}
}
