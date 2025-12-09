# E-Commerce Application

A modern, responsive e-commerce application built with Angular 17 and Bootstrap 5, integrated with the Fake Store API.

## Features

- Product catalog with categories
- Advanced filtering and search
- Shopping cart with sliding panel
- User authentication and profile management
- Secure checkout process
- Responsive design for all devices
- Dark/Light theme support
- Order history and tracking
- Wishlist functionality
- Real-time form validation
- Loading states and animations
- Toast notifications

## Technologies Used

- Angular 17
- Bootstrap 5
- TypeScript
- RxJS
- Angular Reactive Forms
- NgBootstrap
- Bootstrap Icons

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Angular CLI

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Navigate to the project directory:

```bash
cd ecommerce-app
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:4200`.

## Building for Production

To create a production build:

```bash
npm run build:prod
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── core/           # Singleton services, guards, and interceptors
│   ├── shared/         # Shared components, models, and utilities
│   └── features/       # Feature modules
│       ├── home/       # Home page feature
│       ├── products/   # Products feature
│       ├── cart/       # Cart feature
│       ├── auth/       # Authentication feature
│       ├── user/       # User profile feature
│       └── checkout/   # Checkout feature
├── assets/            # Static assets
└── environments/      # Environment configuration
```

## Development Guidelines

- Follow Angular best practices and style guide
- Use TypeScript strict mode
- Implement lazy loading for all feature modules
- Write clean, maintainable code with proper documentation
- Use Angular's built-in security features
- Implement proper error handling
- Follow responsive design principles
- Use semantic HTML and accessibility best practices

## API Integration

This application uses the [Fake Store API](https://fakestoreapi.com) for demonstration purposes. The API provides:

- Product catalog
- Categories
- User authentication
- Shopping cart operations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

````

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
````

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
