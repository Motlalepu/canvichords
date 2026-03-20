import React, { useState } from "react";
import FeedbackDialog from "@/components/FeedbackDialog";

const Contact = () => {
  const [open, setOpen] = useState(false);
  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">📬 Contact Us</h1>

      <p className="mb-4">
        We’d love to hear from you! CANVICHORDS is currently in its building
        phase (MVP).
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">✨ For Artists</h2>
      <p className="mb-2">
        If you’re interested in having your work displayed on CANVICHORDS,
        please reach out directly:
      </p>
      <p className="mb-1">
        Owner & Founder: <strong>Motlalepula Sejosengoe</strong>
      </p>
      <p className="mb-4">
        Email:{" "}
        <a href="mailto:sejosengoemotalepula@gmail.com" className="underline">
          sejosengoemotalepula@gmail.com
        </a>
      </p>

      <p className="mb-4">
        We’re curating submissions as part of our research and onboarding
        process. Your feedback and participation help us shape a platform that
        truly supports artists and collectors.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        📝 Feedback & Feature Requests
      </h2>
      <p className="mb-4">
        Because this is an MVP, some features may not yet be fully polished. If
        you encounter issues or have ideas for improvement, please use our
        Feedback Form to share your thoughts. Every suggestion helps us refine
        the experience.
      </p>

      <div className="mb-6">
        <button
          className="bg-primary text-white px-4 py-2 rounded"
          onClick={() => setOpen(true)}
        >
          Open Feedback Form
        </button>
      </div>

      <FeedbackDialog open={open} onOpenChange={setOpen} />

      <h2 className="text-2xl font-semibold mt-6 mb-3">⚖️ Disclaimer</h2>
      <p>
        CANVICHORDS is currently in development. Features, layouts, and services
        may change as we continue testing and gathering feedback. Artwork
        submissions are part of our research process and may not immediately
        appear on the live site.
      </p>
    </main>
  );
};

export default Contact;
