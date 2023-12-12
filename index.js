import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from './config.js';

const form = document.querySelector('form');
const email = document.querySelector('#email');
const password = document.querySelector('#password')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(email.value)
    console.log(password.value)

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            alert('Resgister Successfully Please Login Yourself')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
})
