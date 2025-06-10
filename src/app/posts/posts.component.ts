import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Post, queryParams, User } from '../interfaces/api.interface';
import { forkJoin, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  imports: [RouterModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit, OnDestroy {
  constructor(private apiService: ApiService, private actR: ActivatedRoute) {}

  ngOnInit(): void {
    this.getPostsWithUsers();
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
    this.routeSub?.unsubscribe();
  }

  private postSubscription: Subscription = new Subscription();
  private routeSub: Subscription = new Subscription();

  public postList: (Post & { userName?: string })[] = [];

  private getPostsWithUsers(): void {
    this.postSubscription.add(
      forkJoin({
        posts: this.apiService.getAllPosts(),
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
            this.postList = enrichedPosts;
            sessionStorage.setItem('postList', JSON.stringify(enrichedPosts));
            this.getPostsByUser();
          },
          error: (error: unknown) => {},
        })
    );
  }

  public detailsPopUp: boolean = false;
  public details?: Post & { userName?: string };

  checkDetails(details: Post & { userName?: string }) {
    this.togglePopUp();

    if (details) {
      this.details = details;
    }
  }

  togglePopUp() {
    this.detailsPopUp = !this.detailsPopUp;
    document.body.classList.toggle('noScroll');
  }

  getPostsByUser() {
    this.routeSub = this.actR.queryParams.subscribe((data: queryParams) => {
      if (data.userId) {
        const userId = Number(data.userId);
        this.postList = this.postList.filter((post) => post.userId === userId);
      }
    });
  }
}
