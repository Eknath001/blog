import React from "react";
import aboutImg from "../assets/About-blog.avif";

const About = () => {
  return (
    <div className="min-h-screen pt-28 px-4 md:px-0 mb-7 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-800 text-gray-800 dark:text-gray-200 font-inter">
      <div className="max-w-6xl mx-auto py-10">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-down">
          <h1 className="md:text-6xl text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
            Discover Our{" "}
            <span className="text-red-600 dark:text-red-400">Story</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A vibrant community where thoughts ignite, creativity flourishes,
            and knowledge grows.
          </p>
          <hr className="w-32 mx-auto mt-6 border-2 border-red-500 rounded-full animate-scale-in" />
        </div>

        {/* Image + Text Section */}
        <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-left">
            <img
              src={aboutImg}
              alt="Blog Illustration: Person reading a book on a cozy sofa"
              className="w-full h-80 object-cover rounded-3xl shadow-2xl transform transition-transform duration-700 hover:scale-[1.03] border-4 border-white dark:border-gray-700"
            />
          </div>
          <div className="animate-fade-in-right">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Vision: Connecting Minds Through Words
            </h2>

            <p className="text-lg mb-5 leading-relaxed text-gray-700 dark:text-gray-300">
              Welcome to our Blog App — not just a platform, but a living,
              breathing space where <strong>creativity meets community</strong>,
              and <strong>every voice matters</strong>.
            </p>

            <p className="text-lg mb-5 leading-relaxed text-gray-700 dark:text-gray-300">
              We believe that words have the power to{" "}
              <strong>spark movements</strong>,{" "}
              <strong>shift perspectives</strong>, and{" "}
              <strong>build bridges</strong> across cultures and generations.
              That’s why we created this space — a digital haven for thinkers,
              dreamers, storytellers, and seekers from all walks of life.
            </p>

            <p className="text-lg mb-5 leading-relaxed text-gray-700 dark:text-gray-300">
              Whether you're here to <strong>share your journey</strong>,{" "}
              <strong>teach what you know</strong>, or simply{" "}
              <strong>soak in new ideas</strong>, our platform is designed to
              empower and inspire. With intuitive tools that simplify creation
              and amplify your reach, we aim to make blogging not just
              accessible, but joyful.
            </p>

            <ul className="list-disc list-inside text-lg mb-5 leading-relaxed text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                <strong>✍️ Freedom of expression</strong> — Share your truth,
                your story, your way.
              </li>
              <li>
                <strong>🌈 Diversity of thought</strong> — Learn from voices
                different from your own.
              </li>
              <li>
                <strong>🤝 Community over competition</strong> — Collaborate,
                engage, and grow together.
              </li>
            </ul>

            <p className="text-lg mb-5 leading-relaxed text-gray-700 dark:text-gray-300">
              This isn’t just about writing — it’s about{" "}
              <strong>building a movement through stories</strong>. It’s about
              nurturing a space where conversations blossom, where silence is
              broken, and where bold ideas find their wings.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Thank you for being here — for writing, reading, and being part of
              something bigger. Together, let’s craft a future where words{" "}
              <strong>heal</strong>, <strong>connect</strong>, and{" "}
              <strong>ignite change</strong>.
            </p>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="mt-24 text-center animate-fade-in-up">
          <blockquote className="text-3xl md:text-4xl italic font-serif text-gray-700 dark:text-gray-400 border-l-8 border-red-500 pl-6 py-3 relative">
            "Words are powerful. Use them to inspire, educate, and transform."
            <p className="text-base mt-4 font-sans not-italic text-gray-500 dark:text-gray-600">
              - The Blog App Team
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default About;
