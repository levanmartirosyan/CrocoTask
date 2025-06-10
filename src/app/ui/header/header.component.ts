import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    this.getCurrentTime();
  }

  public currentTime: Date = new Date();
  getCurrentTime() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }
}
