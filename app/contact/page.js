"use client";

import { useState } from "react";
import { Mail, User, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Sending...");

    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus("✅ Message sent successfully!");
      e.target.reset();
    } else {
      setStatus(`❌ Error: ${data.error}`);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-10 shadow-xl border border-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Get in Touch
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Have questions or feedback? Fill out the form below and we’ll get back
          to you shortly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full pl-10 rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                className="w-full pl-10 rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                name="message"
                rows={4}
                placeholder="Write your message here..."
                className="w-full pl-10 rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition shadow-md"
          >
            <Send className="h-5 w-5" />
            Send Message
          </button>
        </form>

        {status && (
          <p className="mt-6 text-center text-sm font-medium text-gray-700">
            {status}
          </p>
        )}
      </div>
    </main>
  );
}
