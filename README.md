# QuickHire – Backend API

A RESTful API for the QuickHire job board, built with Express 5, TypeScript, and MongoDB. Handles job CRUD operations, application submissions, admin authentication, file uploads, and search functionality.

**Live API:** [https://backend.quickhire.taijul.dev](https://backend.quickhire.taijul.dev)
**Frontend:** [https://quickhire.taijul.dev](https://quickhire.taijul.dev)

## Tech Stack

| Technology | Purpose |
|---|---|
| Express 5 | Web framework |
| TypeScript | Type safety |
| MongoDB (Mongoose 9) | Database & ODM |
| JWT | Authentication |
| Multer 2 | File uploads |
| Winston | Logging |
| PM2 + Nginx | Production deployment |

## Features

- RESTful API design
- Admin authentication with JWT (HTTP-only cookies)
- Job listing with filtering, pagination, and search
- Application submission with resume upload
- Image upload for company logos
- Category and location aggregation
- Dashboard statistics endpoint
- CORS configured for production
- Winston logger with daily rotating files
- Error handling middleware

## API Endpoints

### Admin

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/admin/login` | Admin login | No |
| POST | `/api/admin/logout` | Admin logout | Yes |
| GET | `/api/admin/check` | Check auth status | Yes |
| GET | `/api/admin/dashboard-stats` | Dashboard statistics | Yes |

### Jobs

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/jobs` | Get all jobs (paginated) | No |
| GET | `/api/jobs/featured` | Get featured jobs | No |
| GET | `/api/jobs/latest` | Get latest jobs | No |
| GET | `/api/jobs/categories` | Get job categories | No |
| GET | `/api/jobs/:id` | Get single job | No |
| POST | `/api/jobs` | Create a job | Yes |
| PATCH | `/api/jobs/:id` | Update a job | Yes |
| DELETE | `/api/jobs/:id` | Delete a job | Yes |

### Applications

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/applications` | Submit application | No |
| GET | `/api/applications` | Get all applications | Yes |
| GET | `/api/applications/job/:jobId` | Get applications by job | Yes |

### Public

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/public/jobs/search` | Search jobs by keyword | No |
| GET | `/api/public/locations` | Get all job locations | No |
| GET | `/api/health` | Health check | No |

## Project Structure

```
src/
├── app.ts                # Express app setup, middleware, routes
├── server.ts             # Server entry point
├── config/               # Database and environment config
├── controllers/          # Route handlers
│   ├── adminController.ts
│   ├── applicationController.ts
│   └── jobController.ts
├── middlewares/           # Auth guard, error handler, upload
├── models/               # Mongoose schemas
├── routes/               # Route definitions
│   ├── adminRoutes.ts
│   ├── applicationRoutes.ts
│   └── jobRoutes.ts
├── utils/                # Logger, helpers
└── validators/           # Request validation
```

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/quickhire
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://quickhire.taijul.dev
ALLOWED_ORIGINS=https://quickhire.taijul.dev,http://localhost:3000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
NODE_ENV=production
```

## Getting Started

```bash
git clone https://github.com/taijulsir/quickhire-backend.git
cd quickhire-backend
npm install
```

Create `.env` with the variables above, then:

```bash
npm run dev
```

Runs on [http://localhost:5001](http://localhost:5001)

## Production Build

```bash
npm run build
npm start
```

With PM2:

```bash
pm2 start dist/server.js --name "quickhire-backend"
```

## File Uploads

- Company logos are uploaded via Multer to `public/uploads/`
- Static files are served from the `/public` directory
- Uploaded images are accessible at `/uploads/<filename>`

## Deployment

- Hosted on a VPS
- Reverse proxied via Nginx
- SSL enabled with Let's Encrypt
- Process managed by PM2

## Author

**Taijul Islam** — Full Stack Developer
