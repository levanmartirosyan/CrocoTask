import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './ui/header/header.component';
import { NavigationComponent } from './ui/navigation/navigation.component';
import { FooterComponent } from './ui/footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { ToolsService } from './services/tools.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    LoaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(public tools: ToolsService) {}

  title = 'croco-task';
}
