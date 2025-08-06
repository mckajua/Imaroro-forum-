// cloudinary.js
export function uploadToCloudinary(file, callback) {
  const url = "https://api.cloudinary.com/v1_1/djtgxxcjf/upload";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "imaroro_preset");

  fetch(url, {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => callback(data.secure_url))
    .catch(err => {
      alert("Upload failed");
      console.error(err);
    });
}
