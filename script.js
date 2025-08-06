// script.js
import { db, auth } from './js/firebase.js';
import { ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { uploadToCloudinary } from './js/cloudinary.js';

const postInput = document.getElementById("postContent");
const mediaInput = document.getElementById("mediaUpload");
const postBtn = document.getElementById("submitPost");
const postsContainer = document.getElementById("postFeed");
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
    uploadToCloudinary(file).then(url => {
      savePost(text, url);
    }).catch(err => {
      alert("Upload failed");
      console.error(err);
    });
  } else {
    savePost(text, null);
  }

  postInput.value = "";
  mediaInput.value = "";
});

function savePost(text, mediaUrl) {
  const postRef = ref(db, 'posts/');
  const postData = {
    text: text,
    media: mediaUrl,
    timestamp: Date.now()
  };
  push(postRef, postData);
}

// Load posts
const postRef = ref(db, 'posts/');
onValue(postRef, (snapshot) => {
  postsContainer.innerHTML = "";
  const posts = snapshot.val();
  if (posts) {
    Object.values(posts).reverse().forEach(post => {
      const postEl = document.createElement("div");
      postEl.className = "post";
      postEl.innerHTML = `
        <p>${post.text}</p>
        ${post.media ? (
          post.media.includes('.mp4') || post.media.includes('video')
          ? `<video controls src="${post.media}" width="100%"></video>`
          : `<img src="${post.media}" width="100%">`
        ) : ""}
        <small>${new Date(post.timestamp).toLocaleString()}</small>
      `;
      postsContainer.appendChild(postEl);
    });
  }
});

// Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    alert("Signed out!");
    location.reload();
  });
});
