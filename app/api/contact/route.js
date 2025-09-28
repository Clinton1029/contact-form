import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // ✅ Simple validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // For now, just log to server console
    console.log("📩 New Contact Form Submission:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    // ✅ Respond back to frontend
    return NextResponse.json(
      { success: true, message: "Message received successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error handling contact form:", error);
    return NextResponse.json(
      { error: "Something went wrong, please try again later." },
      { status: 500 }
    );
  }
}
