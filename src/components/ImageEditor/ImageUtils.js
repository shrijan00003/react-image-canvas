export const getImageSize = img => {
  let _URL = window.URL || window.webkitURL;
  return new Promise((resolve, reject) => {
    const image = new Image() || new window.Image();
    image.src = _URL.createObjectURL(img);

    image.onload = () =>
      resolve({
        width: image.naturalWidth || image.width,
        height: image.naturalHeight || image.height
      });
    image.onerror = error => reject(error);
  });
};

export const getResolution = (
  imgSize = {},
  windowSize = {},
  canvasSize = {},
  scale = 0.5
) => {
  const width = Number(
    (imgSize.width / windowSize.width) * canvasSize.width * scale
  );
  const height = Number(
    (imgSize.height / windowSize.height) * canvasSize.height * scale
  );

  return {
    width,
    height
  };
};
