# Project Plan: AI Mermaid Diagram Generator

## 1. Project Overview - v0 Complete ✅

The v0 version successfully built a Next.js web application allowing users to input text and generate Mermaid diagrams (Structure, Time-Structure, Concept Map) via an LLM. Features include dark/light mode, diagram display, copying Mermaid code, and partial downloading functionality for the diagram as an image.

## 2. Core Technologies - v0 Complete ✅

* **Framework:** Next.js (App Router) ✅
* **Styling:** Tailwind CSS ✅
* **State Management:** React Hooks ✅
* **Mermaid Rendering:** `mermaid` npm package ✅
* **Theme Switching:** `next-themes` package ✅ (Proper theme integration with Mermaid diagrams)
* **LLM Interaction:** Next.js API Route, LLM API ✅
* **Image Generation:** Browser Canvas API ❌ (PNG download partially implemented)

## 3. Development Steps - v0 Features

### Step 3.1: Project Setup & Configuration - v0 Complete ✅

1.  **Initialize:** Create a new Next.js project using the standard initializer, selecting TypeScript, Tailwind CSS, and the App Router. ✅
2.  **Install:** Add necessary dependencies for Mermaid rendering, theme switching, and UI icons (Heroicons). ✅
3.  **Configure:** Configure Tailwind CSS to support dark mode using the recommended `class` strategy. ✅

### Step 3.2: Build Basic UI Layout - v0 Complete ✅

1.  **Main Page:** Structure the main page component file (`src/app/page.tsx`). ✅
2.  **Layout:** Implement a two-column layout suitable for desktop view, using CSS Flexbox or Grid. ✅
    * **Left Column:** Designate for user input controls. ✅
    * **Right Column:** Designate for displaying the generated diagram or related messages. ✅
3.  **Input Area (Left Column):** ✅
    * Add a standard HTML text area element for user text input. ✅
    * Add three distinct HTML button elements below the text area, clearly labeled "Structure", "Time-Structure", and "Concept Map". ✅
4.  **Output Area (Right Column):** ✅
    * Add a placeholder HTML div element where the Mermaid diagram will eventually be rendered. ✅

### Step 3.3: Implement Dark/Light Mode - v0 Complete ✅

1.  **Theme Provider:** Create a client-side Theme Provider component wrapping the functionality from the `next-themes` library. ✅
2.  **Integrate Provider:** Apply the created Theme Provider component within the application's root layout structure. ✅
3.  **Theme Toggle:** Create a separate, reusable component that allows users to switch between available themes (Light, Dark, System). ✅
4.  **Apply Styles:** Utilize Tailwind's `dark:` variant prefix within CSS classes throughout the application. ✅
5.  **Theme Integration with Mermaid:** Updated the Mermaid component to properly handle theme changes with custom theme variables. ✅

### Step 3.4: Set Up State Management - v0 Complete ✅

1.  **Component Scope:** Identify the primary client component responsible for managing the application's interactive state. ✅
2.  **State Variables:** Define the necessary state variables using React's state management hooks: ✅
    * State for the user's input text. ✅
    * State for the generated Mermaid code string received from the backend. ✅
    * Boolean state to track if an LLM request is currently loading. ✅
    * State to hold potential error messages from API calls or rendering processes. ✅
3.  **Input Binding:** Connect the text area element's value and change events to the corresponding input text state variable. ✅

### Step 3.5: Create Backend API for LLM Interaction - v0 Complete ✅

1.  **API Route File:** Create a new Next.js API Route file within the `src/app/api/` directory structure. ✅
2.  **POST Handler Logic:** Implement the request handler logic for `POST` requests within the API route: ✅
    * **Input:** Extract the user's input text and the requested diagram type from the incoming request's body. ✅
    * **Security:** Access the necessary LLM API key securely using environment variables. ✅
    * **Prompt Engineering:** Carefully craft a prompt for the LLM to generate Mermaid syntax. ✅
    * **LLM Call:** Utilize the appropriate method to send the constructed prompt to the configured LLM API endpoint. ✅
    * **Error Handling:** Implement comprehensive error handling for the LLM API interaction. ✅
    * **Response:** Process the response received from the LLM to isolate the Mermaid code and return it within a JSON structure. ✅

### Step 3.6: Connect Frontend to Backend API - v0 Complete ✅

1.  **API Call Function:** Define an asynchronous handler function within the frontend state management component. ✅
2.  **Function Logic:** Implement the core logic within this handler function: ✅
    * Set the loading state and clear any previous results. ✅
    * Use the `fetch` API to initiate a `POST` request to the backend API endpoint. ✅
    * Process the response and implement error handling. ✅
    * Reset the loading state regardless of success or failure. ✅
3.  **Button Integration:** Associate this handler function with the `onClick` event for each diagram generation button. ✅

### Step 3.7: Implement Mermaid Diagram Rendering - v0 Complete ✅

1.  **Mermaid Component:** Create a dedicated, reusable client component for rendering Mermaid diagrams. ✅
2.  **Props:** Design this component to accept the Mermaid code string as its primary input property. ✅
3.  **Rendering Logic:** Utilize React hooks to manage the rendering process: ✅
    * Trigger rendering logic within the `useEffect` hook when the Mermaid code prop changes. ✅
    * Interact with the imported `mermaid` library's API functions. ✅
    * Implement error handling for Mermaid's parsing or rendering. ✅
    * Ensure the rendering container is appropriately cleared before attempting to render a new diagram. ✅
    * **Theme Sync:** Enhanced the component to detect the application's current theme and configure the Mermaid renderer accordingly. ✅
4.  **Integration:** Incorporate this Mermaid rendering component into the right-hand column of the main page layout. ✅

### Step 3.8: Add Copy and Download Features - v0 Partially Complete ⚠️

1.  **Copy Code:** ✅
    * Add a "Copy Code" button visually associated with the diagram display area. ✅
    * Implement its click handler to use the browser's Clipboard API. ✅
2.  **Download Image:** ❌
    * Add a "Download PNG" button near the diagram. ✅
    * Implement its click handler to convert the SVG diagram to a PNG image and initiate a download. ⚠️
    * The PNG download functionality is partially implemented but not working correctly.

### Step 3.9: Polish and Refine - v0 Complete ✅

1.  **User Experience:** Improve the visual feedback for loading states and error conditions. ✅
2.  **Styling:** Conduct a thorough review and refinement of the application's overall visual design. ✅
3.  **Responsiveness:** Evaluate the layout on different screen sizes and implement basic responsive design adjustments. ✅
4.  **Validation:** Introduce simple client-side validation for input text. ✅
5.  **Accessibility:** Perform an accessibility review and add necessary ARIA attributes. ✅

## 4. Future Enhancements (v1+)

For future versions, consider:

1. Fix PNG download functionality
2. Add ability to save and share diagrams
3. Implement user authentication for saved diagrams
4. Add more diagram types and customization options
5. Optimize LLM prompts for better diagram generation
6. Add analytics to track usage patterns
7. Implement keyboard shortcuts for common actions
8. Add example templates for different diagram types