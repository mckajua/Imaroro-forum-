// cloudinary.js
export async function uploadToCloudinary(file) {
  const url = "https://api.cloudinary.com/v1_1/djtgxxcjf/auto/upload";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "imaroro_preset");

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error("Upload failed: " + JSON.stringify(data));
    }
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
}
