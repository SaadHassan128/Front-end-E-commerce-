import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="star-rating" [class.interactive]="interactive">
      <span 
        *ngFor="let star of stars; let i = index" 
        class="star"
        [class.filled]="star.filled"
        [class.half]="star.half"
        (click)="interactive && onRatingChange(i + 1)">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </span>
      <span *ngIf="showRating" class="rating-value">{{ rating.toFixed(1) }}</span>
    </div>
  `,
  styles: [`
    .star-rating {
      display: flex;
      align-items: center;
      color: var(--text-muted);
    }
    
    .star {
      position: relative;
      cursor: default;
    }
    
    .interactive .star {
      cursor: pointer;
    }
    
    .star.filled {
      color: var(--warning);
    }
    
    .star.half::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 100%;
      background-color: var(--warning);
      clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
    }
    
    .rating-value {
      margin-left: 0.5rem;
      font-weight: 500;
      color: var(--text-secondary);
    }
  `]
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() interactive: boolean = false;
  @Input() showRating: boolean = false;
  @Output() ratingChange = new EventEmitter<number>();
  
  stars: { filled: boolean, half: boolean }[] = [];
  
  ngOnChanges(): void {
    this.calculateStars();
  }
  
  private calculateStars(): void {
    this.stars = [];
    const fullStars = Math.floor(this.rating);
    const hasHalfStar = this.rating - fullStars >= 0.5;
    
    // Add filled stars
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        this.stars.push({ filled: true, half: false });
      } else if (i === fullStars && hasHalfStar) {
        this.stars.push({ filled: false, half: true });
      } else {
        this.stars.push({ filled: false, half: false });
      }
    }
  }
  
  onRatingChange(rating: number): void {
    this.rating = rating;
    this.calculateStars();
    this.ratingChange.emit(rating);
  }
}