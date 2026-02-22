import ImageToolTemplate from './ImageToolTemplate';

function JpgToPngPage() {
  return (
    <ImageToolTemplate
      title="JPG to PNG"
      description="Convert JPG images into PNG format directly in your browser."
      canonicalPath="/jpg-to-png"
      outputType="image/png"
      buttonLabel="Convert to PNG"
      outputName="converted-image.png"
    />
  );
}

export default JpgToPngPage;
