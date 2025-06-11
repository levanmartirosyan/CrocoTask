import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit(): void {
    this.getCurrentTime();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.burgerMenu = false;
        this.renderer.removeClass(document.body, 'noScroll');
      });
  }

  public currentTime: Date = new Date();
  getCurrentTime() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  public burgerMenu: boolean = false;

  toggleBurgerMenu(event: Event) {
    event.stopPropagation();
    this.burgerMenu = !this.burgerMenu;
    if (this.burgerMenu) {
      this.renderer.addClass(document.body, 'noScroll');
    } else {
      this.renderer.removeClass(document.body, 'noScroll');
    }
  }

  closeBurgerMenu() {
    if (this.burgerMenu) {
      this.burgerMenu = false;
    }
  }
}
