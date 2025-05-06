'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(undefined)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
    // Set initial theme state once mounted
    setCurrentTheme(theme)
  }, [theme])

  // Debug effect to log theme changes
  useEffect(() => {
    if (mounted) {
      console.log('Theme changed to:', theme);
      console.log('Resolved theme:', resolvedTheme);
    }
  }, [theme, resolvedTheme, mounted]);

  // Handle theme change with explicit function
  const handleThemeChange = (newTheme: string) => {
    console.log('Setting theme to:', newTheme);
    setTheme(newTheme);
    setCurrentTheme(newTheme);
  };

  if (!mounted) return null

  // Use resolvedTheme or theme or currentTheme for more reliable state
  const displayTheme = resolvedTheme || theme || currentTheme || 'system';

  return (
    <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      <button
        onClick={() => handleThemeChange('light')}
        className={`p-2 rounded-md ${
          displayTheme === 'light' ? 'bg-white text-black shadow-sm' : 'text-gray-600 dark:text-gray-400'
        } hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
        aria-label="Light mode"
      >
        <SunIcon className="h-5 w-5" />
      </button>

      <button
        onClick={() => handleThemeChange('dark')}
        className={`p-2 rounded-md ${
          displayTheme === 'dark' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-600 dark:text-gray-400'
        } hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
        aria-label="Dark mode"
      >
        <MoonIcon className="h-5 w-5" />
      </button>

      <button
        onClick={() => handleThemeChange('system')}
        className={`p-2 rounded-md ${
          displayTheme === 'system' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-600 dark:text-gray-400'
        } hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
        aria-label="System preference"
      >
        <ComputerDesktopIcon className="h-5 w-5" />
      </button>
    </div>
  )
}