'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { User, Mail, Phone, Lock, ShieldCheck, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react';
import { env } from '@/lib/env';

declare global {
  interface Window {
    Accept?: {
      dispatchData: (
        data: any,
        responseHandler: (response: any) => void
      ) => void;
    };
  }
}

export default function DonationSection() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string; transactionId?: string } | null>(null);

  const [selectedPreset, setSelectedPreset] = useState<number | 'custom'>(250);
  const [customAmount, setCustomAmount] = useState<string>('');

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

  const scriptSrc =
    env.AUTHORIZENET_ENV === 'production'
      ? 'https://js.authorize.net/v1/Accept.js'
      : 'https://jstest.authorize.net/v1/Accept.js';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDonorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (effectiveAmount <= 0) {
      setStatus({ success: false, message: 'Please select or enter a valid donation amount.' });
      return;
    }

    if (!donorData.firstName.trim() || !donorData.lastName.trim() || !donorData.email.trim() || !donorData.phone.trim()) {
      setStatus({ success: false, message: 'Please fill in all required donor fields.' });
      return;
    }

    if (!window.Accept) {
      setStatus({ success: false, message: 'Payment gateway is initializing. Please try again.' });
      return;
    }

    setLoading(true);
    setStatus(null);

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
        return;
      }

      const fullPhone = `${donorData.countryCode} ${donorData.phone.trim()}`.trim();

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
          setDonorData((prev) => ({ ...prev, cardNumber: '', month: '', year: '', cardCode: '' }));
        } else {
          setStatus({ success: false, message: data.message || 'Payment processing failed.' });
        }
      } catch {
        setStatus({ success: false, message: 'Network connection error. Please try again.' });
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <>
      <Script
        src={scriptSrc}
        strategy="lazyOnload"
        onLoad={() => setIsScriptLoaded(true)}
      />

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
              Authorized & Tokenized via Accept.js (Zero Redirects)
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
                Accept.js In-Place Browser Tokenization (PCI Compliant)
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

            {/* IN-PLACE FORM WITH ONSUBMIT (NO ACTION, NO REDIRECT) */}
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
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-amber-500/50 font-inter"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Native Credit Card Inputs for Tokenization */}
              <div className="pt-2 border-t border-white/10 space-y-3">
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

              {/* In-Place Submit Button */}
              <button
                type="submit"
                disabled={!isScriptLoaded || loading}
                className="w-full py-4 px-6 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 disabled:opacity-50 text-[#05080f] font-bold font-inter text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 cursor-pointer mt-6 transform hover:scale-[1.01]"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#05080f] border-t-transparent rounded-full animate-spin" />
                    Processing In-Place Contribution...
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
                <span>Tokenized via Accept.js (Zero Card Data Touches Server)</span>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}
