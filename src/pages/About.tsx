import React from "react";

const About = () => {
  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">About CANVICHORDS</h1>

      <p className="mb-4">
        CANVICHORDS is a multi-sensory art marketplace where creativity takes
        center stage. We bring together visual, video, and audio art into one
        immersive space — a digital gallery designed to feel as unforgettable as
        stepping into a real-world exhibition.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">🎨 What We Offer</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          Visual Art: Paintings, photography, and digital creations that spark
          emotion.
        </li>
        <li>
          Video Art: Short films, motion pieces, and experimental visuals that
          expand storytelling.
        </li>
        <li>
          Audio Art: Music, soundscapes, and spoken word that deepen the sensory
          experience.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">🌟 Our Mission</h2>
      <p className="mb-4">
        CANVICHORDS exists to preserve wonderful moments of creativity for many
        years to come. We empower artists to showcase their work, connect with
        collectors, and build lasting legacies in a space that values both
        artistry and community.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">💡 Why CANVICHORDS?</h2>
      <ul className="list-disc list-inside">
        <li className="mb-2">
          Multi-sensory immersion: Art isn’t just seen — it’s heard, felt, and
          remembered.
        </li>
        <li className="mb-2">
          Curated discovery: Collectors explore meaningful works through guided
          journeys and themed showcases.
        </li>
        <li>
          Secure ownership: Every piece is backed by trustworthy systems that
          protect artists and buyers.
        </li>
        <li className="mt-2">
          Community connection: Artists and collectors grow together through
          interactive features, events, and shared experiences.
        </li>
      </ul>
    </main>
  );
};

export default About;
