// script.js
import {
  db,
  ref,
  push,
  onValue,
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from './firebase.js';
import { uploadToCloudinary } from './cloudinary.js';

const authSection = document.getElementById("authSection");
const forumSection = document.getElementById("forumSection");
const signUpBtn = document.getElementById("signUpBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const postInput = document.getElementById("postInput");
const mediaInput = document.getElementById("mediaInput");
const postBtn = document.getElementById("postBtn");
const postsContainer = document.getElementById("postsContainer");

signUpBtn.onclick = () => {
  const email = document.getElementById("phoneOrEmail").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Signed up successfully");
      showForum();
    })
    .catch(err => alert(err.message));
};

loginBtn.onclick = () => {
  const email = document.getElementById("phoneOrEmail").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Logged in successfully");
      showForum();
    })
    .catch(err => alert(err.message));
};

logoutBtn.onclick = () => {
  signOut(auth).then(() => {
    showAuth();
  });
};

postBtn.onclick = () => {
  const text = postInput.value.trim();
  const file = mediaInput.files[0];

  if (!text && !file) {
    alert("Write something or add media.");
    return;
  }

  if (file) {
    uploadToCloudinary(file, (url) => savePost(text, url));
  } else {
    savePost(text, null);
  }

  postInput.value = "";
  mediaInput.value = "";
};

function savePost(text, mediaUrl) {
  const postRef = ref(db, 'posts/');
  const data = {
    text,
    media: mediaUrl,
    timestamp: Date.now()
  };
  push(postRef, data);
}

function loadPosts() {
  const postRef = ref(db, 'posts/');
  onValue(postRef, (snapshot) => {
    postsContainer.innerHTML = "";
    const posts = snapshot.val();
    if (posts) {
      Object.values(posts).reverse().forEach(post => {
        const el = document.createElement("div");
        el.className = "post";
        el.innerHTML = `
          <p>${post.text}</p>
          ${post.media ? (post.media.includes("video") ?
            `<video controls src="${post.media}" width="100%"></video>` :
            `<img src="${post.media}" width="100%">`) : ""}
          <small>${new Date(post.timestamp).toLocaleString()}</small>
        `;
        postsContainer.appendChild(el);
      });
    }
  });
}

function showForum() {
  authSection.classList.add("hidden");
  forumSection.classList.remove("hidden");
  loadPosts();
}

function showAuth() {
  authSection.classList.remove("hidden");
  forumSection.classList.add("hidden");
}

window.onload = () => {
  auth.onAuthStateChanged(user => {
    if (user) showForum();
    else showAuth();
  });
};

// Dark mode toggle
document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
