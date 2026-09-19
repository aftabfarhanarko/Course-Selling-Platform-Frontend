"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  CheckCircle,
  Star,
  HeartHandshake,
  Zap,
  Target,
  Globe2,
  Sparkles,
  ShieldCheck,
  Code2,
  Clock,
  HelpCircle,
  ArrowRight,
  Compass,
  CheckCircle2,
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  ChevronDown,
} from "lucide-react";
import LiveInsight from "@/components/homepage/LiveInsight";

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const stats = [
    { label: "Active Students", value: "50,000+", icon: Users, desc: "Learners across 80+ countries" },
    { label: "Expert Instructors", value: "300+", icon: Award, desc: "Industry leaders & Tech architects" },
    { label: "Online Courses", value: "1,200+", icon: BookOpen, desc: "Project-based learning modules" },
    { label: "Satisfaction Rate", value: "99%", icon: Star, desc: "Based on 15,000+ reviews" },
  ];

  const teamMembers = [
    {
      name: "Aftab Farhan Arko",
      role: "Founder & Lead Architect",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Sophia Martinez",
      role: "Head of Curriculum",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Michael Chen",
      role: "Lead Systems Architect",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "David Vance",
      role: "Senior AI Strategist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div
      ref={pageRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-white pt-16 sm:pt-24 pb-24 overflow-hidden"
    >
      {/* Background Decorative Grid and Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-[#E0E7FF]/50 blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-[550px] h-[550px] rounded-full bg-[#EEF2FF]/60 blur-3xl" />
      </div>

      <div className="w-11/12 max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        
        {/* ── HERO BREADCRUMB & TITLE ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5B50E6]/10 text-[#5B50E6] text-xs sm:text-sm font-bold tracking-wide uppercase">
            <Sparkles className="w-4 h-4" /> Empowering Global Education
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
            Our Mission To Make Education <br className="hidden sm:inline" /> High-Quality & Accessible To All
          </h1>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-medium max-w-2xl mx-auto">
            Begin your journey at any of EduNova's global learning hubs, laying a solid foundation for career growth and accelerating your success with globally recognized credentials.
          </p>
        </motion.div>

        {/* ── HERO IMAGE GALLERY ── */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="w-full overflow-hidden py-4 mb-16 sm:mb-20"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-6 max-w-full mx-auto px-2">
            <div className="shrink-0 w-28 sm:w-40 md:w-48 h-44 sm:h-60 md:h-64 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-slate-100 opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-700 ease-out">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80"
                alt="Students studying"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="shrink-0 w-36 sm:w-52 md:w-60 h-56 sm:h-72 md:h-80 rounded-3xl overflow-hidden shadow-xl border border-slate-100 hover:scale-105 transition-all duration-700 ease-out">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=80"
                alt="Group of students"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="shrink-0 w-44 sm:w-64 md:w-72 h-64 sm:h-84 md:h-96 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 hover:scale-105 transition-all duration-700 ease-out ring-4 ring-[#5B50E6]/15 z-10">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80"
                alt="Campus building"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="shrink-0 w-36 sm:w-52 md:w-60 h-56 sm:h-72 md:h-80 rounded-3xl overflow-hidden shadow-xl border border-slate-100 hover:scale-105 transition-all duration-700 ease-out">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=700&q=80"
                alt="Tech learners collaboration"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="shrink-0 w-28 sm:w-40 md:w-48 h-44 sm:h-60 md:h-64 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-slate-100 opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-700 ease-out">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
                alt="Graduation celebration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* ── STATS SECTION ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-24"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-[#5B50E6]/30 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#5B50E6]/10 flex items-center justify-center text-[#5B50E6] mb-3">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-800 mt-1">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                  {stat.desc}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── SECTION 1: GLOBAL OVERVIEW WITH IMAGE ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 sm:mb-24 text-center max-w-full mx-auto space-y-6"
        >
          {/* Location Badges Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-2 rounded-full bg-white border border-slate-200/80 shadow-sm text-xs sm:text-sm font-bold text-slate-700">
            <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-100">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" /> EduNova Global
            </span>
            <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-100">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> EduNova UK
            </span>
            <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-100">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5B50E6]" /> EduNova Worldwide
            </span>
          </div>

          <p className="text-slate-700 text-sm sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-semibold">
            EduNova is an authorized global educational institute offering vocational and professional courses, fully licensed by global education authorities. We are dedicated to providing world-class learning experiences.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left pt-4">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 h-80 sm:h-96 lg:h-[420px] rounded-3xl overflow-hidden shadow-xl border border-slate-100"
            >
              <img
                src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80"
                alt="Campus building"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 space-y-5"
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Globally Recognized Qualifications Built for the Future of Work
              </h2>
              <div className="space-y-3.5 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  EduNova provides internationally recognized education across Level 3, Level 4, and Level 5 qualification frameworks. In partnership with global education bodies, we ensure our students receive rigorous, top-tier qualifications valued by top employers globally.
                </p>
                <p>
                  At our learning hubs, students can choose the qualification path best suited to their aspirations. Our senior faculty provides strategic guidance on structuring studies and mastering core skills for maximal career impact.
                </p>
              </div>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#5B50E6] hover:bg-[#4D42DB] text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-[#5B50E6]/25 hover:scale-105"
              >
                Explore All Programs <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* ── SECTION 2: DIVERSE PROGRAMS ACCORDION & IMAGE ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 sm:mb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Heading + Accordion */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 space-y-5"
            >
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  A Diverse Spectrum of Academic & Professional Frameworks
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  We deliver specialized educational programs tailored to distinct outcome goals depending on the awarding body and learning pathway selected.
                </p>
              </div>

              {/* Accordion Programs List */}
              <div className="space-y-3.5 pt-1">
                {[
                  {
                    title: "British Qualifications Framework (Ofqual Standard)",
                    content: "Delivered in partnership with premier UK qualification providers, these programs follow rigorous British educational standards. Students earn globally accredited diplomas emphasizing academic depth, software architecture principles, and critical analytical thinking."
                  },
                  {
                    title: "German Dual Vocational & Technical Standards",
                    content: "Modelled after Germany's famed dual-education systems, these technical tracks focus on hands-on software engineering, applied computer science, and real-world system development."
                  },
                  {
                    title: "French European Credit Transfer (ECTS) Track",
                    content: "Emphasizing system architecture, algorithmic precision, and European accreditation, this track enables seamless credit transfers and opens pathways to global tech leadership."
                  }
                ].map((item, index) => {
                  const isOpen = activeAccordion === index;
                  return (
                    <motion.div
                      key={item.title}
                      initial={false}
                      onClick={() => setActiveAccordion(isOpen ? null : index)}
                      className={`border rounded-2xl p-4.5 cursor-pointer transition-all duration-300 ${
                        isOpen
                          ? "bg-slate-50/90 border-[#5B50E6]/40 shadow-sm"
                          : "bg-white border-slate-200 hover:border-[#5B50E6]/40 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-sm sm:text-base text-slate-900 select-none gap-4">
                        <span>{item.title}</span>
                        <motion.span 
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="shrink-0 w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-600 bg-white shadow-xs"
                        >
                          <ChevronDown className="w-3.5 h-3.5 text-slate-700" />
                        </motion.span>
                      </div>
                      
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: isOpen ? "auto" : 0,
                          opacity: isOpen ? 1 : 0
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal pt-3 mt-2.5 border-t border-slate-200/80">
                          {item.content}
                        </p>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Column: Group Students Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 h-80 sm:h-[460px] rounded-3xl overflow-hidden shadow-xl border border-slate-100"
            >
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                alt="Students in library"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* ── SECTION 3: HISTORY AND BACKGROUND ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 sm:mb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Title & Multi-paragraph History */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 space-y-5"
            >
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[#5B50E6] uppercase tracking-widest">Our Story</span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  A Decade of Educational Innovation & Leadership
                </h2>
              </div>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  EduNova is a flagship subsidiary of Global Tech Group, a leading educational institution founded in 2012. Built upon a foundation of academic excellence, EduNova combines world-class curriculum with the practical experience of global industry architects.
                </p>

                <p>
                  With over 300+ expert mentors and senior engineers, EduNova has successfully trained and graduated over 50,000 learners across 80+ countries. Our vision is to be the premier global platform for technology and professional education.
                </p>

                <p className="pt-2 border-t border-slate-200/80">
                  Through modern interactive learning hubs across Europe, Asia, and North America, EduNova offers project-driven bootcamps, recognized credentials, and comprehensive career support designed to help learners secure top technology roles.
                </p>
              </div>
            </motion.div>

            {/* Right Column: Founder Quote Card */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-slate-100/90 border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#5B50E6]/10 flex items-center justify-center text-[#5B50E6]">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium italic">
                "EduNova was created to eliminate the rift between traditional university theory and modern software engineering. We believe world-class education should be accessible, practical, and directly tied to real career outcomes."
              </p>

              <div className="flex items-center gap-3.5 pt-3.5 border-t border-slate-200/80">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Aftab Farhan Arko"
                  className="w-12 h-12 rounded-2xl object-cover shadow-sm border border-slate-200"
                />
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900">Aftab Farhan Arko</h4>
                  <p className="text-xs text-slate-500 font-semibold">Founder & CEO, EduNova Global</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── SECTION 4: MEET THE PEOPLE BEHIND THE INNOVATION ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 sm:mb-20"
        >
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10 sm:mb-12">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-xs font-bold text-[#5B50E6] uppercase tracking-widest">Leadership & Faculty</span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Meet the Innovators Guiding Your Learning
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-md">
              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                Our team of industry leaders, tech architects, and educators are committed to helping you achieve your career potential.
              </p>
            </div>
          </div>

          {/* 4 Portrait Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ 
                  duration: 0.7, 
                  delay: idx * 0.12,
                  ease: [0.21, 0.47, 0.32, 0.98] 
                }}
                className="group flex flex-col space-y-4"
              >
                {/* Full Height Portrait Image Container with Glass Overlay */}
                <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden bg-slate-100 shadow-md group-hover:shadow-xl transition-all duration-700 ease-out">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />

                  {/* Floating Glassmorphic Social Icons Bar */}
                  <div className="absolute bottom-4 left-4 right-4 py-3 px-4 rounded-2xl bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center gap-5 text-white shadow-lg group-hover:bg-white/50 transition-all duration-500">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-transform duration-300">
                      <Facebook className="w-4 h-4 text-slate-800" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-transform duration-300">
                      <Linkedin className="w-4 h-4 text-slate-800" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-transform duration-300">
                      <Instagram className="w-4 h-4 text-slate-800" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-transform duration-300">
                      <Twitter className="w-4 h-4 text-slate-800" />
                    </a>
                  </div>
                </div>

                {/* Member Info */}
                <div className="space-y-1 pt-1">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-[#5B50E6] transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}


