export interface User {
  id: number;
  email: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  email: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
}
