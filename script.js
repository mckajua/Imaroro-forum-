// script.js
import { database, ref, push, onValue, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "./firebase.js";
import { uploadToCloudinary } from "./cloudinary.js";

// Elements
const authSection = document.getElementById("authSection");
const forumSection = document.getElementById("forumSection");
const postInput = document.getElementById("postInput");
const mediaInput = document.getElementById("mediaInput");
const postBtn = document.getElementById("postBtn");
const postsContainer = document.getElementById("postsContainer");
const logoutBtn = document.getElementById("logoutBtn");
const firstNameInput = document.getElementById("firstName");
const secondNameInput = document.getElementById("secondName");
const phoneOrEmailInput = document.getElementById("phoneOrEmail");
const passwordInput = document.getElementById("password");
const signUpBtn = document.getElementById("signUpBtn");
const loginBtn = document.getElementById("loginBtn");

// Sign Up
signUpBtn.addEventListener("click", () => {
  const email = phoneOrEmailInput.value;
  const password = passwordInput.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Account created");
      authSection.classList.add("hidden");
      forumSection.classList.remove("hidden");
    })
    .catch(error => {
      alert("Signup Error: " + error.message);
    });
});

// Login
loginBtn.addEventListener("click", () => {
  const email = phoneOrEmailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Logged in!");
      authSection.classList.add("hidden");
      forumSection.classList.remove("hidden");
    })
    .catch(error => {
      alert("Login Error: " + error.message);
    });
});

// Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    authSection.classList.remove("hidden");
    forumSection.classList.add("hidden");
  });
});

// Post creation
postBtn.addEventListener("click", async () => {
  const text = postInput.value.trim();
  const file = mediaInput.files[0];

  if (!text && !file) {
    alert("Enter text or select media.");
    return;
  }

  let mediaUrl = null;
  if (file) {
    mediaUrl = await uploadToCloudinary(file);
  }

  const postRef = ref(database, "posts/");
  const postData = {
    text,
    media: mediaUrl,
    timestamp: Date.now()
  };
  push(postRef, postData);

  postInput.value = "";
  mediaInput.value = "";
});

// Load posts
const postRef = ref(database, "posts/");
onValue(postRef, snapshot => {
  postsContainer.innerHTML = "";
  const posts = snapshot.val();
  if (posts) {
    Object.values(posts).reverse().forEach(post => {
      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `
        <p>${post.text}</p>
        ${post.media ? (post.media.includes("video") ? `<video controls src="${post.media}" width="100%"></video>` : `<img src="${post.media}" width="100%">`) : ""}
        <small>${new Date(post.timestamp).toLocaleString()}</small>
      `;
      postsContainer.appendChild(div);
    });
  }
});
