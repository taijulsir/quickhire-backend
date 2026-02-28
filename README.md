# QuickHire Backend API

A Node.js/Express.js REST API for the QuickHire job board application.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **express-validator** - Validation

## Project Structure

```
backend/
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route handlers
│   ├── middlewares/     # Custom middlewares
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── validators/      # Request validators
│   ├── app.js           # Express app setup
│   ├── seed.js          # Database seeder
│   └── server.js        # Server entry point
├── .env.example         # Environment variables example
├── .gitignore
├── package.json
└── README.md
```

## API Endpoints

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get job by ID
- `GET /api/jobs/featured` - Get featured jobs
- `GET /api/jobs/latest` - Get latest jobs
- `GET /api/jobs/categories` - Get job categories
- `POST /api/jobs` - Create job (Admin only)
- `DELETE /api/jobs/:id` - Delete job (Admin only)

### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications` - Get all applications (Admin only)
- `GET /api/applications/job/:jobId` - Get applications by job (Admin only)

### Admin
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/check` - Check authentication

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quickhire
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@quickhire.com
ADMIN_PASSWORD=admin123
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and update values
4. Start MongoDB locally or use MongoDB Atlas

## Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Seed Database
```bash
node src/seed.js
```

## License

MIT
