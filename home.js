import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth, db } from './config.js';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


//chech user login or not
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid)
    } else {
        window.location = 'login.html'
    }
});

let title = document.querySelector('#title')
let desc = document.querySelector('#desc')
const form = document.querySelector('#form')
const div = document.querySelector('.container')

// get data from firebase
let arr = [];
async function renderTodo() {
    const querySnapshot = await getDocs(collection(db, "todos"));
    arr = [];
    querySnapshot.forEach((doc) => {
        //yahn pr hum ny arr.push lagay hai jo humy array may id or data get kr ke dega 
        arr.push({
            id: doc.id,
            data: doc.data()
        });
    });
    console.log(arr);

    // setting the title & dec in div
    div.innerHTML = '';
    arr.forEach((item) => {
        div.innerHTML += `
        <div class="child-container">
            <h3 style="color: brown;">Title:<span> ${item.data.title} </span></h3>
            <h3 style="color: brown;">Description:<span> ${item.data.description}</span></h3>
            <button class="editBtn" data-id="${item.id}">Edit</button>
            <button class="deleteBtn" data-id="${item.id}">Delete</button>
        </div>
        // `;
    });


    // Add event listener after rendering todos
    document.querySelectorAll('.deleteBtn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const docId = btn.getAttribute('data-id');
            await deleteTodoById(docId);
        });
    });
    
    
    // add edit button
    document.querySelectorAll('.editBtn').forEach(editbtn => {
        editbtn.addEventListener('click', async () => {
            const editId = editbtn.getAttribute('data-id')
            console.log(editId)
            let newTitle = prompt("Change Title", editbtn.parentElement.children[0].children[0].innerHTML)
            let newDesc = prompt("Change Description", editbtn.parentElement.children[1].children[0].innerHTML)
            console.log({ newTitle, newDesc })
            if (newTitle.length === 0 || newDesc.length === 0) {
                alert('fill your inputs properly')
            } else {
                await updateDoc(doc(db, "todos", editId), {
                    title: newTitle,
                    description: newDesc
                });
                renderTodo()
            }
        })
    })
}
// delet button
async function deleteTodoById(id) {
    const docRef = doc(db, 'todos', id);
    await deleteDoc(docRef);
    renderTodo();
}
renderTodo();

//add data
form.addEventListener('submit', async (event) => {
    try {
        if (title.value.length === 0 || desc.value.length === 0) {
            alert('define inputs properly')
        } else {
            const docRef = await addDoc(collection(db, "todos"), {
                title: title.value,
                description: desc.value,
                uid: auth.currentUser.uid
            });
            // window.location = 'home.html'
            renderTodo()
            console.log("Document written with ID: ", docRef.id);
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
})

// user logout function
const btn = document.querySelector('.btn0')
btn.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('user logout successfully')
        window.location = 'login.html'
    }).catch((error) => {
        console.log('error===>', error)
    });
})
