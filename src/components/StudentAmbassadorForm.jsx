import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mail, Phone, User, CheckCircle2, X, GraduationCap, School, Calendar, MessageSquare, BookOpen, UserCheck } from "lucide-react";

export const StudentAmbassadorForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    university: "",
    major: "",
    graduationYear: "",
    referenceName: "",
    referencePosition: "",
    referenceInstitution: "",
    referenceEmail: "",
    referencePhone: "",
    purpose: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "07f19a7d-ea21-48f7-8a77-c52bf1c2296e",
          subject: `New Student Ambassador Application: ${formData.university} - ${formData.email}`,
          "Full Name": formData.fullName,
          "Email": formData.email,
          "Phone": formData.phone || "Not Provided",
          "University/College": formData.university,
          "Major/Field of Study": formData.major,
          "Year of Graduation": formData.graduationYear,
          "Reference name": formData.referenceName,
          "Reference Position/Title": formData.referencePosition,
          "Reference Institution": formData.referenceInstitution,
          "Reference Email": formData.referenceEmail,
          "Reference Phone": formData.referencePhone,
          "Statement of Purpose": formData.purpose,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        alert("Failed to submit form: " + result.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] pt-24 md:pt-32 pb-24 relative animate-fade-in text-white">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <span className="font-inter text-blue-400 uppercase tracking-[0.2em] text-xs mb-4 block">
            Future Leaders Program
          </span>
          <h2 className="font-playfair text-3xl md:text-5xl text-white mb-6">
            Student Ambassador Application
          </h2>
          <p className="font-lora text-slate-400 max-w-2xl mx-auto">
            Empowering the next generation of cultural and civic leadership. Join a global network of students dedicated to the shared destiny of India and America.
          </p>
        </div>

        <div className="bg-[#05080f]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
            {/* Secion 1: Personal & Academic */}
            <div className="space-y-8">
              <h3 className="font-playfair text-xl text-blue-400 border-b border-white/10 pb-2">Personal & Academic Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-inter text-[10px] text-slate-400 uppercase tracking-widest">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input required type="text" value={formData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors font-inter text-sm" placeholder="John Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block font-inter text-[10px] text-slate-400 uppercase tracking-widest">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input required type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors font-inter text-sm" placeholder="email@example.edu" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block font-inter text-[10px] text-slate-400 uppercase tracking-widest">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors font-inter text-sm" placeholder="+X XXX XXX XXXX" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block font-inter text-[10px] text-slate-400 uppercase tracking-widest">University / College *</label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input required type="text" value={formData.university} onChange={(e) => handleInputChange("university", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors font-inter text-sm" placeholder="Harvard, IIT, etc." />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block font-inter text-[10px] text-slate-400 uppercase tracking-widest">Major / Field of Study *</label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input required type="text" value={formData.major} onChange={(e) => handleInputChange("major", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors font-inter text-sm" placeholder="Computer Science, History, etc." />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block font-inter text-[10px] text-slate-400 uppercase tracking-widest">Expected Graduation Year *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input required type="text" value={formData.graduationYear} onChange={(e) => handleInputChange("graduationYear", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors font-inter text-sm" placeholder="2026" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Reference */}
            <div className="space-y-8">
              <h3 className="font-playfair text-xl text-blue-400 border-b border-white/10 pb-2">Faculty / Organization Reference</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-inter text-[10px] text-slate-400 uppercase tracking-widest">Reference Name *</label>
                  <div className="relative">
                    <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input required type="text" value={formData.referenceName} onChange={(e) => handleInputChange("referenceName", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors font-inter text-sm" placeholder="Prof. Jane Smith" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block font-inter text-[10px] text-slate-400 uppercase tracking-widest">Title / Position *</label>
                  <input required type="text" value={formData.referencePosition} onChange={(e) => handleInputChange("referencePosition", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors font-inter text-sm" placeholder="Head of Department" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="block font-inter text-[10px] text-slate-400 uppercase tracking-widest">Institution / Organization *</label>
                  <input required type="text" value={formData.referenceInstitution} onChange={(e) => handleInputChange("referenceInstitution", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors font-inter text-sm" placeholder="University Name" />
                </div>
                <div className="space-y-2">
                  <label className="block font-inter text-[10px] text-slate-400 uppercase tracking-widest">Reference Email *</label>
                  <input required type="email" value={formData.referenceEmail} onChange={(e) => handleInputChange("referenceEmail", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors font-inter text-sm" placeholder="reference@example.edu" />
                </div>
                <div className="space-y-2">
                  <label className="block font-inter text-[10px] text-slate-400 uppercase tracking-widest">Reference Phone</label>
                  <input type="tel" value={formData.referencePhone} onChange={(e) => handleInputChange("referencePhone", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors font-inter text-sm" placeholder="+X XXX XXX XXXX" />
                </div>
              </div>
            </div>

            {/* Section 3: Motivation */}
            <div className="space-y-4">
              <h3 className="font-playfair text-xl text-blue-400 border-b border-white/10 pb-2">Statement of Purpose</h3>
              <div className="space-y-2">
                <label className="block font-inter text-[10px] text-slate-400 uppercase tracking-widest">Why do you want to join as a Student Ambassador? *</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 w-4 h-4 text-slate-500" />
                  <textarea
                    required
                    value={formData.purpose}
                    onChange={(e) => handleInputChange("purpose", e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors font-inter min-h-[150px] text-sm"
                    placeholder="Describe your motivation, relevant experiences, and how you plan to contribute..."
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-sm">
                <p className="font-lora text-[11px] text-slate-400 leading-relaxed italic text-center">
                    I affirm my commitment to the mission of US-India Legacy 250 Years. I consent to the use of my name, title, and photographs for promotional and educational purposes.
                </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !formData.fullName || !formData.university || !formData.purpose}
              className={`w-full py-4 rounded-sm font-inter text-xs uppercase tracking-[0.2em] transition-all ${
                isSubmitting || !formData.fullName || !formData.university || !formData.purpose
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
              }`}
            >
              {isSubmitting ? "Processing..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#0f172a] border border-blue-500/30 p-8 md:p-12 rounded-2xl max-w-lg w-full text-center relative"
            >
              <button 
                onClick={() => setSubmitted(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              
              <h3 className="font-playfair text-2xl md:text-3xl text-white mb-4">
                Application Received!
              </h3>
              
              <p className="font-lora text-slate-400 text-lg leading-relaxed mb-8">
                Your application for Student Ambassador has been submitted. We will review your academic background and references and get back to you shortly.
              </p>

              <button
                onClick={() => setSubmitted(false)}
                className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-sm text-white font-inter text-xs uppercase tracking-widest transition-all"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
