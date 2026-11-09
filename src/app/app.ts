import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet (activate)="hideInitialLoading()" />'
})
export class App {
  hideInitialLoading(): void {
    const splash = document.getElementById('app-loading');
    if (!splash) return;
    splash.classList.add('is-hidden');
    window.setTimeout(() => splash.remove(), 320);
  }
}
