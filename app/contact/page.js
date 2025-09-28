"use client";
import { useState } from "react";

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
    } else {
      setStatus(`❌ Error: ${data.error}`);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Your name" className="w-full rounded-md border p-2" required />
          <input type="email" name="email" placeholder="Your email" className="w-full rounded-md border p-2" required />
          <textarea name="message" rows={4} placeholder="Your message" className="w-full rounded-md border p-2" required />
          <button type="submit" className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700">Send</button>
        </form>
        {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
      </div>
    </main>
  );
}
