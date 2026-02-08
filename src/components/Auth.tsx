import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Smartphone, Mail, ShieldCheck, ChevronLeft } from 'lucide-react';
import { useStore } from '../StoreContext';

export const Auth = () => {
  const { login, setView } = useStore();
  const [step, setStep] = useState<'entry' | 'otp'>('entry');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1200);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    setLoading(true);
    // Simulate verification
    setTimeout(() => {
      setLoading(false);
      const isEmail = identifier.includes('@');
      login({
        name: isEmail ? identifier.split('@')[0] : 'Valued Customer',
        email: isEmail ? identifier : '',
        phone: !isEmail ? identifier : '',
        avatar: null
      });
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#FAF9F6]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-sm shadow-2xl border border-[#001B3A]/5 overflow-hidden"
      >
        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            {step === 'entry' ? (
              <motion.div 
                key="entry"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="text-center mb-10">
                  <h2 className="text-2xl font-serif text-[#001B3A] mb-2">Welcome to Akelva</h2>
                  <p className="text-sm text-[#001B3A]/60 font-light">Enter your details to continue</p>
                </div>

                <form onSubmit={handleContinue} className="space-y-6">
                  <div className="relative">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#001B3A]/40 mb-2 ml-1">
                      Mobile Number or Email
                    </label>
                    <div className="relative">
                      <input 
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-[#FAF9F6] border-b-2 border-[#001B3A]/10 px-4 py-4 focus:border-[#D4AF37] outline-none transition-colors text-[#001B3A]"
                        required
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#001B3A]/20">
                        {identifier.includes('@') ? <Mail size={18} /> : <Smartphone size={18} />}
                      </div>
                    </div>
                  </div>

                  <button 
                    disabled={loading || !identifier}
                    className="w-full bg-[#001B3A] text-white py-5 font-bold tracking-[0.2em] uppercase text-xs flex items-center justify-center space-x-3 hover:bg-[#D4AF37] transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Continue</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-10 flex items-center justify-center space-x-2 text-[10px] text-[#001B3A]/40 uppercase tracking-widest">
                  <ShieldCheck size={14} />
                  <span>Secure & Private</span>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <button 
                  onClick={() => setStep('entry')}
                  className="mb-8 flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-[#001B3A]/40 hover:text-[#D4AF37] transition-colors"
                >
                  <ChevronLeft size={14} />
                  <span>Go Back</span>
                </button>

                <div className="text-center mb-10">
                  <h2 className="text-2xl font-serif text-[#001B3A] mb-2">Verify Details</h2>
                  <p className="text-sm text-[#001B3A]/60 font-light">
                    Enter the 4-digit code sent to <br />
                    <span className="font-medium text-[#001B3A]">{identifier}</span>
                  </p>
                </div>

                <div className="flex justify-center space-x-4 mb-10">
                  {otp.map((digit, i) => (
                    <input 
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="w-14 h-16 bg-[#FAF9F6] border-b-2 border-[#001B3A]/10 text-center text-2xl font-serif text-[#001B3A] focus:border-[#D4AF37] outline-none transition-colors"
                    />
                  ))}
                </div>

                <button 
                  onClick={handleVerify}
                  disabled={loading || otp.some(d => !d)}
                  className="w-full bg-[#001B3A] text-white py-5 font-bold tracking-[0.2em] uppercase text-xs flex items-center justify-center space-x-3 hover:bg-[#D4AF37] transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span>Verify & Login</span>
                  )}
                </button>

                <div className="mt-8 text-center">
                  <button className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] hover:underline">
                    Resend Code
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-[#FAF9F6] p-6 text-center border-t border-[#001B3A]/5">
          <p className="text-[10px] text-[#001B3A]/40 leading-relaxed uppercase tracking-wider">
            By continuing, you agree to Akelva Creations'<br />
            <span className="text-[#001B3A]/60 hover:underline cursor-pointer">Terms of Service</span> & <span className="text-[#001B3A]/60 hover:underline cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
