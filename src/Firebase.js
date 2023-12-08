import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyB1rwZgV-1kSfr3UQpJ4qr13lCjSe-uaGk",
  authDomain: "memomaze-57690.firebaseapp.com",
  projectId: "memomaze-57690",
  storageBucket: "memomaze-57690.appspot.com",
  messagingSenderId: "526409958315",
  appId: "1:526409958315:web:4c4fe8f2ba147dc8e7c8ee",
  measurementId: "G-WFV5NPE57D"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);