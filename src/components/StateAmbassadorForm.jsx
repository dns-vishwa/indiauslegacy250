import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mail, Phone, User, CheckCircle2, X, MapPin, Building, Briefcase, MessageSquare, Globe } from "lucide-react";

export const StateAmbassadorForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    state: "",
    affiliation: "",
    background: "",
    interests: "",
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
          subject: `New State Ambassador Application: ${formData.state} - ${formData.email}`,
          "Full Name": formData.fullName,
          "Email": formData.email,
          "Phone": formData.phone || "Not Provided",
          "State Representing": formData.state,
          "Institutional Affiliation": formData.affiliation || "None",
          "Academic/Professional Background": formData.background,
          "Areas of Interest": formData.interests,
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
          <span className="font-inter text-amber-500 uppercase tracking-[0.2em] text-xs mb-4 block">
            Leadership Initiative
          </span>
          <h2 className="font-playfair text-3xl md:text-5xl text-white mb-6">
            State Ambassador Application
          </h2>
          <p className="font-lora text-slate-400 max-w-2xl mx-auto">
            Become a local leader for the US-India Legacy 250 Years initiative. Help bridge cultures and promote civic engagement in your state.
          </p>
        </div>

        <div className="bg-[#05080f]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block font-inter text-xs text-slate-400 uppercase tracking-widest">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors font-inter"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block font-inter text-xs text-slate-400 uppercase tracking-widest">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors font-inter"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block font-inter text-xs text-slate-400 uppercase tracking-widest">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors font-inter"
                    placeholder="+X XXX XXX XXXX"
                  />
                </div>
              </div>

              {/* State */}
              <div className="space-y-2">
                <label className="block font-inter text-xs text-slate-400 uppercase tracking-widest">
                  State Representing *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    required
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors font-inter"
                    placeholder="California, Delhi, etc."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Affiliation */}
              <div className="space-y-2">
                <label className="block font-inter text-xs text-slate-400 uppercase tracking-widest">
                  Institutional Affiliation (Optional)
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={formData.affiliation}
                    onChange={(e) => handleInputChange("affiliation", e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors font-inter"
                    placeholder="University or Organization Name"
                  />
                </div>
              </div>

              {/* Background */}
              <div className="space-y-2">
                <label className="block font-inter text-xs text-slate-400 uppercase tracking-widest">
                  Academic / Professional Background *
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-4 w-4 h-4 text-slate-500" />
                  <textarea
                    required
                    value={formData.background}
                    onChange={(e) => handleInputChange("background", e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors font-inter min-h-[100px]"
                    placeholder="Tell us about your field of work or study..."
                  />
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-2">
                <label className="block font-inter text-xs text-slate-400 uppercase tracking-widest">
                  Areas of Interest *
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-4 w-4 h-4 text-slate-500" />
                  <textarea
                    required
                    value={formData.interests}
                    onChange={(e) => handleInputChange("interests", e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors font-inter min-h-[80px]"
                    placeholder="Culture, Science, Technology, Policy, etc."
                  />
                </div>
              </div>

              {/* Purpose */}
              <div className="space-y-2">
                <label className="block font-inter text-xs text-slate-400 uppercase tracking-widest">
                  Statement of Purpose *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 w-4 h-4 text-slate-500" />
                  <textarea
                    required
                    value={formData.purpose}
                    onChange={(e) => handleInputChange("purpose", e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors font-inter min-h-[120px]"
                    placeholder="Why do you want to join this initiative as a State Ambassador?"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                <p className="font-lora text-xs text-slate-400 leading-relaxed italic">
                    By submitting this form, I affirm my support for the educational and cultural mission of US-India Legacy 250 Years. I agree to collaborate in good faith and consent to the use of my name and title for promotional purposes related to this initiative.
                </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !formData.fullName || !formData.email || !formData.state}
              className={`w-full py-4 rounded-sm font-inter text-xs uppercase tracking-[0.2em] transition-all ${
                isSubmitting || !formData.fullName || !formData.email || !formData.state
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_20px_rgba(217,119,6,0.3)]"
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
              className="bg-[#0f172a] border border-amber-500/30 p-8 md:p-12 rounded-2xl max-w-lg w-full text-center relative"
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
                Your application for State Ambassador has been submitted successfully for review. We will contact you soon.
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
