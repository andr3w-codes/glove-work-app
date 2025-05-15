# Youth Baseball Flashcards App

This project is a web application designed to help young baseball players learn the game through interactive flashcards and scenarios.

## Tech Stack

- React
- Vite
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1.  **Clone the repository (if applicable) or ensure all files are in a project directory.**

2.  **Navigate to the project directory:**
    ```bash
    cd your-project-directory
    ```

3.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

### Running the Development Server

Once dependencies are installed, you can start the development server:

Using npm:
```bash
npm run dev
```
Or using yarn:
```bash
yarn dev
```

This will typically start the app on `http://localhost:5173` (Vite's default port).

### Building for Production

To create a production build:

Using npm:
```bash
npm run build
```
Or using yarn:
```bash
yarn build
```

This will create a `dist` folder with the optimized static assets.

## Project Structure (Initial)

```
.gitignore
index.html
package.json
postcss.config.js
README.md
tailwind.config.js
vite.config.js
src/
  App.jsx
  index.css
  main.jsx
  assets/ (will be created by Vite if you add assets, e.g. react.svg)
  components/      # For UI components
  contexts/        # For React Context API
  data/            # For flashcard data, rules, etc.
  hooks/           # For custom React hooks
  pages/           # For page-level components (if we adopt routing)
  utils/           # For utility functions
``` 