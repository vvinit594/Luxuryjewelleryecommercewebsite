import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../StoreContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, setView } = useStore();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-32 min-h-screen bg-[#FAF9F6] text-center px-4">
        <ShoppingBag size={64} className="mx-auto text-[#001B3A]/20 mb-8" />
        <h2 className="text-3xl font-serif text-[#001B3A] mb-4">Your Treasury is Empty</h2>
        <p className="text-[#001B3A]/60 mb-12 max-w-sm mx-auto font-light">Adorn yourself with something extraordinary from our latest collections.</p>
        <button 
          onClick={() => setView('shop')}
          className="bg-[#001B3A] text-white px-12 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#D4AF37] transition-all shadow-xl"
        >
          Explore Collections
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-32 bg-[#FAF9F6] min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-serif text-[#001B3A] mb-12">Your Shopping Bag</h1>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-6">
            {cart.map((item) => (
              <motion.div 
                key={item.id}
                layout
                className="bg-white p-6 shadow-sm flex flex-col sm:flex-row gap-6 border border-[#001B3A]/5"
              >
                <div className="w-full sm:w-32 aspect-square flex-shrink-0 overflow-hidden">
                  <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] text-[#B76E79] font-bold tracking-widest uppercase mb-1">{item.category}</p>
                      <h3 className="text-lg font-serif text-[#001B3A] mb-2">{item.name}</h3>
                      <p className="text-sm text-[#001B3A]/60 font-light">Material: {item.material}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#001B3A]/20 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center border border-[#001B3A]/10 px-2 py-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-2 text-[#001B3A]/60 hover:text-[#001B3A]"><Minus size={14}/></button>
                      <span className="px-4 font-bold text-sm text-[#001B3A]">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-2 text-[#001B3A]/60 hover:text-[#001B3A]"><Plus size={14}/></button>
                    </div>
                    <p className="text-lg font-medium text-[#001B3A]">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="bg-[#001B3A] text-white p-8 shadow-2xl sticky top-28">
              <h2 className="text-xl font-serif mb-8 border-b border-white/10 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm font-light text-white/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-light text-white/70">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between text-xl font-medium">
                  <span>Total</span>
                  <span className="text-[#D4AF37]">${total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => setView('checkout')}
                  className="w-full bg-[#D4AF37] text-[#001B3A] py-5 text-xs font-bold tracking-[0.2em] uppercase hover:bg-white transition-all flex items-center justify-center shadow-lg"
                >
                  Checkout Now <ArrowRight size={16} className="ml-2" />
                </button>
                <div className="flex items-center justify-center space-x-2 text-[10px] text-white/40 uppercase tracking-widest font-bold pt-4">
                  <ShieldCheck size={14} className="text-[#D4AF37]" />
                  <span>Secure SSL Checkout</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-[10px] uppercase font-bold tracking-widest mb-4 text-white/60">Promo Code</p>
                <div className="flex gap-2">
                  <input type="text" placeholder="Enter code" className="bg-white/5 border border-white/10 px-4 py-2 text-sm w-full outline-none focus:border-[#D4AF37]" />
                  <button className="text-[10px] uppercase font-bold tracking-widest px-4 border border-[#D4AF37] text-[#D4AF37]">Apply</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
