import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Filter, ChevronDown, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../StoreContext';
import { MOCK_PRODUCTS } from '../data/products';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const Shop = () => {
  const { setSelectedProduct, setView, toggleWishlist, isWishlisted, addToCart, categoryFilter: filter, setCategoryFilter: setFilter } = useStore();
  const [sort, setSort] = useState('Newest');

  const categories = ['All', 'Necklaces', 'Earrings', 'Rings', 'Bangles', 'Bridal'];
  
  const filteredProducts = MOCK_PRODUCTS.filter(p => filter === 'All' || p.category === filter);

  return (
    <div className="pt-24 pb-32 min-h-screen bg-[#FAF9F6]">
      <div className="container mx-auto px-4 md:px-8">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-[#001B3A] mb-4">Fine Jewellery</h1>
          <p className="text-[#001B3A]/60 max-w-xl font-light">Explore our curated collections of artisanal excellence, from timeless heirlooms to contemporary masterpieces.</p>
        </header>

        {/* Filters & Sort */}
        <div className="sticky top-20 z-30 bg-[#FAF9F6]/95 backdrop-blur-md py-4 mb-10 flex flex-wrap items-center justify-between border-y border-[#001B3A]/5 gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap ${filter === cat ? 'bg-[#001B3A] text-white' : 'bg-white border border-[#001B3A]/10 text-[#001B3A] hover:border-[#D4AF37]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase text-[#001B3A]">
              <Filter size={14} /> <span>Filters</span>
            </button>
            <div className="h-4 w-[1px] bg-[#001B3A]/10" />
            <button className="flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase text-[#001B3A]">
              <span>Sort: {sort}</span> <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
          {filteredProducts.map((p) => (
            <motion.div 
              key={p.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="group"
            >
              <div className="relative aspect-square mb-6 overflow-hidden bg-white shadow-sm ring-1 ring-black/5 group-hover:shadow-xl transition-shadow duration-500">
                <ImageWithFallback 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 will-change-transform"
                />
                
                {p.tag && (
                  <span className="absolute top-4 left-4 z-10 bg-[#B76E79] text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1 shadow-sm">
                    {p.tag}
                  </span>
                )}

                <button 
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(p); }}
                  className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-sm ${isWishlisted(p.id) ? 'bg-[#B76E79] text-white' : 'bg-white/90 text-[#001B3A]'}`}
                >
                  <Heart size={16} fill={isWishlisted(p.id) ? "currentColor" : "none"} />
                </button>

                {/* Mobile Quick Action Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-[#001B3A] to-transparent pt-12">
                  <button 
                    onClick={() => { setSelectedProduct(p); setView('product-detail'); }}
                    className="w-full bg-[#D4AF37] text-[#001B3A] py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white transition-colors flex items-center justify-center"
                  >
                    Quick View
                  </button>
                </div>
              </div>

              <div className="text-center px-2 cursor-pointer" onClick={() => { setSelectedProduct(p); setView('product-detail'); }}>
                <p className="text-[9px] tracking-[0.3em] uppercase text-[#B76E79] mb-1.5 font-bold">{p.category}</p>
                <h3 className="text-[#001B3A] font-serif text-base mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-1">{p.name}</h3>
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-[#001B3A] font-medium tracking-tight">${p.price.toLocaleString()}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                    className="text-[#D4AF37] hover:text-[#001B3A] transition-colors p-1"
                  >
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
