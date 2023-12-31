import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyBXJXhIS9v_y2s91eW0bmyJUEsq_uN0_bg",
  authDomain: "memomaze-bc1ae.firebaseapp.com",
  projectId: "memomaze-bc1ae",
  storageBucket: "memomaze-bc1ae.appspot.com",
  messagingSenderId: "732747677562",
  appId: "1:732747677562:web:fd7fba424acb43d358a0c3"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
// export const createdUser = createUserWithEmailAndPassword(app);
export const GoogleUser = new GoogleAuthProvider(app);
export const FacebookUser = new FacebookAuthProvider(app);