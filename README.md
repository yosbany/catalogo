# Product Catalog Manager

## Setup Instructions

1. Create a Firebase project:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Follow the setup wizard

2. Enable required Firebase services:
   - Authentication (Email/Password)
   - Realtime Database
   - Storage

3. Get your Firebase configuration:
   - Go to Project Settings
   - Scroll down to "Your apps"
   - Click the web icon (</>)
   - Register your app
   - Copy the configuration values

4. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Replace the placeholder values with your Firebase configuration:

   ```env
   VITE_FIREBASE_API_KEY=your_actual_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. Set up Firebase Security Rules:

   For Realtime Database:
   ```json
   {
     "rules": {
       "products": {
         ".read": "auth != null",
         ".write": "auth != null"
       }
     }
   }
   ```

   For Storage:
   ```
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /products/{allPaths=**} {
         allow read: if request.auth != null;
         allow write: if request.auth != null;
       }
     }
   }
   ```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Features

- User authentication
- Product management (CRUD operations)
- Image upload and management
- Excel export functionality
- Responsive design
- Search and filtering capabilities