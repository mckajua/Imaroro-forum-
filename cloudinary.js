// cloudinary.js

export function uploadToCloudinary(file, callback) {
  const cloudName = 'djtgxxcjf'; // your Cloudinary cloud name
  const uploadPreset = 'imaroro_preset'; // your unsigned upload preset

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset); // required for unsigned uploads

  fetch(url, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      if (data.secure_url) {
        callback(data.secure_url); // call your handler with the uploaded file URL
      } else {
        console.error('Cloudinary upload failed:', data);
        alert('Upload failed. Please try again.');
      }
    })
    .catch(err => {
      console.error('Upload error:', err);
      alert('Error uploading file');
    });
}