# Portfolio Website

Personal portfolio site for Soham Deo — [sohamdeo.com](https://sohamdeo.com)

Showcases skills, projects, and experience. Also a personal project to develop and iterate on technical and creative skills.

## Features

- Interactive tab-based navigation (About, Highlights, Projects, CV)
- Cyberpunk/retro design with custom pixel fonts
- Dynamic content loaded from JSON files (submodule)
- Animated transitions via Svelte
- Responsive layout with Tailwind CSS v4

## Tech Stack

- [SvelteKit 2](https://kit.svelte.dev/) + [Svelte 5](https://svelte.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Cloudflare Workers](https://workers.cloudflare.com/) — static asset hosting
- [GitHub Actions](https://github.com/features/actions) — CI/CD

See [HOSTING.md](./HOSTING.md) for full infrastructure and deployment details.

## Getting Started

### Prerequisites

- Node.js v20+
- npm

### Development

```sh
git clone --recurse-submodules https://github.com/devSoham3/portfolio-site.git
cd portfolio-site
npm install
npm run dev
```

The site will be available at `http://localhost:5173/`.

> The `--recurse-submodules` flag is required — content JSON files live in the private `portfolio-content` submodule. You'll need read access to that repo.

### Building for Production

```sh
npm run build
```

Output goes to `build/`. Deploy with `npx wrangler deploy` (requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`).

## Project Structure

```
src/            Svelte components, routes, styles
content/        Git submodule → portfolio-content (JSON data files)
static/         Static assets (images, fonts, favicon)
static/data/    Symlink → content/pages/ (JSON served as static assets)
wrangler.toml   Cloudflare Workers deploy config
```

## Contact

[devsoham3@gmail.com](mailto:devsoham3@gmail.com)
