# Solocorn Landing Page

A Vite + React + TypeScript landing page that links to the Solocorn Next.js application.

## Architecture

```
┌─────────────────────┐      Links to      ┌─────────────────────┐
│   Landing Page      │ ─────────────────> │   Solocorn App      │
│   (Vite + React)    │                    │   (Next.js)         │
│   Port: 3000        │                    │   Port: 3003        │
└─────────────────────┘                    └─────────────────────┘
```

## Quick Start

### 1. Install Dependencies

```bash
cd landing-page
npm install
```

### 2. Configure Environment

Copy the example environment file and update it:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```bash
# Main App URL - The Next.js Solocorn application
VITE_MAIN_APP_URL=http://localhost:3003

# Gemini API Key (for AI features)
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Start the Landing Page

```bash
npm run dev
```

The landing page will be available at `http://localhost:3000`.

### 4. Start the Solocorn App (in another terminal)

```bash
cd ../tutorme-app
npm run dev
```

The Solocorn app will be available at `http://localhost:3003`.

## Integration Points

### Navigation from Landing Page to Main App

The landing page includes a **"Get Started"** button in the Navbar that links directly to the Solocorn application. This is configured via the `VITE_MAIN_APP_URL` environment variable.

Additional entry points:
- **"Launch Academy"** card → Opens Solocorn app
- **"Partner with Us"** card → Opens Solocorn app

### CORS Configuration

The Next.js middleware is configured to accept requests from the landing page origins:
- `http://localhost:3000` (Vite landing page)
- `http://localhost:5173` (Vite default port)
- `http://localhost:3003` (Next.js app)

## Development Workflow

### Running Both Apps

**Terminal 1 - Landing Page:**
```bash
cd landing-page
npm run dev
```

**Terminal 2 - Solocorn App:**
```bash
cd tutorme-app
npm run initialize  # Full setup with DB
# or
npm run dev         # If DB already running
```

### Building for Production

**Landing Page:**
```bash
cd landing-page
npm run build
# Output: dist/ folder
```

**Solocorn App:**
```bash
cd tutorme-app
npm run build
# Output: .next/ folder
```

## File Structure

```
landing-page/
├── .env.local              # Environment variables (gitignored)
├── .env.example            # Environment template
├── index.html              # Entry HTML
├── package.json            # Dependencies
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript config
├── src/
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   ├── index.css           # Global styles
│   └── components/
│       ├── Layout.tsx      # Navbar, shared components
│       ├── ProfilePage.tsx # User profile page
│       └── RegistrationPage.tsx # Registration form
└── README.md               # This file
```

## Customization

### Changing the Main App URL

Update `VITE_MAIN_APP_URL` in `.env.local`:

```bash
# Development
VITE_MAIN_APP_URL=http://localhost:3003

# Production
VITE_MAIN_APP_URL=https://solocorn.yourdomain.com
```

### Adding More Navigation Links

To add more links to the main app, use the `navigateToMainApp` function in `App.tsx`:

```tsx
const navigateToMainApp = () => {
  window.location.href = MAIN_APP_URL;
};
```

Or link directly to specific routes:

```tsx
<a href={`${MAIN_APP_URL}/register`}>Sign Up</a>
```

## Troubleshooting

### CORS Errors

If you see CORS errors in the browser console:
1. Check that `VITE_MAIN_APP_URL` is set correctly
2. Verify the Next.js middleware includes your landing page origin in `ALLOWED_ORIGINS`
3. Ensure both apps are running on the expected ports

### Port Conflicts

If port 3000 is already in use, Vite will automatically try the next available port (3001, 3002, etc.). Update the `ALLOWED_ORIGINS` in `tutorme-app/src/middleware.ts` if needed.

### Environment Variables Not Loading

Vite requires environment variables to be prefixed with `VITE_` to be accessible in the client code. Always use `VITE_` prefix for variables needed in the browser.

## Deployment

### Option 1: Separate Deployments (Recommended)

1. Deploy landing page to a static hosting service (Vercel, Netlify, etc.)
2. Deploy Solocorn app to a Node.js hosting service
3. Update `VITE_MAIN_APP_URL` to point to the production Solocorn URL

### Option 2: Serve Landing Page from Next.js

Build the landing page and copy the `dist/` contents to `tutorme-app/public/landing/`:

```bash
cd landing-page
npm run build
cp -r dist/* ../tutorme-app/public/landing/
```

Then configure Next.js to serve the landing page at the root.
