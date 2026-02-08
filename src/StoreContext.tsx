import React, { createContext, useContext, useState, useEffect } from 'react';

// --- Types ---
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  tag?: string;
  description?: string;
  material?: string;
  weight?: string;
  images: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export type View = 'home' | 'shop' | 'product-detail' | 'cart' | 'checkout' | 'wishlist' | 'account' | 'admin' | 'about' | 'contact' | 'auth';

interface StoreContextType {
  view: View;
  setView: (view: View) => void;
  categoryFilter: string;
  setCategoryFilter: (cat: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  cart: CartItem[];
  addToCart: (p: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  wishlist: Product[];
  toggleWishlist: (p: Product) => void;
  isWishlisted: (id: number) => boolean;
  user: any | null;
  login: (userData: any) => void;
  logout: () => void;
}

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [view, setView] = useState<View>('home');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [user, setUser] = useState<any | null>(null);

  // Persistence (Mock)
  useEffect(() => {
    const savedCart = localStorage.getItem('akelva_cart');
    const savedWish = localStorage.getItem('akelva_wishlist');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWish) setWishlist(JSON.parse(savedWish));
  }, []);

  useEffect(() => {
    localStorage.setItem('akelva_cart', JSON.stringify(cart));
    localStorage.setItem('akelva_wishlist', JSON.stringify(wishlist));
  }, [cart, wishlist]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.filter(item => item.id !== product.id);
      return [...prev, product];
    });
  };

  const isWishlisted = (id: number) => wishlist.some(item => item.id === id);

  const login = (userData: any) => {
    setUser(userData);
    localStorage.setItem('akelva_user', JSON.stringify(userData));
    setView('home');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('akelva_user');
    setView('home');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('akelva_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <StoreContext.Provider value={{ 
      view, setView, categoryFilter, setCategoryFilter,
      selectedProduct, setSelectedProduct, 
      cart, addToCart, removeFromCart, updateQuantity,
      wishlist, toggleWishlist, isWishlisted,
      user, login, logout
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
