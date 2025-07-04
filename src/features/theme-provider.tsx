import { createContext, useContext } from "react"

type ThemeProviderProps = {
  children: React.ReactNode
}

type ThemeProviderState = {
  theme: "light"
  setTheme: (theme: "light") => void
}

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Fixed light theme, no toggling
  const value = {
    theme: "light" as const,
    setTheme: () => null, // No-op since theme is fixed
  }

  // Ensure document has "light" class only
  if (typeof window !== "undefined") {
    const root = window.document.documentElement
    root.classList.remove("dark")
    root.classList.add("light")
  }

  return (
      <ThemeProviderContext.Provider value={value}>
        {children}
      </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
