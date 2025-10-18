// Backend Firebase Admin SDK configuration
const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK with service account
let app = null;
let db = null;

try {
  const serviceAccount = require('./ServiceAccountkey.json');
  
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'autism-2e89f'
  });
  
  // Initialize Firestore
  db = admin.firestore();
  
  console.log('Firebase Admin SDK initialized successfully');
} catch (error) {
  console.error('Failed to initialize Firebase Admin SDK:', error.message);
}

module.exports = {
  app,
  db,
  admin
};