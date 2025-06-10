import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Post, queryParams, User } from '../interfaces/api.interface';
import { forkJoin, map, Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-posts',
  imports: [RouterModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit, OnDestroy {
  constructor(
    private apiService: ApiService,
    private actR: ActivatedRoute,
    private title: Title,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getPostsWithUsers();
    }, 1);
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
    if (this.detailsPopUp) {
      this.renderer.addClass(document.body, 'noScroll');
    } else {
      this.renderer.removeClass(document.body, 'noScroll');
    }
  }

  public userId?: number;
  private getPostsByUser(): void {
    this.routeSub = this.actR.queryParams.subscribe((data: queryParams) => {
      if (data.userId) {
        this.userId = data.userId;

        const userId = Number(data.userId);

        const filtered = this.postList.filter((post) => post.userId === userId);
        this.postList = filtered;

        if (this.postList.length > 0) {
          this.title.setTitle(
            'CrocoTask - ' + this.postList[0].userName + "'s posts"
          );
        } else {
          this.title.setTitle('CrocoTask - No posts');
        }
      }
    });
  }
}
