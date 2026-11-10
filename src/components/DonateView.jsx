import React from "react";
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Landmark,
  Film,
  BookOpen,
  GraduationCap,
  Library,
  History
} from "lucide-react";
import { motion } from "framer-motion";
import { DonationSection } from "./DonationSection";

export const DonateView = ({ navigateTo }) => {
  const [expandedFaq, setExpandedFaq] = React.useState(null);

  const impactItems = [
    {
      title: "Develop museum-quality traveling exhibitions",
      desc: "Curating high-definition physical & digital exhibition panels across top institutions.",
      icon: Landmark,
    },
    {
      title: "Produce educational documentaries and digital content",
      desc: "Chronicle 250 years of shared history in broadcast-ready video formats.",
      icon: Film,
    },
    {
      title: "Organize lectures, conferences, and community events",
      desc: "Bringing together historians, diplomats, leaders, and the public.",
      icon: History,
    },
    {
      title: "Inspire students and young leaders through educational outreach",
      desc: "Empowering Student Ambassadors across campuses in India and the US.",
      icon: GraduationCap,
    },
    {
      title: "Create free learning resources for schools, libraries, and museums",
      desc: "Ensuring open-access digital archives & curriculum toolkits for educators.",
      icon: Library,
    },
    {
      title: "Preserve and share our shared legacy with future generations",
      desc: "Establishing enduring partnerships and archived oral histories.",
      icon: History,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white pt-24 md:pt-36 pb-24 relative overflow-hidden font-serif selection:bg-amber-500/30 selection:text-amber-100 animate-fade-in">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-amber-500/10 via-amber-900/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* --- HERO HEADER --- */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-inter text-xs uppercase tracking-[0.2em] font-semibold mb-6 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            LEGACY 250 • INITIATIVE OF MASS INDIA PARTNERSHIP 501(C)(6)
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-playfair text-4xl md:text-6xl text-white mb-6 leading-tight font-bold tracking-tight"
          >
            Support Legacy 250 — <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">Donate Today</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-lora text-xl md:text-2xl text-amber-100/90 italic mb-6 max-w-2xl mx-auto"
          >
            Help Preserve History. Inspire the Future.
          </motion.p>

          <p className="font-lora text-slate-300 text-sm md:text-base max-w-3xl mx-auto mb-8 leading-relaxed">
            Legacy 250 is an initiative of <strong>Mass India Partnership</strong>, a U.S.-registered <strong>501(c)(6) nonprofit business league</strong>. Your donations and contributions directly support our yearlong educational campaign dedicated to uncovering, preserving, and sharing 250+ years of shared history between India and the United States.
          </p>

          {/* OFFICIAL TAX INFORMATION & LEGAL DISCLAIMER NOTICE BOX (BEFORE PAYMENT) */}
          <div className="max-w-3xl mx-auto mb-8 bg-amber-950/30 border border-amber-500/40 rounded-2xl p-6 shadow-xl backdrop-blur-md text-left">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400 mt-1">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-3 font-serif">
                <div>
                  <h3 className="font-inter text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-1">
                    Tax Information & Business Expense Disclosure
                  </h3>
                  <p className="font-lora text-slate-300 text-xs md:text-sm leading-relaxed">
                    <strong>Note: Tax Information:</strong> MassIndia Partnership is a 501(c)(6) non-profit trade organization. Contributions or payments to MassIndia Partnership are not deductible as charitable contributions for federal income tax purposes. However, they may be tax-deductible as ordinary and necessary business expenses. Please consult your tax advisor.
                  </p>
                </div>
                <div className="pt-2 border-t border-amber-500/20">
                  <p className="font-lora text-slate-300 text-xs leading-relaxed">
                    <strong>Legal Disclaimer:</strong> Legacy 250 is an initiative of Mass India Partnership, a U.S.-registered 501(c)(6) nonprofit business league. Donations and contributions support the educational, cultural, and community programs of the Legacy 250 initiative.
                  </p>
                  <p className="mt-1 font-inter text-[11px] text-slate-400">
                    For legal or financial questions regarding donations, please contact Mass India Partnership at <a href="mailto:info@indiauslegacy250.com" className="text-amber-400 underline font-medium">info@indiauslegacy250.com</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CUSTOM EMBEDDED DONATION INTERFACE MATCHING INDIAUSLEGACY250.COM */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="my-8"
          >
            <DonationSection />
          </motion.div>
        </div>

        {/* --- ABOUT MASSINDIA PARTNERSHIP & LEGACY 250 --- */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-amber-500/20 p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 shadow-inner">
                <History className="w-8 h-8" />
              </div>
              <div className="space-y-6 flex-1">
                <h2 className="font-playfair text-2xl md:text-4xl text-white font-bold">
                  About MassIndia Partnership and Legacy 250
                </h2>
                <div className="font-lora text-slate-300 text-base md:text-lg leading-relaxed space-y-4 text-justify">
                  <p>
                    The MassIndia Partnership was founded in 2016 as a U.S.-registered 501(c)(6) non-profit business league. Dedicated to advancing the economic vitality of the New England region and the United States, we operate through strategic programming, community development, advocacy, and collaborative partnerships.
                  </p>
                  <p>
                    Our mission is to promote and strengthen thought leadership, business, investment, entrepreneurship, technology, and trade relations between the Commonwealth of Massachusetts, the broader United States, and India. Through educational programming, content, and exhibits, we seek to highlight the deep ties the U.S. has had with India and the Indian people over 250 years and how that vibrant history and our dynamic present can shape an even more transformative future together.
                  </p>
                  <p>
                    Powered by a dynamic network of entrepreneurs, business executives, investors, scholars, and governmental relationships, the MassIndia Partnership provides a vibrant platform for cross-border activities and joint venture programs.
                  </p>
                  <p className="font-semibold text-amber-200">
                    Thusly, as we launch Legacy 250, we invite you to join us on this collaborative mission to renew this bond between these two great peoples and democracies for another 250 years, because we truly believe that we are "Stronger Together!"
                  </p>
                  <p className="text-amber-400 font-medium">
                    Your generous support funds the necessary operational and programming costs that enable us to do the mission driven work of the MassIndia Partnership.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      const element = document.getElementById('partnership-form-container') || document.querySelector('form');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                      else window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="px-8 py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-[#05080f] font-bold font-inter text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer"
                  >
                    Donate to Support MassIndia Partnership & Legacy 250
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- IMPACT CARDS SECTION ("Your donation helps us:") --- */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="text-center mb-12">
            <span className="font-inter tracking-[0.2em] text-amber-500 font-bold uppercase text-xs mb-3 block">
              Direct Community Impact
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl text-white mb-4">
              Your Donation Helps Us:
            </h2>
            <div className="h-1 w-20 bg-amber-600 rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 hover:border-amber-500/40 p-6 rounded-xl transition-all duration-300 hover:bg-white/[0.08] group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-playfair text-lg text-white mb-2 group-hover:text-amber-400 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-lora text-slate-400 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-amber-500 text-[11px] font-inter uppercase tracking-widest font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Active Program Pillar
                </div>
              </motion.div>
            ))}
          </div>

          {/* Meaningful difference banner */}
          <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-amber-950/40 border border-amber-500/30 text-center">
            <p className="font-playfair text-xl text-amber-200 font-semibold mb-2">
              "Every contribution, no matter the size, makes a meaningful difference."
            </p>
            <p className="font-inter text-xs text-amber-400 uppercase tracking-widest font-bold">
              Donate Today. Make History Accessible Tomorrow.
            </p>
          </div>
        </div>

        {/* --- DONATION FREQUENTLY ASKED QUESTIONS --- */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-10">
            <span className="font-inter tracking-[0.2em] text-amber-500 font-bold uppercase text-xs mb-2 block">
              Donation Help & Information
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl text-white font-bold mb-3">
              Frequently Asked Questions
            </h2>
            <div className="h-1 w-20 bg-amber-500 rounded-full mx-auto" />
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Is it safe to donate through this website?",
                a: "Yes. Your donation is processed through our secure payment processing system, and appropriate security measures are used to protect your payment information during the transaction."
              },
              {
                q: "Who processes my donation?",
                a: "Your donation is securely processed through our authorized payment processor(s), which handle the payment transaction between you and our organization."
              },
              {
                q: "Do you store my credit card information?",
                a: "We do not intentionally store your full credit card number or CVV on our website. Payment information is handled through the secure payment-processing system used for your transaction."
              },
              {
                q: "Will my personal information be shared or sold?",
                a: "Your information is used for purposes related to processing your donation, providing receipts, maintaining donation records, and communicating with you about our organization. We do not sell or rent your personal information."
              },
              {
                q: "How will the donation appear on my bank or credit-card statement?",
                a: "Your donation will appear using the merchant/statement descriptor associated with the organization and its payment-processing account."
              },
              {
                q: "Can I make a recurring donation?",
                a: "Recurring donations are not currently available through this donation page. This option may be added in the future."
              },
              {
                q: "Will I receive a donation receipt?",
                a: "Yes. After a successful donation, you will receive an email confirmation/receipt at the email address provided during the donation process."
              },
              {
                q: "Is my donation tax-deductible?",
                a: "Tax-deductibility depends on the applicable laws, the donor's circumstances, and the organization's legal/tax status. Please refer to the tax-donation notice displayed on the donation form before submitting your donation."
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 hover:border-amber-500/30 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-playfair text-lg text-white font-medium flex justify-between items-center cursor-pointer hover:text-amber-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-amber-500 text-xl font-bold ml-4">
                    {expandedFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {expandedFaq === idx && (
                  <div className="px-5 pb-5 pt-1 font-lora text-slate-300 text-sm leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* --- ENDURING FRIENDSHIP CLOSING STATEMENT --- */}
        <div className="max-w-4xl mx-auto text-center border-t border-white/10 pt-16">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-6 text-amber-400">
            <Heart className="w-7 h-7 text-amber-500" />
          </div>

          <p className="font-playfair text-2xl md:text-3xl text-white mb-6 leading-snug">
            By donating to Legacy 250, you are investing in education, historical understanding, and the enduring friendship between India and the United States.
          </p>

          <p className="font-lora text-lg text-amber-200/90 italic mb-8">
            Together, let's preserve the past, celebrate the present, and inspire the future.
          </p>

          <h4 className="font-playfair text-xl text-amber-400 font-bold mb-8">
            Thank you for your generosity and support.
          </h4>

          <button
            onClick={() => navigateTo ? navigateTo("home") : window.scrollTo(0, 0)}
            className="px-8 py-3 bg-white/5 border border-white/10 hover:border-amber-500/40 text-slate-300 hover:text-white font-inter text-xs uppercase tracking-widest rounded-lg transition-all"
          >
            Return to Legacy 250 Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonateView;
