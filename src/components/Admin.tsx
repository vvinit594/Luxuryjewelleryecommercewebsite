import React from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Package, Box, Users, Tag, BarChart3, Settings, Bell, Search, Plus } from 'lucide-react';

export const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#F1F5F9]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#001B3A] text-white hidden lg:flex flex-col">
        <div className="p-8">
          <h2 className="text-xl font-serif italic text-[#D4AF37]">Akelva Admin</h2>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', active: true },
            { icon: Box, label: 'Products' },
            { icon: Package, label: 'Orders' },
            { icon: Users, label: 'Customers' },
            { icon: Tag, label: 'Promotions' },
            { icon: BarChart3, label: 'Analytics' },
            { icon: Settings, label: 'Settings' }
          ].map((item) => (
            <button key={item.label} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm transition-colors ${item.active ? 'bg-[#D4AF37] text-[#001B3A] font-bold' : 'hover:bg-white/5 text-white/70'}`}>
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-8">
          <div className="relative w-96">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search orders, customers..." className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-lg text-sm outline-none focus:ring-2 ring-[#D4AF37]/20" />
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative text-slate-400 hover:text-slate-600">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-3 pl-6 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-700">Akelva Admin</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">Store Manager</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#001B3A] font-bold">A</div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Store Overview</h1>
              <p className="text-sm text-slate-500">Welcome back, here's what's happening today.</p>
            </div>
            <button className="bg-[#001B3A] text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center space-x-2 hover:bg-[#B76E79] transition-colors">
              <Plus size={18} />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Sales', value: '$124,500', trend: '+12.5%', color: 'text-emerald-500' },
              { label: 'Total Orders', value: '458', trend: '+5.4%', color: 'text-emerald-500' },
              { label: 'New Customers', value: '82', trend: '+18.2%', color: 'text-emerald-500' },
              { label: 'Avg. Order Value', value: '$2,150', trend: '-2.1%', color: 'text-rose-500' }
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                  <span className={`text-xs font-bold ${stat.color}`}>{stat.trend}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Recent Orders</h3>
              <button className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">View All</button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customer</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: '#AKL-829', customer: 'Sarah Johnson', amount: '$4,500', status: 'Delivered', date: 'Oct 12, 2023' },
                  { id: '#AKL-830', customer: 'Michael Chen', amount: '$1,250', status: 'Processing', date: 'Oct 12, 2023' },
                  { id: '#AKL-831', customer: 'Emily Davis', amount: '$850', status: 'Shipped', date: 'Oct 11, 2023' },
                  { id: '#AKL-832', customer: 'Robert Smith', amount: '$11,200', status: 'Processing', date: 'Oct 11, 2023' },
                ].map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-slate-700">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{order.customer}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 
                        order.status === 'Processing' ? 'bg-amber-100 text-amber-700' : 
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
