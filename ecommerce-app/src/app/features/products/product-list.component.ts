import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../core/services/api.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../shared/models/product.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPaginationModule, RouterLink],
  template: `
    <div class="container py-4">
      <div class="row mb-4">
        <div class="col">
          <h1 class="text-center">Our Products</h1>
          <p class="text-center text-muted">Discover our amazing collection of products</p>
        </div>
      </div>

      <!-- Search and Filter Section -->
      <div class="row mb-4">
        <div class="col-md-6 mb-3">
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              class="form-control" 
              placeholder="Search products..." 
              [(ngModel)]="searchTerm"
              (input)="onSearchChange()"
            />
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <select class="form-select" [(ngModel)]="selectedCategory" (change)="onCategoryChange()">
            <option value="">All Categories</option>
            <option *ngFor="let category of categories$ | async" [value]="category">
              {{ category | titlecase }}
            </option>
          </select>
        </div>
      </div>

      <!-- Sort Controls -->
      <div class="row mb-4">
        <div class="col-md-4 offset-md-8">
          <select class="form-select" [(ngModel)]="sortOption" (change)="sortProducts()">
            <option value="">Sort by...</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="nameAsc">Name: A to Z</option>
            <option value="nameDesc">Name: Z to A</option>
          </select>
        </div>
      </div>

      <!-- Loading Spinner -->
      <div *ngIf="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted">Loading amazing products...</p>
      </div>

      <!-- Products Grid -->
      <div *ngIf="!isLoading" class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col" *ngFor="let product of displayedProducts; trackBy: trackByProductId">


          <div class="card h-100 product-card">
            <div class="card-img-wrapper">
              <img [src]="product.image" [alt]="product.title" class="card-img-top">
            </div>
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ product.title }}</h5>
              <div class="mt-auto">
                <p class="h5 mb-2">\${{ product.price }}</p>
                <div class="d-grid gap-2">
                  <button class="btn btn-primary" (click)="addToCart(product)">Add to Cart</button>
                  <a [routerLink]="['/products', product.id]" class="btn btn-outline-secondary">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results Message -->
      <div *ngIf="!isLoading && filteredProducts.length === 0" class="text-center py-5">
        <i class="bi bi-search" style="font-size: 3rem; color: #6c757d;"></i>
        <h3 class="mt-3">No products found</h3>
        <p class="text-muted">Try adjusting your search or filter criteria</p>
      </div>

      <!-- Pagination -->
      <div class="d-flex justify-content-center mt-4">
        <ngb-pagination
          [collectionSize]="filteredProducts.length"
          [(page)]="currentPage"
          [pageSize]="pageSize"
          [maxSize]="5"
          [rotate]="true"
          [boundaryLinks]="true"
          (pageChange)="onPageChange()"
        >
        </ngb-pagination>
      </div>
    </div>
  `,
  styles: [`
    .product-card {
      transition: transform 0.2s;
      height: 100%;
    }
    .product-card:hover {
      transform: translateY(-5px);
    }
    .card-img-wrapper {
      height: 200px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f8f9fa;
    }
    .card-img-top {
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
      padding: 10px;
    }
    .card-body {
      display: flex;
      flex-direction: column;
    }
    .card-title {
      font-size: 1rem;
      line-height: 1.2;
      height: 2.4em;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  `],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  displayedProducts: Product[] = [];
  categories$ = this.apiService.getCategories();
  currentPage = 1;
  pageSize = 9;
  searchTerm = '';
  selectedCategory = '';
  sortOption = '';
  isLoading = true;

  constructor(private apiService: ApiService, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.apiService.getProducts().subscribe((products) => {
      this.products = products;
      this.filterProducts();
      this.isLoading = false;
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = !this.searchTerm || 
        product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || 
        product.category === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    this.currentPage = 1;
    this.updateDisplayedProducts();
  }

  onSearchChange(): void {
    this.filterProducts();
  }

  onCategoryChange(): void {
    this.filterProducts();
  }

  sortProducts(): void {
    switch (this.sortOption) {
      case 'priceAsc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'nameAsc':
        this.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'nameDesc':
        this.filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    this.updateDisplayedProducts();
  }

  onPageChange(): void {
    this.updateDisplayedProducts();
  }

  updateDisplayedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedProducts = this.filteredProducts.slice(startIndex, startIndex + this.pageSize);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
