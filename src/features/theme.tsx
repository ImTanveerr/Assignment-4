import { createContext, useContext, useEffect } from "react"

type ThemeContextType = "light"

const ThemeContext = createContext<ThemeContextType>("light")

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Ensure document has only light theme class
    const root = document.documentElement
    root.classList.remove("dark")
    root.classList.add("light")
  }, [])

  return (
    <ThemeContext.Provider value="light">
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const theme = useContext(ThemeContext)

  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return theme
}
