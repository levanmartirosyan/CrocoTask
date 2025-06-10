import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  private renderer: Renderer2;

  busyRequestCount = 0;
  showCustomLoader = false;

  busy() {
    this.busyRequestCount++;
    this.showCustomLoader = true;
    this.renderer.addClass(document.body, 'noScroll');
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.showCustomLoader = false;
      this.renderer.removeClass(document.body, 'noScroll');
    }
  }
}
