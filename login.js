import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js';
const form=document.getElementById('loginForm'), error=document.getElementById('error');
form.addEventListener('submit',async e=>{e.preventDefault();error.textContent='Signing in…';try{await signInWithEmailAndPassword(auth,email.value,password.value);location.href='index.html'}catch(err){error.textContent='Login failed. Check your email and password.'}});
