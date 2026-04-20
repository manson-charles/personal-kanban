const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('botforge_token', token);
      } else {
        localStorage.removeItem('botforge_token');
      }
    }
  }

  getToken(): string | null {
    if (!this.token && typeof window !== 'undefined') {
      this.token = localStorage.getItem('botforge_token');
    }
    return this.token;
  }

  private async request<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string> || {}),
    };

    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth
  async register(data: { email: string; name: string; password: string }) {
    return this.request<{ user: unknown; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: { email: string; password: string }) {
    return this.request<{ user: unknown; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getProfile() {
    return this.request('/auth/me');
  }

  // Projects
  async getProjects() {
    return this.request('/projects');
  }

  async createProject(data: { name: string; description?: string }) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getProject(id: string) {
    return this.request(`/projects/${id}`);
  }

  // Bots
  async getBots(projectId: string) {
    return this.request(`/projects/${projectId}/bots`);
  }

  async createBot(projectId: string, data: { name: string; description?: string }) {
    return this.request(`/projects/${projectId}/bots`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getBot(projectId: string, botId: string) {
    return this.request(`/projects/${projectId}/bots/${botId}`);
  }

  // Workflows
  async getWorkflow(workflowId: string) {
    return this.request(`/workflows/${workflowId}`);
  }

  async saveWorkflow(workflowId: string, data: { nodes: unknown[]; edges: unknown[]; name?: string }) {
    return this.request(`/workflows/${workflowId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Billing
  async getSubscription() {
    return this.request('/billing/subscription');
  }

  async getUsage() {
    return this.request('/billing/usage');
  }
}

export const api = new ApiClient();
