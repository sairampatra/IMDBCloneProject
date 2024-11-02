import { create } from 'zustand'

export const useThemeState = create((set) => ({
 darkMode: true,
  toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
}))

