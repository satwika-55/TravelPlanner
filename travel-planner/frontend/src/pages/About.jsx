import React from "react";
import { Link } from "react-router-dom";
import { Compass, Sparkles, Heart, Users, Map, ArrowLeft, Send } from "lucide-react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const About = () => {
  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <Header />

      <main className="pt-28 pb-20 max-w-4xl mx-auto px-6">
        {/* Intro */}
        <div className="mb-12 text-left">
          <Link to="/" className="flex items-center gap-1 text-sm text-neutral-500 hover:text-amber-500 mb-4 transition-all">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Our Mission</span>
          <h1 className="text-3xl md:text-5xl font-black mt-2 tracking-tight">About RoamAI</h1>
          <p className="text-neutral-400 mt-3 text-lg leading-relaxed">
            RoamAI was founded with a simple goal: to replace hours of messy spreadsheet planning and chaotic tab switching with a singular, beautiful, AI-guided travel platform.
          </p>
        </div>

        {/* Story Section */}
        <div className="space-y-8 text-neutral-300 text-sm md:text-base leading-relaxed mb-16">
          <p>
            Whether you are planning a solo backpacking trail through Southeast Asia, a romantic honeymoon across Parisian canals, or a snowboarding retreat in Finnish Lapland, our AI-powered travel recommendation engine constructs customized daily schedules, matches budget-friendly hotel guides, and estimates ticket pricing in milliseconds.
          </p>
          <p>
            But travel isn't just about computer recommendations; it's about sharing experiences. That is why RoamAI incorporates a public community feed where you can browse, like, save, comment on, and duplicate itineraries planned by other travelers around the world.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
            <Sparkles className="h-6 w-6 text-amber-500 mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">Google Gemini Integration</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              We leverage Google Gemini AI to parse travel prompts, curate hotel options, and structure details into clean JSON itineraries.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
            <Users className="h-6 w-6 text-amber-500 mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">Social Travel Sharing</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Publish itineraries to the public community feed. Discuss planning routes, write comment reviews, and save collections.
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-3xl p-8 text-center max-w-xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-2">Have Feedback or Questions?</h3>
          <p className="text-neutral-400 text-sm mb-6">
            We are constantly improving our AI models and travel filters. Get in touch with our design team!
          </p>
          <a
            href="mailto:support@roamai.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold transition-all active:scale-95"
          >
            Contact Support <Send className="h-4 w-4" />
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
