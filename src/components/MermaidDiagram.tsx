'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import mermaid from 'mermaid'

interface MermaidDiagramProps {
  code: string;
}

export function MermaidDiagram({ code }: MermaidDiagramProps) {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (code) {
      try {
        const element = containerRef.current;
        if (element) {
          element.innerHTML = '';

          // Check if we're in dark mode
          const isDarkMode = theme === 'dark';

          // Configure mermaid with appropriate theme
          mermaid.initialize({
            startOnLoad: false,
            theme: isDarkMode ? 'dark' : 'default',
            darkMode: isDarkMode,
            themeVariables: isDarkMode ? {
              // Custom dark theme variables with better contrast
              primaryColor: '#6366f1',
              primaryTextColor: '#ffffff',
              primaryBorderColor: '#8b5cf6',
              lineColor: '#d1d5db',
              secondaryColor: '#475569',
              tertiaryColor: '#1e293b',
              // Improve node colors for better visibility on dark backgrounds
              nodeBorder: '#93c5fd',
              nodeBkg: '#334155',
              nodeTextColor: '#ffffff',
              // Background should be transparent to work with page background
              background: 'transparent',
            } : {
              // Custom light theme variables
              primaryColor: '#6366f1',
              primaryTextColor: '#000000',
              primaryBorderColor: '#8b5cf6',
              lineColor: '#334155',
              secondaryColor: '#e2e8f0',
              tertiaryColor: '#f8fafc',
              nodeBorder: '#7c3aed',
              nodeBkg: '#ffffff',
              nodeTextColor: '#000000',
            }
          });

          mermaid.render('mermaid-svg', code)
            .then(({ svg }) => {
              element.innerHTML = svg;
            })
            .catch((error) => {
              console.error('Mermaid rendering error:', error);
              setError('Error rendering diagram: ' + error.message);
            });
        }
      } catch (error) {
        console.error('Mermaid initialization error:', error);
        setError('Error initializing diagram renderer');
      }
    }
  }, [code, theme]);

  if (error) {
    return (
      <div className="text-red-500 p-4 border border-red-300 rounded bg-red-50 dark:bg-red-900/20">
        <p className="font-medium">Error rendering diagram:</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="mermaid-container">
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div ref={containerRef} className="mermaid"></div>
      )}
    </div>
  );
}