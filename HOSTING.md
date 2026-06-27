# Hosting Reference — sohamdeo.com

Last updated: June 2026. Written to help future-me if I change the setup again.

---

## Architecture Overview

| Layer | Technology | Notes |
|---|---|---|
| Framework | SvelteKit 2 + Svelte 5 | Static export via adapter-static |
| Hosting | Cloudflare Workers (static assets) | Free tier, global CDN |
| CI/CD | GitHub Actions | Auto-deploys on push to `main` |
| Content | Private GitHub submodule | `portfolio-content` at `content/` |
| Domain registrar | Squarespace | sohamdeo.com registered here |
| DNS | Cloudflare | Nameservers pointed from Squarespace |
| VM (Hostinger) | Still running | Subdomain apps only (see below) |

The main site (`sohamdeo.com`) runs entirely on Cloudflare — no VM involved. The VM (Hostinger) only serves the subdomain apps via Nginx.

---

## Repositories

| Repo | Visibility | Purpose |
|---|---|---|
| `devSoham3/portfolio-site` | Public | SvelteKit frontend source |
| `devSoham3/portfolio-content` | Private | JSON content files (submodule at `content/`) |
| `devSoham3/infra-site` | — | Old Docker/Nginx infra — no longer used for main site |

The `content/` directory in `portfolio-site` is a Git submodule pointing to `portfolio-content`. The path `static/data/` is a **symlink** to `content/pages/`, so JSON files are automatically served as static assets without any copy step.

---

## How Deployments Work

### Updating content (JSON files)
1. Edit files in `portfolio-content/pages/` (`about.json`, `highlights.json`, `projects.json`, `cv.json`, `phrases.json`)
2. Push to `portfolio-content` main
3. `trigger-deploy.yml` fires → calls `workflow_dispatch` on `portfolio-site` via GitHub API (using `SUBMODULE_TOKEN`)
4. `deploy.yml` fires on `portfolio-site` → checks out repo + submodule → `npm ci` → `npm run build` → `wrangler deploy`
5. Site is live on Cloudflare within ~1–2 minutes

### Updating frontend code
1. Edit SvelteKit source in `portfolio-site/src/`
2. Push to `portfolio-site` main
3. `deploy.yml` fires automatically — same build+deploy pipeline as above

---

## Key Files

### `svelte.config.js`
```js
import adapter from '@sveltejs/adapter-static';
const config = {
  kit: {
    adapter: adapter({ fallback: 'index.html' })
  }
};
export default config;
```
`fallback: 'index.html'` enables SPA mode — all routes fall back to index.html for client-side routing.

### `wrangler.toml`
```toml
name = "portfolio-site"
compatibility_date = "2025-01-01"

[assets]
directory = "./build"
```
Tells Wrangler that this is a static asset deployment (not a Worker script). The `[assets]` key is what makes Cloudflare treat the build output as a static site.

### `.github/workflows/deploy.yml`
```yaml
name: Deploy to Cloudflare
on:
  push:
    branches: [main]
  workflow_dispatch:
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4.2.2
        with:
          submodules: true
          token: ${{ secrets.SUBMODULE_TOKEN }}
      - uses: actions/setup-node@v4.4.0
        with:
          node-version: '24'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - run: npx wrangler deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

### `portfolio-content/.github/workflows/trigger-deploy.yml`
```yaml
name: Trigger site deploy
on:
  push:
    branches: [main]
jobs:
  trigger:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v7
        with:
          github-token: ${{ secrets.SUBMODULE_TOKEN }}
          script: |
            await github.rest.actions.createWorkflowDispatch({
              owner: 'devSoham3',
              repo: 'portfolio-site',
              workflow_id: 'deploy.yml',
              ref: 'main'
            })
```

---

## GitHub Secrets Required

### `portfolio-site` repo secrets
| Secret | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with "Edit Cloudflare Workers" permissions |
| `CLOUDFLARE_ACCOUNT_ID` | Found in Cloudflare dashboard → right sidebar |
| `SUBMODULE_TOKEN` | GitHub PAT with access to `portfolio-content` and `portfolio-site` Actions |

### `portfolio-content` repo secrets
| Secret | Value |
|---|---|
| `SUBMODULE_TOKEN` | Same PAT as above (needed to trigger workflow_dispatch on portfolio-site) |

---

## DNS Records (Cloudflare)

Nameservers are pointed from Squarespace → Cloudflare. All DNS is managed in Cloudflare.

| Type | Name | Content | Proxied |
|---|---|---|---|
| A | `sohamdeo.com` | Cloudflare Pages (set via Custom Domain in CF dashboard) | Yes |
| A | `test` | VM IP | Yes |
| A | `apptware` | VM IP | Yes |
| A | `work` | VM IP | Yes |
| A | `portfolio` | VM IP | Yes |
| CNAME | `www` | `sohamdeo.com` | Yes |
| TXT | `google._domainkey` | DKIM record | DNS only |

VM subdomains (`test`, `apptware`, `work`) are reverse-proxied via Nginx on the VM.

---

## VM Details (Hostinger)

- IP: stored in Cloudflare DNS (not committed here)
- OS: Ubuntu (Nginx + Docker Compose)
- Nginx config in `infra-site` repo
- SSL: Cloudflare handles SSL termination (proxied records), VM gets plain HTTP from Cloudflare
- The main portfolio site no longer runs on the VM at all

---

## What Was Removed (June 2026)

Previously the site ran as a Node.js Docker container on the VM with:
- `ghcr.io/devsoham3/portfolio-site:latest` Docker image
- cAdvisor + Prometheus + Grafana monitoring stack
- Certbot for SSL
- `build-and-publish.yml` GitHub Actions workflow (built + pushed Docker image)
- Cloudflare was only used as a proxy/CDN in front of the VM

All of that was replaced with Cloudflare Workers static hosting + GitHub Actions direct deploy.

---

## If You Want to Change This Again

### Option A: Back to VM static hosting
1. Run `nginx` on VM to serve the `build/` folder
2. Change `deploy.yml` to SCP the build output to the VM instead of `wrangler deploy`
3. Point `sohamdeo.com` A record back to VM IP in Cloudflare DNS
4. Get SSL via Certbot or keep Cloudflare proxying for SSL

### Option B: Different static host (Vercel, Netlify, etc.)
1. The site is already `adapter-static` so the `build/` output works on any static host
2. Replace `wrangler.toml` and the `npx wrangler deploy` step with the target platform's deploy CLI
3. Update `CLOUDFLARE_*` secrets accordingly (or remove if not needed)
4. Update DNS to point to the new host

### Option C: Back to SSR (server-rendered)
1. Switch back to `@sveltejs/adapter-node` in `package.json` and `svelte.config.js`
2. Remove `wrangler.toml`
3. Build a Docker image and run it on the VM or a cloud container service
4. Update GitHub Actions to build + push Docker image instead of `wrangler deploy`
