import ImageToolTemplate from './ImageToolTemplate';

function ImageResizePage() {
  return (
    <ImageToolTemplate
      title="Image Resize"
      description="Resize images to exact dimensions with instant before and after preview."
      canonicalPath="/image-resize"
      outputType="image/jpeg"
      quality={0.9}
      hasResizeInputs
      defaultWidth="1280"
      defaultHeight="720"
      buttonLabel="Resize Image"
      outputName="resized-image.jpg"
    />
  );
}

export default ImageResizePage;
