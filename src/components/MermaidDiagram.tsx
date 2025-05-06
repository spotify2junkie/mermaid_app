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
    // Initialize mermaid with theme settings
    mermaid.initialize({
      startOnLoad: true,
      theme: theme === 'dark' ? 'dark' : 'default',
      securityLevel: 'loose', // Allows clickable links in diagrams
      fontFamily: 'sans-serif',
    });

    const renderDiagram = async () => {
      if (!containerRef.current || !code) return;

      try {
        // Clear previous content and error
        containerRef.current.innerHTML = '';
        setError(null);

        // Generate a unique ID for this render
        const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`;

        // Render the new diagram
        const { svg } = await mermaid.render(id, code);
        containerRef.current.innerHTML = svg;

        // Make the SVG responsive
        const svgElement = containerRef.current.querySelector('svg');
        if (svgElement) {
          svgElement.style.width = '100%';
          svgElement.style.height = 'auto';
          svgElement.style.maxWidth = '100%';

          // Add an id to make it easier to find for download
          svgElement.id = 'mermaid-diagram-svg';

          // Add appropriate ARIA attributes for accessibility
          svgElement.setAttribute('aria-label', 'Mermaid diagram visualization');
          svgElement.setAttribute('role', 'img');
        }
      } catch (err) {
        console.error('Error rendering Mermaid diagram:', err);
        setError('Failed to render diagram. Please check if your Mermaid syntax is valid.');
      }
    };

    renderDiagram();
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
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center overflow-auto"
      aria-live="polite"
    />
  );
}