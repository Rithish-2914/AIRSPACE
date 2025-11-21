# Deploying AIRSPACE to Vercel

This guide explains how to deploy the AIRSPACE holographic interface application to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Git repository with this code (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/airspace.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect the configuration from `vercel.json`

3. **Configure Environment Variables** (Optional)
   - Go to Project Settings → Environment Variables
   - Add `OPENAI_API_KEY` if you want to enable AI features
   - Add `DATABASE_URL` if you want to enable scene persistence

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project-name.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # For preview deployment
   vercel

   # For production deployment
   vercel --prod
   ```

## Project Structure

```
airspace/
├── api/                  # Serverless API functions
│   └── index.js         # Express serverless handler
├── client/              # React frontend
│   ├── src/
│   └── index.html
├── server/              # Full Express server (for Replit)
├── vercel.json         # Vercel configuration
└── package.json
```

## Configuration Files

### vercel.json
- Configures URL rewrites to route `/api/*` to serverless functions
- Sets build command and output directory
- The frontend is built with Vite to `dist/public`
- API endpoints are served as serverless functions

## Important Notes

### Serverless Limitations

The Vercel deployment uses simplified serverless functions in `api/index.js`:

- **AI Features**: Requires full OpenAI implementation (not included in basic setup)
- **Scene Persistence**: Uses browser local storage instead of database
- **Function Timeout**: 10 seconds on Hobby plan, 60s on Pro

### API Endpoints

All API routes must be prefixed with `/api`:

- `GET /api` - API status and available endpoints
- `POST /api/ai/chat` - AI chat (requires implementation)
- `POST /api/ai/analyze` - Workspace analysis (requires implementation)
- `GET /api/scenes` - Get all scenes (returns empty array)
- `POST /api/scenes` - Save scene (not implemented)
- `GET /api/scenes/:id` - Get scene by ID (not implemented)
- `DELETE /api/scenes/:id` - Delete scene (not implemented)

### Frontend

The React frontend works fully on Vercel:
- Hand tracking with MediaPipe
- All floating window apps
- 3D object creation (Air Builder)
- Gesture recognition
- UI interactions

## Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

- `OPENAI_API_KEY` - Your OpenAI API key (optional, for AI features)
- `DATABASE_URL` - PostgreSQL connection string (optional, for scene persistence)
- `NODE_ENV` - Set to `production` (auto-set by Vercel)

## Local Development

To run locally (uses full Express server):

```bash
npm install
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

## Production Build Test

Test the production build locally:

```bash
npm run build
```

This creates:
- `dist/public/` - Frontend static files
- Frontend can be previewed with: `npm run preview`

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify `vite build` runs locally without errors

### API Routes Don't Work
- Ensure routes are prefixed with `/api`
- Check Vercel function logs in dashboard

### Environment Variables Not Working
- Add them in Vercel dashboard
- Redeploy after adding variables

## Custom Domain

To add a custom domain:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Wait for DNS propagation

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Express Guide](https://vercel.com/docs/frameworks/backend/express)
- [Vercel Functions](https://vercel.com/docs/functions)
