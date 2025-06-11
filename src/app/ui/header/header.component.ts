import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(private renderer: Renderer2) {}
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
