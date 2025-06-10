import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { forkJoin, map, Subscription } from 'rxjs';
import { queryParams, Todo } from '../interfaces/api.interface';
import { ApiService } from '../services/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-todos',
  imports: [RouterModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit, OnDestroy {
  constructor(
    private apiService: ApiService,
    private actR: ActivatedRoute,
    private title: Title
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getTodosWithUsers();
    }, 1);
  }

  ngOnDestroy(): void {
    this.todoSubscription.unsubscribe();
    this.routeSub?.unsubscribe();
  }

  private todoSubscription: Subscription = new Subscription();
  private routeSub: Subscription = new Subscription();

  public todoList: (Todo & { userName?: string })[] = [];

  private getTodosWithUsers(): void {
    this.todoSubscription.add(
      forkJoin({
        posts: this.apiService.getAllTodos(),
        users: this.apiService.getAllUsers(),
      })
        .pipe(
          map(({ posts, users }) => {
            const userMap = new Map(users.map((user) => [user.id, user.name]));

            return posts.map((post) => ({
              ...post,
              userName: userMap.get(post.userId) || 'Unknown',
            }));
          })
        )
        .subscribe({
          next: (enrichedPosts) => {
            this.todoList = enrichedPosts;
            sessionStorage.setItem('postList', JSON.stringify(enrichedPosts));

            this.getTodosByUser();
          },
          error: (error: unknown) => {},
        })
    );
  }

  public userId?: number;
  public done: number = 0;
  public incomp: number = 0;

  private getTodosByUser(): void {
    this.routeSub = this.actR.queryParams.subscribe((data: queryParams) => {
      if (data.userId) {
        this.userId = data.userId;
        const userId = Number(data.userId);

        const filtered = this.todoList.filter((todo) => {
          const isUserTodo = todo.userId === userId;
          if (isUserTodo) {
            todo.completed ? this.done++ : this.incomp++;
          }
          return isUserTodo;
        });

        this.todoList = filtered;

        if (this.todoList.length > 0) {
          this.title.setTitle(
            'CrocoTask - ' + this.todoList[0].userName + "'s tasks"
          );
        } else {
          this.title.setTitle('CrocoTask - No tasks');
        }
      }
    });
  }
}
