import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { User } from '../interfaces/api.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-userlist',
  imports: [FormsModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss',
})
export class UserlistComponent implements OnInit, OnDestroy {
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  private userSubscription: Subscription = new Subscription();

  public usersList: User[] = [];
  public filteredUsers: User[] = [];

  private getAllUsers(): void {
    const users = sessionStorage.getItem('userList');
    if (users) {
      this.usersList = JSON.parse(users);
      this.filteredUsers = JSON.parse(users);
    }
    this.userSubscription.add(
      this.apiService.getAllUsers().subscribe({
        next: (data: User[]) => {
          this.usersList = data;
          this.filteredUsers = data;
          sessionStorage.setItem('userList', JSON.stringify(data));
        },
        error: (error: unknown) => {},
      })
    );
  }

  public searchKeyword: string = '';

  searchUser() {
    const keyword = this.searchKeyword.trim().toLowerCase();

    if (keyword !== '') {
      this.usersList = this.filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(keyword) ||
          user.username.toLowerCase().includes(keyword) ||
          user.email.toLowerCase().includes(keyword)
      );
    } else {
      this.usersList = [...this.filteredUsers];
    }
  }

  goToUsersPost(userId: number) {
    this.router.navigate(['/posts'], {
      queryParams: {
        userId: userId,
      },
    });
  }

  goToUserstasks(userId: number) {
    this.router.navigate(['/posts'], {
      queryParams: {
        userId: userId,
      },
    });
  }
}
