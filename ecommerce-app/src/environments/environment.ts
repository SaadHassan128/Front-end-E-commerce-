export const environment = {
  production: false,
  apiUrl: 'https://fakestoreapi.com',
  apiTimeout: 10000, // 10 seconds
  defaultPageSize: 9,
  maxPageSize: 100,
  defaultCurrency: 'USD',
  taxRate: 0.1, // 10%
  supportEmail: 'support@eshop.com',
  defaultImagePlaceholder: 'assets/images/placeholder.png',
  localStorageKeys: {
    authToken: 'authToken',
    user: 'user',
    cart: 'cart',
    theme: 'theme',
    viewPreference: 'viewPreference',
  },
};
