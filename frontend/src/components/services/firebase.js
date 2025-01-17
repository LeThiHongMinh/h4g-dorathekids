// src/components/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAu063ovPVy19cViTMRqJnrpS69FkO5Z7w",
    authDomain: "h4g-dorathekids.firebaseapp.com",
    projectId: "h4g-dorathekids",
    storageBucket: "h4g-dorathekids.firebasestorage.app",
    messagingSenderId: "656781441865",
    appId: "1:656781441865:web:3c0944370f599c415bf898",
    measurementId: "G-PR3JH7RFJB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

export const signUp = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const signIn = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const sendOTP = (phoneNumber, recaptchaVerifier) => {
  return auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
};

export const verifyOTP = (verificationId, code) => {
  const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
  return auth.signInWithCredential(credential);
};

export const resetPassword = (email) => {
  return auth.sendPasswordResetEmail(email);
};

export const verifyEmail = () => {
  const user = firebase.auth().currentUser;
  return user.sendEmailVerification();
};

export default firebase;
