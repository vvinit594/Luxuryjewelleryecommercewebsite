import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, Menu, X, Heart, User, ChevronRight } from 'lucide-react';
import { useStore } from '../StoreContext';

export const Navbar = () => {
  const { setView, setCategoryFilter, cart, wishlist, user, login } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#001B3A] text-white py-4 shadow-xl">
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(true)}>
          <Menu size={24} />
        </button>

        <div className="flex-1 lg:flex-none text-center lg:text-left cursor-pointer" onClick={() => setView('home')}>
          <h1 className="text-xl md:text-2xl font-serif font-bold tracking-widest uppercase">
            Akelva <span className="text-[#D4AF37] italic">Creations</span>
          </h1>
        </div>

        <nav className="hidden lg:flex items-center space-x-10 text-[10px] font-bold tracking-[0.2em] uppercase">
          <button onClick={() => setView('home')} className="hover:text-[#D4AF37] transition-colors">Home</button>
          <button onClick={() => { setCategoryFilter('All'); setView('shop'); }} className="hover:text-[#D4AF37] transition-colors">Collections</button>
          <button onClick={() => { setCategoryFilter('Bridal'); setView('shop'); }} className="hover:text-[#D4AF37] transition-colors">Bridal</button>
          <button onClick={() => setView('about')} className="hover:text-[#D4AF37] transition-colors">Our Story</button>
          <button onClick={() => setView('admin')} className="hover:text-[#D4AF37] transition-colors border border-[#D4AF37]/30 px-3 py-1">Admin</button>
        </nav>

        <div className="flex items-center space-x-4 md:space-x-6">
          <button onClick={() => user ? setView('account') : setView('auth')} className="hover:text-[#D4AF37] transition-colors">
            <User size={20} />
          </button>
          <button onClick={() => setView('wishlist')} className="relative hover:text-[#D4AF37] transition-colors">
            <Heart size={20} />
            {wishlist.length > 0 && <span className="absolute -top-2 -right-2 bg-[#B76E79] text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">{wishlist.length}</span>}
          </button>
          <button onClick={() => setView('cart')} className="relative hover:text-[#D4AF37] transition-colors">
            <ShoppingBag size={20} />
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#001B3A] text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cart.reduce((acc, i) => acc + i.quantity, 0)}</span>}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25 }} className="fixed top-0 left-0 bottom-0 w-[80%] bg-[#001B3A] z-[70] p-8">
              <div className="flex justify-between items-center mb-12">
                <span className="font-serif italic text-white text-xl">Akelva</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-white"><X size={24} /></button>
              </div>
              <nav className="flex flex-col space-y-8 text-sm font-bold tracking-[0.2em] uppercase">
                <button onClick={() => { setView('home'); setIsMenuOpen(false); }} className="text-left flex justify-between">Home <ChevronRight size={16}/></button>
                <button onClick={() => { setCategoryFilter('All'); setView('shop'); setIsMenuOpen(false); }} className="text-left flex justify-between">Collections <ChevronRight size={16}/></button>
                <button onClick={() => { setCategoryFilter('Bridal'); setView('shop'); setIsMenuOpen(false); }} className="text-left flex justify-between">Bridal <ChevronRight size={16}/></button>
                <button onClick={() => { setView('about'); setIsMenuOpen(false); }} className="text-left flex justify-between">Our Story <ChevronRight size={16}/></button>
                <button onClick={() => { setView('account'); setIsMenuOpen(false); }} className="text-left flex justify-between">My Account <ChevronRight size={16}/></button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export const MobileBottomBar = () => {
  const { setView, cart } = useStore();
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden w-[90%] max-w-sm">
      <div className="bg-[#001B3A]/95 backdrop-blur-xl border border-white/10 rounded-full px-10 py-4 flex items-center justify-between text-white shadow-2xl">
        <button onClick={() => setView('home')} className="flex flex-col items-center">
          <Search size={20} />
          <span className="text-[8px] uppercase tracking-tighter mt-1">Discover</span>
        </button>
        <button onClick={() => setView('shop')} className="flex flex-col items-center">
          <ShoppingBag size={20} />
          <span className="text-[8px] uppercase tracking-tighter mt-1">Shop</span>
        </button>
        <button onClick={() => setView('cart')} className="flex flex-col items-center relative">
          <ShoppingBag size={20} className="text-[#D4AF37]" />
          <span className="text-[8px] uppercase tracking-tighter mt-1">Cart</span>
          {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-white text-[#001B3A] text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">!</span>}
        </button>
      </div>
    </div>
  );
};
