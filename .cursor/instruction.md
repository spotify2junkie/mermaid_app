# Project Plan: AI Mermaid Diagram Generator

## 1. Project Overview

Build a Next.js web application allowing users to input text and generate Mermaid diagrams (Structure, Time-Structure, Concept Map) via an LLM. Features include dark/light mode, diagram display, copying Mermaid code, and downloading the diagram as an image.

## 2. Core Technologies

* **Framework:** Next.js (App Router) ✅
* **Styling:** Tailwind CSS ✅
* **State Management:** React Hooks or a dedicated library (Zustand, Redux Toolkit). ✅
* **Mermaid Rendering:** `mermaid` npm package. ✅
* **Theme Switching:** `next-themes` package. ✅ (Fixed - proper theme integration with Mermaid diagrams)
* **LLM Interaction:** Next.js API Route, LLM API (e.g., OpenAI, Gemini, Claude). ✅
* **Image Generation:** Browser Canvas API (+ potentially `canvg` library). ❌ (PNG download not functioning)

## 3. Development Steps

### Step 3.1: Project Setup & Configuration ✅

1.  **Initialize:** Create a new Next.js project using the standard initializer, selecting TypeScript, Tailwind CSS, and the App Router. ✅
2.  **Install:** Add necessary dependencies for Mermaid rendering, theme switching, and potentially UI icons (like Heroicons). Install corresponding TypeScript types if needed. Consider adding an SVG-to-Canvas library later if required for download functionality. ✅
3.  **Configure:** Configure Tailwind CSS to support dark mode using the recommended `class` strategy in its configuration file. ✅

### Step 3.2: Build Basic UI Layout ✅

1.  **Main Page:** Structure the main page component file (`src/app/page.tsx`). ✅
2.  **Layout:** Implement a two-column layout suitable for desktop view, using CSS Flexbox or Grid. ✅
    * **Left Column:** Designate for user input controls. ✅
    * **Right Column:** Designate for displaying the generated diagram or related messages. ✅
3.  **Input Area (Left Column):** ✅
    * Add a standard HTML text area element for user text input. ✅
    * Add three distinct HTML button elements below the text area, clearly labeled "Structure", "Time-Structure", and "Concept Map". ✅
4.  **Output Area (Right Column):** ✅
    * Add a placeholder HTML div element where the Mermaid diagram will eventually be rendered. Apply minimal styling (like a border) for visibility during development. ✅

### Step 3.3: Implement Dark/Light Mode ✅

1.  **Theme Provider:** Create a client-side Theme Provider component wrapping the functionality from the `next-themes` library. Ensure it handles component mounting correctly to prevent hydration errors. ✅
2.  **Integrate Provider:** Apply the created Theme Provider component within the application's root layout structure. ✅
3.  **Theme Toggle:** Create a separate, reusable component that allows users to switch between available themes (Light, Dark, System). Place this toggle component in a suitable UI location (e.g., application header). ✅
4.  **Apply Styles:** Utilize Tailwind's `dark:` variant prefix within CSS classes throughout the application to define specific styles for dark mode. ✅
5.  **Theme Integration with Mermaid:** Updated the Mermaid component to properly handle theme changes with custom theme variables for better color contrast and readability in both light and dark modes. ✅

### Step 3.4: Set Up State Management ✅

1.  **Component Scope:** Identify or create the primary client component responsible for managing the application's interactive state (likely the main page or a dedicated parent). Ensure it is designated as a client component. ✅
2.  **State Variables:** Define the necessary state variables using React's state management hooks: ✅
    * State for the user's input text. ✅
    * State for the generated Mermaid code string received from the backend. ✅
    * Boolean state to track if an LLM request is currently loading. ✅
    * State to hold potential error messages from API calls or rendering processes. ✅
3.  **Input Binding:** Connect the text area element's value and change events to the corresponding input text state variable. ✅

### Step 3.5: Create Backend API for LLM Interaction ✅

1.  **API Route File:** Create a new Next.js API Route file within the `src/app/api/` directory structure. ✅
2.  **POST Handler Logic:** Implement the request handler logic for `POST` requests within the API route: ✅
    * **Input:** Extract the user's input text and the requested diagram type from the incoming request's body. ✅
    * **Security:** Access the necessary LLM API key securely using environment variables, ensuring the `.env.local` file is properly configured and ignored by version control. ✅
    * **Prompt Engineering:** Carefully craft a prompt for the LLM that instructs it to generate only the raw Mermaid syntax corresponding to the input text and requested diagram type. ✅
    * **LLM Call:** Utilize the appropriate method to send the constructed prompt to the configured LLM API endpoint. ✅
    * **Error Handling:** Implement comprehensive error handling for the LLM API interaction, accounting for network issues, API-specific errors, and timeouts. ✅
    * **Response:** Process the response received from the LLM to isolate the Mermaid code and return it within a JSON structure. ✅

### Step 3.6: Connect Frontend to Backend API ✅

1.  **API Call Function:** Define an asynchronous handler function within the frontend state management component. This function should accept the target `diagramType` as a parameter. ✅
2.  **Function Logic:** Implement the core logic within this handler function: ✅
    * Set the loading state to indicate activity and clear any previous results (generated code, errors). ✅
    * Use the `fetch` API to initiate a `POST` request to the backend API endpoint (`/api/generate-mermaid`). Include the current input text and the specified `diagramType` in the request payload. ✅
    * Process the response: Update the Mermaid code state on a successful response, or update the error state if the API returns an error. Implement `try...catch` blocks to handle potential network or unexpected exceptions during the request. ✅
    * Ensure the loading state is reset regardless of success or failure (using a `finally` block). ✅
3.  **Button Integration:** Associate this handler function with the `onClick` event for each of the three diagram generation buttons. Pass the relevant diagram type string as the argument to the handler. Implement logic to disable the buttons while the loading state is active. ✅

### Step 3.7: Implement Mermaid Diagram Rendering ✅

1.  **Mermaid Component:** Create a dedicated, reusable client component specifically for rendering Mermaid diagrams. ✅
2.  **Props:** Design this component to accept the Mermaid code string as its primary input property (prop). ✅
3.  **Rendering Logic:** Utilize React hooks (`useEffect`, `useRef`) to manage the rendering process: ✅
    * When the Mermaid code prop changes, trigger the rendering logic within the `useEffect` hook. ✅
    * Interact with the imported `mermaid` library's API functions to initialize and render the diagram based on the provided code string. Target a specific DOM element (managed via `useRef`) as the rendering container. ✅
    * Implement error handling to catch and display issues that might arise during Mermaid's parsing or rendering phases. ✅
    * Ensure the rendering container is appropriately cleared before attempting to render a new diagram to prevent content overlap. ✅
    * **Theme Sync:** Enhanced the component to detect the application's current theme (using `next-themes` hooks) and configure the Mermaid renderer to use custom theme variables for better visual consistency and readability in both light and dark modes. ✅
4.  **Integration:** Incorporate this Mermaid rendering component into the right-hand column of the main page layout. Pass the `mermaidCode` state variable to its input prop. Implement conditional rendering logic on the main page to display either a loading indicator, an error message, or the Mermaid component itself, based on the current states. ✅

### Step 3.8: Add Copy and Download Features ❌

1.  **Copy Code:** ✅
    * Add a "Copy Code" button visually associated with the diagram display area. ✅
    * Implement its click handler to use the browser's Clipboard API to copy the contents of the `mermaidCode` state variable to the user's clipboard. Provide clear visual feedback upon successful copying. ✅
2.  **Download Image:** ❌
    * Add a "Download PNG" button near the diagram. ✅
    * Implement its click handler to execute the sequence to convert the SVG diagram to a PNG image and initiate a download. ✅
    * Programmatically access the rendered SVG element that Mermaid generated within the DOM. ✅
    * Convert the SVG graphic into a pixel-based format on a Canvas element. ✅
    * Generate a data URL from the Canvas content and initiate a download. ❌

**⚠️ Implementation Issue:** The PNG download functionality is not working correctly. Although the code is in place, there may be issues with how the SVG is being processed or with the Canvas API implementation. This needs further debugging.

### Step 3.9: Polish and Refine ✅

1.  **User Experience:** Improve the visual feedback for loading states and error conditions, making them clear and informative. ✅
2.  **Styling:** Conduct a thorough review and refinement of the application's overall visual design. Ensure consistency in styling between light and dark themes and across all components. ✅
3.  **Responsiveness:** Evaluate the layout on different screen sizes and implement basic responsive design adjustments if required for usability on smaller devices. ✅
4.  **Validation:** Introduce simple client-side validation, such as preventing diagram generation attempts when the input text area is empty. ✅
5.  **Accessibility:** Perform an accessibility review. Ensure the use of semantic HTML elements where appropriate and add necessary ARIA attributes to enhance usability for users relying on assistive technologies. ✅