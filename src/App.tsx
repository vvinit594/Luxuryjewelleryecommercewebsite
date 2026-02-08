import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { StoreProvider, useStore } from './StoreContext';
import { Navbar, MobileBottomBar } from './components/Navigation';
import { Shop } from './components/Shop';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { Account } from './components/Account';
import { AdminDashboard } from './components/Admin';
import { About } from './components/About';
import { Auth } from './components/Auth';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { MOCK_PRODUCTS } from './data/products';

// --- Home Component ---
const Home = () => {
  const { setView, setSelectedProduct, addToCart, toggleWishlist, isWishlisted } = useStore();
  
  return (
    <div className="overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="relative h-[100svh] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1582829239417-e348de9168d1?q=80&w=1920" 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001B3A]/80 via-[#001B3A]/40 to-transparent" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-2xl text-white">
            <motion.span 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="inline-block text-[#D4AF37] tracking-[0.3em] uppercase text-xs font-semibold mb-4"
            >
              The Art of Elegance
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }} 
              className="text-5xl md:text-7xl font-serif mb-6 leading-tight"
            >
              Crafting Your <br /><span className="italic">Eternal Brilliance</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4 }}
              className="text-white/70 text-lg mb-10 max-w-lg font-light leading-relaxed"
            >
              Discover our premium festive and bridal collections, where timeless craftsmanship meets modern luxury in every piece.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button onClick={() => setView('shop')} className="bg-[#D4AF37] text-[#001B3A] px-12 py-5 font-bold tracking-widest uppercase text-xs transition-all hover:bg-[#B76E79] hover:text-white shadow-2xl">Shop Collection</button>
              <button className="border border-white/30 backdrop-blur-sm text-white px-12 py-5 font-bold tracking-widest uppercase text-xs transition-all hover:border-[#D4AF37]">Virtual Atelier</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Categories */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 text-center">
          <span className="text-[#B76E79] tracking-[0.3em] uppercase text-[10px] font-bold mb-4 block">Curated Collections</span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#001B3A] mb-16">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: 'Necklaces', img: 'https://images.unsplash.com/photo-1762537132897-f6b577190e80?q=80&w=400' },
              { name: 'Earrings', img: 'https://images.unsplash.com/photo-1721103418236-3e314539f849?q=80&w=400' },
              { name: 'Rings', img: 'https://images.unsplash.com/photo-1758297679736-2e6ff92d2021?q=80&w=400' },
              { name: 'Bangles', img: 'https://images.unsplash.com/photo-1582829239417-e348de9168d1?q=80&w=400' },
              { name: 'Bridal', img: 'https://images.unsplash.com/photo-1624492235740-c283aab78e45?q=80&w=400' }
            ].map((cat, i) => (
              <div key={i} className="group cursor-pointer" onClick={() => setView('shop')}>
                <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-white shadow-sm ring-1 ring-black/5">
                  <ImageWithFallback src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                </div>
                <h3 className="text-sm font-serif text-[#001B3A] uppercase tracking-widest">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Best Sellers */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16">
            <div className="text-left">
              <span className="text-[#D4AF37] tracking-[0.3em] uppercase text-[10px] font-bold mb-4 block">Exquisite Designs</span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#001B3A]">Best Sellers</h2>
            </div>
            <button onClick={() => setView('shop')} className="text-[10px] font-bold tracking-widest uppercase text-[#001B3A] mt-8 md:mt-0 flex items-center border-b border-[#001B3A]/20 pb-2">View All Products <ArrowRight className="ml-2" size={14} /></button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {MOCK_PRODUCTS.slice(0, 4).map((p) => (
              <div key={p.id} className="group cursor-pointer">
                <div className="relative aspect-square mb-6 overflow-hidden bg-[#FAF9F6]">
                  <ImageWithFallback src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(p); }}
                    className={`absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-md ${isWishlisted(p.id) ? 'bg-[#B76E79] text-white' : 'bg-white/80 text-[#001B3A]'}`}
                  >
                    <Heart size={16} fill={isWishlisted(p.id) ? "currentColor" : "none"} />
                  </button>
                </div>
                <div className="text-center" onClick={() => { setSelectedProduct(p); setView('product-detail'); }}>
                  <h3 className="text-sm font-serif text-[#001B3A] mb-2">{p.name}</h3>
                  <p className="text-sm text-[#001B3A]/60 font-medium">${p.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. New Arrivals Banner */}
      <section className="py-24 bg-[#001B3A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
          <ImageWithFallback src="https://images.unsplash.com/photo-1758631279366-8e8aeaf94082?q=80&w=1200" alt="New Arrival" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-xl text-white">
            <span className="text-[#D4AF37] tracking-[0.3em] uppercase text-[10px] font-bold mb-4 block">Seasonal Reveal</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 italic">The Golden <br />Hour Collection</h2>
            <p className="text-white/60 mb-10 leading-relaxed font-light">Inspired by the warmth of the setting sun, our new collection features amber-hued gems set in molten gold designs.</p>
            <button onClick={() => setView('shop')} className="px-10 py-4 border border-[#D4AF37] text-[#D4AF37] font-bold tracking-widest uppercase text-xs hover:bg-[#D4AF37] hover:text-[#001B3A] transition-all">Explore New Arrivals</button>
          </div>
        </div>
      </section>

      {/* 5. Bridal Spotlight */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] bg-[#FAF9F6] relative z-10 overflow-hidden border border-[#D4AF37]/20 p-4">
                <ImageWithFallback src="https://images.unsplash.com/photo-1624492235740-c283aab78e45?q=80&w=800" alt="Bridal" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#B76E79]/5 blur-[100px] -z-10" />
            </div>
            <div>
              <span className="text-[#B76E79] tracking-[0.3em] uppercase text-[10px] font-bold mb-4 block">The Wedding Edit</span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#001B3A] mb-8 leading-tight">Heritage Bridal <br />Excellence</h2>
              <p className="text-[#001B3A]/70 text-lg mb-10 font-light leading-relaxed">Your most beautiful day deserves the most extraordinary jewels. Discover our handcrafted bridal ensembles that blend timeless heritage with modern grace.</p>
              <div className="space-y-6 mb-12">
                {['Master Artisan Craftsmanship', 'Bespoke Design Service', 'Certified Hallmarked Gold'].map((feat, i) => (
                  <div key={i} className="flex items-center space-x-4 text-[#001B3A]">
                    <div className="w-6 h-[1px] bg-[#D4AF37]" />
                    <span className="text-xs font-bold tracking-widest uppercase">{feat}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setView('shop')} className="bg-[#001B3A] text-white px-12 py-5 font-bold tracking-widest uppercase text-xs hover:bg-[#B76E79] transition-all">Book Consultation</button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Brand Story */}
      <section className="py-24 bg-[#FAF9F6] relative">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-[#D4AF37] mb-8">Our Legacy</h2>
            <p className="text-2xl md:text-4xl font-serif text-[#001B3A] leading-relaxed mb-12 italic">
              "To create beauty that transcends time, celebrating the unique brilliance of every woman who wears an Akelva original."
            </p>
            <div className="w-20 h-[1px] bg-[#001B3A]/20 mx-auto mb-12" />
            <button onClick={() => setView('about')} className="text-[10px] font-bold tracking-widest uppercase text-[#001B3A] hover:text-[#D4AF37] transition-colors border-b border-transparent hover:border-[#D4AF37] pb-1">Read Our Full Story</button>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { name: "Eleanor Vance", text: "The craftsmanship of the Celestial Necklace is simply unparalleled. It was the centerpiece of my gala look." },
              { name: "Sarah Jacobs", text: "Akelva's attention to detail and customer service made finding my wedding jewelry a joyful journey." }
            ].map((t, i) => (
              <div key={i} className="p-12 bg-[#FAF9F6] border border-[#001B3A]/5 relative">
                <span className="absolute top-10 left-12 text-[#D4AF37] text-6xl font-serif opacity-30">“</span>
                <p className="text-lg text-[#001B3A] font-serif italic mb-8 relative z-10">{t.text}</p>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B76E79]">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Instagram Gallery */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-[#001B3A] mb-12">Adorned by You #AkelvaGlow</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1762537132897-f6b577190e80?q=80&w=400',
              'https://images.unsplash.com/photo-1721103418236-3e314539f849?q=80&w=400',
              'https://images.unsplash.com/photo-1758297679736-2e6ff92d2021?q=80&w=400',
              'https://images.unsplash.com/photo-1582829239417-e348de9168d1?q=80&w=400'
            ].map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden group relative cursor-pointer">
                <ImageWithFallback src={img} alt="Social" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-[#001B3A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-bold tracking-widest uppercase">View Post</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// --- App Shell ---
const AppShell = () => {
  const { view } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  if (view === 'admin') return <AdminDashboard />;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {view === 'home' && <Home />}
            {view === 'shop' && <Shop />}
            {view === 'product-detail' && <ProductDetail />}
            {view === 'cart' && <Cart />}
            {view === 'checkout' && <Checkout />}
            {view === 'account' && <Account />}
            {view === 'about' && <About />}
            {view === 'auth' && <Auth />}
            {view === 'wishlist' && <Account />} {/* Using account as a placeholder for wishlist list */}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-[#001B3A] text-white py-20 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-8 text-center md:text-left">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h1 className="text-2xl font-serif italic text-[#D4AF37] mb-6">Akelva</h1>
              <p className="text-white/40 text-sm font-light leading-relaxed">Defining the next generation of artificial luxury jewellery through heritage craftsmanship.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase mb-6 text-[#D4AF37]">Explore</h4>
              <ul className="space-y-3 text-sm text-white/60 font-light">
                <li><button className="hover:text-white transition-colors">Bridal Collection</button></li>
                <li><button className="hover:text-white transition-colors">Gift Guide</button></li>
                <li><button className="hover:text-white transition-colors">Bestsellers</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase mb-6 text-[#D4AF37]">Concierge</h4>
              <ul className="space-y-3 text-sm text-white/60 font-light">
                <li><button className="hover:text-white transition-colors">Shipping & Returns</button></li>
                <li><button className="hover:text-white transition-colors">Jewellery Care</button></li>
                <li><button className="hover:text-white transition-colors">Contact Us</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase mb-6 text-[#D4AF37]">Newsletter</h4>
              <form className="relative">
                <input type="email" placeholder="Email Address" className="w-full bg-white/5 border-b border-white/20 py-2 text-sm outline-none focus:border-[#D4AF37]" />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Join</button>
              </form>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest text-white/20 uppercase font-bold">
            <p>© 2026 Akelva Creations. All Rights Reserved.</p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              <button className="hover:text-white">Privacy</button>
              <button className="hover:text-white">Terms</button>
            </div>
          </div>
        </div>
      </footer>

      <MobileBottomBar />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppShell />
    </StoreProvider>
  );
}
