import { useState } from 'react'
import { Theme } from './../types/Theme'
import { ThemeContext } from '../context'

type ThemeProviderProps = {
    children: React.ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme | undefined>(undefined)
    const updateTheme = (themeApplied: string) => setTheme({ themeApplied })

    return (
        <ThemeContext.Provider value={{ theme, updateTheme }}>
            {children}
        </ThemeContext.Provider>
    )

}