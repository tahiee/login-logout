// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD2q7HtPj7lL9gl7cL5JSs19C5S6Jz4L0Q",
    authDomain: "loginlogout360.firebaseapp.com",
    projectId: "loginlogout360",
    storageBucket: "loginlogout360.appspot.com",
    messagingSenderId: "675878832978",
    appId: "1:675878832978:web:b4276bc31372b57778888b",
    measurementId: "G-80E76H4SPM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);