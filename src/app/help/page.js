"use client";
import { useState } from "react";
import Navbar from "../components/navbar";

const faqs = [
  {
    question: "How do I track my order?",
    answer:
      "You can track your order by going to 'My Orders' in your account and clicking 'Track Order'. You’ll get real-time updates from our logistics partner.",
    links: [
      { label: "Track My Order", href: "/track-order" },
      { label: "Shipping Policy", href: "/shipping-policy" },
    ],
  },
  {
    question: "How to return or replace a product?",
    answer:
      "If your product is eligible for return or replacement, you can initiate it from the 'My Orders' section. Make sure to check the return policy for your product.",
    links: [
      { label: "Return Policy", href: "/return-policy" },
      { label: "Contact Support", href: "/contact" },
    ],
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We accept all major credit cards, debit cards, UPI, net banking, and wallet payments for your convenience.",
    links: [
      { label: "Payment Help", href: "/payment-help" },
    ],
  },
];

export default function HelpSupport() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
       <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Help & Support</h1>
          <p className="text-gray-600 mt-2">
            Need assistance? We’re here to help you with any questions or issues regarding <span className="font-semibold">[Brand Name]</span> products and services.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search your query..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-3">📞 Call Us</h2>
            <p className="text-gray-600 mb-4">Speak directly with our customer care team for quick assistance.</p>
            <p className="font-semibold text-gray-800">+91 98765 43210</p>
            <p className="text-gray-500 text-sm">Mon–Sat: 9:00 AM – 8:00 PM</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-3">📧 Email Support</h2>
            <p className="text-gray-600 mb-4">Send us an email and we’ll respond within 24 hours.</p>
            <p className="font-semibold text-gray-800">support@[brandname].com</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-3">💬 Live Chat</h2>
            <p className="text-gray-600 mb-4">Chat with a representative in real time for instant help.</p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
              Start Chat
            </button>
          </div>
        </div>
        {/* Accordion FAQ */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div key={index} className="border rounded-lg">
                <button
                  className="w-full flex justify-between items-center p-4 text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold">{faq.question}</span>
                  <span>{openIndex === index ? "−" : "+"}</span>
                </button>

                {openIndex === index && (
                  <div className="p-4 border-t bg-gray-50">
                    <p className="mb-3">{faq.answer}</p>
                    {faq.links && (
                      <ul className="list-disc pl-5 space-y-1">
                        {faq.links.map((link, i) => (
                          <li key={i}>
                            <a
                              href={link.href}
                              className="text-blue-600 hover:underline"
                            >
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No results found.</p>
          )}
        </div>
      </div>
    </>
  );
}

