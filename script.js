// script.js
import { database, ref, push, onValue, auth, signOut } from './firebase.js';
import { uploadToCloudinary } from './cloudinary.js';

const postInput = document.getElementById("postInput");
const mediaInput = document.getElementById("mediaInput");
const postBtn = document.getElementById("postBtn");
const postsContainer = document.getElementById("postsContainer");
const logoutBtn = document.getElementById("logoutBtn");

// Post button
postBtn.addEventListener("click", () => {
  const text = postInput.value.trim();
  const file = mediaInput.files[0];

  if (!text && !file) {
    alert("Write something or select a file.");
    return;
  }

  if (file) {
    uploadToCloudinary(file, (url) => {
      savePost(text, url);
    });
  } else {
    savePost(text, null);
  }

  postInput.value = "";
  mediaInput.value = "";
});

function savePost(text, mediaUrl) {
  const postRef = ref(database, 'posts/');
  const postData = {
    text: text,
    media: mediaUrl,
    timestamp: Date.now()
  };
  push(postRef, postData);
}

// Load posts
const postRef = ref(database, 'posts/');
onValue(postRef, (snapshot) => {
  postsContainer.innerHTML = "";
  const posts = snapshot.val();
  if (posts) {
    Object.values(posts).reverse().forEach(post => {
      const postEl = document.createElement("div");
      postEl.className = "post";
      postEl.innerHTML = `
        <p>${post.text}</p>
        ${post.media ? (post.media.includes('video') ? 
          `<video controls src="${post.media}" width="100%"></video>` : 
          `<img src="${post.media}" width="100%">`) : ""}
        <small>${new Date(post.timestamp).toLocaleString()}</small>
      `;
      postsContainer.appendChild(postEl);
    });
  }
});

// Logout button
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    alert("Signed out!");
    window.location.href = "login.html"; // You can change this
  });
});
