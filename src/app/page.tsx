'use client'

import { useState, useRef } from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { MermaidDiagram } from '@/components/MermaidDiagram'
import { ClipboardDocumentIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { RiRobot2Fill } from 'react-icons/ri'
import { BeakerIcon } from '@heroicons/react/24/solid'

export default function Home() {
  // State variables
  const [inputText, setInputText] = useState('');
  const [mermaidCode, setMermaidCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const diagramRef = useRef<HTMLDivElement>(null);

  // Handler function for diagram generation with real API call
  const generateDiagram = async (diagramType: string) => {
    // Clear previous results
    setMermaidCode('');
    setError(null);
    setIsLoading(true);

    // Validate input
    if (!inputText.trim()) {
      setError('Please enter some text before generating a diagram');
      setIsLoading(false);
      return;
    }

    try {
      // Make the actual API call to our backend endpoint
      const response = await fetch('/api/generate-mermaid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputText,
          diagramType,
        }),
      });

      // Parse the JSON response
      const data = await response.json();

      // Check if the response indicates an error
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate diagram');
      }

      // Set the mermaid code from the successful response
      setMermaidCode(data.mermaidCode);
    } catch (err) {
      console.error('Error generating diagram:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for copying Mermaid code to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(mermaidCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Handler for downloading diagram as PNG
  const downloadAsPNG = () => {
    if (!diagramRef.current) return;

    // Find the SVG element within our diagram container
    const svgElement = diagramRef.current.querySelector('svg');
    if (!svgElement) {
      console.error('No SVG element found');
      return;
    }

    try {
      // Get SVG dimensions
      const svgRect = svgElement.getBoundingClientRect();
      const width = svgRect.width;
      const height = svgRect.height;

      // Clone the SVG to avoid modifying the displayed one
      const svgClone = svgElement.cloneNode(true) as SVGElement;

      // Set explicit dimensions on the SVG
      svgClone.setAttribute('width', width.toString());
      svgClone.setAttribute('height', height.toString());

      // Get the SVG as a string
      const svgData = new XMLSerializer().serializeToString(svgClone);

      // Create a new canvas with the same dimensions
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return;

      // Set higher resolution
      const scale = 2;
      canvas.width = width * scale;
      canvas.height = height * scale;

      // Set background color
      const isDarkMode = document.documentElement.classList.contains('dark');
      context.fillStyle = isDarkMode ? '#1f2937' : '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.scale(scale, scale);

      // Create an image element for the SVG
      const img = new Image();

      // IMPORTANT: Use a data URL with base64 encoding to avoid tainting the canvas
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });

      // Create a FileReader to read the blob as data URL
      const reader = new FileReader();
      reader.onload = function(e) {
        if (!e.target?.result) return;

        img.onload = function() {
          // Draw image onto canvas
          context.drawImage(img, 0, 0);

          try {
            // This should now work without tainting the canvas
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'mermaid-diagram.png';
            link.href = dataUrl;
            link.click();
          } catch (err) {
            console.error('Canvas export error:', err);
            setError('Failed to export diagram. Try a different browser.');
          }
        };

        // Set the image source to the data URL from the FileReader
        img.src = e.target.result as string;
      };

      // Read the SVG blob as a data URL
      reader.readAsDataURL(svgBlob);

    } catch (err) {
      console.error('Error in download process:', err);
      setError('Failed to download diagram: ' + (err instanceof Error ? err.message : String(err)));
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-white dark:bg-gray-900 dark:text-white">
      <div className="w-[80%] mx-auto min-h-[60vh]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BeakerIcon className="h-8 w-8 text-indigo-500" />
            AI Mermaid Diagram Generator
          </h1>
          <ThemeToggle />
        </div>

        <div className="flex flex-col md:flex-row gap-6 min-h-[calc(60vh-80px)]">
          {/* Left Column: Input Section */}
          <div className="flex-1 p-4 border rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4">Input</h2>

            <textarea
              className="w-full p-3 border rounded-md h-[calc(60vh-180px)] mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            {/* Add explanatory text above the buttons */}
            <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
              <h3 className="font-semibold text-lg mb-2">Choose a diagram type:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><span className="text-blue-600 dark:text-blue-400 font-medium">Structure:</span> Generates a hierarchical diagram showing relationships and organization of concepts.</li>
                <li><span className="text-green-600 dark:text-green-400 font-medium">Time-Structure:</span> Creates a timeline or flowchart showing sequential processes or temporal relationships.</li>
                <li><span className="text-purple-600 dark:text-purple-400 font-medium">Concept Map:</span> Builds a network diagram connecting related ideas, terms, and their relationships.</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:bg-blue-400 disabled:cursor-not-allowed"
                onClick={() => generateDiagram('Structure')}
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Structure'}
              </button>
              <button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded disabled:bg-green-400 disabled:cursor-not-allowed"
                onClick={() => generateDiagram('Time-Structure')}
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Time-Structure'}
              </button>
              <button
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded disabled:bg-purple-400 disabled:cursor-not-allowed"
                onClick={() => generateDiagram('Concept Map')}
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Concept Map'}
              </button>
            </div>
          </div>

          {/* Right Column: Output Section */}
          <div className="flex-1 p-4 border rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Generated Diagram</h2>

              {/* Action buttons only shown when we have a diagram */}
              {mermaidCode && !error && !isLoading && (
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center space-x-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-1 px-3 rounded text-sm transition-colors"
                    aria-label="Copy Mermaid code"
                  >
                    <ClipboardDocumentIcon className="h-4 w-4" />
                    <span>{copySuccess ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                  <button
                    onClick={downloadAsPNG}
                    className="flex items-center space-x-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-1 px-3 rounded text-sm transition-colors"
                    aria-label="Download as PNG"
                  >
                    <ArrowDownTrayIcon className="h-4 w-4" />
                    <span>Download PNG</span>
                  </button>
                </div>
              )}
            </div>

            <div
              ref={diagramRef}
              className="border rounded-md h-[calc(60vh-180px)] flex items-center justify-center bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-4 overflow-auto"
            >
              {isLoading ? (
                <div className="text-center p-4">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-2"></div>
                  <p className="text-gray-500 dark:text-gray-400">Generating your diagram...</p>
                </div>
              ) : error ? (
                <div className="text-red-500 p-4">
                  <p className="font-semibold">Error:</p>
                  <p>{error}</p>
                </div>
              ) : mermaidCode ? (
                <div className="w-full h-full flex flex-col">
                  {/* Show the Mermaid diagram */}
                  <div className="flex-1 min-h-[250px] overflow-auto">
                    <MermaidDiagram code={mermaidCode} />
                  </div>

                  {/* Show the Mermaid code below the diagram */}
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 mb-2">
                      View Mermaid Code
                    </summary>
                    <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-auto max-h-[150px]">
                      {mermaidCode}
                    </pre>
                  </details>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">Your diagram will appear here</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}