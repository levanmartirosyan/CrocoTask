import { Routes } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { PostsComponent } from './posts/posts.component';
import { TodosComponent } from './todos/todos.component';

export const routes: Routes = [
  {
    path: '',
    component: UserlistComponent,
    title: 'Croco - User list',
  },
  {
    path: 'posts',
    component: PostsComponent,
  },
  {
    path: 'todos',
    component: TodosComponent,
  },
];
