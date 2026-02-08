import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Package, Heart, MapPin, Shield, LogOut, 
  ChevronRight, CreditCard, ShoppingBag, Truck,
  Edit2, Plus, Trash2, CheckCircle2, Bell, Smartphone
} from 'lucide-react';
import { useStore } from '../StoreContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

type AccountTab = 'dashboard' | 'profile' | 'orders' | 'wishlist' | 'addresses' | 'security';

export const Account = () => {
  const { user, logout, setView, wishlist, cart, addToCart, toggleWishlist } = useStore();
  const [activeTab, setActiveTab] = useState<AccountTab>('dashboard');

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
        <h2 className="text-2xl font-serif text-[#001B3A]">Please login to view your account</h2>
        <button 
          onClick={() => setView('auth')}
          className="bg-[#001B3A] text-white px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-[#D4AF37] transition-colors"
        >
          Login / Sign Up
        </button>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard' as AccountTab, icon: <ShoppingBag size={18} />, label: 'Dashboard' },
    { id: 'profile' as AccountTab, icon: <User size={18} />, label: 'Profile Settings' },
    { id: 'orders' as AccountTab, icon: <Package size={18} />, label: 'My Orders' },
    { id: 'wishlist' as AccountTab, icon: <Heart size={18} />, label: 'Wishlist', count: wishlist.length },
    { id: 'addresses' as AccountTab, icon: <MapPin size={18} />, label: 'Saved Addresses' },
    { id: 'security' as AccountTab, icon: <Shield size={18} />, label: 'Security' },
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-sm shadow-sm border border-[#001B3A]/5 p-6 md:p-8 sticky top-24">
              <div className="flex items-center space-x-6 mb-10">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] text-2xl font-serif italic border border-[#D4AF37]/20">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-serif text-[#001B3A]">{user.name}</h2>
                  <p className="text-[10px] text-[#001B3A]/40 uppercase tracking-[0.2em]">{user.email || user.phone}</p>
                </div>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-sm transition-all group ${
                      activeTab === item.id ? 'bg-[#FAF9F6] text-[#001B3A]' : 'text-[#001B3A]/50 hover:bg-[#FAF9F6]/50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className={activeTab === item.id ? 'text-[#D4AF37]' : ''}>{item.icon}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.count !== undefined && item.count > 0 && (
                        <span className="bg-[#B76E79] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                          {item.count}
                        </span>
                      )}
                      <ChevronRight size={14} className={`transition-transform ${activeTab === item.id ? 'translate-x-1 text-[#D4AF37]' : 'text-[#001B3A]/10'}`} />
                    </div>
                  </button>
                ))}
                
                <button 
                  onClick={logout}
                  className="w-full flex items-center space-x-4 p-4 mt-8 text-[#B76E79] hover:bg-red-50 rounded-sm transition-colors"
                >
                  <LogOut size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'dashboard' && <DashboardView />}
                {activeTab === 'profile' && <ProfileView />}
                {activeTab === 'orders' && <OrdersView />}
                {activeTab === 'wishlist' && <WishlistView />}
                {activeTab === 'addresses' && <AddressesView />}
                {activeTab === 'security' && <SecurityView />}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Sub-Views ---

const DashboardView = () => {
  const recentOrders = [
    { id: 'AKL-9123', date: 'JAN 15, 2026', amount: '₹1,250', status: 'DELIVERED' },
    { id: 'AKL-8540', date: 'DEC 02, 2025', amount: '₹850', status: 'DELIVERED' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#001B3A] rounded-sm p-8 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 transform group-hover:scale-110 transition-transform duration-700">
            <ShoppingBag size={80} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-2 block">Active Orders</span>
          <h3 className="text-3xl font-serif mb-6">2 Orders</h3>
          <button className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors">
            <span>Track Shipments</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="bg-white rounded-sm p-8 border border-[#001B3A]/5 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 transform group-hover:scale-110 transition-transform duration-700">
            <CreditCard size={80} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B76E79] mb-2 block">Loyalty Points</span>
          <div className="flex items-baseline space-x-2 mb-6">
            <h3 className="text-3xl font-serif text-[#001B3A]">1,240</h3>
            <span className="text-[8px] font-bold uppercase tracking-widest text-[#001B3A]/40">AKL Credits</span>
          </div>
          <button className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-[#001B3A] hover:text-[#B76E79] transition-colors">
            <span>Redeem Rewards</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-sm shadow-sm border border-[#001B3A]/5 p-8 md:p-12">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-xl font-serif text-[#001B3A]">Recent Orders</h3>
          <button className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] hover:underline">View All History</button>
        </div>
        <div className="space-y-6">
          {recentOrders.map((order, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-[#001B3A]/5 rounded-sm hover:border-[#D4AF37]/30 transition-colors group">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <div className="w-16 h-16 bg-[#FAF9F6] rounded-sm flex items-center justify-center text-[#001B3A]/20">
                  <Truck size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#001B3A]">Order {order.id}</h4>
                  <p className="text-[10px] text-[#001B3A]/40 uppercase tracking-widest mt-1">Placed on {order.date}</p>
                </div>
              </div>
              <div className="flex items-center justify-between md:space-x-12">
                <div className="text-right">
                  <p className="text-base font-serif text-[#001B3A]">{order.amount}</p>
                  <p className="text-[9px] font-bold text-green-600 tracking-widest uppercase mt-1">{order.status}</p>
                </div>
                <button className="px-6 py-2 border border-[#001B3A]/10 text-[10px] font-bold uppercase tracking-widest hover:bg-[#001B3A] hover:text-white transition-all">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProfileView = () => {
  const { user, login } = useStore();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: 'Not Specified'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ ...user, ...formData });
    alert('Profile updated successfully!');
  };

  return (
    <div className="bg-white rounded-sm shadow-sm border border-[#001B3A]/5 p-8 md:p-12">
      <h3 className="text-2xl font-serif text-[#001B3A] mb-10">Profile Settings</h3>
      <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#001B3A]/40 ml-1">Full Name</label>
            <input 
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-[#FAF9F6] border-b border-[#001B3A]/10 p-4 text-sm focus:border-[#D4AF37] outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#001B3A]/40 ml-1">Gender</label>
            <select 
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
              className="w-full bg-[#FAF9F6] border-b border-[#001B3A]/10 p-4 text-sm focus:border-[#D4AF37] outline-none transition-colors appearance-none"
            >
              <option>Not Specified</option>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#001B3A]/40 ml-1">Email Address</label>
            <input 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-[#FAF9F6] border-b border-[#001B3A]/10 p-4 text-sm focus:border-[#D4AF37] outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#001B3A]/40 ml-1">Phone Number</label>
            <input 
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-[#FAF9F6] border-b border-[#001B3A]/10 p-4 text-sm focus:border-[#D4AF37] outline-none transition-colors"
            />
          </div>
        </div>

        <button type="submit" className="bg-[#001B3A] text-white px-12 py-4 font-bold uppercase tracking-widest text-xs hover:bg-[#D4AF37] transition-all">
          Save Changes
        </button>
      </form>
    </div>
  );
};

const OrdersView = () => {
  const orders = [
    { id: 'AKL-9123', date: 'JAN 15, 2026', amount: '₹1,250', status: 'Delivered', items: 3, image: 'figma:asset/ba80c1c98ff2771ede1771152da4e5397296d799.png' },
    { id: 'AKL-8540', date: 'DEC 02, 2025', amount: '₹850', status: 'Delivered', items: 1, image: 'figma:asset/ba80c1c98ff2771ede1771152da4e5397296d799.png' },
    { id: 'AKL-7211', date: 'OCT 20, 2025', amount: '₹2,400', status: 'Cancelled', items: 2, image: 'figma:asset/ba80c1c98ff2771ede1771152da4e5397296d799.png' },
  ];

  return (
    <div className="bg-white rounded-sm shadow-sm border border-[#001B3A]/5 p-8 md:p-12">
      <h3 className="text-2xl font-serif text-[#001B3A] mb-10">Order History</h3>
      <div className="space-y-8">
        {orders.map((order, i) => (
          <div key={i} className="border border-[#001B3A]/5 rounded-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row justify-between mb-6 pb-6 border-b border-[#001B3A]/5">
              <div className="space-y-1 mb-4 md:mb-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#001B3A]/40">Order Number</p>
                <h4 className="text-sm font-bold text-[#001B3A]">{order.id}</h4>
              </div>
              <div className="flex space-x-12">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#001B3A]/40">Date</p>
                  <p className="text-xs font-medium text-[#001B3A]">{order.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#001B3A]/40">Total</p>
                  <p className="text-xs font-bold text-[#001B3A]">{order.amount}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#001B3A]/40">Status</p>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${order.status === 'Cancelled' ? 'text-red-500' : 'text-green-600'}`}>
                    {order.status}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-4">
                {[...Array(order.items)].map((_, idx) => (
                  <div key={idx} className="w-12 h-12 bg-[#FAF9F6] border-2 border-white rounded-sm overflow-hidden shadow-sm">
                    <ImageWithFallback src={order.image} alt="product" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <button className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] border-b border-[#D4AF37] pb-1 hover:text-[#001B3A] hover:border-[#001B3A] transition-colors">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WishlistView = () => {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="bg-white rounded-sm shadow-sm border border-[#001B3A]/5 p-20 text-center">
        <Heart size={48} className="mx-auto text-[#001B3A]/10 mb-6" />
        <h3 className="text-xl font-serif text-[#001B3A] mb-4">Your wishlist is empty</h3>
        <p className="text-sm text-[#001B3A]/40 mb-8 max-w-xs mx-auto">Explore our collections and save your favorite pieces here.</p>
        <button className="bg-[#001B3A] text-white px-10 py-4 font-bold uppercase tracking-widest text-xs">Start Shopping</button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-sm shadow-sm border border-[#001B3A]/5 p-8 md:p-12">
      <h3 className="text-2xl font-serif text-[#001B3A] mb-10">My Wishlist ({wishlist.length})</h3>
      <div className="grid sm:grid-cols-2 gap-8">
        {wishlist.map((product) => (
          <div key={product.id} className="group relative border border-[#001B3A]/5 p-4 rounded-sm">
            <div className="aspect-square mb-6 overflow-hidden bg-[#FAF9F6]">
              <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="space-y-2 mb-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#001B3A] truncate">{product.name}</h4>
              <p className="text-base font-serif text-[#D4AF37]">{product.price}</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 bg-[#001B3A] text-white py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-all"
              >
                Add to Cart
              </button>
              <button 
                onClick={() => toggleWishlist(product)}
                className="w-12 border border-[#001B3A]/10 flex items-center justify-center text-[#B76E79] hover:bg-red-50 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AddressesView = () => {
  const [addresses] = useState([
    { id: 1, type: 'Home', name: 'Ritesh Tiwari', phone: '+91 98765 43210', address: '102, Silver Heights, Dahisar East, Mumbai, Maharashtra - 400068', default: true },
    { id: 2, type: 'Office', name: 'Ritesh Tiwari', phone: '+91 98765 43210', address: 'B-Wing, Fortune Plaza, Goregaon East, Mumbai, Maharashtra - 400063', default: false }
  ]);

  return (
    <div className="bg-white rounded-sm shadow-sm border border-[#001B3A]/5 p-8 md:p-12">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-2xl font-serif text-[#001B3A]">Saved Addresses</h3>
        <button className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] hover:text-[#001B3A] transition-colors">
          <Plus size={14} />
          <span>Add New</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {addresses.map((addr) => (
          <div key={addr.id} className={`p-8 border rounded-sm relative transition-all ${addr.default ? 'border-[#D4AF37] bg-[#FAF9F6]/30' : 'border-[#001B3A]/5'}`}>
            {addr.default && (
              <span className="absolute top-4 right-4 text-[8px] font-bold uppercase tracking-widest bg-[#D4AF37] text-white px-2 py-1">Default</span>
            )}
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-[#001B3A]/5 rounded-sm">
                <MapPin size={16} className="text-[#001B3A]" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#001B3A]">{addr.type}</h4>
            </div>
            <p className="text-sm font-bold text-[#001B3A] mb-2">{addr.name}</p>
            <p className="text-xs text-[#001B3A]/60 leading-relaxed mb-4">{addr.address}</p>
            <p className="text-xs font-medium text-[#001B3A] mb-8">{addr.phone}</p>
            
            <div className="flex space-x-6 border-t border-[#001B3A]/5 pt-6">
              <button className="text-[10px] font-bold uppercase tracking-widest text-[#001B3A]/40 hover:text-[#D4AF37] transition-colors flex items-center space-x-2">
                <Edit2 size={12} />
                <span>Edit</span>
              </button>
              <button className="text-[10px] font-bold uppercase tracking-widest text-[#001B3A]/40 hover:text-red-500 transition-colors flex items-center space-x-2">
                <Trash2 size={12} />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SecurityView = () => {
  return (
    <div className="bg-white rounded-sm shadow-sm border border-[#001B3A]/5 p-8 md:p-12">
      <h3 className="text-2xl font-serif text-[#001B3A] mb-10">Security & Privacy</h3>
      
      <div className="space-y-12">
        {/* Verification */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#001B3A]">Two-Step Verification</h4>
              <p className="text-xs text-[#001B3A]/40">Protect your account with an extra layer of security.</p>
            </div>
            <div className="w-12 h-6 bg-[#D4AF37] rounded-full relative p-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 shadow-sm" />
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-[#FAF9F6] border border-[#001B3A]/5 rounded-sm">
            <Smartphone size={20} className="text-[#001B3A]/40" />
            <div className="flex-1">
              <p className="text-xs font-bold text-[#001B3A]">Primary Number</p>
              <p className="text-[10px] text-[#001B3A]/40 uppercase tracking-widest">+91 ******3210</p>
            </div>
            <button className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Change</button>
          </div>
        </section>

        {/* Password */}
        <section className="pt-12 border-t border-[#001B3A]/5">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#001B3A]">Login Password</h4>
              <p className="text-xs text-[#001B3A]/40">Last changed 4 months ago.</p>
            </div>
            <button className="bg-[#001B3A] text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-all">
              Update
            </button>
          </div>
        </section>

        {/* Notifications */}
        <section className="pt-12 border-t border-[#001B3A]/5">
          <h4 className="text-sm font-bold uppercase tracking-widest text-[#001B3A] mb-8">Notification Preferences</h4>
          <div className="space-y-6">
            {[
              { label: 'Login Alerts', desc: 'Notify me when someone logs in from a new device.', icon: <Shield size={16} /> },
              { label: 'Order Updates', desc: 'Get real-time tracking updates via SMS and Email.', icon: <Package size={16} /> },
              { label: 'Offers & News', desc: 'Receive personalized festive offers and new arrivals.', icon: <Bell size={16} /> }
            ].map((pref, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-[#FAF9F6] text-[#001B3A]/40 rounded-sm group-hover:text-[#D4AF37] transition-colors">{pref.icon}</div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-[#001B3A]">{pref.label}</p>
                    <p className="text-[10px] text-[#001B3A]/40">{pref.desc}</p>
                  </div>
                </div>
                <div className="w-10 h-5 bg-[#001B3A]/10 rounded-full relative p-1 cursor-pointer">
                  <div className="w-3 h-3 bg-white rounded-full absolute left-1 shadow-sm" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
