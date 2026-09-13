# The Armory

A static medieval weapon shop demo built with React and Vite. No backend, database, API keys, or environment variables are required.

Enter any email or username with any password (or none), or choose **Continue as Guest**. Sign-up simply sets a display name. Passwords are never checked or stored. Every visitor can use Product Admin to add, edit, and delete demo products.

The catalog starts with bundled products. Catalog edits are shared by demo identities in the same browser; carts and order history are stored separately for each email or username. Sessions, carts, orders, and catalog changes survive refreshes using localStorage. If storage is unavailable, changes last only for the current visit. Clear this site's browser storage to reset the demo. Orders are examples: no payments, emails, or shipments are processed.

```sh
npm ci
npm run dev
npm run build
```

The static build is in `dist/`. Relative asset paths work at a site's root URL or a subpath. Hash routes support direct links and refreshes on static hosting. Some decorative images and fonts still use external URLs.

For Netlify, import this project's repository as a site. The checked-in `netlify.toml` selects Node 22, runs `npm run build`, and publishes `dist`. Leave the base directory empty when this project is the repository root; if importing a repository containing multiple projects, set the base directory to `ordering-app`. No database keys or other environment variables are required. For a manual deploy, build first and upload the `dist` folder.

App links use hashes, such as `/#/catalog` and `/#/orders`; no server rewrite is needed. GitHub Pages deployment also remains supported by the existing GitHub Actions workflow on pushes to `main`.
