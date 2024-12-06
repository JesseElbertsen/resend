"use client";
import React, { useState } from "react";
import { sendEmail } from "./sendEmail";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sendStatus, setSendStatus] = useState<
    "idle" | "success" | "error" | "invalid-email"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email: string) => {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      setSendStatus("invalid-email");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message);

    try {
      await sendEmail(data);
      setSendStatus("success");
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      setSendStatus("error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Contacteer ons
        </h2>
        {sendStatus === "success" && (
          <div className="p-4 mb-4 text-green-800 bg-green-100 border border-green-400 rounded">
            E-mail succesvol verzonden!
          </div>
        )}
        {sendStatus === "error" && (
          <div className="p-4 mb-4 text-red-800 bg-red-100 border border-red-400 rounded">
            Fout bij het verzenden van de e-mail. Probeer het opnieuw.
          </div>
        )}
        {sendStatus === "invalid-email" && (
          <div className="p-4 mb-4 text-yellow-800 bg-yellow-100 border border-yellow-400 rounded">
            Ongeldig e-mailadres. Controleer uw invoer.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Naam
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Uw naam"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Uw email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Bericht
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Uw bericht"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Verstuur
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
