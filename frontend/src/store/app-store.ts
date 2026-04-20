import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
}

interface AppState {
  user: User | null;
  projects: Project[];
  currentProjectId: string | null;
  isAuthenticated: boolean;
  sidebarOpen: boolean;

  setUser: (user: User | null) => void;
  setProjects: (projects: Project[]) => void;
  setCurrentProjectId: (id: string | null) => void;
  toggleSidebar: () => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  projects: [],
  currentProjectId: null,
  isAuthenticated: false,
  sidebarOpen: true,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setProjects: (projects) => set({ projects }),
  setCurrentProjectId: (id) => set({ currentProjectId: id }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      projects: [],
      currentProjectId: null,
    }),
}));
