import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://blog-pa1s.onrender.com/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert(data.message || "Failed to send message.");
      }
    } catch (error) {
      alert("Error sending message.");
      console.error(error);
    }
  };

  return (
    <section
      id="contact"
      className="max-w-5xl mx-auto px-4 py-20 md:py-24 animate-fade-in-up"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Get in Touch
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Have questions, feedback, or ideas? We'd love to hear from you. Drop
          us a message and we'll get back to you soon.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl space-y-8 transition-all duration-300"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              required
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="you@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            required
            placeholder="Subject of your message"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            rows="6"
            required
            placeholder="Type your message here..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="inline-block w-full md:w-auto px-8 py-3 bg-indigo-600 text-white text-lg font-medium rounded-xl shadow-md hover:bg-indigo-700 transition-colors"
          >
            Send Message
          </button>
        </div>
      </form>

      <div className="text-center mt-16">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Prefer email?
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Reach us at{" "}
          <a
            href="mailto:support@yourblog.com"
            className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-800"
          >
            support@yourblog.com
          </a>
        </p>
      </div>
    </section>
  );
};

export default Contact;
