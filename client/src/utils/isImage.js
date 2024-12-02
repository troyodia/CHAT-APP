export const isImage = (file) => {
  if (file) {
    const regex = /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return regex.test(file);
  }
};
