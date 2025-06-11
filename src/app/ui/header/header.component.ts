import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.getCurrentTime();
  }

  public currentTime: Date = new Date();
  getCurrentTime() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  public burgerMenu: boolean = false;

  toggleBurgerMenu() {
    this.burgerMenu = !this.burgerMenu;
  }

  closeBurgerMenu() {
    if (this.burgerMenu) {
      this.burgerMenu = false;
      this.router.navigate(['/']);
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 200);
    }
  }
}
