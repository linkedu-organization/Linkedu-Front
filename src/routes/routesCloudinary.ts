/// <reference types="vite/client" />

const uploadImage = async (file: File): Promise<string | null> => {
  const { VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_UPLOAD_PRESET } =
    import.meta.env;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", VITE_CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url ?? null;
  } catch (error) {
    console.error("Erro ao fazer upload para Cloudinary:", error);
    return null;
  }
};

export default uploadImage;
