const ImagePreview = ({ src }) => {
  return (
    <div className="image-preview">
      <img src={src} alt="" />
    </div>
  );
};

export default ImagePreview;
