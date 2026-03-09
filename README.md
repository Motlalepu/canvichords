# Canvas Harmonies

Welcome to Canvas Harmonies! This repository contains a React + Vite application for viewing artwork and listening to music.

## Project Structure

⚠️ **Important:** All project files (source code, config, dependencies) are located in the **`canvas-harmonies-main/`** subdirectory, not at the repository root.

### Why this structure?

Originally, the project was deployed with files nested in a subdirectory, which prevented Netlify from discovering the build configuration. To support future deploys without restructuring the project:

- A `netlify.toml` file at the repository root tells Netlify where the project lives and how to build it.
- This allows Netlify to automatically detect and build the project on every push.

### Directory Layout

```
.
├── netlify.toml                    # Netlify build configuration
├── README.md                       # This file
└── canvas-harmonies-main/          # Main project directory
    ├── package.json
    ├── vite.config.ts
    ├── src/
    ├── public/
    └── ... (other project files)
```

## Getting Started

### Local Development

```bash
cd canvas-harmonies-main
npm install
npm run dev
```

### Building for Production

```bash
cd canvas-harmonies-main
npm install
npm run build
```

The build output will be in `canvas-harmonies-main/dist/`.

## Deployment

The project is configured for automatic deployment with Netlify:

1. Push changes to the repository
2. Netlify automatically runs `npm run build` from inside `canvas-harmonies-main/`
3. The `dist/` folder is published as your live site

No manual configuration needed on Netlify's end—`netlify.toml` handles everything.

## Available Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build for production
- `npm run build:dev` – Build in development mode
- `npm run lint` – Run ESLint checks
- `npm run preview` – Preview the production build locally

---

**Future Restructuring:** If you decide to move all files from `canvas-harmonies-main/` to the repository root later, simply update or remove the `netlify.toml` file accordingly.
