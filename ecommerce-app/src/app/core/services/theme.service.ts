import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor() {
    // Check if there's a saved theme preference
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme) {
      this.setDarkTheme(savedTheme === 'true');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setDarkTheme(prefersDark);
    }
  }

  toggleTheme(): void {
    this.isDarkTheme.next(!this.isDarkTheme.value);
    this.updateTheme();
  }

  setDarkTheme(isDark: boolean): void {
    this.isDarkTheme.next(isDark);
    this.updateTheme();
  }

  private updateTheme(): void {
    const isDark = this.isDarkTheme.value;
    document.body.classList.toggle('dark-theme', isDark);
    localStorage.setItem('darkTheme', isDark.toString());
  }
}
