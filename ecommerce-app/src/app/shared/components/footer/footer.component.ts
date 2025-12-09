import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer mt-auto py-4">
      <div class="container">
        <div class="row">
          <div class="col-md-4 mb-3 mb-md-0">
            <h5>E-Shop</h5>
            <p class="text-muted ">Your one-stop shop for all your needs. Quality products, fast delivery, and excellent customer service.</p>
          </div>
          <div class="col-md-2 mb-3 mb-md-0">
            <h5>Shop</h5>
            <ul class="list-unstyled">
              <li><a routerLink="/products" class="footer-link">All Products</a></li>
              <li><a routerLink="/products?category=electronics" class="footer-link">Electronics</a></li>
              <li><a routerLink="/products?category=clothing" class="footer-link">Clothing</a></li>
              <li><a routerLink="/products?category=home" class="footer-link">Home & Kitchen</a></li>
            </ul>
          </div>
          <div class="col-md-2 mb-3 mb-md-0">
            <h5>About</h5>
            <ul class="list-unstyled">
              <li><a routerLink="/about" class="footer-link">About Us</a></li>
              <li><a routerLink="/contact" class="footer-link">Contact</a></li>
              <li><a routerLink="/careers" class="footer-link">Careers</a></li>
              <li><a routerLink="/blog" class="footer-link">Blog</a></li>
            </ul>
          </div>
          <div class="col-md-4">
            <h5>Stay Connected</h5>
            <div class="d-flex social-links">
              <a href="#" class="me-3 social-icon"><i class="bi bi-facebook"></i></a>
              <a href="#" class="me-3 social-icon"><i class="bi bi-twitter"></i></a>
              <a href="#" class="me-3 social-icon"><i class="bi bi-instagram"></i></a>
              <a href="#" class="me-3 social-icon"><i class="bi bi-linkedin"></i></a>
            </div>
            <div class="mt-3">
              <h6>Subscribe to our newsletter</h6>
              <div class="input-group">
                <input type="email" class="form-control" placeholder="Your email">
                <button class="btn btn-primary" type="button">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        <hr class="my-4">
        <div class="row align-items-center">
          <div class="col-md-6 text-center text-md-start">
            <p class="mb-0">© 2025 E-Shop. All rights reserved.</p>
          </div>
          <div class="col-md-6 text-center text-md-end">
            <ul class="list-inline mb-0">
              <li class="list-inline-item"><a href="#" class="footer-link">Privacy Policy</a></li>
              <li class="list-inline-item"><a href="#" class="footer-link">Terms of Use</a></li>
              <li class="list-inline-item"><a href="#" class="footer-link">Shipping Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--bg-secondary);
      color: var(--text-primary);
      border-top: 1px solid var(--border-color);
    }
    .footer-link {
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.2s;
    }
    .footer-link:hover {
      color: var(--primary-color);
    }
    .social-icon {
      color: var(--text-primary);
      font-size: 1.5rem;
      transition: color 0.2s;
    }
    .social-icon:hover {
      color: var(--primary-color);
    }
    p {
       color: var(--primary-color);
    }
    h5 {
      font-weight: 600;
      margin-bottom: 1rem;
    }
    hr {
      border-color: var(--border-color);
    }
    .list-inline-item:not(:last-child)::after {
      content: '|';
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      color: var(--border-color);
    }
  `]
})
export class FooterComponent {}