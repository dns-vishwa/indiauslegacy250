import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mail, Phone, User, CheckCircle2, X, ChevronDown } from "lucide-react";

export const AmbassadorForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    selection: "", // "student" or "ambassador"
    email: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelection = (type) => {
    setFormData((prev) => ({ ...prev, selection: prev.selection === type ? "" : type }));
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
          subject: `New Ambassador/Student Application: ${formData.email}`,
          "Full Name": formData.fullName,
          "Role Applied For": formData.selection,
          "Email": formData.email,
          "Phone": formData.phone || "Not Provided",
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
    <div className="w-full h-full">

      <div className="bg-[#05080f]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden h-full">
        {/* Decorative background */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="text-center mb-10 relative z-10">
          <h3 className="font-playfair text-2xl md:text-3xl text-white mb-4">
            Join as Student or Ambassador
          </h3>
          <p className="font-lora text-slate-400">
            Apply to be a part of the US-India Legacy 250 Years initiative at the local level.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="space-y-4">
            <label className="block font-inter text-xs text-slate-400 uppercase tracking-widest mb-4">
              I want to join as:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleSelection("student")}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                  formData.selection === "student"
                    ? "bg-amber-500/10 border-amber-500 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                    : "bg-white/5 border-white/10 text-slate-400 hover:border-amber-500/50"
                }`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.selection === "student" ? 'border-amber-500' : 'border-slate-600'}`}>
                  {formData.selection === "student" && <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />}
                </div>
                <span className="font-lora">Student</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelection("ambassador")}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                  formData.selection === "ambassador"
                    ? "bg-amber-500/10 border-amber-500 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                    : "bg-white/5 border-white/10 text-slate-400 hover:border-amber-500/50"
                }`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.selection === "ambassador" ? 'border-amber-500' : 'border-slate-600'}`}>
                  {formData.selection === "ambassador" && <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />}
                </div>
                <span className="font-lora">State Ambassador</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
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

            <div className="space-y-2">
              <label className="block font-inter text-xs text-slate-400 uppercase tracking-widest">
                Mobile Number (Optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors font-inter"
                  placeholder="XXXXX-XXXXX"
                />
              </div>
            </div>
          </div>


          <button
            type="submit"
            disabled={isSubmitting || !formData.selection || !formData.fullName || !formData.email}
            className={`w-full py-4 rounded-sm font-inter text-xs uppercase tracking-[0.2em] transition-all ${
              isSubmitting || !formData.selection || !formData.fullName || !formData.email
                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_20px_rgba(217,119,6,0.3)]"
            }`}
          >
            {isSubmitting ? "Processing..." : "Submit Application"}
          </button>
        </form>
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
                Thank you for your interest. The form will be manually sent to our team for review. We will get back to you shortly.
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
