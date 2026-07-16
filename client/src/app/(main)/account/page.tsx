'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, MapPin, CreditCard, Heart, Settings, LogOut, User, History, Check, ChevronDown, Trash2, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { formatPrice, formatDate, cn } from '@/lib/utils';

const accountTabs = [
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'payment', label: 'Payment Methods', icon: CreditCard },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const mockOrders = [
  { id: 'KMF-ORD-001', date: '2024-01-15', status: 'delivered', total: 798, items: [{ name: 'Kumfora Day Pads', qty: 2, price: 299 }, { name: 'Kumfora Night Pads', qty: 1, price: 399 }] },
  { id: 'KMF-ORD-002', date: '2024-01-28', status: 'shipped', total: 598, items: [{ name: 'Kumfora Day Pads', qty: 2, price: 299 }] },
  { id: 'KMF-ORD-003', date: '2024-02-10', status: 'processing', total: 1196, items: [{ name: 'Kumfora Night Pads', qty: 3, price: 399 }] },
];

const mockAddresses = [
  { id: 1, name: 'Home', firstName: 'Priya', lastName: 'Sharma', phone: '9876543210', address: '123 MG Road', city: 'Mumbai', state: 'MH', pincode: '400001', isDefault: true },
  { id: 2, name: 'Work', firstName: 'Priya', lastName: 'Sharma', phone: '9876543210', address: '456 Bandra Kurla Complex', city: 'Mumbai', state: 'MH', pincode: '400051', isDefault: false },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<typeof mockAddresses[0] | null>(null);
  const [addressForm, setAddressForm] = useState({
    name: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false,
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'primary' | 'neutral' | 'danger'> = {
      delivered: 'success',
      shipped: 'primary',
      processing: 'neutral',
      cancelled: 'danger',
    };
    return variants[status] || 'neutral';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <Check className="w-4 h-4" />;
      case 'shipped': return <Package className="w-4 h-4" />;
      case 'processing': return <History className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddressForm(false);
    setEditingAddress(null);
    setAddressForm({ name: '', firstName: '', lastName: '', phone: '', address: '', city: '', state: '', pincode: '', isDefault: false });
  };

  const startEditAddress = (addr: typeof mockAddresses[0]) => {
    setEditingAddress(addr);
    setAddressForm({
      name: addr.name,
      firstName: addr.firstName,
      lastName: addr.lastName,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      isDefault: addr.isDefault,
    });
    setShowAddressForm(true);
  };

  const startNewAddress = () => {
    setEditingAddress(null);
    setAddressForm({ name: '', firstName: '', lastName: '', phone: '', address: '', city: '', state: '', pincode: '', isDefault: false });
    setShowAddressForm(true);
  };

  return (
    <>
      <main className="pt-16 min-h-screen bg-kumfora-cream/30">
        <div className="container-main py-8 lg:py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="card p-6 space-y-4 sticky top-24">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-kumfora-blush flex items-center justify-center">
                    <User className="w-8 h-8 text-kumfora-terracotta" />
                  </div>
                  <div>
                    <h2 className="text-heading-md font-display font-medium text-kumfora-charcoal">Priya Sharma</h2>
                    <p className="text-body-sm text-kumfora-gray">priya@example.com</p>
                  </div>
                </div>
                <nav className="space-y-1" role="navigation" aria-label="Account sections">
                  {accountTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id); setShowAddressForm(false); }}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-body font-medium transition-all',
                        activeTab === tab.id
                          ? 'bg-kumfora-terracotta text-white'
                          : 'text-kumfora-slate hover:bg-kumfora-blush hover:text-kumfora-terracotta'
                      )}
                    >
                      <tab.icon className="w-5 h-5" aria-hidden="true" />
                      {tab.label}
                    </button>
                  ))}
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-body font-medium text-kumfora-rose hover:bg-kumfora-rose/10 transition-colors">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Orders */}
              {activeTab === 'orders' && (
                <section aria-labelledby="orders-heading">
                  <div className="flex items-center justify-between mb-6">
                    <h2 id="orders-heading" className="text-display-sm font-display font-medium text-kumfora-charcoal">My Orders</h2>
                    <Link href="/shop" className="btn-secondary">Continue Shopping</Link>
                  </div>
                  <div className="space-y-4" role="list">
                    {mockOrders.map((order) => (
                      <article key={order.id} className="card p-6" role="listitem">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                          <div className="flex items-center gap-4">
                            <span className="text-heading-md font-display font-medium text-kumfora-charcoal">{order.id}</span>
                            <span className="badge bg-kumfora-lightGray text-kumfora-slate">{formatDate(order.date)}</span>
                            <span className={cn('badge', getStatusBadge(order.status))} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                              {getStatusIcon(order.status)}
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <span className="text-heading-md font-semibold text-kumfora-terracotta">{formatPrice(order.total)}</span>
                        </div>
                        <div className="divider mb-4" />
                        <div className="flex flex-wrap items-center gap-4">
                          {order.items.map((item, idx) => (
                            <span key={idx} className="text-body-sm text-kumfora-slate">
                              {item.name} × {item.qty}
                            </span>
                          ))}
                          <div className="flex items-center gap-2 ml-auto">
                            <Button variant="secondary" size="sm">View Details</Button>
                            {order.status === 'delivered' && <Button variant="secondary" size="sm">Buy Again</Button>}
                            {order.status !== 'delivered' && <Button variant="ghost" size="sm">Track Order</Button>}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {/* Addresses */}
              {activeTab === 'addresses' && (
                <section aria-labelledby="addresses-heading">
                  <div className="flex items-center justify-between mb-6">
                    <h2 id="addresses-heading" className="text-display-sm font-display font-medium text-kumfora-charcoal">Saved Addresses</h2>
                    <Button onClick={startNewAddress} leftIcon={<MapPin className="w-4 h-4" />}>Add New Address</Button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6" role="list">
                    {mockAddresses.map((addr) => (
                      <article key={addr.id} className={cn('card p-6 relative', addr.isDefault && 'ring-2 ring-kumfora-terracotta')} role="listitem">
                        {addr.isDefault && (
                          <span className="absolute -top-2 -right-2 badge-primary text-caption">Default</span>
                        )}
                        <div className="mb-4">
                          <p className="font-medium text-kumfora-charcoal">{addr.name}</p>
                          <address className="not-italic text-body-sm text-kumfora-slate space-y-1 mt-1">
                            <p>{addr.firstName} {addr.lastName}</p>
                            <p>{addr.address}</p>
                            <p>{addr.city}, {addr.state} {addr.pincode}</p>
                            <p>Phone: {addr.phone}</p>
                          </address>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="secondary" size="sm" onClick={() => startEditAddress(addr)} leftIcon={<Edit2 className="w-4 h-4" />}>Edit</Button>
                          {!addr.isDefault && <Button variant="ghost" size="sm">Set Default</Button>}
                          <Button variant="ghost" size="sm" className="text-kumfora-rose" leftIcon={<Trash2 className="w-4 h-4" />}>Remove</Button>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {/* Payment Methods */}
              {activeTab === 'payment' && (
                <section aria-labelledby="payment-heading">
                  <div className="flex items-center justify-between mb-6">
                    <h2 id="payment-heading" className="text-display-sm font-display font-medium text-kumfora-charcoal">Payment Methods</h2>
                    <Button variant="secondary" leftIcon={<CreditCard className="w-4 h-4" />}>Add Card</Button>
                  </div>
                  <div className="card p-6 text-center py-12">
                    <CreditCard className="w-16 h-16 text-kumfora-lightGray mx-auto mb-4" />
                    <h3 className="text-heading-md font-display font-medium text-kumfora-charcoal mb-2">No saved payment methods</h3>
                    <p className="text-body text-kumfora-gray mb-6">Your card details will appear here for faster checkout.</p>
                    <Button leftIcon={<CreditCard className="w-4 h-4" />}>Add Your First Card</Button>
                  </div>
                </section>
              )}

              {/* Wishlist */}
              {activeTab === 'wishlist' && (
                <section aria-labelledby="wishlist-heading">
                  <h2 id="wishlist-heading" className="text-display-sm font-display font-medium text-kumfora-charcoal mb-6">My Wishlist</h2>
                  <div className="card p-12 text-center">
                    <Heart className="w-16 h-16 text-kumfora-lightGray mx-auto mb-4" />
                    <h3 className="text-heading-md font-display font-medium text-kumfora-charcoal mb-2">Your wishlist is empty</h3>
                    <p className="text-body text-kumfora-gray mb-6">Save items you love for later.</p>
                    <Link href="/shop"><Button leftIcon={<Heart className="w-4 h-4" />}>Start Shopping</Button></Link>
                  </div>
                </section>
              )}

              {/* Settings */}
              {activeTab === 'settings' && (
                <section aria-labelledby="settings-heading">
                  <h2 id="settings-heading" className="text-display-sm font-display font-medium text-kumfora-charcoal mb-6">Account Settings</h2>
                  <div className="space-y-6 max-w-xl">
                    <div className="card p-6">
                      <h3 className="text-heading-md font-medium text-kumfora-charcoal mb-4">Profile Information</h3>
                      <div className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Input label="First Name" defaultValue="Priya" />
                          <Input label="Last Name" defaultValue="Sharma" />
                        </div>
                        <Input label="Email" type="email" defaultValue="priya@example.com" />
                        <Input label="Phone" type="tel" defaultValue="9876543210" />
                      </div>
                      <Button className="mt-6">Save Changes</Button>
                    </div>

                    <div className="card p-6">
                      <h3 className="text-heading-md font-medium text-kumfora-charcoal mb-4">Notifications</h3>
                      <div className="space-y-4">
                        {[
                          { label: 'Order Updates', desc: 'Shipping, delivery, and order confirmations' },
                          { label: 'Promotional Emails', desc: 'Special offers, new products, and sales' },
                          { label: 'Period Reminders', desc: 'Monthly cycle tracking reminders' },
                        ].map((notif, i) => (
                          <label key={i} className="flex items-center justify-between cursor-pointer">
                            <div>
                              <p className="font-medium text-kumfora-charcoal">{notif.label}</p>
                              <p className="text-body-sm text-kumfora-gray">{notif.desc}</p>
                            </div>
                            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-kumfora-lightGray text-kumfora-terracotta focus:ring-kumfora-blush" />
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="card p-6 border-kumfora-rose/30">
                      <h3 className="text-heading-md font-medium text-kumfora-charcoal mb-4">Danger Zone</h3>
                      <p className="text-body text-kumfora-gray mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                      <Button variant="danger">Delete Account</Button>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
      {showAddressForm && (
        <AddressModal
          onClose={() => { setShowAddressForm(false); setEditingAddress(null); }}
          initialData={editingAddress}
          formData={addressForm}
          setFormData={setAddressForm}
        />
      )}
    </>
  );
}

function AddressModal({ onClose, initialData, formData, setFormData }: {
  onClose: () => void;
  initialData: any;
  formData: any;
  setFormData: (data: any) => void;
}) {
  const states = [
    { value: 'MH', label: 'Maharashtra' },
    { value: 'DL', label: 'Delhi' },
    { value: 'KA', label: 'Karnataka' },
    { value: 'TN', label: 'Tamil Nadu' },
    { value: 'GJ', label: 'Gujarat' },
    { value: 'UP', label: 'Uttar Pradesh' },
    { value: 'WB', label: 'West Bengal' },
    { value: 'RJ', label: 'Rajasthan' },
    { value: 'OTHER', label: 'Other' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="address-modal-title">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-kumfora-lightGray/50 flex items-center justify-between">
          <h2 id="address-modal-title" className="text-heading-md font-display font-medium text-kumfora-charcoal">
            {initialData ? 'Edit Address' : 'Add New Address'}
          </h2>
          <button onClick={onClose} className="btn-ghost p-2"><ChevronDown className="w-6 h-6 rotate-180" /></button>
        </div>
        <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
            <Input label="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
          </div>
          <Input label="Phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
          <Input label="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="House/Flat, Building, Street, Area" required />
          <div className="grid sm:grid-cols-3 gap-4">
            <Input label="City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} required />
            <select className="input" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} required>
              <option value="">Select State</option>
              {states.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <Input label="Pincode" value={formData.pincode} onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} required />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={formData.isDefault} onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })} className="w-4 h-4 rounded border-kumfora-lightGray text-kumfora-terracotta focus:ring-kumfora-blush" />
            <span className="text-body-sm text-kumfora-slate">Set as default address</span>
          </label>
          <div className="flex gap-3 pt-4">
            <Button variant="secondary" type="button" onClick={onClose} className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1">Save Address</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
