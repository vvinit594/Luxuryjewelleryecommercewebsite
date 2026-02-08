import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Package, Truck, CreditCard, ChevronRight, CheckCircle2, MapPin } from 'lucide-react';
import { useStore } from '../StoreContext';

export const Checkout = () => {
  const [step, setStep] = useState(1);
  const { cart, setView } = useStore();

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (step === 4) {
    return (
      <div className="pt-40 pb-32 min-h-screen bg-[#FAF9F6] text-center px-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={40} className="text-[#001B3A]" />
        </motion.div>
        <h2 className="text-4xl font-serif text-[#001B3A] mb-4">Order Confirmed</h2>
        <p className="text-[#001B3A]/60 mb-8 font-light">Your order #AKL-29402 has been received. You will receive a confirmation email shortly.</p>
        <button 
          onClick={() => setView('home')}
          className="bg-[#001B3A] text-white px-12 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#D4AF37] transition-all"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-32 bg-[#FAF9F6] min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        {/* Stepper */}
        <div className="flex justify-between items-center mb-16 max-w-md mx-auto relative">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#001B3A]/10 -z-10" />
          {[1, 2, 3].map((s) => (
            <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${step >= s ? 'bg-[#001B3A] border-[#001B3A] text-white' : 'bg-white border-[#001B3A]/10 text-[#001B3A]/40'}`}>
              <span className="text-sm font-bold">{s}</span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 bg-white p-8 md:p-12 shadow-sm border border-[#001B3A]/5">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-serif text-[#001B3A] mb-8 flex items-center"><MapPin className="mr-3 text-[#D4AF37]" /> Shipping Address</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-[#001B3A]/60">First Name</label>
                    <input type="text" className="w-full border border-[#001B3A]/10 p-3 outline-none focus:border-[#D4AF37]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-[#001B3A]/60">Last Name</label>
                    <input type="text" className="w-full border border-[#001B3A]/10 p-3 outline-none focus:border-[#D4AF37]" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-[#001B3A]/60">Street Address</label>
                    <input type="text" className="w-full border border-[#001B3A]/10 p-3 outline-none focus:border-[#D4AF37]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-[#001B3A]/60">City</label>
                    <input type="text" className="w-full border border-[#001B3A]/10 p-3 outline-none focus:border-[#D4AF37]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-[#001B3A]/60">Postal Code</label>
                    <input type="text" className="w-full border border-[#001B3A]/10 p-3 outline-none focus:border-[#D4AF37]" />
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="mt-12 w-full bg-[#001B3A] text-white py-5 text-xs font-bold tracking-widest uppercase hover:bg-[#B76E79] transition-all">
                  Continue to Shipping
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-serif text-[#001B3A] mb-8 flex items-center"><Truck className="mr-3 text-[#D4AF37]" /> Delivery Method</h2>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-6 border border-[#D4AF37] bg-[#FAF9F6] cursor-pointer">
                    <div className="flex items-center">
                      <input type="radio" checked readOnly className="mr-4 accent-[#001B3A]" />
                      <div>
                        <p className="text-sm font-bold text-[#001B3A]">Express Delivery</p>
                        <p className="text-xs text-[#001B3A]/60">Estimated: 3-5 Business Days</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-[#001B3A]">FREE</span>
                  </label>
                  <label className="flex items-center justify-between p-6 border border-[#001B3A]/10 cursor-pointer">
                    <div className="flex items-center">
                      <input type="radio" disabled className="mr-4 accent-[#001B3A]" />
                      <div>
                        <p className="text-sm font-bold text-[#001B3A]/40">Next Day White-Glove (Coming Soon)</p>
                        <p className="text-xs text-[#001B3A]/40">Secured personal delivery</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-[#001B3A]/40">$120</span>
                  </label>
                </div>
                <div className="flex gap-4 mt-12">
                  <button onClick={() => setStep(1)} className="flex-1 border border-[#001B3A]/20 py-5 text-xs font-bold uppercase hover:bg-[#FAF9F6] transition-all">Back</button>
                  <button onClick={() => setStep(3)} className="flex-[2] bg-[#001B3A] text-white py-5 text-xs font-bold uppercase hover:bg-[#B76E79] transition-all">Continue to Payment</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-serif text-[#001B3A] mb-8 flex items-center"><CreditCard className="mr-3 text-[#D4AF37]" /> Secure Payment</h2>
                <div className="space-y-6">
                  <div className="p-6 border border-[#001B3A]/10">
                    <p className="text-sm font-bold text-[#001B3A] mb-6">Credit / Debit Card</p>
                    <div className="space-y-4">
                      <input type="text" placeholder="Card Number" className="w-full border border-[#001B3A]/10 p-3 outline-none focus:border-[#D4AF37]" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="MM/YY" className="w-full border border-[#001B3A]/10 p-3 outline-none focus:border-[#D4AF37]" />
                        <input type="text" placeholder="CVV" className="w-full border border-[#001B3A]/10 p-3 outline-none focus:border-[#D4AF37]" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 border border-[#001B3A]/10 opacity-50">
                    <p className="text-sm font-bold text-[#001B3A]">UPI / Wallets (Paytm, Google Pay)</p>
                  </div>
                </div>
                <button onClick={() => setStep(4)} className="mt-12 w-full bg-[#D4AF37] text-[#001B3A] py-5 text-xs font-bold tracking-widest uppercase hover:bg-[#B76E79] hover:text-white transition-all shadow-xl">
                  Complete Purchase • ${total.toLocaleString()}
                </button>
              </motion.div>
            )}
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#FAF9F6] p-8 border border-[#001B3A]/10">
              <h3 className="text-lg font-serif text-[#001B3A] mb-6 flex items-center justify-between">
                <span>Your Order</span>
                <span className="text-sm font-sans text-[#001B3A]/40">({cart.length})</span>
              </h3>
              <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-4 no-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 aspect-square bg-white flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-serif text-[#001B3A] line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-[#001B3A]/60 mt-1">Qty: {item.quantity}</p>
                      <p className="text-xs font-bold text-[#001B3A] mt-1">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-[#001B3A]/10 space-y-2">
                <div className="flex justify-between text-xs text-[#001B3A]/60">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-[#001B3A]/60">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#001B3A] pt-4">
                  <span>Total</span>
                  <span className="text-[#D4AF37]">${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
