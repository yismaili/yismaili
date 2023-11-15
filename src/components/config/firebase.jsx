import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBGmtipRdHIzg33TgtNtWV5Wj8R-fPb_h0",
  authDomain: "portfolio-ddb19.firebaseapp.com",
  projectId: "portfolio-ddb19",
  storageBucket: "portfolio-ddb19.appspot.com",
  messagingSenderId: "922624419040",
  appId: "1:922624419040:web:ddae15e82993aa185d1c85",
  measurementId: "G-6YS1V0N9YN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
// Initialize Storage
const storage = getStorage(app);

export { app, analytics, database, storage };