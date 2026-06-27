#!/usr/bin/env bash

echo "=== Set company logo as favicon ==="

if [ ! -f package.json ]; then
  echo "ERROR: package.json not found."
  echo "Run this script from your project root folder."
  exit 1
fi

echo ""
echo "Drag your logo file into this terminal and press Enter."
echo "Supported: .png, .jpg, .jpeg, .svg"
read -r -p "Logo file path: " LOGO_PATH

# Remove surrounding quotes if macOS terminal adds them
LOGO_PATH="${LOGO_PATH%\"}"
LOGO_PATH="${LOGO_PATH#\"}"
LOGO_PATH="${LOGO_PATH%\'}"
LOGO_PATH="${LOGO_PATH#\'}"

if [ ! -f "$LOGO_PATH" ]; then
  echo "ERROR: Logo file not found:"
  echo "$LOGO_PATH"
  exit 1
fi

mkdir -p public

EXT="${LOGO_PATH##*.}"
EXT_LOWER="$(echo "$EXT" | tr '[:upper:]' '[:lower:]')"

echo ""
echo "Using logo:"
echo "$LOGO_PATH"

if [ "$EXT_LOWER" = "svg" ]; then
  echo "Detected SVG logo."
  cp "$LOGO_PATH" public/favicon.svg

  # Keep SVG as main icon
  FAVICON_LINKS='
    <link rel="icon" href="favicon.svg" type="image/svg+xml" />
    <link rel="shortcut icon" href="favicon.svg" type="image/svg+xml" />
    <link rel="manifest" href="site.webmanifest" />'

  cat > public/site.webmanifest <<'EOF'
{
  "name": "Machaya & Associates Legal Practitioners",
  "short_name": "Machaya Law",
  "description": "Trusted legal counsel in Harare, Zimbabwe.",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "background_color": "#071126",
  "theme_color": "#12244d",
  "icons": [
    {
      "src": "favicon.svg",
      "sizes": "any",
      "type": "image/svg+xml"
    }
  ]
}
EOF

else
  echo "Detected raster logo."
  echo "Creating favicon sizes with macOS sips..."

  cp "$LOGO_PATH" public/logo-original."$EXT_LOWER"

  if command -v sips >/dev/null 2>&1; then
    sips -Z 512 "$LOGO_PATH" --out public/favicon.png >/dev/null
    sips -Z 180 "$LOGO_PATH" --out public/apple-touch-icon.png >/dev/null
    sips -Z 32 "$LOGO_PATH" --out public/favicon-32x32.png >/dev/null
    sips -Z 16 "$LOGO_PATH" --out public/favicon-16x16.png >/dev/null
  else
    echo "sips not found. Copying original logo only."
    cp "$LOGO_PATH" public/favicon.png
  fi

  FAVICON_LINKS='
    <link rel="icon" href="favicon.png" type="image/png" />
    <link rel="shortcut icon" href="favicon.png" type="image/png" />
    <link rel="apple-touch-icon" href="apple-touch-icon.png" />
    <link rel="manifest" href="site.webmanifest" />'

  cat > public/site.webmanifest <<'EOF'
{
  "name": "Machaya & Associates Legal Practitioners",
  "short_name": "Machaya Law",
  "description": "Trusted legal counsel in Harare, Zimbabwe.",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "background_color": "#071126",
  "theme_color": "#12244d",
  "icons": [
    {
      "src": "favicon-16x16.png",
      "sizes": "16x16",
      "type": "image/png"
    },
    {
      "src": "favicon-32x32.png",
      "sizes": "32x32",
      "type": "image/png"
    },
    {
      "src": "apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png"
    },
    {
      "src": "favicon.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
EOF
fi

echo ""
echo "Updating index.html favicon links..."

node <<NODE
const fs = require("fs");

const faviconLinks = \`${FAVICON_LINKS}\`;

let html = fs.readFileSync("index.html", "utf8");

// Remove old favicon/icon/manifest links
html = html
  .replace(/\\s*<link[^>]+rel=["']icon["'][^>]*>/gi, "")
  .replace(/\\s*<link[^>]+rel=["']shortcut icon["'][^>]*>/gi, "")
  .replace(/\\s*<link[^>]+rel=["']apple-touch-icon["'][^>]*>/gi, "")
  .replace(/\\s*<link[^>]+rel=["']manifest["'][^>]*>/gi, "")
  .replace(/\\s*<link[^>]+rel=["']mask-icon["'][^>]*>/gi, "");

// Add new favicon links before closing head
html = html.replace("</head>", faviconLinks + "\\n  </head>");

fs.writeFileSync("index.html", html);
console.log("index.html updated.");
NODE

echo ""
echo "Building site..."
npm run build

echo ""
echo "Adding GitHub Pages fallback..."
cp dist/index.html dist/404.html
touch dist/.nojekyll
if [ -f public/CNAME ]; then cp public/CNAME dist/CNAME; fi

echo ""
echo "Committing and pushing..."
git add index.html public .github/workflows/deploy.yml vite.config.ts package.json package-lock.json 2>/dev/null || git add .
git commit -m "Use company logo as favicon" || echo "Nothing new to commit"

git pull --rebase origin main || {
  echo "Rebase failed. Send me the terminal output."
  exit 1
}

git push origin main

echo ""
echo "DONE."
echo "Wait for GitHub Actions to turn green."
echo "Then hard refresh the site:"
echo "Command + Shift + R"
