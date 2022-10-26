import { createContext } from 'react'
import { Theme } from './../types/Theme';

type ThemeContextType = {
    theme?: Theme
    updateTheme: (themeApplied: string) => void
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)
export default ThemeContext