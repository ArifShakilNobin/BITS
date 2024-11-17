import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  panelSizes: number[] = [50, 50];

  constructor() {}

  ngOnInit(): void {
    this.updatePanelSizes();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updatePanelSizes();
  }

  updatePanelSizes(): void {
    const width = window.innerWidth;
    if (width <= 768) {
      this.panelSizes = [100];  // Full width for smaller devices (mobile/tablet)
    } else {
      this.panelSizes = [50, 50];  // 50% each for larger screens (desktop)
    }
  }
}
