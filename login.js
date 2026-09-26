import { auth, isDemoMode } from './firebase.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js';

const form=document.getElementById('loginForm');
const error=document.getElementById('error');
const demoNotice=document.getElementById('demoNotice');

if (isDemoMode) {
  if (demoNotice) demoNotice.textContent='Preview mode: Firebase is not connected yet.';
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email=document.getElementById('email').value.trim();
    if (!email) return;
    localStorage.setItem('afri_demo_user', email);
    location.href='index.html';
  });
} else {
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    error.textContent='Signing in…';
    try {
      await signInWithEmailAndPassword(auth, document.getElementById('email').value, document.getElementById('password').value);
      location.href='index.html';
    } catch(err) {
      error.textContent='Login failed. Check your email and password.';
    }
  });
}
