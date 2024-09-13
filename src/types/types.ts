export type LoginValues = {
  email: string;
  password: string;
};

export type Login = {
  email: string;
  password: string;
};

export type AuthResponse = {
  data: {
    user: User;
  };
  token?: string | null;
};

export type ResetPasswordResponse = {
  data: User;
  success: boolean;
  message: string;
};

export type User = {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phoneNumber: string;
};

export type UserUpdate = {
  [firstname: string]: string;
  lastname: string;
  phoneNumber: string;
};

export type ForgotPassword = {
  email: string;
};

export type APIErrorResponse = {
  error: {
    status: number;
    data: {
      success: boolean;
      error: string;
    };
  };
  isUnhandledError: boolean;
  meta: {
    request: object;
    response: object;
  };
};

export type ResetPassword = {
  password: string;
  repeatPassword?: string;
  email?: string;
  code?: string;
};

export type changePassword = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export interface Auth {
  signedIn: boolean;
  user: User;
  token?: string | null;
}

export type StatusTypes = 'new' | 'processing' | 'fulfilled' 

export type PaymentStatus = 'Successful' | 'Failed'