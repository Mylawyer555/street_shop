import React, { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <p className="text-gray-700">
            Have questions or need help? We’d love to hear from you! Fill out
            the form and we’ll get back to you as soon as possible.
          </p>
          <div className="text-sm space-y-2">
            <p>
              📧 <strong>Email:</strong> support@example.com
            </p>
            <p>
              📞 <strong>Phone:</strong> +234 800 000 0000
            </p>
            <p>
              📍 <strong>Address:</strong> 123 Market Street, Lagos, Nigeria
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-xl space-y-4"
        >
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded-md focus:outline-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded-md focus:outline-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded-md focus:outline-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-blue-500"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
