import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Send, User, Building, MapPin, Globe, Mail, Phone, BookOpen, Library, Landmark, Award, Heart, CheckCircle2 } from "lucide-react";

export const PartnershipForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    participantType: "",
    fullName: "",
    organizationName: "",
    titleRole: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    organizationType: "",
    interests: [],
    educationalRequests: [],
    consentContact: false,
    consentUse: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const participantTypes = [
    "Corporate Sponsor",
    "University / Academic Institution",
    "Non-Profit / Cultural Organization",
    "Government / Policy Institution",
    "Individual Contributor / Advisor"
  ];

  const organizationTypes = [
    { name: "Corporate", icon: Building },
    { name: "Library", icon: Library },
    { name: "Museum", icon: Landmark },
    { name: "Academic", icon: BookOpen },
    { name: "Cultural", icon: Award },
    { name: "Social", icon: Heart },
    { name: "Religious", icon: User },
    { name: "Government", icon: Building },
    { name: "Other", icon: Globe },
  ];

  const interestTypes = [
    "Sponsorship",
    "Hosting Seminars",
    "Hosting Event (s)",
    "Academic collaboration",
    "Hosting Exhibition partnership",
    "Media / communications",
    "Advisory / thought leadership",
  ];

  const eduRequests = [
    "Academic seminar",
    "Exhibition",
    "Student-led event",
    "Conference / panel discussion",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field, item) => {
    setFormData((prev) => {
      const current = prev[field];
      if (current.includes(item)) {
        return { ...prev, [field]: current.filter((i) => i !== item) };
      } else {
        return { ...prev, [field]: [...current, item] };
      }
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
      setStep(step - 1);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

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
          subject: `New Partnership Request: ${formData.organizationName || formData.fullName}`,
          "Participant Type": formData.participantType,
          "Full Name": formData.fullName,
          "Organization Name": formData.organizationName,
          "Title/Role": formData.titleRole,
          "Email": formData.email,
          "Phone": formData.phone,
          "Website/LinkedIn": formData.website,
          "Address": formData.address,
          "Organization Type": formData.organizationType,
          "Interests": formData.interests.join(", "),
          "Educational Requests": formData.educationalRequests.join(", "),
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

  const StepIndicator = () => (
    <div className="flex justify-center items-center gap-2 mb-12">
      {[1, 2, 3].map((num) => (
        <React.Fragment key={num}>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-inter text-sm border transition-all duration-500 ${
              step >= num
                ? "bg-amber-600 border-amber-500 text-white shadow-[0_0_15px_rgba(217,119,6,0.5)]"
                : "bg-white/5 border-white/20 text-slate-500"
            }`}
          >
            {step > num ? <Check size={16} /> : num}
          </div>
          {num < 3 && (
            <div
              className={`w-16 h-px transition-all duration-500 ${
                step > num ? "bg-amber-500" : "bg-white/20"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="relative z-10 w-full" id="partnership-form-container">
      <div className="text-center mb-12">
        <span className="font-inter text-amber-500 uppercase tracking-[0.2em] text-xs mb-4 block">
          Join US-India Legacy 250 Years
        </span>
        <h2 className="font-playfair text-3xl md:text-5xl text-white mb-6">
          Partnership Application
        </h2>
        <p className="font-lora text-slate-400 text-sm md:text-base">
          Be part of a historic global initiative. We invite corporations, universities, and organizations to collaborate.
        </p>
      </div>

      <div className="bg-[#05080f]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl relative">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <StepIndicator />

              <form onSubmit={handleSubmit}>
                {/* STEP 1: Basic Info & Type */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4">
                      <h3 className="font-playfair text-2xl text-white border-b border-white/10 pb-2">Participant Type</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {participantTypes.map((type) => (
                          <label
                            key={type}
                            className={`flex items-start p-3 rounded-xl border cursor-pointer transition-all ${
                              formData.participantType === type
                                ? "bg-amber-500/10 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                                : "bg-white/5 border-white/10 hover:border-amber-500/50"
                            }`}
                          >
                            <div className="mt-1 flex-shrink-0">
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.participantType === type ? 'border-amber-500' : 'border-slate-500'}`}>
                                {formData.participantType === type && <div className="w-2 h-2 bg-amber-500 rounded-full" />}
                              </div>
                              <input
                                type="radio"
                                className="hidden"
                                name="participantType"
                                value={type}
                                checked={formData.participantType === type}
                                onChange={() => handleInputChange("participantType", type)}
                              />
                            </div>
                            <span className="ml-3 font-lora text-slate-300 text-sm">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-white/10">
                      <h3 className="font-playfair text-2xl text-white border-b border-white/10 pb-2">Contact Information</h3>
                      <div className="grid grid-cols-1 gap-4">
                          <div>
                              <label className="block font-inter text-xs text-slate-400 uppercase tracking-widest mb-2">Full Contact Name *</label>
                              <div className="relative">
                                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                  <input required type="text" value={formData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors font-inter text-sm" placeholder="John Doe" />
                              </div>
                          </div>
                          <div>
                              <label className="block font-inter text-xs text-slate-400 uppercase tracking-widest mb-2">Organization Name *</label>
                              <div className="relative">
                                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                  <input required type="text" value={formData.organizationName} onChange={(e) => handleInputChange("organizationName", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors font-inter text-sm" placeholder="Acme Corp" />
                              </div>
                          </div>
                          <div>
                              <label className="block font-inter text-xs text-slate-400 uppercase tracking-widest mb-2">Email Address *</label>
                              <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                  <input required type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors font-inter text-sm" placeholder="john@example.com" />
                              </div>
                          </div>
                          <div>
                              <label className="block font-inter text-xs text-slate-400 uppercase tracking-widest mb-2">Phone Number (Optional)</label>
                              <div className="relative">
                                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                  <input type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors font-inter text-sm" placeholder="+1 (555) 000-0000" />
                              </div>
                          </div>
                          <div>
                              <label className="block font-inter text-xs text-slate-400 uppercase tracking-widest mb-2">Website / LinkedIn (Optional)</label>
                              <div className="relative">
                                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                  <input type="url" value={formData.website} onChange={(e) => handleInputChange("website", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors font-inter text-sm" placeholder="https://example.com" />
                              </div>
                          </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Org Details & Interests */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4">
                      <h3 className="font-playfair text-2xl text-white border-b border-white/10 pb-2">Organization Details</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {organizationTypes.map(({name, icon: Icon}) => (
                          <label
                            key={name}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer transition-all text-center ${
                              formData.organizationType === name
                                ? "bg-amber-500/10 border-amber-500 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                                : "bg-white/5 border-white/10 text-slate-400 hover:border-amber-500/50 hover:text-white"
                            }`}
                          >
                            <Icon className="w-5 h-5 mb-2 opacity-80" />
                            <input
                              type="radio"
                              className="hidden"
                              name="organizationType"
                              value={name}
                              checked={formData.organizationType === name}
                              onChange={() => handleInputChange("organizationType", name)}
                            />
                            <span className="font-lora text-[10px] uppercase tracking-wider">{name}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-white/10">
                      <h3 className="font-playfair text-2xl text-white border-b border-white/10 pb-2">Interest</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {interestTypes.map((interest) => (
                           <button
                             key={interest}
                             type="button"
                             onClick={() => toggleArrayItem("interests", interest)}
                             className={`flex items-start p-2 rounded-md border cursor-pointer transition-all w-full text-left ${
                               formData.interests.includes(interest)
                                 ? "bg-amber-500/10 border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                                 : "bg-black/20 border-white/5 hover:border-amber-500/30"
                             }`}
                           >
                              <div className="mt-1 flex-shrink-0">
                                 <div className={`w-3 h-3 rounded-sm border flex items-center justify-center ${formData.interests.includes(interest) ? 'border-amber-500 bg-amber-500' : 'border-slate-500'}`}>
                                    {formData.interests.includes(interest) && <Check size={10} className="text-black" />}
                                 </div>
                              </div>
                              <span className="ml-3 font-lora text-slate-300 text-xs">{interest}</span>
                           </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Educational Requests & Consent */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4">
                      <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
                          <h3 className="font-playfair text-lg text-white mb-2 flex items-center gap-2"><BookOpen className="text-blue-400 w-4 h-4"/> Institutions</h3>
                          <div className="grid grid-cols-1 gap-2">
                            {eduRequests.map((req) => (
                               <button
                                 key={req}
                                 type="button"
                                 onClick={() => toggleArrayItem("educationalRequests", req)}
                                 className={`flex items-start p-2 rounded-md border cursor-pointer transition-all w-full text-left ${
                                   formData.educationalRequests.includes(req)
                                     ? "bg-blue-500/20 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.1)]"
                                     : "bg-black/40 border-white/10 hover:border-blue-500/50"
                                 }`}
                               >
                                  <div className="mt-1 flex-shrink-0">
                                     <div className={`w-3 h-3 rounded-sm border flex items-center justify-center ${formData.educationalRequests.includes(req) ? 'border-blue-500 bg-blue-500' : 'border-slate-500'}`}>
                                        {formData.educationalRequests.includes(req) && <Check size={10} className="text-black" />}
                                     </div>
                                  </div>
                                  <span className="ml-3 font-lora text-slate-300 text-xs">{req}</span>
                               </button>
                            ))}
                          </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-white/10">
                      <h3 className="font-playfair text-2xl text-white border-b border-white/10 pb-2">Consent</h3>
                      <div className="space-y-3">
                          <button 
                              type="button"
                              onClick={() => handleInputChange("consentContact", !formData.consentContact)}
                              className="flex items-start cursor-pointer group w-full text-left"
                          >
                              <div className="mt-1 flex-shrink-0">
                                  <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${formData.consentContact ? 'border-amber-500 bg-amber-500' : 'border-slate-500 group-hover:border-amber-500/50'}`}>
                                      {formData.consentContact && <Check size={12} className="text-black" />}
                                  </div>
                              </div>
                              <span className="ml-3 font-inter text-slate-300 text-xs leading-relaxed">
                                  I agree to be contacted regarding partnership.
                              </span>
                          </button>
                          
                          <button 
                              type="button"
                              onClick={() => handleInputChange("consentUse", !formData.consentUse)}
                              className="flex items-start cursor-pointer group w-full text-left"
                          >
                              <div className="mt-1 flex-shrink-0">
                                  <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${formData.consentUse ? 'border-amber-500 bg-amber-500' : 'border-slate-500 group-hover:border-amber-500/50'}`}>
                                      {formData.consentUse && <Check size={12} className="text-black" />}
                                  </div>
                              </div>
                              <span className="ml-3 font-inter text-slate-300 text-xs leading-relaxed">
                                  I consent to the use of submitted info.
                              </span>
                          </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="mt-8 flex justify-between items-center pt-6 border-t border-white/10">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 rounded-sm font-inter text-[10px] uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                      Back
                    </button>
                  ) : <div />}
                  
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-sm font-inter text-[10px] uppercase tracking-widest transition-all"
                    >
                      Next <ChevronRight size={14} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!formData.consentContact || !formData.consentUse || isSubmitting}
                      className={`flex items-center gap-2 px-6 py-2 rounded-sm font-inter text-[10px] uppercase tracking-widest transition-all ${
                          formData.consentContact && formData.consentUse && !isSubmitting
                          ? "bg-amber-600 hover:bg-amber-500 text-white"
                          : "bg-slate-800 text-slate-500 cursor-not-allowed"
                      }`}
                    >
                      {isSubmitting ? "Sending..." : "Submit"} <Send size={14} />
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 space-y-4"
            >
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-playfair text-2xl text-white">
                Success!
              </h3>
              <p className="font-lora text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
                Thank you for your interest. Our team will review your submission and contact you shortly.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-amber-500 text-[10px] font-inter uppercase tracking-widest hover:text-white transition-colors"
              >
                Submit another
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

