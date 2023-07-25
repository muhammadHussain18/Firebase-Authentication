import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateEmail, updateProfile } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyB5Nw5mqS2Imehe11ypEBwvuLvkBpy8W4Q",
  authDomain: "smit-login.firebaseapp.com",
  projectId: "smit-login",
  storageBucket: "smit-login.appspot.com",
  messagingSenderId: "924399165444",
  appId: "1:924399165444:web:866302ec4835e3fd469551"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

let email = document.getElementById("email")
let password = document.getElementById("password")
let signUp = document.getElementById("signup-btn")
let loginBtn = document.getElementById("loginBtn")
let logoutBtn = document.getElementById("logout-btn")
let NewEmail = document.getElementById("update-profile")
let fileInput = document.getElementById("file-input")
let fullName = document.getElementById("fullName")


signUp && signUp.addEventListener("click", () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((res) => {
      const user = res.user;
      Swal.fire({
        text: 'SignUp Successfully!',
      })
      window.location.href = "index.html"
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log("errorMessage", errorMessage)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      })
    });


})


loginBtn && loginBtn.addEventListener("click", () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((res) => {
      const user = res.user;
      Swal.fire({
        text: 'Login Successfully!',
      })
      window.location.href = "profile.html"
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      })
    });

})


onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    if (location.pathname !== '/profile.html') {
      location.href = "profile.html"
    }
  } else {
    if (location.pathname !== "/index.html" && location.pathname !== '/signup.html') {
      location.href = 'index.html'
    }
  }
});


logoutBtn && logoutBtn.addEventListener("click", () => {

  signOut(auth).then(() => {
    console.log("done")
    Swal.fire({
      text: 'Sign Out!',
    })
  }).catch((error) => {
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error,
    })
  });
})


NewEmail && NewEmail.addEventListener("click", () => {

  updateEmail(auth.currentUser, email.value).then(() => {
    console.log("Profile updated!")
    Swal.fire({
      text: 'Profile updated!',
    })

  }).catch((error) => {
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error,
    })
  });

  updateProfile(auth.currentUser, {
    displayName: fullName.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
  }).then(() => {
    Swal.fire({
      text: 'Profile updated!',
    })
  }).catch((error) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error,
    })
  });
})