# Nexora

**Nexora** is a modern SaaS platform designed to give users powerful AI-driven creative tools, subscription-based access, and a vibrant community space to share their work.

🌍 **Live Demo:** [https://nexora-saas-tau.vercel.app](https://nexora-saas-tau.vercel.app)

## 🚀 Features

- **Authentication with Clerk** - Secure sign-up/sign-in with email, password, and social login support.
- **Subscription Management** - Integrated payment handling for premium features.
- **AI-powered Tools** - Uses **Google Gemini API** for text and creative generation, plus **ClipDrop API** for advanced image processing.
- **Community Creations Tab** - Discover and explore what others have made using Nexora.

## 🛠 Tech Stack

- **Frontend:** Vite + React
- **Backend:** Node.js
- **Database:** NeonDB (SQL)
- **Authentication:** Clerk
- **APIs:** Google Gemini API, ClipDrop API
- **UI Components:** [Aceternity UI](https://ui.aceternity.com/)
- **Deployment:** Vercel

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone <https://github.com/MozammilT/Nexora>
cd nexora
npm install
```

## ⚙️ Environment Variables

Create a `.env` file in the server directory and add the following:

```bash
PORT= server port number
NODE_ENV=development

# Database
DATABASE_URL=<your-NeonDB_URL>

# Authentication
CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>

# AI APIs
GEMINI_API_KEY=<your-google-gemini-api-key>
CLIPDROP_API_KEY=<your-clipdrop-api-key>

# Cloud Storage
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api-key>
CLOUDINARY_API_SECRET=<your_cloudinary_secret-key>
```

Create a `.env` file in the client directory and add the following:

```bash
VITE_CLERK_PUBLISHABLE_KEY=<your_clerk_pblishable_key>
VITE_BASE_URL=http://localhost:3000/api
```

## 🏃‍♂️ Running Locally

Start the development server:

```bash
cd/client/npm run dev
cd/server/nodemon server.js
```

This will start the Vite server for the frontend and the Node.js backend.

## 🌐 Deployment

The project is deployed on Vercel — check out the [Live Demo 🌐]((https://nexora-saas-tau.vercel.app)

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created by Mozammil Tarique
If you like this project, give it a ⭐ on GitHub!
