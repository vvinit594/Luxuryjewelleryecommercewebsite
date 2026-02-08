import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ShoppingBag, Heart, Share2, ShieldCheck, Truck, RotateCcw, ChevronRight } from 'lucide-react';
import { useStore } from '../StoreContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MOCK_PRODUCTS } from '../data/products';

export const ProductDetail = () => {
  const { selectedProduct: product, setView, addToCart, toggleWishlist, isWishlisted } = useStore();
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState('details');

  if (!product) return null;

  return (
    <div className="pt-24 pb-32 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        {/* Breadcrumb / Back */}
        <button onClick={() => setView('shop')} className="flex items-center space-x-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#001B3A]/40 hover:text-[#001B3A] mb-8 transition-colors">
          <ChevronLeft size={16} /> <span>Back to Collections</span>
        </button>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Images Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-24">
              {product.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImg(i)}
                  className={`relative aspect-square w-20 flex-shrink-0 border-2 transition-all ${activeImg === i ? 'border-[#D4AF37]' : 'border-transparent opacity-60'}`}
                >
                  <ImageWithFallback src={img} alt={`${product.name} angle ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 aspect-[4/5] bg-[#FAF9F6] overflow-hidden relative group">
              <motion.div 
                key={activeImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full"
              >
                <ImageWithFallback src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
              </motion.div>
              <button className="absolute bottom-6 right-6 p-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Share2 size={20} className="text-[#001B3A]" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-5">
            <div className="mb-8">
              <p className="text-[#B76E79] text-xs font-bold tracking-[0.3em] uppercase mb-3">{product.category}</p>
              <h1 className="text-3xl md:text-4xl font-serif text-[#001B3A] mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-2xl font-light text-[#001B3A]">${product.price.toLocaleString()}</span>
                <span className="text-xs text-[#001B3A]/40 uppercase tracking-widest italic">Includes GST</span>
              </div>
              <p className="text-[#001B3A]/70 leading-relaxed font-light text-lg mb-8">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <button 
                onClick={() => addToCart(product)}
                className="col-span-1 bg-[#001B3A] text-white py-5 px-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#B76E79] transition-all flex items-center justify-center"
              >
                <ShoppingBag size={18} className="mr-2" /> Add to Cart
              </button>
              <button 
                onClick={() => toggleWishlist(product)}
                className={`col-span-1 py-5 px-4 text-xs font-bold tracking-[0.2em] uppercase border transition-all flex items-center justify-center ${isWishlisted(product.id) ? 'bg-[#FAF9F6] border-[#B76E79] text-[#B76E79]' : 'border-[#001B3A]/20 text-[#001B3A] hover:border-[#001B3A]'}`}
              >
                <Heart size={18} className="mr-2" fill={isWishlisted(product.id) ? "currentColor" : "none"} /> Wishlist
              </button>
            </div>

            {/* Delivery & Tabs */}
            <div className="border-t border-[#001B3A]/10 pt-8">
              <div className="flex space-x-8 mb-8">
                {['details', 'shipping', 'care'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[10px] font-bold tracking-widest uppercase transition-all pb-2 border-b-2 ${activeTab === tab ? 'text-[#D4AF37] border-[#D4AF37]' : 'text-[#001B3A]/40 border-transparent'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="min-h-[120px] mb-12">
                {activeTab === 'details' && (
                  <div className="space-y-4 text-sm text-[#001B3A]/70 font-light">
                    <p><strong>Material:</strong> {product.material}</p>
                    <p><strong>Approx Weight:</strong> {product.weight}</p>
                    <p><strong>Certification:</strong> Hallmarked 18k BIS certified</p>
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-4 text-sm text-[#001B3A]/70 font-light">
                    <p>Complimentary express shipping on all orders above $500.</p>
                    <p>Estimated delivery: 5-7 business days.</p>
                  </div>
                )}
                {activeTab === 'care' && (
                  <div className="space-y-4 text-sm text-[#001B3A]/70 font-light">
                    <p>Store in a soft pouch to avoid scratches.</p>
                    <p>Avoid contact with perfumes, lotions, and water.</p>
                  </div>
                )}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 border-t border-[#001B3A]/10 pt-8">
                <div className="text-center">
                  <ShieldCheck size={24} className="mx-auto mb-2 text-[#D4AF37]" />
                  <p className="text-[8px] uppercase font-bold tracking-widest text-[#001B3A]">Authentic</p>
                </div>
                <div className="text-center">
                  <Truck size={24} className="mx-auto mb-2 text-[#D4AF37]" />
                  <p className="text-[8px] uppercase font-bold tracking-widest text-[#001B3A]">Fast Delivery</p>
                </div>
                <div className="text-center">
                  <RotateCcw size={24} className="mx-auto mb-2 text-[#D4AF37]" />
                  <p className="text-[8px] uppercase font-bold tracking-widest text-[#001B3A]">Easy Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-32">
          <div className="flex items-end justify-between mb-12 border-b border-[#001B3A]/10 pb-6">
            <h2 className="text-2xl font-serif text-[#001B3A]">You May Also Adore</h2>
            <button onClick={() => setView('shop')} className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37] flex items-center group">
              View All <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {MOCK_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map(p => (
              <div key={p.id} className="group cursor-pointer" onClick={() => { setView('product-detail'); window.scrollTo(0,0); }}>
                <div className="aspect-square bg-[#FAF9F6] overflow-hidden mb-4">
                  <ImageWithFallback src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-sm font-serif text-[#001B3A] line-clamp-1">{p.name}</h3>
                <p className="text-[#001B3A]/60 text-xs mt-1 font-medium">${p.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
