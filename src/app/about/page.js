import React from "react";
import Navbar from "../components/navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-12 px-6 sm:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          {/* Page Heading */}
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            About <span className="text-blue-600">[Brand Name]</span>
          </h1>

          {/* Intro Paragraph */}
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Welcome to <span className="font-semibold">[Brand Name]</span>, where
            passion meets purpose. We’re more than just a brand — we’re a
            community that believes in delivering excellence, creating value, and
            making a lasting difference in people’s lives.
          </p>

          {/* Mission Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              At <span className="font-semibold">[Brand Name]</span>, our mission
              is simple: to provide high-quality products that enrich everyday
              experiences. We believe that small details create big impacts, and
              we strive to ensure every customer feels valued, understood, and
              inspired.
            </p>
          </section>

          {/* Vision Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              We envision a world where quality and trust go hand in hand.
              <span className="font-semibold"> [Brand Name]</span> aims to become
              a global leader in our field, recognized for innovation,
              sustainability, and a relentless focus on customer satisfaction.
            </p>
          </section>

          {/* History Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in [Year], <span className="font-semibold">[Brand Name]</span>
              began as a small passion project with a simple goal: to create
              something meaningful. Over the years, we’ve grown into a brand
              trusted by thousands, yet we’ve stayed true to our roots —
              maintaining authenticity, integrity, and a personal touch.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our journey has been fueled by curiosity, courage, and the belief
              that great ideas deserve great execution. Every milestone we’ve
              achieved is thanks to our dedicated team and loyal customers.
            </p>
          </section>

          {/* Values Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Core Values</h2>
            <ul className="space-y-3 text-gray-600">
              <li>✅ **Integrity** — We do what’s right, not what’s easy.</li>
              <li>✅ **Innovation** — We embrace change and creativity.</li>
              <li>✅ **Customer First** — Your satisfaction drives our success.</li>
              <li>✅ **Sustainability** — We act responsibly for future generations.</li>
              <li>✅ **Community** — We grow stronger together.</li>
            </ul>
          </section>

          {/* Closing Section */}
          <section className="text-center bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Let’s Shape the Future Together
            </h3>
            <p className="text-gray-600 mb-6">
              Whether you’re a customer, partner, or supporter — you’re part of
              the <span className="font-semibold">[Brand Name]</span> family.
              Together, let’s build something extraordinary.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Contact Us
            </button>
          </section>
        </div>
      </div>
    </>
  );
}
