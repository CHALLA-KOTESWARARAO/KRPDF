import ImageToolTemplate from './ImageToolTemplate';

function ImageCompressorPage() {
  return (
    <ImageToolTemplate
      title="Image Compressor"
      description="Compress image size in your browser for faster websites, emails, and uploads."
      canonicalPath="/image-compressor"
      outputType="image/jpeg"
      quality={0.78}
      buttonLabel="Compress Image"
      outputName="compressed-image.jpg"
      allowQualityControl
      enableTargetSizeControl
      defaultMaxSizeKb={500}
    />
  );
}

export default ImageCompressorPage;
