import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth , db } from './config.js';
import { collection, addDoc , getDocs  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.querySelector('form');
const email = document.querySelector('#email');
const password = document.querySelector('#password')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(email.value)
    console.log(password.value)

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async(userCredential) => {
            const user = userCredential.user;
            console.log(user)
            alert('Resgister Successfully Please Login Yourself')
            try {
                const docRef = await addDoc(collection(db, "users"), {
                    email: email.value,
                    password: password.value,
                    uid: user.uid
                });
                console.log("Document written with ID: ", docRef.id);
                window.location = 'login.html'
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
})
