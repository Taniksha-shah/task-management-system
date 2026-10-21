import { useState } from 'react';

function Contact() {
  // useState #2: manages controlled form input, updated in real time
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message captured:\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
  };

  return (
    <section className="page-section contact-page">
      <h2>student@portfolio:~$ ./send_message.sh</h2>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />

        <label htmlFor="email">email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="message">message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Type your message..."
          rows={4}
          required
        />

        <button type="submit">[ submit ]</button>
      </form>

      {/* Controlled input value displayed live as the user types */}
      <div className="live-preview">
        <p className="preview-label">student@portfolio:~$ cat draft.txt</p>
        <pre className="preview-output">
{`name: ${formData.name || '_'}
email: ${formData.email || '_'}
message: ${formData.message || '_'}`}
        </pre>
      </div>
    </section>
  );
}

export default Contact;
