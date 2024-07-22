export const handleFileUpload = async (file?: File | null) => {
  if (file) {
    const formData = new FormData();
    formData.append("file", file as Blob);

    const data = await $fetch("api/uploadImage", {
      method: "POST",
      body: formData,
    });

    formData.delete("file");
    return data as string;
  }
};