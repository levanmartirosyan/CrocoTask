import { Routes } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { PostsComponent } from './posts/posts.component';

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
];
