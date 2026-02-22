import Seo from '../components/Seo';

function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="Learn about MyPDF Tools and our mission to provide free, fast, and secure online file utilities."
        canonicalPath="/about"
      />
      <main className="container page-main legal-page">
        <h1>About Us</h1>
        <p>
          MyPDF Tools was created to make file conversion and optimization simple for everyone. We focus on speed, clarity, and security in every workflow.
        </p>
        <p>
          Our tools are designed with mobile-first interfaces, reliable browser compatibility, and ad placements that never block important actions.
        </p>
        <p>
          We continue to expand our utility suite while keeping the experience lightweight and practical for real users.
        </p>
      </main>
    </>
  );
}

export default About;
