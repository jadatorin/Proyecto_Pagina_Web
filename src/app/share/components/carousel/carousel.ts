import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CarouselSlide {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss'
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() slides: CarouselSlide[] = [];
  @Input() autoInterval = 3000;
  
  currentIndex = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  getInfiniteSlides(): CarouselSlide[] {
    if (this.slides.length === 0) return [];
    return [...this.slides, this.slides[0]];
  }

  getTrackWidth(): number {
    if (this.slides.length <= 1) return 100;
    return (this.slides.length + 1) / this.slides.length * 100;
  }

  getAnimationDuration(): number {
    return (this.slides.length + 1) * (this.autoInterval / 1000);
  }

  getTranslatePercent(): number {
    if (this.slides.length <= 1) return 0;
    return 100 / (this.slides.length + 1);
  }

  next(): void {
    this.currentIndex++;
    if (this.currentIndex >= this.slides.length) {
      this.currentIndex = 0;
    }
  }

  goTo(index: number): void {
    this.currentIndex = index;
    this.resetAutoPlay();
  }

  private startAutoPlay(): void {
    this.intervalId = setInterval(() => {
      this.next();
    }, this.autoInterval);
  }

  private stopAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private resetAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}
