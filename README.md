# MERN Ecommerce

This project is split into:

- `frontend` - React + Vite app
- `backend` - Node.js + Express API

## Deploy On Render

This repo includes a Blueprint file at `render.yaml`, so you can deploy both services together.

### Steps

1. Push the project to GitHub.
2. Open Render.
3. Click `New +` -> `Blueprint`.
4. Connect this repository.
5. Select the branch that contains `render.yaml`.
6. Review the two services Render creates:
   - `mern-ecommerce-api`
   - `mern-ecommerce-web`
7. Fill in the required environment variables when prompted.
8. Deploy.

### Services Created

#### Backend

- Type: `Web Service`
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`

#### Frontend

- Type: `Static Site`
- Root directory: `frontend`
- Build command: `npm install && npm run build`
- Publish directory: `frontend/dist`

### Required Environment Variables

#### Backend

```env
MONGODB_URL=your_mongodb_connection_string
CLIENT_URL=https://your-frontend-name.onrender.com
STRIPE_SECRET_KEY=your_stripe_secret_key
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password
```

`JWT_SECRET` and `JWT_REFRESH` are generated automatically by Render from the Blueprint.

#### Frontend

```env
VITE_API_URL=https://your-backend-name.onrender.com/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Important Notes

- If Render changes the generated service names because a name is already taken, update `CLIENT_URL` and `VITE_API_URL` after the first deploy to match the actual `.onrender.com` URLs.
- The frontend uses a rewrite rule so React Router routes work correctly.
- Production cookies are already configured in the backend for cross-origin frontend/backend deployment on Render.

### Local Env Examples

Example env files are included here:

- `backend/.env.example`
- `frontend/.env.example`
