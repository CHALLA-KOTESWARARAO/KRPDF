import { useState } from 'react';
import Seo from '../components/Seo';
import Toast from '../components/Toast';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [toast, setToast] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setToast('Please fill out all fields before submitting.');
      return;
    }
    setToast('Thanks! Your message is ready for backend integration.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      <Seo
        title="Contact Us"
        description="Contact the MyPDF Tools team for support, feedback, and partnership inquiries."
        canonicalPath="/contact"
      />
      <main className="container page-main">
        <h1>Contact Us</h1>
        <p>Send us your question and we will respond through our upcoming support backend.</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Your name"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              placeholder="you@example.com"
            />
          </label>
          <label>
            Message
            <textarea
              rows="6"
              value={form.message}
              onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
              placeholder="How can we help?"
            />
          </label>
          <button className="btn btn-primary" type="submit">Send Message</button>
        </form>
      </main>
      <Toast message={toast} onClose={() => setToast('')} />
    </>
  );
}

export default Contact;
