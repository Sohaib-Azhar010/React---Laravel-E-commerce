import React, { useState } from 'react'
import { toast } from 'react-toastify';


const ContactForm = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submission logic (API call, etc.)
    console.log(form);
    toast("Your message has been sent!");
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container px-5 my-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Get in Touch</h2>
          <p className="text-muted">We’d love to hear from you! Fill out the form and we'll get back shortly.</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold">Message</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-primary px-4 w-100">
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default ContactForm
