import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Lock, ShieldCheck, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react';
import { env } from '../lib/env.js';

// ─────────────────────────────────────────────────────────────────────
// SECURITY NOTE:
// This component NEVER imports donateRoute.js or serverEnv.js.
// Card data is dispatched directly to Authorize.Net's Accept.js
// and only the short-lived opaqueData token is sent to our backend.
// ─────────────────────────────────────────────────────────────────────

export function DonationSection({ onSuccess }) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const [selectedPreset, setSelectedPreset] = useState(250);
  const [customAmount, setCustomAmount] = useState('');

  const [donorData, setDonorData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+1',
    phone: '',
    cardNumber: '',
    month: '',
    year: '',
    cardCode: '',
  });

  const countryCodes = [
    { code: '+1', flag: '🇺🇸', name: 'US / Canada' },
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+44', flag: '🇬🇧', name: 'UK' },
    { code: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: '+971', flag: '🇦🇪', name: 'UAE' },
    { code: '+65', flag: '🇸🇬', name: 'Singapore' },
    { code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+81', flag: '🇯🇵', name: 'Japan' },
    { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
    { code: '+974', flag: '🇶🇦', name: 'Qatar' },
    { code: '+41', flag: '🇨🇭', name: 'Switzerland' },
    { code: '+31', flag: '🇳🇱', name: 'Netherlands' },
    { code: '+39', flag: '🇮🇹', name: 'Italy' },
    { code: '+64', flag: '🇳🇿', name: 'New Zealand' },
    { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
    { code: '+27', flag: '🇿🇦', name: 'South Africa' },
    { code: '+55', flag: '🇧🇷', name: 'Brazil' },
    { code: '+52', flag: '🇲🇽', name: 'Mexico' },
  ];

  const presetTiers = [
    { amount: 25, label: 'Community Supporter' },
    { amount: 50, label: 'Heritage Advocate' },
    { amount: 100, label: 'Cultural Patron' },
    { amount: 250, label: 'Legacy 250 Milestone Sponsor', featured: true },
  ];

  const effectiveAmount =
    selectedPreset === 'custom'
      ? parseFloat(customAmount) || 0
      : selectedPreset;

  useEffect(() => {
    const scriptSrc =
      env.AUTHORIZENET_ENV === 'production'
        ? 'https://js.authorize.net/v1/Accept.js'
        : 'https://jstest.authorize.net/v1/Accept.js';

    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
    if (existingScript) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () => {
      console.warn('Accept.js failed to load. Payment processing unavailable.');
    };
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonorData((prev) => ({ ...prev, [name]: value }));
  };

  const clearCardFields = () => {
    setDonorData((prev) => ({ ...prev, cardNumber: '', month: '', year: '', cardCode: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // CRITICAL: prevent browser form POST redirect

    if (effectiveAmount <= 0) {
      setStatus({ success: false, message: 'Please select or enter a valid donation amount.' });
      return;
    }

    if (!donorData.firstName.trim() || !donorData.lastName.trim() || !donorData.email.trim() || !donorData.phone.trim()) {
      setStatus({ success: false, message: 'Please fill in all required donor fields.' });
      return;
    }

    if (!window.Accept) {
      setStatus({ success: false, message: 'Payment gateway is still loading. Please wait a moment and try again.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    // Card data is dispatched ONLY to Authorize.Net's Accept.js endpoint.
    // Our server never receives raw card numbers, CVVs, or expiration dates.
    const secureData = {
      authData: {
        clientKey: env.NEXT_PUBLIC_AUTHORIZENET_CLIENT_KEY,
        apiLoginID: env.NEXT_PUBLIC_AUTHORIZENET_API_LOGIN_ID,
      },
      cardData: {
        cardNumber: donorData.cardNumber.replace(/\s+/g, ''),
        month: donorData.month,
        year: donorData.year,
        cardCode: donorData.cardCode,
      },
    };

    window.Accept.dispatchData(secureData, async (response) => {
      if (response.messages.resultCode === 'Error') {
        setStatus({
          success: false,
          message: response.messages.message[0].text,
        });
        setLoading(false);
        clearCardFields();
        return;
      }

      const fullPhone = `${donorData.countryCode} ${donorData.phone.trim()}`.trim();

      // Only the opaque token and donor details are sent to our server — zero card data
      try {
        const res = await fetch('/api/donate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: effectiveAmount,
            opaqueData: response.opaqueData,
            donor: {
              firstName: donorData.firstName.trim(),
              lastName: donorData.lastName.trim(),
              email: donorData.email.trim(),
              phone: fullPhone,
            },
          }),
        });

        const data = await res.json();
        if (data.success) {
          setStatus({
            success: true,
            transactionId: data.transactionId,
            message: `Thank you for supporting Legacy 250! Your donation of $${effectiveAmount} was processed successfully.`,
          });
          clearCardFields();
          if (onSuccess) onSuccess(data.transactionId, effectiveAmount);
        } else {
          setStatus({ success: false, message: data.message || 'Payment could not be processed. Please try again.' });
        }
      } catch (err) {
        setStatus({ success: false, message: 'Network connection error. Please check your internet and try again.' });
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className="max-w-2xl md:max-w-3xl mx-auto bg-[#0f172a]/95 border border-amber-500/30 rounded-2xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl text-white font-serif relative overflow-hidden">
      
      {/* IN-PLACE SUCCESS SCREEN */}
      {status?.success ? (
        <div className="text-center py-6 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-amber-400" />
          </div>
          <h3 className="font-playfair text-2xl md:text-3xl text-white font-bold mb-2">
            Contribution Received!
          </h3>
          <p className="font-inter text-xs text-amber-400 uppercase tracking-widest font-semibold mb-4">
            Authorized & Tokenized via Accept.js
          </p>
          <p className="font-lora text-slate-300 text-sm mb-6 leading-relaxed">
            {status.message}
          </p>
          
          <div className="bg-black/40 border border-white/10 rounded-xl p-4 mb-6 font-mono text-xs text-slate-300 flex justify-between items-center">
            <span>Transaction Ref ID:</span>
            <span className="text-amber-400 font-bold">{status.transactionId}</span>
          </div>

          <button
            onClick={() => setStatus(null)}
            className="py-3 px-6 bg-amber-500 hover:bg-amber-400 text-[#05080f] font-bold font-inter text-xs uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer"
          >
            Make Another Donation
          </button>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <span className="font-inter text-xs uppercase tracking-[0.2em] text-amber-500 font-bold block mb-1">
              Make a Donation via Secure Link
            </span>
            <h2 className="font-playfair text-2xl md:text-3xl text-white font-bold">
              Make a Donation via Secure Link
            </h2>
            <p className="font-lora text-slate-400 text-xs mt-1">
              Accept.js In-Place Browser Tokenization
            </p>
          </div>

          {/* 1. Header / Sub-Header Trust Banner */}
          <div className="mb-6 p-3.5 bg-gradient-to-r from-emerald-950/40 via-[#0c1829] to-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
              <Lock className="w-4 h-4" />
            </div>
            <p className="font-inter text-xs text-emerald-200/90 leading-relaxed">
              <strong>Your trust is our priority.</strong> This form is fully encrypted, and your transaction is safely handled on our secure platform.
            </p>
          </div>

          {/* INLINE ERROR BANNER */}
          {status?.success === false && (
            <div className="mb-6 p-4 rounded-xl text-xs font-inter border leading-relaxed bg-red-950/60 border-red-500/50 text-red-300 shadow-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <span>{status.message}</span>
            </div>
          )}

          {/* Preset Amount Chips */}
          <div className="space-y-2 mb-6 text-left">
            <label className="block font-inter text-xs uppercase tracking-widest text-slate-300 font-semibold mb-2">
              Choose Donation Amount
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {presetTiers.map((tier) => (
                <button
                  key={tier.amount}
                  type="button"
                  onClick={() => {
                    setSelectedPreset(tier.amount);
                    setCustomAmount('');
                  }}
                  className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                    selectedPreset === tier.amount
                      ? 'bg-amber-500/20 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] text-white scale-[1.01]'
                      : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-300'
                  }`}
                >
                  {tier.featured && (
                    <span className="absolute top-0 right-0 bg-amber-500 text-black text-[9px] font-inter font-bold px-1.5 py-0.5 rounded-bl uppercase">
                      Milestone
                    </span>
                  )}
                  <span className="font-playfair text-xl font-bold text-amber-400 block">
                    ${tier.amount}
                  </span>
                  <span className="font-inter text-[11px] text-slate-300 block leading-tight">
                    {tier.label}
                  </span>
                </button>
              ))}

              {/* Custom Amount Button */}
              <button
                type="button"
                onClick={() => setSelectedPreset('custom')}
                className={`p-3 rounded-xl border text-left transition-all col-span-2 sm:col-span-1 cursor-pointer ${
                  selectedPreset === 'custom'
                    ? 'bg-amber-500/20 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] text-white'
                    : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-300'
                }`}
              >
                <span className="font-playfair text-xl font-bold text-amber-400 block">
                  Custom
                </span>
                <span className="font-inter text-[11px] text-slate-300 block leading-tight">
                  Choose Amount
                </span>
              </button>
            </div>

            {selectedPreset === 'custom' && (
              <div className="mt-3">
                <input
                  type="number"
                  min="1"
                  max="10000"
                  placeholder="Enter amount ($ USD)"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full bg-black/40 border border-amber-500/50 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-amber-400 font-inter"
                  autoFocus
                />
              </div>
            )}
          </div>

          {/* IN-PLACE FORM — onSubmit with e.preventDefault(), NO action attribute */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            
            {/* Clean required input fields placed right above card details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 font-inter uppercase tracking-wider mb-1">
                  First Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                    value={donorData.firstName}
                    onChange={handleChange}
                    autoComplete="name"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-amber-500/50 font-inter"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 font-inter uppercase tracking-wider mb-1">
                  Last Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    value={donorData.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-amber-500/50 font-inter"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 font-inter uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    required
                    value={donorData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-amber-500/50 font-inter"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 font-inter uppercase tracking-wider mb-1">
                  Phone Number *
                </label>
                <div className="flex gap-2">
                  <div className="relative w-28 shrink-0">
                    <select
                      name="countryCode"
                      value={donorData.countryCode}
                      onChange={handleChange}
                      className="w-full appearance-none bg-black/40 border border-white/10 rounded-xl py-2.5 pl-2.5 pr-7 text-xs text-white focus:outline-none focus:border-amber-500/50 font-inter cursor-pointer"
                    >
                      {countryCodes.map((item) => (
                        <option key={`${item.flag}-${item.code}-${item.name}`} value={item.code} className="bg-[#0f172a] text-white">
                          {item.flag} {item.code}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>

                  <div className="relative flex-1">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="(555) 000-0000"
                      required
                      value={donorData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-amber-500/50 font-inter"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* TAX INFORMATION & LEGAL DISCLAIMER (REQUIRED BEFORE PAYMENT) */}
            <div className="my-5 p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-left font-serif text-xs space-y-3">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-inter font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Tax Information & Business Expense Disclosure
                  </span>
                  <p className="font-lora text-slate-300 leading-relaxed">
                    <strong>Note: Tax Information:</strong> MassIndia Partnership is a 501(c)(6) non-profit trade organization. Contributions or payments to MassIndia Partnership are not deductible as charitable contributions for federal income tax purposes. However, they may be tax-deductible as ordinary and necessary business expenses. Please consult your tax advisor.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-500/20 text-slate-300 font-lora leading-relaxed space-y-1">
                <p>
                  <strong>Legal Disclaimer:</strong> Legacy 250 is an initiative of Mass India Partnership, a U.S.-registered 501(c)(6) nonprofit business league. Contributions support the educational, cultural, and community programs of the Legacy 250 initiative.
                </p>
                <p className="text-slate-400 font-inter text-[11px]">
                  For legal or financial questions regarding donations, please contact Mass India Partnership at <a href="mailto:info@indiauslegacy250.com" className="text-amber-400 underline font-medium">info@indiauslegacy250.com</a>.
                </p>
              </div>
            </div>

            {/* 2. Payment Section Header & Trust Microcopy */}
            <div className="mt-6 pt-6 border-t border-white/10 space-y-3 text-left">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <h4 className="font-playfair text-base text-white font-bold">
                    Secure Payment Processing
                  </h4>
                </div>
                <p className="font-lora text-slate-300 text-xs mt-1 leading-relaxed">
                  We partner with <strong>Authorize.net</strong> and <strong>Worldpay</strong>, global leaders in secure financial transactions. Your payment information is immediately encrypted using bank-grade 256-bit SSL technology.
                </p>
              </div>

              {/* Security Badges Slots */}
              <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
                <div className="px-3 py-1.5 bg-slate-900/90 border border-amber-500/30 rounded-lg flex items-center gap-1.5 text-[11px] font-inter text-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-semibold text-amber-300">Authorize.net Verified Merchant</span>
                </div>
                <div className="px-3 py-1.5 bg-slate-900/90 border border-blue-500/30 rounded-lg flex items-center gap-1.5 text-[11px] font-inter text-slate-200">
                  <Lock className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-semibold text-blue-300">Worldpay Secure Partner</span>
                </div>
                <div className="px-3 py-1.5 bg-slate-900/90 border border-emerald-500/30 rounded-lg flex items-center gap-1.5 text-[11px] font-inter text-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-semibold text-emerald-300">256-Bit SSL Encrypted</span>
                </div>
              </div>
            </div>

            {/* 3. Accepted Payment Methods Bar */}
            <div className="flex items-center justify-between gap-2 p-2.5 bg-black/40 border border-white/10 rounded-xl my-2">
              <span className="font-inter text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                Accepted Cards
              </span>
              <div className="flex items-center gap-1.5">
                <div className="px-2.5 py-1 bg-white/10 border border-white/15 rounded text-[10px] font-extrabold text-blue-400 font-mono tracking-wider" title="Visa">
                  VISA
                </div>
                <div className="px-2.5 py-1 bg-white/10 border border-white/15 rounded text-[10px] font-extrabold text-red-400 font-mono tracking-wider" title="Mastercard">
                  MC
                </div>
                <div className="px-2.5 py-1 bg-white/10 border border-white/15 rounded text-[10px] font-extrabold text-cyan-300 font-mono tracking-wider" title="American Express">
                  AMEX
                </div>
                <div className="px-2.5 py-1 bg-white/10 border border-white/15 rounded text-[10px] font-extrabold text-amber-400 font-mono tracking-wider" title="Discover">
                  DISCOVER
                </div>
              </div>
            </div>

            {/* Credit Card Inputs — autocomplete=off to prevent browser caching */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 font-inter uppercase tracking-wider mb-1">
                  Card Number *
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  inputMode="numeric"
                  placeholder="•••• •••• •••• ••••"
                  required
                  value={donorData.cardNumber}
                  onChange={handleChange}
                  autoComplete="off"
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 font-inter uppercase tracking-wider mb-1">
                    MM *
                  </label>
                  <input
                    type="text"
                    name="month"
                    placeholder="MM"
                    maxLength={2}
                    required
                    value={donorData.month}
                    onChange={handleChange}
                    autoComplete="off"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-sm text-white font-mono text-center focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 font-inter uppercase tracking-wider mb-1">
                    YY *
                  </label>
                  <input
                    type="text"
                    name="year"
                    placeholder="YY"
                    maxLength={2}
                    required
                    value={donorData.year}
                    onChange={handleChange}
                    autoComplete="off"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-sm text-white font-mono text-center focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 font-inter uppercase tracking-wider mb-1">
                    CVV *
                  </label>
                  <input
                    type="password"
                    name="cardCode"
                    placeholder="•••"
                    maxLength={4}
                    required
                    value={donorData.cardCode}
                    onChange={handleChange}
                    autoComplete="off"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-sm text-white font-mono text-center focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>
            </div>

            {/* 4. Security Disclaimer */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/30 text-left font-serif text-xs space-y-1 my-3">
              <div className="flex items-center gap-1.5 text-amber-400 font-inter font-bold text-[11px] uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Your Data is Safe With Us</span>
              </div>
              <p className="font-lora text-slate-300 text-[12px] leading-relaxed">
                To ensure maximum security, we never see or store your full credit card number or CVV on our servers. Your information goes directly to our secure processors.
              </p>
            </div>

            {/* 5. Submit Button Anchor */}
            <button
              type="submit"
              disabled={!isScriptLoaded || loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 disabled:opacity-50 text-[#05080f] font-bold font-inter text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 cursor-pointer mt-4 transform hover:scale-[1.01]"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#05080f] border-t-transparent rounded-full animate-spin" />
                  Processing Secure Contribution...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#05080f]" />
                  Donate ${effectiveAmount || 250} Now
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] font-inter text-slate-400 mt-3">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Tokenized via Accept.js — Zero card data touches our server</span>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default DonationSection;
