const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export interface StrapiUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiAuthResponse {
  jwt: string;
  user: StrapiUser;
}

export interface StrapiError {
  error: {
    status: number;
    name: string;
    message: string;
  };
}

export const strapiApi = {
  // Login user
  async login(identifier: string, password: string): Promise<StrapiAuthResponse> {
    const response = await fetch(`${STRAPI_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    if (!response.ok) {
      const error: StrapiError = await response.json();
      throw new Error(error.error.message);
    }

    return response.json();
  },

  // Register user
  async register(username: string, email: string, password: string): Promise<StrapiAuthResponse> {
    const response = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const error: StrapiError = await response.json();
      throw new Error(error.error.message);
    }

    return response.json();
  },

  // Get user profile
  async getMe(token: string): Promise<StrapiUser> {
    const response = await fetch(`${STRAPI_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    return response.json();
  },

  // Generic authenticated request
  async authenticatedRequest(endpoint: string, token: string, options: RequestInit = {}) {
    const response = await fetch(`${STRAPI_URL}/api${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  },
};
