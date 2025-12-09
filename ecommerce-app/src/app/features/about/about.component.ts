import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-page">
      <div class="container py-5">
        <div class="row mb-5">
          <div class="col-12 text-center">
            <h1 class="display-4 fw-bold mb-4">About E-Shop</h1>
            <p class="lead text-muted">Your trusted online shopping destination since 2020</p>
          </div>
        </div>
        
        <div class="row align-items-center mb-5">
          <div class="col-md-6 mb-4 mb-md-0">
            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                 alt="Our Story" class="img-fluid rounded shadow">
          </div>
          <div class="col-md-6">
            <h2 class="fw-bold mb-3">Our Story</h2>
            <p>E-Shop was founded with a simple mission: to make quality products accessible to everyone. What started as a small online store has grown into a comprehensive e-commerce platform offering thousands of products across multiple categories.</p>
            <p>Our journey began when our founders recognized the need for a customer-centric online shopping experience that prioritizes quality, affordability, and exceptional service.</p>
          </div>
        </div>
        
        <div class="row align-items-center mb-5 flex-md-row-reverse">
          <div class="col-md-6 mb-4 mb-md-0">
            <img src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                 alt="Our Mission" class="img-fluid rounded shadow">
          </div>
          <div class="col-md-6">
            <h2 class="fw-bold mb-3">Our Mission</h2>
            <p>At E-Shop, we're committed to providing an exceptional shopping experience through:</p>
            <ul class="list-unstyled">
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i> Curating high-quality products at competitive prices</li>
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i> Offering fast, reliable shipping and hassle-free returns</li>
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i> Providing outstanding customer service</li>
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i> Ensuring a secure and user-friendly shopping platform</li>
            </ul>
          </div>
        </div>
        
        <div class="row mb-5">
          <div class="col-12">
            <h2 class="fw-bold mb-4 text-center">Our Values</h2>
            <div class="row g-4">
              <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm">
                  <div class="card-body text-center p-4">
                    <div class="icon-wrapper mb-3">
                      <i class="bi bi-heart-fill text-danger fs-1"></i>
                    </div>
                    <h3 class="card-title h5 fw-bold">Customer First</h3>
                    <p class="card-text">We prioritize our customers' needs in everything we do, striving to exceed expectations at every touchpoint.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm">
                  <div class="card-body text-center p-4">
                    <div class="icon-wrapper mb-3">
                      <i class="bi bi-shield-check text-primary fs-1"></i>
                    </div>
                    <h3 class="card-title h5 fw-bold">Quality & Trust</h3>
                    <p class="card-text">We carefully select our products and partners to ensure we deliver only the best quality merchandise to our customers.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm">
                  <div class="card-body text-center p-4">
                    <div class="icon-wrapper mb-3">
                      <i class="bi bi-globe2 text-success fs-1"></i>
                    </div>
                    <h3 class="card-title h5 fw-bold">Sustainability</h3>
                    <p class="card-text">We're committed to reducing our environmental impact through eco-friendly packaging and sustainable business practices.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="row mb-5">
          <div class="col-12 text-center">
            <h2 class="fw-bold mb-4">Our Team</h2>
            <p class="lead mb-5">Meet the dedicated professionals behind E-Shop</p>
            <div class="row g-4">
              <div class="col-md-3 col-6">
                <div class="team-member">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Team Member" class="img-fluid rounded-circle mb-3">
                  <h5 class="fw-bold mb-1">John Smith</h5>
                  <p class="text-muted small">CEO & Founder</p>
                </div>
              </div>
              <div class="col-md-3 col-6">
                <div class="team-member">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Team Member" class="img-fluid rounded-circle mb-3">
                  <h5 class="fw-bold mb-1">Sarah Johnson</h5>
                  <p class="text-muted small">COO</p>
                </div>
              </div>
              <div class="col-md-3 col-6">
                <div class="team-member">
                  <img src="https://randomuser.me/api/portraits/men/68.jpg" alt="Team Member" class="img-fluid rounded-circle mb-3">
                  <h5 class="fw-bold mb-1">Michael Chen</h5>
                  <p class="text-muted small">CTO</p>
                </div>
              </div>
              <div class="col-md-3 col-6">
                <div class="team-member">
                  <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Team Member" class="img-fluid rounded-circle mb-3">
                  <h5 class="fw-bold mb-1">Emily Rodriguez</h5>
                  <p class="text-muted small">Head of Customer Service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-12 text-center">
            <h2 class="fw-bold mb-4">Join Our Journey</h2>
            <p class="lead mb-4">We're always looking for talented individuals to join our team</p>
            <a href="/careers" class="btn btn-primary btn-lg">View Career Opportunities</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-page {
      background-color: var(--bg-primary);
      color: var(--text-primary);
    }
    .icon-wrapper {
      height: 70px;
      width: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      border-radius: 50%;
      background-color: var(--bg-secondary);
    }
    .team-member {
      text-align: center;
      margin-bottom: 2rem;
    }
    .team-member img {
      width: 150px;
      height: 150px;
      object-fit: cover;
      border: 5px solid var(--bg-secondary);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    h1, h2, h3 {
      color: var(--text-primary);
    }
    .card {
      background-color: var(--card-bg);
      transition: transform 0.3s ease;
    }
    .card:hover {
      transform: translateY(-5px);
    }
  `]
})
export class AboutComponent {}