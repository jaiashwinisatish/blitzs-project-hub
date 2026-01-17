# Blitzs Project Hub - Full-Stack Platform

A complete full-stack platform for buying and selling projects, built with React + Node.js + MongoDB.

## 🚀 Features

### Frontend (React + TypeScript + Tailwind)
- Modern, responsive UI with Shadcn/ui components
- Dark/Light theme toggle
- User authentication and authorization
- Project browsing and filtering
- Shopping cart and purchase flow
- User dashboard with order history
- Admin dashboard for platform management
- Custom project request system

### Backend (Node.js + Express + MongoDB)
- RESTful API with Express.js
- JWT-based authentication
- Role-based access control (User/Admin)
- MongoDB with Mongoose ODM
- Password hashing with bcrypt
- Rate limiting and security middleware
- Comprehensive error handling

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd blitzs-project-hub-main
```

### 2. Install Frontend Dependencies
```bash
cd blitzs-project-hub-main
npm install
```

### 3. Install Backend Dependencies
```bash
cd server
npm install
```

### 4. Environment Setup

#### Frontend Environment (.env)
Create a `.env` file in the root directory:
```env
VITE_API_URL="http://localhost:5000/api"
```

#### Backend Environment (server/.env)
Create a `.env` file in the server directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/blitzs_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:8080
```

### 5. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB on your system
2. Start MongoDB service
3. Run the seed script to populate initial data:
```bash
cd server
npm run seed
```

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in server/.env:
```env
MONGODB_URI=mongodb+srv://username:password@cluster-url/blitzs_db?retryWrites=true&w=majority
```
5. Run the seed script:
```bash
cd server
npm run seed
```

## 🚀 Running the Application

### 1. Start the Backend Server
```bash
cd server
npm run dev
```
The backend will run on `http://localhost:5000`

### 2. Start the Frontend Development Server
Open a new terminal:
```bash
cd blitzs-project-hub-main
npm run dev
```
The frontend will run on `http://localhost:8080`

## 📱 Access the Application

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health

## 🔐 Default Login Credentials

After running the seed script, you can use these credentials:

### Admin Account
- **Email**: admin@blitzs.com
- **Password**: admin123

### Regular Users
- **Email**: john@example.com
- **Password**: user123

- **Email**: jane@example.com
- **Password**: user123

- **Email**: bob@example.com
- **Password**: user123

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Projects
- `GET /api/projects` - Get all projects (with filtering)
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects/:id/purchase` - Purchase project
- `POST /api/projects/:id/download` - Download project
- `POST /api/projects/:id/review` - Add review

### Orders
- `GET /api/orders/user` - Get user orders
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Admin
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `PUT /api/admin/users/:id/toggle-status` - Toggle user status
- `GET /api/admin/projects` - Get all projects (Admin)
- `GET /api/admin/requests` - Get client requests
- `PUT /api/admin/requests/:id/status` - Update request status

### Client Requests
- `POST /api/clients` - Create client request
- `GET /api/clients/user` - Get user requests

## 🎯 Sample Projects

The seed script creates 5 sample projects:
1. **E-Commerce Platform** - $299 (Web)
2. **Task Management App** - Free (Web)
3. **Weather Dashboard** - $49 (Web)
4. **Mobile Banking App** - $599 (Mobile)
5. **AI Chatbot** - $199 (AI)

## 🔧 Development

### Project Structure
```
blitzs-project-hub-main/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   ├── contexts/                 # React contexts
│   ├── hooks/                    # Custom hooks
│   ├── lib/                      # Utilities and API setup
│   ├── pages/                    # Page components
│   ├── services/                 # API service functions
│   └── ...
├── server/                       # Backend source code
│   ├── config/                   # Database configuration
│   ├── controllers/              # Route controllers
│   ├── middleware/               # Express middleware
│   ├── models/                   # MongoDB models
│   ├── routes/                   # API routes
│   ├── utils/                    # Utility functions
│   └── index.js                  # Server entry point
└── README.md
```

### Available Scripts

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

#### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Set environment variable: `VITE_API_URL=https://your-backend-url/api`

### Backend Deployment (Heroku/Railway/DigitalOcean)
1. Set environment variables
2. Deploy the server folder
3. Ensure MongoDB is accessible (use MongoDB Atlas for production)

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting to prevent abuse
- CORS configuration
- Input validation and sanitization
- Role-based access control

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally
   - Check the connection string in server/.env
   - For MongoDB Atlas, whitelist your IP address

2. **CORS Errors**
   - Check that `FRONTEND_URL` in server/.env matches your frontend URL
   - Ensure the backend is running before starting the frontend

3. **Authentication Issues**
   - Clear browser localStorage and cookies
   - Check that JWT_SECRET is set in server/.env

4. **Port Already in Use**
   - Change the PORT in server/.env
   - Kill processes using the port: `lsof -ti:5000 | xargs kill`

### Getting Help

- Check the console for detailed error messages
- Ensure all environment variables are properly set
- Verify MongoDB is accessible and running
- Check that both frontend and backend are running

---

**Built with ❤️ by the Blitzs Team**


blitzs-project-hub-main!!!!!!
