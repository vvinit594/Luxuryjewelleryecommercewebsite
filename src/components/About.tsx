import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Hammer, Gem, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useStore } from '../StoreContext';

export const About = () => {
  const { setView, setCategoryFilter } = useStore();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1618713041735-adb0de8316ea?q=80&w=1920" 
            alt="Our Story Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#001B3A]/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.span 
            initial={{ opacity: 0, tracking: "0.5em" }}
            animate={{ opacity: 1, tracking: "0.3em" }}
            className="block text-[#D4AF37] uppercase text-xs font-bold mb-6"
          >
            Our Story
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-serif mb-6 leading-tight"
          >
            Crafted with Passion, <br /><span className="italic">Designed to Shine</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-xl mx-auto text-white/70 font-light text-lg"
          >
            A journey of elegance, craftsmanship, and modern luxury.
          </motion.p>
        </div>
      </section>

      {/* 2. Founder's Beginning */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <div className="aspect-[4/5] relative">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1758362197676-228703a17e69?q=80&w=1000" 
                  alt="Founder Workspace" 
                  className="w-full h-full object-cover rounded-sm shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r border-b border-[#D4AF37] -z-10" />
              </div>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <span className="text-[#B76E79] tracking-widest uppercase text-[10px] font-bold mb-4 block">The Genesis</span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#001B3A] mb-8 leading-tight">Where It All Began</h2>
              <div className="space-y-6 text-[#001B3A]/70 font-light leading-relaxed">
                <p>
                  AKELVA Creations was founded by <span className="text-[#001B3A] font-medium text-base">Ritesh Tiwari</span> in Dahisar East, Mumbai — inspired by the belief that jewellery should feel special, personal, and timeless.
                </p>
                <p>
                  What started as a passion for design soon transformed into a vision of creating premium artificial jewellery that carries elegance without compromise. Ritesh believed that jewellery is more than an accessory — it is a reflection of personality, confidence, and celebration.
                </p>
                <p>
                  As customer love and trust grew, so did the ambition to reach beyond physical boundaries, evolving into a brand admired for its refined aesthetics and thoughtful detailing.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Brand Philosophy */}
      <section className="py-32 bg-[#FAF9F6] border-y border-[#001B3A]/5">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.div {...fadeInUp}>
            <span className="text-[#D4AF37] tracking-[0.4em] uppercase text-[10px] font-bold mb-8 block">Our Philosophy</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#001B3A] mb-8 italic">"Jewellery is not just worn — it is felt."</h2>
            <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mb-8" />
            <p className="text-lg text-[#001B3A]/70 font-light leading-relaxed">
              Every piece at AKELVA Creations is curated to reflect confidence, grace, and individuality. We believe in jewellery that enhances moments, tells stories, and becomes part of your everyday elegance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. Craft & Quality */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: <Sparkles className="text-[#D4AF37]" size={32} />, title: 'Thoughtful Design', desc: 'Inspired by modern trends and timeless traditions.' },
              { icon: <Hammer className="text-[#D4AF37]" size={32} />, title: 'Quality Craftsmanship', desc: 'Carefully selected materials and refined finishing.' },
              { icon: <Gem className="text-[#D4AF37]" size={32} />, title: 'Versatile Collections', desc: 'From everyday elegance to bridal grandeur.' },
              { icon: <Heart className="text-[#D4AF37]" size={32} />, title: 'Customer-First Approach', desc: 'Designed for comfort, style, and trust.' }
            ].map((card, i) => (
              <motion.div 
                key={i} 
                {...fadeInUp} 
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-sm bg-[#FAF9F6] border border-[#001B3A]/5 hover:border-[#D4AF37]/20 transition-all group"
              >
                <div className="mb-6 flex justify-center transform transition-transform group-hover:scale-110 duration-500">{card.icon}</div>
                <h3 className="text-sm font-bold tracking-widest uppercase text-[#001B3A] mb-4">{card.title}</h3>
                <p className="text-xs text-[#001B3A]/60 leading-relaxed font-light">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Digital Expansion */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp} className="order-2 lg:order-1">
              <span className="text-[#B76E79] tracking-widest uppercase text-[10px] font-bold mb-4 block">Global Reach</span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#001B3A] mb-8 leading-tight">Evolving with the <br />Modern World</h2>
              <p className="text-[#001B3A]/70 text-lg mb-8 font-light leading-relaxed">
                With growing customer love and trust, AKELVA Creations embraced the digital journey — expanding through an immersive website and social media platforms to offer a seamless and secure shopping experience anytime, anywhere.
              </p>
              <p className="text-[#001B3A]/70 text-base mb-10 font-light">
                Our digital presence ensures that luxury is just a click away, maintaining the same personal touch and premium standard that defines our physical atelier.
              </p>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="order-1 lg:order-2">
              <div className="aspect-video relative overflow-hidden rounded-sm shadow-xl">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?q=80&w=1200" 
                  alt="Digital Experience" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#001B3A]/10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. The AKELVA Promise */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            {...fadeInUp}
            className="max-w-4xl mx-auto bg-white p-12 md:p-20 border border-[#D4AF37]/30 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Gem size={120} className="text-[#D4AF37]" />
            </div>
            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-serif text-[#001B3A] mb-12 uppercase tracking-widest">The AKELVA Promise</h2>
              <div className="grid md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
                {[
                  'Premium-looking artificial jewellery',
                  'Honest pricing & transparency',
                  'Thoughtfully curated designs',
                  'Trusted quality & customer care',
                  'A seamless online shopping experience',
                  'Secure delivery across India'
                ].map((promise, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle2 size={16} className="text-[#D4AF37] flex-shrink-0" />
                    <span className="text-xs font-medium text-[#001B3A] tracking-wider uppercase">{promise}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. Emotional Close */}
      <section className="py-32 bg-[#001B3A] text-white text-center">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp}>
            <p className="text-2xl md:text-4xl font-serif italic mb-12 max-w-3xl mx-auto leading-relaxed">
              "Crafting jewellery that shines with you — through every celebration, every moment, every story."
            </p>
            <button 
              onClick={() => { setCategoryFilter('All'); setView('shop'); }}
              className="group inline-flex items-center space-x-4 bg-[#D4AF37] text-[#001B3A] px-12 py-5 font-bold tracking-[0.2em] uppercase text-xs transition-all hover:bg-white"
            >
              <span>Explore Our Collections</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
