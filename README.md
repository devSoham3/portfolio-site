# Portfolio Website

This repository contains the source code for my personal portfolio website. The website showcases my skills, projects, and experiences, serving as a platform to highlight my professional journey. It is also a personal project that I want to develop to showcase my technical and creative skills.

## Features

- Interactive, tab-based navigation for About, Highlights, Projects, and Curriculum Vitae sections
- Responsive design with custom pixel and retro fonts
- Dynamic content loading from JSON files (skills, projects, CV, about)
- Animated transitions between sections using Svelte transitions
- Custom theming with Tailwind CSS and CSS variables
- Dockerized for easy deployment
- CI/CD pipeline with GitHub Actions and Docker image publishing

## Technologies Used

- [SvelteKit](https://kit.svelte.dev/) for frontend framework
- [Svelte](https://svelte.dev/) for UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Docker](https://www.docker.com/) for containerization
- [GitHub Actions](https://github.com/features/actions) for CI/CD
- [Node.js](https://nodejs.org/) for server runtime
- Custom fonts and theming

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)

### Development

1. **Clone the repository:**
   ```sh
   git clone --recurse-submodules https://github.com/devSoham3/portfolio-site.git
   cd portfolio-site
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the development server:**
   ```sh
   npm run dev
   ```
   The site will be available at `http://localhost:5173/` by default.

### Building for Production

```sh
npm run build
```

### Running with Docker

```sh
docker build -t portfolio-site .
docker run -p 3000:3000 portfolio-site
```

## Project Structure

- `src/` – Svelte components, routes, and styles
- `content/pages/` – JSON files for dynamic content (about, highlights, projects, cv)
- `static/` – Static assets (images, fonts, favicon)
- `Dockerfile` – Docker build instructions
- `.github/workflows/` – GitHub Actions CI/CD configuration

## Contact

For any inquiries, you can reach me at [devsoham3@gmail.com](mailto:devsoham3@gmail.com) or [deoSoham@mail.rit.edu](mailto:deoSoham@mail.rit.edu).