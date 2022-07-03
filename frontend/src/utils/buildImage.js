export const buildImage = (img) => {
  if (!img) return null;
  const image = `data:image/jpeg;base64,${img}`;
  return image;
};
