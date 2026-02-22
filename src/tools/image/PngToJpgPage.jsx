import ImageToolTemplate from './ImageToolTemplate';

function PngToJpgPage() {
  return (
    <ImageToolTemplate
      title="PNG to JPG"
      description="Convert PNG files into lightweight JPG images for web sharing."
      canonicalPath="/png-to-jpg"
      outputType="image/jpeg"
      quality={0.9}
      buttonLabel="Convert to JPG"
      outputName="converted-image.jpg"
    />
  );
}

export default PngToJpgPage;
