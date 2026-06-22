const fs = require("fs");
const path = require("path");
const { spawnSync, execSync } = require("child_process");

function run(command, allowFail = false) {
  console.log(`\n▶ ${command}`);
  const result = spawnSync(command, {
    shell: true,
    stdio: "inherit",
  });

  if (result.status !== 0 && !allowFail) {
    console.error(`\n❌ Failed: ${command}`);
    process.exit(result.status || 1);
  }

  return result.status === 0;
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  console.log(`✅ Wrote ${file}`);
}

function exists(file) {
  return fs.existsSync(file);
}

console.log("=== Fixing Machaya GitHub Pages deployment locally ===");

if (!exists("package.json")) {
  console.error("❌ package.json not found. You are in the wrong folder.");
  process.exit(1);
}

if (!exists(".git")) {
  console.error("❌ .git folder not found. This is not your cloned GitHub repository.");
  process.exit(1);
}

let branch = "main";
try {
  branch = execSync("git branch --show-current", { encoding: "utf8" }).trim() || "main";
} catch {}

console.log(`Current branch: ${branch}`);

const backupBranch = `backup-before-gh-pages-fix-${Date.now()}`;
run(`git branch ${backupBranch}`, true);
console.log(`Backup branch created if possible: ${backupBranch}`);

console.log("\n=== Removing old failed build/deploy artifacts ===");

run("rm -rf docs", true);
run("rm -rf .github/workflows", true);
run("rm -f setup-github-pages.sh", true);
run("rm -f repair-github-pages.cjs", true);
run("rm -f vite.config.ts.backup.*", true);
run("rm -f vite.config.js.backup.*", true);

console.log("\n=== Creating static Vite entry files ===");

write(
  "src/main.tsx",
  `import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import { getRouter } from "./router";
import "./styles.css";

const router = getRouter();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
`
);

write(
  "index.html",
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Machaya & Associates Legal Practitioners | Law Firm in Harare, Zimbabwe</title>
    <meta
      name="description"
      content="Machaya & Associates Legal Practitioners is a Harare-based law firm offering litigation, estates, corporate law, conveyancing, family law, employment law, intellectual property, tax law, and dispute resolution services."
    />
    <meta property="og:title" content="Machaya & Associates Legal Practitioners" />
    <meta
      property="og:description"
      content="Trusted legal counsel in Harare, Zimbabwe. Contact Machaya & Associates for civil, criminal, corporate, family, estate, conveyancing, employment, IP, tax, and dispute resolution services."
    />
    <meta property="og:type" content="website" />
    <script type="module" src="/src/main.tsx"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`
);

console.log("\n=== Rewriting Vite config for GitHub Pages ===");

write(
  "vite.config.ts",
  `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  base: "/legal-compass-harare/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
`
);

console.log("\n=== Fixing TanStack Router base path ===");

write(
  "src/router.tsx",
  `import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    basepath: import.meta.env.BASE_URL.replace(/\\/$/, "") || "/",
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
`
);

console.log("\n=== Patching root route home link for GitHub Pages base URL ===");

const rootFile = "src/routes/__root.tsx";

if (exists(rootFile)) {
  let root = fs.readFileSync(rootFile, "utf8");
  root = root.replace(
    'href="/"',
    'href={import.meta.env.BASE_URL}'
  );
  fs.writeFileSync(rootFile, root);
  console.log("✅ Patched src/routes/__root.tsx");
} else {
  console.log("⚠️ src/routes/__root.tsx not found. Skipping.");
}

console.log("\n=== Creating GitHub Actions workflow ===");

write(
  ".github/workflows/deploy.yml",
  `name: Deploy React Site to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: github-pages
  cancel-in-progress: false

jobs:
  build:
    name: Build site
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Add GitHub Pages SPA fallback
        run: |
          cp dist/index.html dist/404.html
          touch dist/.nojekyll

      - name: Upload GitHub Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    name: Deploy site
    runs-on: ubuntu-latest
    needs: build

    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`
);

console.log("\n=== Adding .nojekyll to public folder ===");

fs.mkdirSync("public", { recursive: true });
fs.writeFileSync("public/.nojekyll", "");

console.log("\n=== Installing dependencies ===");

run("npm install");

console.log("\n=== Testing production build ===");

run("npm run build");

console.log("\n=== Adding local SPA fallback ===");

run("cp dist/index.html dist/404.html", true);
run("touch dist/.nojekyll", true);

console.log("\n=== Git status ===");

run("git status --short", true);

console.log("\n=== Committing and pushing ===");

run("git add .");
run('git commit -m "Fix GitHub Pages deployment for static Vite build"', true);
run(`git push origin ${branch}`);

console.log("\n✅ DONE");
console.log("Now go to GitHub:");
console.log("Settings → Pages → Source → GitHub Actions");
console.log("Then check Actions for the latest deployment.");
console.log("Expected URL:");
console.log("https://eaglex14.github.io/legal-compass-harare/");
