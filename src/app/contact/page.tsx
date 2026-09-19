"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Sparkles,
  HelpCircle,
  Globe2,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

/** Simple X (formerly Twitter) logo icon */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8.1-9.3L1 2h7.2l5 6.6L18.9 2Zm-1.2 18h1.7L7.4 3.9H5.6L17.7 20Z" />
    </svg>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "General Inquiry",
  });
  const [loading, setLoading] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const sectionRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Thank you! Your message has been received. Our team will get back to you shortly.");
      setFormData({ name: "", email: "", subject: "", message: "", category: "General Inquiry" });
    }, 1200);
  };

  const faqs = [
    {
      question: "How do I receive my verified course certificate upon completion?",
      answer: "Once you complete 100% of the course lectures and pass all required assessments, your digital certificate with a unique verification URL is automatically generated in your Student Dashboard.",
    },
    {
      question: "Are the courses self-paced or live cohort-based?",
      answer: "All EduNova courses offer lifetime access to self-paced video lectures, code repositories, and hands-on projects, accompanied by live weekly mentor Q&A office hours.",
    },
    {
      question: "What support options are available if I encounter technical issues?",
      answer: "You can post technical questions directly in the course Q&A discussion tab or join our dedicated Discord community where senior teaching assistants and peers reply within hours.",
    },
    {
      question: "What is your refund policy?",
      answer: "We offer a hassle-free 30-day money-back guarantee. If a course does not meet your expectations, simply request a refund from your account settings.",
    },
    {
      question: "Do you offer team subscriptions or enterprise licensing for companies?",
      answer: "Yes! We provide custom enterprise packages including bulk student enrollments, dedicated manager analytics dashboards, and custom learning tracks for tech teams.",
    },
  ];

  const socials = [
    { label: "X", href: "https://twitter.com", icon: XIcon, bg: "bg-slate-900", text: "text-white" },
    { label: "Facebook", href: "https://facebook.com", icon: Facebook, bg: "bg-[#1877F2]", text: "text-white" },
    { label: "Instagram", href: "https://instagram.com", icon: Instagram, bg: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]", text: "text-white" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin, bg: "bg-[#0A66C2]", text: "text-white" },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#F8FAFC] pb-24 overflow-hidden"
    >
      {/* ── TOP HERO BANNER ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full bg-[#5B50E6] text-white pt-16 sm:pt-24 pb-16 sm:pb-20 text-center px-4 overflow-hidden"
      >
        {/* Decorative SVG Shapes */}
        <div className="pointer-events-none absolute -top-2 left-4 sm:left-12 opacity-80">
          <svg width="110" height="90" viewBox="0 0 110 90" fill="none">
            <path
              d="M8 55 Q 10 20 42 14 Q 68 9 66 30"
              stroke="#FBBF24"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M55 24 L66 30 L59 41"
              stroke="#FBBF24"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        <div className="pointer-events-none absolute -top-4 -right-4 sm:right-6 opacity-75">
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
            {Array.from({ length: 5 }).map((_, row) =>
              Array.from({ length: 5 }).map((_, col) => (
                <rect
                  key={`${row}-${col}`}
                  x={col * 22}
                  y={row * 22}
                  width="16"
                  height="16"
                  transform={`rotate(45 ${col * 22 + 8} ${row * 22 + 8})`}
                  fill={(row + col) % 2 === 0 ? "#A3E635" : "#65A30D"}
                />
              ))
            )}
          </svg>
        </div>

        <div className="pointer-events-none absolute bottom-2 left-4 sm:left-12 opacity-80">
          <svg width="80" height="80" viewBox="0 0 90 90" fill="none">
            {Array.from({ length: 8 }).map((_, i) => (
              <path
                key={i}
                d="M45 45 L41 10 A4 4 0 0 1 49 10 Z"
                fill={i % 2 === 0 ? "#F472B6" : "#F9A8D4"}
                transform={`rotate(${i * 45} 45 45)`}
              />
            ))}
          </svg>
        </div>

        <div className="pointer-events-none absolute bottom-4 right-6 sm:right-12 opacity-80">
          <svg width="100" height="90" viewBox="0 0 100 90" fill="none">
            <path
              d="M92 55 Q 90 20 58 14 Q 32 9 34 30"
              stroke="#FBBF24"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M45 24 L34 30 L41 41"
              stroke="#FBBF24"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        <div className="max-w-3xl mx-auto relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-wide border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-300" /> We Are Here For You
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Get In Touch With <span className="text-amber-300">EduNova</span>
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base lg:text-lg max-w-xl mx-auto font-medium leading-relaxed">
            Have questions about our courses, partnerships, or enterprise solutions? Reach out to our global team today.
          </p>
        </div>
      </motion.div>

      {/* ── MAIN CONTENT CONTAINER (2-Column Info & Form) ── */}
      <div className="w-full max-w-[96%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-8 sm:-mt-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl shadow-indigo-500/10 border border-slate-200/80"
        >
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-bold text-[#5B50E6] uppercase tracking-widest flex items-center gap-1.5">
                <Globe2 className="w-4 h-4" /> Direct Communication
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                Have Questions? <br />
                <span className="text-[#5B50E6]">We're Here To Help!</span>
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                Submit your query using the form or reach out directly to our dedicated support advisors. We typically respond within 24 hours.
              </p>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 hover:border-[#5B50E6]/30 transition-all">
                <div className="flex items-center gap-2 text-[#5B50E6]">
                  <Mail className="w-4 h-4" />
                  <p className="text-xs font-bold uppercase tracking-wider">Email Us</p>
                </div>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900 break-all">support@edunova.com</p>
                <p className="text-[11px] text-slate-500 font-medium">For general & course inquiries</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 hover:border-[#5B50E6]/30 transition-all">
                <div className="flex items-center gap-2 text-[#5B50E6]">
                  <Phone className="w-4 h-4" />
                  <p className="text-xs font-bold uppercase tracking-wider">Call Us</p>
                </div>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900">+1 (800) 555-0199</p>
                <p className="text-[11px] text-slate-500 font-medium">Toll-free customer hotline</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 hover:border-[#5B50E6]/30 transition-all sm:col-span-2">
                <div className="flex items-center gap-2 text-[#5B50E6]">
                  <MapPin className="w-4 h-4" />
                  <p className="text-xs font-bold uppercase tracking-wider">Global Headquarters</p>
                </div>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900">
                  EduNova Global HQ — 100 Innovation Way, Tech District, San Francisco, CA 94105, USA
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 hover:border-[#5B50E6]/30 transition-all sm:col-span-2">
                <div className="flex items-center gap-2 text-[#5B50E6]">
                  <Clock className="w-4 h-4" />
                  <p className="text-xs font-bold uppercase tracking-wider">Operating Hours</p>
                </div>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900">
                  Monday – Friday: 9:00 AM – 6:00 PM (PST) | Weekend Support via Email
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-2 pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Connect With Us</p>
              <div className="flex items-center gap-2.5">
                {socials.map(({ label, href, icon: Icon, bg, text }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`w-9 h-9 rounded-2xl ${bg} ${text} flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-sm`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-slate-50/80 border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">Send Us a Message</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Fill in the details below and we will get back to you shortly.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-[#5B50E6] focus:ring-2 focus:ring-[#5B50E6]/20 text-slate-900 text-xs sm:text-sm font-medium transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-[#5B50E6] focus:ring-2 focus:ring-[#5B50E6]/20 text-slate-900 text-xs sm:text-sm font-medium transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    Topic Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-[#5B50E6] focus:ring-2 focus:ring-[#5B50E6]/20 text-slate-900 text-xs sm:text-sm font-medium transition-all shadow-sm"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Course Support">Course & Technical Support</option>
                    <option value="Billing & Refunds">Billing & Refunds</option>
                    <option value="Enterprise & Team Access">Enterprise & Team Access</option>
                    <option value="Instructor Application">Become an Instructor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Brief subject summary"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-[#5B50E6] focus:ring-2 focus:ring-[#5B50E6]/20 text-slate-900 text-xs sm:text-sm font-medium transition-all shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your question or message in detail..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-[#5B50E6] focus:ring-2 focus:ring-[#5B50E6]/20 text-slate-900 text-xs sm:text-sm font-medium transition-all shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#5B50E6] hover:bg-[#4D42DB] text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-[#5B50E6]/30 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "Submitting Message..." : "Send Message"} <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>

        {/* ── FAQ SECTION ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="my-16 sm:my-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left FAQ Title */}
            <div className="lg:col-span-5 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-[#5B50E6] text-xs font-extrabold uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                Got Questions? <br />
                <span className="text-[#5B50E6]">We Have Answers</span>
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                Everything you need to know about our courses, certifications, technical support, and platform policies.
              </p>
            </div>

            {/* Right Accordion List */}
            <div className="lg:col-span-7 space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className={`border rounded-2xl p-5 transition-colors duration-300 ${
                      isOpen
                        ? "bg-white border-[#5B50E6]/40 shadow-sm"
                        : "bg-white/80 border-slate-200 hover:border-[#5B50E6]/30"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer py-1"
                    >
                      <span className={`text-xs sm:text-sm font-bold transition-colors ${isOpen ? "text-[#5B50E6]" : "text-slate-900 group-hover:text-[#5B50E6]"}`}>
                        Q: {faq.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold shrink-0 transition-colors ${
                          isOpen ? "bg-[#5B50E6] text-white" : "bg-slate-100 text-[#5B50E6] group-hover:bg-indigo-50"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.span>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 }
                          }}
                          transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 mt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                            <span className="font-bold text-[#5B50E6] mr-1.5">A:</span>
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}